import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ValeduePage from "./pages/ValeduePage.tsx";
import GtapPage from "./pages/GtapPage.tsx";
import IaetdsPage from "./pages/IaetdsPage.tsx";
import VallunexStudiosPage from "./pages/VallunexStudiosPage.tsx";
import TalkToUsPage from "./pages/TalkToUsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/valedue" element={<ValeduePage />} />
          <Route path="/gtap" element={<GtapPage />} />
          <Route path="/iaetds" element={<IaetdsPage />} />
          <Route path="/vallunex-studios" element={<VallunexStudiosPage />} />
          <Route path="/talk-to-us" element={<TalkToUsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
