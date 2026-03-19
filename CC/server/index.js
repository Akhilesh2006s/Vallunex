import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const port = process.env.PORT || 4000
const mongoUri = process.env.MONGO_URI
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

if (!mongoUri) {
  console.error('MONGO_URI is not set. Please create a .env file with your Mongo connection string.')
}

mongoose
  .connect(mongoUri || '', { dbName: 'VallunexCommandCentre' })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error', err)
  })

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
    // Optional login password so Admin can grant employees access.
    password: { type: String },
    // Optional list of products this team member is responsible for.
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
)

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    deadline: { type: String, required: true },
    assignedTo: { type: String, required: true },
    status: { type: String, enum: ['Open', 'Submitted', 'Approved', 'Rejected'], default: 'Open' },
    submissionLink: { type: String },
    createdBy: { type: String, default: 'Admin' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  },
  { timestamps: true },
)

const leadSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Negotiation', 'Client'],
      default: 'New',
    },
    // Sales temperature to help prioritise outreach.
    temperature: {
      type: String,
      enum: ['Cold', 'Warm', 'Hot'],
      default: 'Cold',
    },
    value: { type: Number, required: true },
    valuePeriod: {
      type: String,
      enum: ['Monthly', 'Yearly'],
      default: 'Monthly',
    },
    salesRep: { type: String, required: true },
    // Optional list of products associated with this lead/client.
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true },
)

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    techStack: { type: String },
    revenue: { type: Number, default: 0 },
  },
  { timestamps: true },
)

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    clientName: { type: String, required: true },
    status: {
      type: String,
      enum: ['Planned', 'In Progress', 'On Hold', 'Completed'],
      default: 'Planned',
    },
    budget: { type: Number },
    ownerEmployeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    ownerEmployeeName: { type: String, required: true },
  },
  { timestamps: true },
)

const Employee = mongoose.model('Employee', employeeSchema)
const Task = mongoose.model('Task', taskSchema)
const Lead = mongoose.model('Lead', leadSchema)
const Product = mongoose.model('Product', productSchema)
const Project = mongoose.model('Project', projectSchema)

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'sales', 'development'],
      required: true,
    },
    password: { type: String, required: true }, // demo only – not for production
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)

async function ensureSeedUsers() {
  const desiredUsers = [
    {
      email: 'amenityforge@gmail.com',
      name: 'Amenity Admin',
      role: 'admin',
      password: 'Amenity',
    },
    {
      email: 'sales@vallunex.com',
      name: 'Sales Lead',
      role: 'sales',
      password: 'sales123',
    },
    {
      email: 'dev@vallunex.com',
      name: 'Senior Developer',
      role: 'development',
      password: 'dev123',
    },
  ]

  await Promise.all(
    desiredUsers.map(async (user) => {
      const hashed = await bcrypt.hash(user.password, 10)
      await User.findOneAndUpdate(
        { email: user.email },
        { email: user.email, name: user.name, role: user.role, password: hashed },
        { upsert: true, new: true },
      ).exec()
    }),
  )

  console.log('Ensured default Vallunex users')
}

ensureSeedUsers().catch((err) => console.error('Failed to seed users', err))

function signToken(user) {
  return jwt.sign({ sub: String(user.id), role: user.role }, JWT_SECRET, { expiresIn: '8h' })
}

function requireAuth(roles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' })
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET)
      if (roles && roles.length > 0 && !roles.includes(payload.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' })
      }
      req.user = payload
      return next()
    } catch (err) {
      console.error('JWT verification failed', err)
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
  }
}

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  // First, try admin / sales / other system users.
  const userDoc = await User.findOne({ email }).lean()
  if (userDoc) {
    let isMatch = false
    try {
      isMatch = await bcrypt.compare(password, userDoc.password)
    } catch {
      // ignore – fall back to plain comparison below
    }

    // Fallback supports older records where the password was stored in plain text.
    if (!isMatch && userDoc.password === password) {
      isMatch = true
    }

    if (isMatch) {
      const user = {
        id: userDoc._id,
        email: userDoc.email,
        name: userDoc.name,
        role: userDoc.role,
      }
      const token = signToken(user)
      return res.json({ ...user, token })
    }
  }

  // If not found in User, allow employees (created by Admin) to log in.
  const employeeDoc = await Employee.findOne({ email }).lean()
  if (employeeDoc && employeeDoc.password) {
    let isMatch = false
    try {
      isMatch = await bcrypt.compare(password, employeeDoc.password)
    } catch {
      // ignore – fall back to plain comparison below
    }

    if (!isMatch && employeeDoc.password === password) {
      isMatch = true
    }

    if (isMatch) {
      const user = {
        id: employeeDoc._id,
        email: employeeDoc.email,
        name: employeeDoc.name,
        // All employee logins use the development workspace.
        role: 'development',
      }
      const token = signToken(user)
      return res.json({ ...user, token })
    }
  }

  return res.status(401).json({ error: 'Invalid credentials' })
})


