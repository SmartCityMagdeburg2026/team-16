export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#0F172A" }}>{title}</h1>
        {subtitle && (
          <p className="mt-1.5 text-[14px]" style={{ color: "rgba(15,23,42,0.54)" }}>{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

