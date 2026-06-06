"use client";

import { useState, useEffect } from "react";
import {
  MapContainer, TileLayer, CircleMarker, Marker,
  GeoJSON, Popup, useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Users, Drop, Buildings, Leaf, Lightning,
  GraduationCap, Train, MapPin,
} from "@phosphor-icons/react";

// ── District stats (matches Stadtteile.geojson names exactly) ───────────────

const DISTRICTS = [
  { id: "altstadt",   name: "Altstadt",       lat: 52.1295, lng: 11.6373, pop: 12400, aqi: 38, rent: 750, green: 12, density: 2850 },
  { id: "stfdw",      name: "Stadtfeld West",  lat: 52.1268, lng: 11.5943, pop: 18200, aqi: 28, rent: 720, green: 35, density: 3100 },
  { id: "stfdo",      name: "Stadtfeld Ost",   lat: 52.1248, lng: 11.6143, pop: 16800, aqi: 31, rent: 695, green: 22, density: 2950 },
  { id: "sudenburg",  name: "Sudenburg",       lat: 52.1058, lng: 11.6198, pop: 17600, aqi: 35, rent: 680, green: 28, density: 2740 },
  { id: "buckau",     name: "Buckau",          lat: 52.1018, lng: 11.6468, pop: 6800,  aqi: 42, rent: 710, green: 38, density: 1820 },
  { id: "neunst",     name: "Neue Neustadt",   lat: 52.1478, lng: 11.6408, pop: 14500, aqi: 30, rent: 660, green: 20, density: 2600 },
  { id: "herrenkrug", name: "Herrenkrug",      lat: 52.1318, lng: 11.6848, pop: 3100,  aqi: 18, rent: 780, green: 82, density: 420  },
  { id: "cracau",     name: "Cracau",          lat: 52.1148, lng: 11.6748, pop: 8200,  aqi: 25, rent: 695, green: 55, density: 1050 },
  { id: "reform",     name: "Reform",          lat: 52.1548, lng: 11.5858, pop: 9800,  aqi: 26, rent: 705, green: 42, density: 1340 },
  { id: "lemsdorf",   name: "Lemsdorf",        lat: 52.0878, lng: 11.6528, pop: 5600,  aqi: 22, rent: 640, green: 48, density: 980  },
  { id: "diesdorf",   name: "Diesdorf",        lat: 52.1138, lng: 11.5718, pop: 7400,  aqi: 24, rent: 650, green: 50, density: 1120 },
  { id: "altnst",     name: "Alte Neustadt",   lat: 52.1558, lng: 11.6228, pop: 9600,  aqi: 33, rent: 670, green: 18, density: 2150 },
];

// ── Manual POIs ──────────────────────────────────────────────────────────────

const POIS = [
  { name: "Magdeburg Dom",        lat: 52.1273, lng: 11.6392, type: "landmark",  color: "#2563EB", desc: "Germany's oldest Gothic cathedral · built 1209–1520"        },
  { name: "Grüne Zitadelle", lat: 52.1262, lng: 11.6338, type: "art",       color: "#10B981", desc: "Hundertwasser's last masterpiece · completed 2005"              },
  { name: "OVGU University",       lat: 52.1388, lng: 11.6018, type: "education", color: "#2563EB", desc: "Otto von Guericke University · 14,500 students"                },
  { name: "Hauptbahnhof",          lat: 52.1305, lng: 11.6268, type: "transport", color: "#06B6D4", desc: "Central station · Berlin 60 min · Halle 30 min"           },
  { name: "Elbauenpark",           lat: 52.1118, lng: 11.6058, type: "park",      color: "#10B981", desc: "100-hectare park built for the 1999 Bundesgartenschau"              },
  { name: "University Hospital",   lat: 52.1328, lng: 11.6128, type: "health",    color: "#EF4444", desc: "UKM · Largest employer · ~7,500 staff"                     },
  { name: "Alter Markt",           lat: 52.1280, lng: 11.6345, type: "landmark",  color: "#2563EB", desc: "City's main market square · Otto von Guericke statue"          },
  { name: "Herrenkrug Park",       lat: 52.1368, lng: 11.6838, type: "park",      color: "#059669", desc: "200-hectare meadow forest along the Elbe"                          },
  { name: "MVB Tram Hub",          lat: 52.1310, lng: 11.6270, type: "transport", color: "#06B6D4", desc: "MVB · 12 tram lines since 1877"                               },
  { name: "Inland Port",           lat: 52.1080, lng: 11.6550, type: "economy",   color: "#F59E0B", desc: "Germany's 3rd-largest inland port by cargo tonnage"                },
];

