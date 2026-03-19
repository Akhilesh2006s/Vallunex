const tickerItems = [
  { name: "VLX Infrastructure", value: "1,593.18", change: "+0.87%" },
  { name: "VLX Capital", value: "4,210.55", change: "+2.03%" },
  { name: "VLX Maritime", value: "891.44", change: "-0.31%" },
  { name: "VLX Renewables", value: "3,127.09", change: "+1.56%" },
  { name: "VLX Holdings", value: "6,482.71", change: "+0.42%" },
  { name: "VLX Energy", value: "2,847.32", change: "+1.24%" },
];

const DataTicker = () => {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden border-t border-b border-border py-3 bg-secondary/50">
      <div className="flex animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-xs text-muted-foreground tabular-nums">
            <span className="font-medium text-foreground">{item.name}</span>
            {" "}{item.value}{" "}
            <span className={item.change.startsWith("+") ? "text-accent" : "text-destructive"}>
              {item.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default DataTicker;