// Employees
app.get('/api/employees', async (req, res) => {
  const items = await Employee.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

app.post('/api/employees', requireAuth(['admin']), async (req, res) => {
  const payload = req.body
  if (!payload.name || !payload.email || !payload.role) {
    return res.status(400).json({ error: 'name, email and role are required' })
  }

  const toCreate = { ...payload }
  if (payload.password) {
    toCreate.password = await bcrypt.hash(payload.password, 10)
  }

  const created = await Employee.create(toCreate)
  res.status(201).json(created)
})

app.patch('/api/employees/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const payload = { ...req.body }
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10)
  }
  const updated = await Employee.findByIdAndUpdate(id, payload, { new: true }).lean()
  res.json(updated)
})

app.delete('/api/employees/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  await Employee.findByIdAndDelete(id)
  res.status(204).end()
})

app.patch('/api/employees/:id/approve', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const updated = await Employee.findByIdAndUpdate(id, { status: 'Paid' }, { new: true }).lean()
  res.json(updated)
})

app.post('/api/employees/approve-all', requireAuth(['admin']), async (req, res) => {
  await Employee.updateMany({ status: 'Pending' }, { status: 'Paid' })
  const items = await Employee.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

// Tasks
app.get('/api/tasks', async (req, res) => {
  const items = await Task.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

app.post('/api/tasks', requireAuth(['admin']), async (req, res) => {
  const payload = req.body
  const created = await Task.create(payload)
  res.status(201).json(created)
})

app.patch('/api/tasks/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const payload = { ...req.body }
  const updated = await Task.findByIdAndUpdate(id, payload, { new: true }).lean()
  res.json(updated)
})

app.patch('/api/tasks/:id/submit', requireAuth(['development', 'admin']), async (req, res) => {
  const { id } = req.params
  const { submissionLink } = req.body
  const updated = await Task.findByIdAndUpdate(
    id,
    { submissionLink, status: 'Submitted' },
    { new: true },
  ).lean()
  res.json(updated)
})

app.patch('/api/tasks/:id/approve', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const updated = await Task.findByIdAndUpdate(id, { status: 'Approved' }, { new: true }).lean()
  res.json(updated)
})

app.patch('/api/tasks/:id/reject', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const updated = await Task.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true }).lean()
  res.json(updated)
})

app.delete('/api/tasks/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  await Task.findByIdAndDelete(id)
  res.status(204).end()
})

// Leads
app.get('/api/leads', async (req, res) => {
  const items = await Lead.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

app.post('/api/leads', requireAuth(['sales', 'admin']), async (req, res) => {
  const payload = req.body
  const created = await Lead.create(payload)
  res.status(201).json(created)
})

// Generic lead update (e.g. temperature, associated products, status changes).
app.patch('/api/leads/:id', requireAuth(['sales', 'admin']), async (req, res) => {
  const { id } = req.params
  const payload = { ...req.body }
  const updated = await Lead.findByIdAndUpdate(id, payload, { new: true }).lean()
  res.json(updated)
})

app.patch('/api/leads/:id/convert', requireAuth(['sales', 'admin']), async (req, res) => {
  const { id } = req.params
  const updated = await Lead.findByIdAndUpdate(id, { status: 'Client' }, { new: true }).lean()
  res.json(updated)
})

app.delete('/api/leads/:id', requireAuth(['sales', 'admin']), async (req, res) => {
  const { id } = req.params
  await Lead.findByIdAndDelete(id)
  res.status(204).end()
})

// Products
app.get('/api/products', async (req, res) => {
  const items = await Product.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

app.post('/api/products', requireAuth(['admin', 'sales']), async (req, res) => {
  const payload = req.body
  if (!payload.name) {
    return res.status(400).json({ error: 'name is required' })
  }
  const created = await Product.create(payload)
  res.status(201).json(created)
})

app.patch('/api/products/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const payload = { ...req.body }
  const updated = await Product.findByIdAndUpdate(id, payload, { new: true }).lean()
  res.json(updated)
})

app.delete('/api/products/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id)
  res.status(204).end()
})

// Projects
app.get('/api/projects', async (req, res) => {
  const items = await Project.find().sort({ createdAt: 1 }).lean()
  res.json(items)
})

app.post('/api/projects', requireAuth(['admin']), async (req, res) => {
  const { name, clientName, status, budget, ownerEmployeeId } = req.body

  if (!name || !clientName || !ownerEmployeeId) {
    return res.status(400).json({ error: 'name, clientName and ownerEmployeeId are required' })
  }

  const owner = await Employee.findById(ownerEmployeeId).lean()
  if (!owner) {
    return res.status(404).json({ error: 'Employee not found for ownerEmployeeId' })
  }

  const created = await Project.create({
    name,
    clientName,
    status,
    budget,
    ownerEmployeeId: owner._id,
    ownerEmployeeName: owner.name,
  })

  res.status(201).json(created)
})

app.patch('/api/projects/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  const payload = { ...req.body }

  if (payload.ownerEmployeeId) {
    const owner = await Employee.findById(payload.ownerEmployeeId).lean()
    if (!owner) {
      return res.status(404).json({ error: 'Employee not found for ownerEmployeeId' })
    }
    payload.ownerEmployeeName = owner.name
  }

  const updated = await Project.findByIdAndUpdate(id, payload, { new: true }).lean()
  res.json(updated)
})

app.delete('/api/projects/:id', requireAuth(['admin']), async (req, res) => {
  const { id } = req.params
  await Project.findByIdAndDelete(id)
  res.status(204).end()
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.listen(port, () => {
  console.log(`Vallunex Command Centre API listening on http://localhost:${port}`)
})