// ── Metrics ──────────────────────────────────────────────────────────────────

const METRICS = [
  {
    key: "pop",     label: "Population",    unit: "residents",
    low: 3000,  high: 20000,
    colorLow: [245,237,216], colorHigh: [13,148,136],
    format: v => v.toLocaleString(),
    insight: "Stadtfeld West is the most populous district (~18,200). Herrenkrug is the least dense at 3,100 — mostly parkland.",
  },
  {
    key: "aqi",     label: "Air Quality",   unit: "AQI",
    low: 15,    high: 45,
    colorLow: [5,150,105],   colorHigh: [234,88,12],
    invert: true,
    format: v => `AQI ${v}`,
    insight: "Herrenkrug has the cleanest air (AQI 18) thanks to vast forest cover. Buckau's industrial heritage still shows at AQI 42.",
  },
  {
    key: "rent",    label: "Avg Rent",      unit: "€/mo",
    low: 620,   high: 800,
    colorLow: [239,246,255], colorHigh: [37,99,235],
    format: v => `€${v}/mo`,
    insight: "Herrenkrug commands the highest rents (€780/mo). Lemsdorf is the most affordable at €640/mo.",
  },
  {
    key: "green",   label: "Green Space",   unit: "% area",
    low: 10,    high: 85,
    colorLow: [245,237,216], colorHigh: [5,150,105],
    format: v => `${v}%`,
    insight: "Herrenkrug leads with 82% green coverage. Altstadt has just 12% as the dense historic urban core.",
  },
  {
    key: "density", label: "Pop. Density",  unit: "per km²",
    low: 400,   high: 3200,
    colorLow: [245,237,216], colorHigh: [8,145,178],
    format: v => `${v}/km²`,
    insight: "Stadtfeld West is the most densely settled district. Herrenkrug at 420/km² is largely nature reserve and parkland.",
  },
];

// ── Color helpers ────────────────────────────────────────────────────────────

function lerpColor(low, high, t) {
  return `rgb(${Math.round(low[0] + (high[0]-low[0])*t)},${Math.round(low[1] + (high[1]-low[1])*t)},${Math.round(low[2] + (high[2]-low[2])*t)})`;
}
function getColor(metric, value) {
  const t = Math.max(0, Math.min(1, (value - metric.low) / (metric.high - metric.low)));
  return lerpColor(metric.colorLow, metric.colorHigh, metric.invert ? 1-t : t);
}
function getRawT(metric, value) {
  const t = Math.max(0, Math.min(1, (value - metric.low) / (metric.high - metric.low)));
  return metric.invert ? 1-t : t;
}

// ── Icon factories using HTML entities (encoding-safe) ───────────────────────

const TYPE_SYMBOLS = {
  landmark:  "&#9962;",    // ⛪
  art:       "&#127912;",  // 🎨
  education: "&#127891;",  // 🎓
  transport: "&#128651;",  // 🚋
  park:      "&#127795;",  // 🌳
  health:    "&#127973;",  // 🏥
  economy:   "&#128674;",  // 🚢
};

function makePOIIcon(color, type) {
  const sym = TYPE_SYMBOLS[type] || "&#128205;";
  return L.divIcon({
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -17],
    html: `<div style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.96);border:2px solid ${color};box-shadow:0 2px 8px rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;">${sym}</div>`,
  });
}

function makeCafeIcon() {
  return L.divIcon({
    className: "",
    iconSize: [26, 26],
    iconAnchor: [13, 13],
    popupAnchor: [0, -14],
    html: `<div style="width:26px;height:26px;border-radius:50%;background:#FEF3C7;border:2px solid #F59E0B;box-shadow:0 1px 5px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;font-size:11px;line-height:1;">&#9749;</div>`,
  });
}

