"use client";

import dynamic from "next/dynamic";

const CityMap = dynamic(() => import("@/components/map/CityMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ background: "rgba(245,237,216,0.60)" }}
    >
      <div className="text-center">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
          style={{ borderColor: "rgba(37,99,235,0.40)", borderTopColor: "transparent" }}
        />
        <p className="text-[13px]" style={{ color: "rgba(15,23,42,0.48)" }}>Loading city mapâ€¦</p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  return <CityMap />;
}

