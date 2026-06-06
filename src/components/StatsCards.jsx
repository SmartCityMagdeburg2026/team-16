// components/StatsCards.jsx

export default function StatsCards({
  totalCategories,
  totalDatasets,
}) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div className="bg-slate-900 p-5 rounded-xl">
        <p>Categories</p>

        <h2 className="text-3xl font-bold">
          {totalCategories}
        </h2>
      </div>

      <div className="bg-slate-900 p-5 rounded-xl">
        <p>Datasets</p>

        <h2 className="text-3xl font-bold">
          {totalDatasets}
        </h2>
      </div>

    </div>
  );
}