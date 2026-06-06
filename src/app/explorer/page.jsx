import PageHeader from "@/components/ui/PageHeader";
import ExplorerClient from "./ExplorerClient";

export default function ExplorerPage() {
  return (
    <div className="page-fade-in p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <PageHeader
        title="Data Explorer"
        subtitle="Browse, filter, and export all available city datasets."
      />
      <ExplorerClient />
    </div>
  );
}
