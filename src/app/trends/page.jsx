import PageHeader from "@/components/ui/PageHeader";
import TrendsClient from "./TrendsClient";

export default function TrendsPage() {
  return (
    <div className="page-fade-in p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Trends"
        subtitle="Historical timeline, year-over-year comparison, and city evolution."
      />
      <TrendsClient />
    </div>
  );
}
