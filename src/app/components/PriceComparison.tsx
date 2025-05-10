import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const PriceComparison = () => {
  const features = [
    { name: "Real-time scam detection", free: true, plus: true, lifetime: true },
    { name: "Basic phishing protection", free: true, plus: true, lifetime: true },
    { name: "Browser extension", free: true, plus: true, lifetime: true },
    { name: "Scam link lookup", free: "15/month", plus: "Unlimited", lifetime: "Unlimited" },
    { name: "Auto-warning on scam sites", free: false, plus: true, lifetime: true },
    { name: "Real-time URL scanning", free: false, plus: true, lifetime: true },
    { name: "Clipboard protection", free: false, plus: true, lifetime: true },
    { name: "Priority support", free: false, plus: true, lifetime: true },
    { name: "Early access features", free: false, plus: false, lifetime: true },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Feature</TableHead>
                <TableHead className="text-center">Free</TableHead>
                <TableHead className="text-center">Plus</TableHead>
                <TableHead className="text-center">Lifetime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.free === "boolean" ? (
                      feature.free ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✕</span>
                      )
                    ) : (
                      feature.free
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.plus === "boolean" ? (
                      feature.plus ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✕</span>
                      )
                    ) : (
                      feature.plus
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {typeof feature.lifetime === "boolean" ? (
                      feature.lifetime ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <span className="text-red-500">✕</span>
                      )
                    ) : (
                      feature.lifetime
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
