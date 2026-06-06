import PageHeader from "@/components/ui/PageHeader";
import MapWrapper from "./MapWrapper";

export default function MapPage() {
  return (
    <div className="page-fade-in p-6 lg:p-8 space-y-4">
      <PageHeader
        title="City Intelligence Map"
        subtitle="Interactive district-level data for Magdeburg â€” switch layers to explore population, air quality, housing costs and green space."
      />
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid rgba(148,163,184,0.24)",
          boxShadow: "0 4px 20px rgba(148,163,184,0.13)",
          height: "calc(100vh - 200px)",
          minHeight: 560,
        }}
      >
        <MapWrapper />
      </div>
    </div>
  );
}

