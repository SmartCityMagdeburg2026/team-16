// components/CategoryCard.jsx

import Link from "next/link";

// Pretty-print folder name to human label
function formatName(slug) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CategoryCard({ category }) {
  return (
    <Link href={`/category/${category.name}`}>
      <div className="border border-gray-800 rounded-xl p-5 hover:border-blue-500 transition-colors bg-gray-900 cursor-pointer">
        <h2 className="text-lg font-semibold mb-1">
          {formatName(category.name)}
        </h2>

        <p className="text-gray-400 text-sm mb-3">
          {category.count} datasets
        </p>

        <ul className="text-xs text-gray-500 space-y-1">
          {category.datasets.slice(0, 3).map((dataset) => (
            <li
              key={dataset.title}
              className="truncate"
            >
              • {dataset.title}
            </li>
          ))}

          {category.count > 3 && (
            <li className="text-gray-600">
              +{category.count - 3} more
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
}