// ── Fit-bounds helper ────────────────────────────────────────────────────────

function FitBounds() {
  const map = useMap();
  useEffect(() => { map.setView([52.1205, 11.6276], 12); }, [map]);
  return null;
}

// ── Accident severity color ──────────────────────────────────────────────────

function accColor(cat) {
  if (cat === 1) return "#DC2626";
  if (cat === 2) return "#F59E0B";
  return "#6366F1";
}

// ── Main component ───────────────────────────────────────────────────────────

export default function CityMap() {
  const [activeMKey, setActiveMKey] = useState("pop");
  const [selected, setSelected]     = useState(null);
  const [layers, setLayers]         = useState({ pois: true, cafes: false, accidents: false, trees: false });

  const [districtGeo, setDistrictGeo]     = useState(null);
  const [cafeFeatures, setCafeFeatures]   = useState([]);
  const [accFeatures,  setAccFeatures]    = useState([]);
  const [treeFeatures, setTreeFeatures]   = useState([]);

  const metric = METRICS.find(m => m.key === activeMKey);

  // Load district boundaries on mount
  useEffect(() => {
    fetch("/data/Stadtteile.geojson").then(r => r.json()).then(setDistrictGeo).catch(() => {});
  }, []);

  // Lazy-load café layer
  useEffect(() => {
    if (layers.cafes && cafeFeatures.length === 0)
      fetch("/data/CafesOSM.geojson").then(r => r.json())
        .then(d => setCafeFeatures(d.features.filter(f => f.geometry)))
        .catch(() => {});
  }, [layers.cafes]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lazy-load accident layer
  useEffect(() => {
    if (layers.accidents && accFeatures.length === 0)
      fetch("/data/Unfaelle.geojson").then(r => r.json())
        .then(d => setAccFeatures(
          d.features
            .filter(f => f.properties.lat && f.properties.lon)
            .slice(0, 1500)
        ))
        .catch(() => {});
  }, [layers.accidents]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lazy-load street-tree layer (sample every 25th ~ 3400 points)
  useEffect(() => {
    if (layers.trees && treeFeatures.length === 0)
      fetch("/data/Baumkataster.geojson").then(r => r.json())
        .then(d => setTreeFeatures(d.features.filter((_, i) => i % 25 === 0)))
        .catch(() => {});
  }, [layers.trees]); // eslint-disable-line react-hooks/exhaustive-deps

  // GeoJSON boundary style (remounts when metric key changes via key prop)
  function districtStyle(feature) {
    const d = DISTRICTS.find(d => d.name === feature.properties.name);
    if (!d) return { fillColor: "rgba(148,163,184,0.06)", fillOpacity: 0.12, color: "rgba(255,255,255,0.55)", weight: 1 };
    return {
      fillColor: getColor(metric, d[activeMKey]),
      fillOpacity: 0.38,
      color: "rgba(255,255,255,0.80)",
      weight: 1.5,
    };
  }

  function onEachDistrict(feature, layer) {
    const d = DISTRICTS.find(d => d.name === feature.properties.name);
    if (d) layer.on({ click: () => setSelected(d) });
  }

  function toggleLayer(key) {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const LAYER_CONFIG = [
    { key: "pois",      label: "Landmarks",        count: `${POIS.length} sites`,    color: "#2563EB" },
    { key: "cafes",     label: "Cafés",        count: cafeFeatures.length > 0 ? `${cafeFeatures.length} spots` : "OSM data", color: "#F59E0B" },
    { key: "accidents", label: "Accident spots",   count: accFeatures.length > 0 ? `${accFeatures.length} records` : "2020–2023", color: "#EF4444" },
    { key: "trees",     label: "Street trees",     count: treeFeatures.length > 0 ? `${treeFeatures.length * 25}+ trees` : "Baumkataster", color: "#10B981" },
  ];

  return (
    <div className="flex h-full overflow-hidden" style={{ background: "#F8FAFC" }}>

      {/* ── Left panel ──────────────────────────────────────────────────── */}
      <div
        className="w-72 shrink-0 flex flex-col overflow-y-auto border-r"
        style={{ background: "rgba(237,224,200,0.97)", borderColor: "rgba(148,163,184,0.20)" }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={14} weight="fill" style={{ color: "#2563EB" }} />
            <p className="text-[13px] font-bold" style={{ color: "#0F172A" }}>City Intelligence Map</p>
          </div>
          <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.48)" }}>
            Magdeburg &middot; 40 districts &middot; real boundaries
          </p>
        </div>

        {/* Metric selector */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(15,23,42,0.40)" }}>
            Data layer
          </p>
          <div className="space-y-1.5">
            {METRICS.map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMKey(m.key)}
                className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-all duration-150"
                style={{
                  background: activeMKey === m.key ? "rgba(37,99,235,0.15)" : "rgba(15,23,42,0.04)",
                  border: `1px solid ${activeMKey === m.key ? "rgba(37,99,235,0.35)" : "rgba(148,163,184,0.16)"}`,
                }}
              >
                <div className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: activeMKey === m.key ? "#2563EB" : "rgba(15,23,42,0.20)" }} />
                <div>
                  <p className="text-[12.5px] font-semibold"
                    style={{ color: activeMKey === m.key ? "#2563EB" : "rgba(15,23,42,0.70)" }}>
                    {m.label}
                  </p>
                  <p className="text-[10px]" style={{ color: "rgba(15,23,42,0.40)" }}>{m.unit}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Layer toggles */}
        <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(15,23,42,0.40)" }}>
            Map layers
          </p>
          <div className="space-y-1.5">
            {LAYER_CONFIG.map(({ key, label, count, color }) => {
              const on = layers[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleLayer(key)}
                  className="w-full flex items-center justify-between rounded-xl px-3.5 py-2 transition-all"
                  style={{
                    background: on ? `${color}18` : "rgba(15,23,42,0.04)",
                    border: `1px solid ${on ? `${color}40` : "rgba(148,163,184,0.16)"}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: on ? color : "rgba(15,23,42,0.18)" }} />
                    <div className="text-left">
                      <p className="text-[12px] font-semibold leading-tight" style={{ color: on ? color : "rgba(15,23,42,0.58)" }}>
                        {label}
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(15,23,42,0.36)" }}>{count}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: on ? color : "rgba(15,23,42,0.08)", color: on ? "#fff" : "rgba(15,23,42,0.48)" }}>
                    {on ? "ON" : "OFF"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected district panel */}
        <div className="px-4 py-4 flex-1">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] font-bold" style={{ color: "#0F172A" }}>{selected.name}</p>
                <button onClick={() => setSelected(null)}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(15,23,42,0.06)", color: "rgba(15,23,42,0.54)" }}>
                  &times; Close
                </button>
              </div>
              <div className="space-y-2">
                {METRICS.map(m => {
                  const val = selected[m.key];
                  const t = getRawT(m, val);
                  return (
                    <div key={m.key} className="rounded-xl p-3"
                      style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(148,163,184,0.18)" }}>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[11px]" style={{ color: "rgba(15,23,42,0.54)" }}>{m.label}</p>
                        <p className="text-[13px] font-bold" style={{ color: getColor(m, val) }}>{m.format(val)}</p>
                      </div>
                      <div className="rounded-full overflow-hidden" style={{ background: "rgba(148,163,184,0.14)", height: 4 }}>
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${t * 100}%`, background: getColor(m, val) }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <MapPin size={28} style={{ color: "rgba(15,23,42,0.20)", margin: "0 auto 10px" }} />
              <p className="text-[12px]" style={{ color: "rgba(15,23,42,0.40)" }}>
                Click a district on the map to see its stats
              </p>
            </div>
          )}
        </div>

        {/* Insight */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(148,163,184,0.16)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(15,23,42,0.36)" }}>Insight</p>
          <p className="text-[11.5px] leading-relaxed" style={{ color: "rgba(15,23,42,0.60)" }}>{metric.insight}</p>
        </div>
      </div>

      {/* ── Map area ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Legend strip */}
        <div className="flex items-center gap-4 px-5 py-2.5 border-b shrink-0 flex-wrap"
          style={{ background: "rgba(255,255,255,0.95)", borderColor: "rgba(148,163,184,0.16)" }}>
          <p className="text-[11px] font-semibold" style={{ color: "rgba(15,23,42,0.60)" }}>
            {metric.label} legend:
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]" style={{ color: "rgba(15,23,42,0.48)" }}>
              {metric.invert ? "Best" : "Low"}
            </span>
            <div className="w-24 h-3 rounded-full"
              style={{ background: `linear-gradient(to right, rgb(${metric.colorLow.join(",")}), rgb(${metric.colorHigh.join(",")}))` }} />
            <span className="text-[10px]" style={{ color: "rgba(15,23,42,0.48)" }}>
              {metric.invert ? "Worst" : "High"}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-[10px] flex-wrap" style={{ color: "rgba(15,23,42,0.42)" }}>
            <span>&#9632; District boundary (click to inspect)</span>
            {layers.cafes      && <span>&#9749; Caf&eacute;</span>}
            {layers.accidents  && <span style={{ color: "#EF4444" }}>&#9679; Accident</span>}
            {layers.trees      && <span style={{ color: "#10B981" }}>&#9679; Tree</span>}
            {layers.pois       && <span>&#9679; Landmark</span>}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            center={[52.1205, 11.6276]}
            zoom={12}
            style={{ width: "100%", height: "100%" }}
            zoomControl
            attributionControl
          >
            <FitBounds />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              subdomains="abcd"
              maxZoom={19}
            />

            {/* Real district boundaries from Stadtteile.geojson */}
            {districtGeo && (
              <GeoJSON
                key={activeMKey}
                data={districtGeo}
                style={districtStyle}
                onEachFeature={onEachDistrict}
              />
            )}

            {/* Small center dots for districts with stats */}
            {DISTRICTS.map(d => {
              const val   = d[activeMKey];
              const color = getColor(metric, val);
              return (
                <CircleMarker
                  key={d.id}
                  center={[d.lat, d.lng]}
                  radius={6}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.95,
                    color: "white",
                    weight: 1.5,
                  }}
                  eventHandlers={{ click: () => setSelected(d) }}
                >
                  <Popup>
                    <div style={{ minWidth: 180 }}>
                      <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{d.name}</p>
                      <table style={{ fontSize: 11, width: "100%", borderCollapse: "collapse" }}>
                        <tbody>
                          {METRICS.map(m => (
                            <tr key={m.key}>
                              <td style={{ color: "#888", paddingRight: 8, paddingBottom: 3 }}>{m.label}</td>
                              <td style={{ fontWeight: 600 }}>{m.format(d[m.key])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* Manual landmark POIs */}
            {layers.pois && POIS.map(poi => (
              <Marker
                key={poi.name}
                position={[poi.lat, poi.lng]}
                icon={makePOIIcon(poi.color, poi.type)}
              >
                <Popup>
                  <div style={{ minWidth: 180 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{poi.name}</p>
                    <p style={{ fontSize: 11, color: "#666" }}>{poi.desc}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Real café data from CafesOSM.geojson */}
            {layers.cafes && cafeFeatures.map((f, i) => {
              const [lng, lat] = f.geometry.coordinates;
              return (
                <Marker key={`cafe-${i}`} position={[lat, lng]} icon={makeCafeIcon()}>
                  <Popup>
                    <div style={{ minWidth: 170 }}>
                      <p style={{ fontWeight: 700, fontSize: 12, marginBottom: 3 }}>{f.properties.name}</p>
                      {f.properties.street && (
                        <p style={{ fontSize: 11, color: "#555" }}>
                          {f.properties.street}{f.properties.hnr ? ` ${f.properties.hnr}` : ""}
                        </p>
                      )}
                      {f.properties.opening_hours && (
                        <p style={{ fontSize: 10, color: "#888", marginTop: 3 }}>{f.properties.opening_hours}</p>
                      )}
                      {f.properties.website && (
                        <p style={{ fontSize: 10, marginTop: 3 }}>
                          <a href={f.properties.website} target="_blank" rel="noreferrer" style={{ color: "#2563EB" }}>
                            Website
                          </a>
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Traffic accident data — circle markers by severity */}
            {layers.accidents && accFeatures.map((f, i) => {
              const { lat, lon, UKATEGORIE, UJAHR, UMONAT, IstRad, IstPKW, IstFuss } = f.properties;
              return (
                <CircleMarker
                  key={`acc-${i}`}
                  center={[lat, lon]}
                  radius={UKATEGORIE === 1 ? 6 : UKATEGORIE === 2 ? 4.5 : 3}
                  pathOptions={{
                    fillColor: accColor(UKATEGORIE),
                    fillOpacity: UKATEGORIE === 3 ? 0.45 : 0.72,
                    color: "none",
                    weight: 0,
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: 160 }}>
                      <p style={{ fontWeight: 700, fontSize: 12, marginBottom: 3 }}>
                        Accident &mdash; {UJAHR}/{UMONAT}
                      </p>
                      <p style={{ fontSize: 11, color: accColor(UKATEGORIE), fontWeight: 600 }}>
                        {UKATEGORIE === 1 ? "Fatal" : UKATEGORIE === 2 ? "Serious injury" : "Light injury"}
                      </p>
                      <p style={{ fontSize: 10, color: "#666", marginTop: 3 }}>
                        {[IstRad && "Cyclist", IstPKW && "Car", IstFuss && "Pedestrian"].filter(Boolean).join(" + ") || "Unknown vehicles"}
                      </p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

            {/* Street tree data from Baumkataster.geojson */}
            {layers.trees && treeFeatures.map((f, i) => {
              const [lng, lat] = f.geometry.coordinates;
              const { Gattungsgruppe, Gattung, Baumhöhe, Pflanzjahr, Stadtteil } = f.properties;
              return (
                <CircleMarker
                  key={`tree-${i}`}
                  center={[lat, lng]}
                  radius={2.5}
                  pathOptions={{ fillColor: "#059669", fillOpacity: 0.60, color: "none", weight: 0 }}
                >
                  <Popup>
                    <div style={{ minWidth: 160 }}>
                      <p style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{Gattungsgruppe}</p>
                      <p style={{ fontSize: 10, color: "#555", marginBottom: 3 }}>{Gattung}</p>
                      <table style={{ fontSize: 10, borderCollapse: "collapse" }}>
                        <tbody>
                          {Baumhöhe && <tr><td style={{ color: "#888", paddingRight: 6 }}>Height</td><td>{Baumhöhe} m</td></tr>}
                          {Pflanzjahr > 0 && <tr><td style={{ color: "#888", paddingRight: 6 }}>Planted</td><td>{Pflanzjahr}</td></tr>}
                          {Stadtteil && <tr><td style={{ color: "#888", paddingRight: 6 }}>District</td><td>{Stadtteil}</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

          </MapContainer>
        </div>

        {/* Bottom stats strip */}
        <div className="flex items-center gap-0 shrink-0 border-t overflow-x-auto"
          style={{ background: "rgba(255,255,255,0.95)", borderColor: "rgba(148,163,184,0.16)" }}>
          {[
            { label: "City Population",  value: "237,765",    icon: Users,         color: "#10B981" },
            { label: "Avg City Rent",     value: "€700/mo", icon: Buildings,    color: "#F59E0B" },
            { label: "Avg City AQI",      value: "AQI 29",     icon: Drop,          color: "#10B981" },
            { label: "Green Space",       value: "~50%",       icon: Leaf,          color: "#10B981" },
            { label: "Tram Lines",        value: "12 lines",   icon: Train,         color: "#06B6D4" },
            { label: "University",        value: "14,500 stu", icon: GraduationCap, color: "#2563EB" },
            { label: "Street Trees",      value: "~85,000",    icon: Leaf,          color: "#059669" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2.5 border-r shrink-0"
              style={{ borderColor: "rgba(148,163,184,0.16)" }}>
              <s.icon size={13} weight="fill" style={{ color: s.color, flexShrink: 0 }} />
              <div>
                <p className="text-[11px] font-bold" style={{ color: "#0F172A" }}>{s.value}</p>
                <p className="text-[9px]" style={{ color: "rgba(15,23,42,0.44)" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
