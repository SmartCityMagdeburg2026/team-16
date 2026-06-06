
// â”€â”€â”€ Overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const cityHealthScore = 84;

export const kpis = [
  { id: "pop",  label: "Population",       value: "1.89M", raw: 1890000, unit: "",    change: +1.2, changeType: "up",   color: "#3b82f6", sparkData: [1.72,1.74,1.77,1.79,1.80,1.83,1.86,1.89] },
  { id: "gdp",  label: "GDP Growth",        value: "3.4%",  raw: 3.4,    unit: "%",   change: +0.8, changeType: "up",   color: "#3B82F6", sparkData: [1.8,2.1,1.9,2.4,2.8,3.0,2.6,3.4] },
  { id: "emp",  label: "Employment Rate",   value: "97.2%", raw: 97.2,   unit: "%",   change: +0.3, changeType: "up",   color: "#10b981", sparkData: [95.1,95.4,95.9,96.2,96.5,96.8,97.0,97.2] },
  { id: "sus",  label: "Sustainability",    value: "72/100",raw: 72,     unit: "pts", change: +5,   changeType: "up",   color: "#f59e0b", sparkData: [55,58,60,62,63,66,68,72] },
];

export const trendingInsights = [
  { title: "Construction Permits Surge",     body: "New building permits rose 23% in Q3 2024, driven by residential expansion in the northern districts.", category: "Housing",     badge: "#f59e0b" },
  { title: "Transit Ridership Record High",  body: "Public transport carried 2.3M monthly riders in October â€” the highest figure since tracking began.", category: "Mobility",    badge: "#22d3ee" },
  { title: "COâ‚‚ Emissions Down 12%",         body: "Year-over-year greenhouse gas emissions fell 12%, accelerated by solar capacity expansion.", category: "Environment", badge: "#10b981" },
];

export const recentActivity = [
  { date: "Dec 2024", event: "Population census dataset updated",          category: "People"      },
  { date: "Nov 2024", event: "Q3 housing construction report published",   category: "Housing"     },
  { date: "Nov 2024", event: "Annual air quality index refreshed",         category: "Environment" },
  { date: "Oct 2024", event: "Employment statistics Q3 2024 released",     category: "Economy"     },
  { date: "Oct 2024", event: "School enrollment data updated",             category: "Education"   },
];

export const featuredDatasets = [
  { slug: "population-trend",   label: "Population Trend 2000â€“2024",  category: "People",      rows: 24, lastUpdated: "Dec 2024" },
  { slug: "housing-stock",      label: "Housing Stock by Type",        category: "Housing",     rows: 8,  lastUpdated: "Nov 2024" },
  { slug: "air-quality-annual", label: "Annual Air Quality Index",     category: "Environment", rows: 15, lastUpdated: "Nov 2024" },
  { slug: "employment-rate",    label: "Employment Rate 2010â€“2024",    category: "Economy",     rows: 14, lastUpdated: "Oct 2024" },
];

// â”€â”€â”€ People â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const populationHistory = [
  { year: "2010", total: 1620000, male: 788000, female: 832000 },
  { year: "2011", total: 1645000, male: 802000, female: 843000 },
  { year: "2012", total: 1668000, male: 812000, female: 856000 },
  { year: "2013", total: 1695000, male: 826000, female: 869000 },
  { year: "2014", total: 1720000, male: 838000, female: 882000 },
  { year: "2015", total: 1748000, male: 852000, female: 896000 },
  { year: "2016", total: 1769000, male: 862000, female: 907000 },
  { year: "2017", total: 1792000, male: 873000, female: 919000 },
  { year: "2018", total: 1810000, male: 882000, female: 928000 },
  { year: "2019", total: 1834000, male: 895000, female: 939000 },
  { year: "2020", total: 1840000, male: 898000, female: 942000 },
  { year: "2021", total: 1851000, male: 903000, female: 948000 },
  { year: "2022", total: 1865000, male: 910000, female: 955000 },
  { year: "2023", total: 1878000, male: 917000, female: 961000 },
  { year: "2024", total: 1890000, male: 923000, female: 967000 },
];

export const ageGroups = [
  { group: "0â€“14",  value: 15.2, color: "#2563EB" },
  { group: "15â€“24", value: 11.4, color: "#3B82F6" },
  { group: "25â€“44", value: 28.7, color: "#06B6D4" },
  { group: "45â€“64", value: 26.3, color: "#10B981" },
  { group: "65â€“79", value: 13.8, color: "#10B981" },
  { group: "80+",   value: 4.6,  color: "#2563EB" },
];

export const migrationData = [
  { year: "2018", arrivals: 42000, departures: 31000 },
  { year: "2019", arrivals: 45000, departures: 33000 },
  { year: "2020", arrivals: 28000, departures: 24000 },
  { year: "2021", arrivals: 35000, departures: 27000 },
  { year: "2022", arrivals: 48000, departures: 32000 },
  { year: "2023", arrivals: 51000, departures: 35000 },
  { year: "2024", arrivals: 54000, departures: 36000 },
];

// â”€â”€â”€ Housing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const housingByType = [
  { name: "Apartments",     value: 58.4, color: "#f59e0b" },
  { name: "Single-family",  value: 22.1, color: "#f97316" },
  { name: "Semi-detached",  value: 11.3, color: "#fb923c" },
  { name: "Social housing", value: 5.8,  color: "#fbbf24" },
  { name: "Other",          value: 2.4,  color: "#fde68a" },
];

export const constructionActivity = [
  { year: "2018", permits: 3200, completions: 2800 },
  { year: "2019", permits: 3500, completions: 3100 },
  { year: "2020", permits: 2800, completions: 2600 },
  { year: "2021", permits: 3100, completions: 2900 },
  { year: "2022", permits: 3800, completions: 3400 },
  { year: "2023", permits: 4100, completions: 3700 },
  { year: "2024", permits: 5050, completions: 4200 },
];

export const rentTrend = [
  { year: "2016", avgRent: 820 },
  { year: "2017", avgRent: 855 },
  { year: "2018", avgRent: 892 },
  { year: "2019", avgRent: 934 },
  { year: "2020", avgRent: 948 },
  { year: "2021", avgRent: 978 },
  { year: "2022", avgRent: 1040 },
  { year: "2023", avgRent: 1115 },
  { year: "2024", avgRent: 1192 },
];

// â”€â”€â”€ Mobility â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const transitRidership = [
  { month: "Jan", riders: 1920000 }, { month: "Feb", riders: 1840000 },
  { month: "Mar", riders: 2100000 }, { month: "Apr", riders: 2230000 },
  { month: "May", riders: 2290000 }, { month: "Jun", riders: 2180000 },
  { month: "Jul", riders: 1980000 }, { month: "Aug", riders: 2050000 },
  { month: "Sep", riders: 2310000 }, { month: "Oct", riders: 2350000 },
  { month: "Nov", riders: 2240000 }, { month: "Dec", riders: 2060000 },
];

export const modalSplit = [
  { name: "Public Transit", value: 38, color: "#22d3ee" },
  { name: "Private Car",    value: 34, color: "#3b82f6" },
  { name: "Walking",        value: 17, color: "#10b981" },
  { name: "Cycling",        value: 9,  color: "#10B981" },
  { name: "Other",          value: 2,  color: "#6b7280" },
];

export const congestionIndex = [
  { hour: "00:00", index: 8 },  { hour: "03:00", index: 5 },
  { hour: "06:00", index: 28 }, { hour: "07:00", index: 72 },
  { hour: "08:00", index: 88 }, { hour: "09:00", index: 65 },
  { hour: "12:00", index: 52 }, { hour: "15:00", index: 58 },
  { hour: "17:00", index: 91 }, { hour: "18:00", index: 84 },
  { hour: "19:00", index: 60 }, { hour: "21:00", index: 28 },
  { hour: "23:00", index: 12 },
];

// â”€â”€â”€ Environment â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const co2Emissions = [
  { year: "2015", tons: 3800000 }, { year: "2016", tons: 3720000 },
  { year: "2017", tons: 3650000 }, { year: "2018", tons: 3580000 },
  { year: "2019", tons: 3490000 }, { year: "2020", tons: 3180000 },
  { year: "2021", tons: 3250000 }, { year: "2022", tons: 3120000 },
  { year: "2023", tons: 2960000 }, { year: "2024", tons: 2630000 },
];

export const energyMix = [
  { name: "Solar",    value: 28, color: "#f59e0b" },
  { name: "Wind",     value: 22, color: "#22d3ee" },
  { name: "Hydro",    value: 14, color: "#3b82f6" },
  { name: "Gas",      value: 24, color: "#f97316" },
  { name: "Coal",     value: 8,  color: "#6b7280" },
  { name: "Nuclear",  value: 4,  color: "#475569" },
];

export const airQualityHistory = [
  { month: "Jan", aqi: 42 }, { month: "Feb", aqi: 45 }, { month: "Mar", aqi: 38 },
  { month: "Apr", aqi: 32 }, { month: "May", aqi: 28 }, { month: "Jun", aqi: 25 },
  { month: "Jul", aqi: 22 }, { month: "Aug", aqi: 24 }, { month: "Sep", aqi: 29 },
  { month: "Oct", aqi: 36 }, { month: "Nov", aqi: 44 }, { month: "Dec", aqi: 48 },
];

export const wasteByType = [
  { type: "Organic Waste",       tons: 95000,  color: "#22c55e" },
  { type: "Paper & Cardboard",   tons: 72000,  color: "#3b82f6" },
  { type: "Plastic",             tons: 58000,  color: "#f97316" },
  { type: "Glass",               tons: 42000,  color: "#06b6d4" },
  { type: "Metal",               tons: 28000,  color: "#64748b" },
  { type: "Electronic Waste",    tons: 12000,  color: "#8b5cf6" },
  { type: "Construction Waste",  tons: 105000, color: "#a16207" },
  { type: "Hazardous Waste",     tons: 8000,   color: "#ef4444" },
];

export const wasteSortingBins = [
  {
    binColor: "Brown",
    binName: "Organic Waste",
    icon: "ðŸŒ±",
    examples: ["Food scraps", "Fruit peels", "Coffee grounds", "Garden waste", "Leaves"],
    avoid: ["Plastic", "Glass", "Metal"],
  },
  {
    binColor: "Blue",
    binName: "Paper & Cardboard",
    icon: "ðŸ“„",
    examples: ["Newspapers", "Magazines", "Cardboard boxes", "Office paper"],
    avoid: ["Food-stained paper", "Plastic-coated paper"],
  },
  {
    binColor: "Yellow",
    binName: "Packaging & Plastics",
    icon: "â™»ï¸",
    examples: ["Plastic bottles", "Yogurt cups", "Food packaging", "Metal cans", "Aluminum foil"],
    avoid: ["Electronic waste", "Organic waste"],
  },
  {
    binColor: "Green",
    binName: "Glass",
    icon: "ðŸ¾",
    examples: ["Glass bottles", "Glass jars"],
    avoid: ["Ceramics", "Mirrors", "Light bulbs"],
  },
  {
    binColor: "Black",
    binName: "Residual Waste",
    icon: "ðŸ—‘ï¸",
    examples: ["Dirty tissues", "Ceramics", "Vacuum cleaner bags", "Broken toys"],
    avoid: ["Recyclables", "Hazardous waste"],
  },
  {
    binColor: "Red",
    binName: "Hazardous Waste",
    icon: "âš ï¸",
    examples: ["Batteries", "Paint", "Chemicals", "Medicine"],
    avoid: ["Household waste"],
  },
];

// â”€â”€â”€ Economy â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const employmentHistory = [
  { year: "2016", rate: 93.4 }, { year: "2017", rate: 94.1 },
  { year: "2018", rate: 94.8 }, { year: "2019", rate: 95.6 },
  { year: "2020", rate: 92.3 }, { year: "2021", rate: 93.8 },
  { year: "2022", rate: 95.2 }, { year: "2023", rate: 96.5 },
  { year: "2024", rate: 97.2 },
];

export const gdpGrowthHistory = [
  { year: "2016", growth: 1.8 }, { year: "2017", growth: 2.4 },
  { year: "2018", growth: 2.1 }, { year: "2019", growth: 1.9 },
  { year: "2020", growth: -3.2 }, { year: "2021", growth: 4.8 },
  { year: "2022", growth: 3.1 }, { year: "2023", growth: 2.7 },
  { year: "2024", growth: 3.4 },
];

export const businessActivity = [
  { year: "2019", registered: 4200, closed: 2800 },
  { year: "2020", registered: 3100, closed: 3400 },
  { year: "2021", registered: 4800, closed: 2600 },
  { year: "2022", registered: 5200, closed: 2900 },
  { year: "2023", registered: 5600, closed: 3100 },
  { year: "2024", registered: 6100, closed: 3200 },
];

// â”€â”€â”€ Education â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const enrollmentTrends = [
  { year: "2018", primary: 142000, secondary: 98000, tertiary: 62000 },
  { year: "2019", primary: 145000, secondary: 100000, tertiary: 65000 },
  { year: "2020", primary: 143000, secondary: 102000, tertiary: 67000 },
  { year: "2021", primary: 148000, secondary: 104000, tertiary: 70000 },
  { year: "2022", primary: 151000, secondary: 106000, tertiary: 73000 },
  { year: "2023", primary: 154000, secondary: 108000, tertiary: 76000 },
  { year: "2024", primary: 157000, secondary: 110000, tertiary: 79000 },
];

export const educationAttainment = [
  { level: "No formal education", value: 2.1,  color: "#9CA3AF" },
  { level: "Primary",            value: 8.4,  color: "#06B6D4" },
  { level: "Secondary",          value: 31.2, color: "#10B981" },
  { level: "Vocational",         value: 22.5, color: "#2563EB" },
  { level: "Bachelor's",         value: 24.6, color: "#3B82F6" },
  { level: "Master's+",          value: 11.2, color: "#2563EB" },
];

// â”€â”€â”€ Trends (multi-year compare) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const cityEvolution = [
  { year: 2015, population: 1748000, employment: 93.2, co2: 3800000, transit: 1620000, housing: 3100, education: 88 },
  { year: 2016, population: 1769000, employment: 93.4, co2: 3720000, transit: 1720000, housing: 3300, education: 89 },
  { year: 2017, population: 1792000, employment: 94.1, co2: 3650000, transit: 1840000, housing: 3500, education: 90 },
  { year: 2018, population: 1810000, employment: 94.8, co2: 3580000, transit: 1960000, housing: 3700, education: 91 },
  { year: 2019, population: 1834000, employment: 95.6, co2: 3490000, transit: 2100000, housing: 3900, education: 92 },
  { year: 2020, population: 1840000, employment: 92.3, co2: 3180000, transit: 1400000, housing: 3400, education: 88 },
  { year: 2021, population: 1851000, employment: 93.8, co2: 3250000, transit: 1750000, housing: 3600, education: 90 },
  { year: 2022, population: 1865000, employment: 95.2, co2: 3120000, transit: 2050000, housing: 4100, education: 92 },
  { year: 2023, population: 1878000, employment: 96.5, co2: 2960000, transit: 2210000, housing: 4400, education: 93 },
  { year: 2024, population: 1890000, employment: 97.2, co2: 2630000, transit: 2350000, housing: 5050, education: 95 },
];

// â”€â”€â”€ Explorer: dataset catalogue â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const allDatasets = [
  { id: 1, title: "Population by District 2024",         category: "People",      subcategory: "Demographics",   rows: 28,  format: "CSV", updated: "Dec 2024", tags: ["population", "district"] },
  { id: 2, title: "Age Distribution 2010â€“2024",          category: "People",      subcategory: "Demographics",   rows: 150, format: "JSON",updated: "Dec 2024", tags: ["age", "trend"] },
  { id: 3, title: "Annual Migration Flow",               category: "People",      subcategory: "Migration",      rows: 20,  format: "CSV", updated: "Nov 2024", tags: ["migration", "flow"] },
  { id: 4, title: "Housing Stock by Type 2024",          category: "Housing",     subcategory: "Stock",          rows: 8,   format: "JSON",updated: "Nov 2024", tags: ["housing", "stock"] },
  { id: 5, title: "Construction Permits 2015â€“2024",      category: "Housing",     subcategory: "Construction",   rows: 90,  format: "CSV", updated: "Nov 2024", tags: ["construction", "permits"] },
  { id: 6, title: "Average Rent Trend",                  category: "Housing",     subcategory: "Market",         rows: 36,  format: "JSON",updated: "Oct 2024", tags: ["rent", "market"] },
  { id: 7, title: "Public Transit Ridership Monthly",    category: "Mobility",    subcategory: "Transit",        rows: 144, format: "CSV", updated: "Dec 2024", tags: ["transit", "ridership"] },
  { id: 8, title: "Modal Split Survey",                  category: "Mobility",    subcategory: "Transport",      rows: 12,  format: "JSON",updated: "Sep 2024", tags: ["modal", "transport"] },
  { id: 9, title: "Traffic Congestion Index 2024",       category: "Mobility",    subcategory: "Traffic",        rows: 8736,format: "CSV", updated: "Dec 2024", tags: ["traffic", "congestion"] },
  { id: 10,title: "Annual COâ‚‚ Emissions",               category: "Environment", subcategory: "Climate",        rows: 10,  format: "JSON",updated: "Nov 2024", tags: ["co2", "emissions"] },
  { id: 11,title: "Air Quality Index Monthly",           category: "Environment", subcategory: "Air Quality",    rows: 120, format: "CSV", updated: "Dec 2024", tags: ["air", "quality", "aqi"] },
  { id: 12,title: "Energy Mix 2024",                    category: "Environment", subcategory: "Energy",         rows: 6,   format: "JSON",updated: "Oct 2024", tags: ["energy", "renewable"] },
  { id: 13,title: "Employment Rate 2010â€“2024",          category: "Economy",     subcategory: "Labour",         rows: 14,  format: "CSV", updated: "Oct 2024", tags: ["employment", "labour"] },
  { id: 14,title: "GDP Growth Annual",                  category: "Economy",     subcategory: "Economic",       rows: 14,  format: "JSON",updated: "Oct 2024", tags: ["gdp", "growth"] },
  { id: 15,title: "Business Registrations 2019â€“2024",   category: "Economy",     subcategory: "Business",       rows: 60,  format: "CSV", updated: "Sep 2024", tags: ["business", "registrations"] },
  { id: 16,title: "School Enrollment 2018â€“2024",        category: "Education",   subcategory: "Enrollment",     rows: 42,  format: "JSON",updated: "Sep 2024", tags: ["school", "enrollment"] },
  { id: 17,title: "Education Attainment Survey",        category: "Education",   subcategory: "Attainment",     rows: 6,   format: "CSV", updated: "Aug 2024", tags: ["education", "attainment"] },
];

export const categoryColors = {
  People:      { bg: "rgba(16,185,129,0.10)",  text: "#10B981", border: "rgba(16,185,129,0.25)"  },
  Housing:     { bg: "rgba(37,99,235,0.10)",  text: "#2563EB", border: "rgba(37,99,235,0.25)"  },
  Mobility:    { bg: "rgba(6,182,212,0.10)",   text: "#0E7490", border: "rgba(6,182,212,0.25)"   },
  Environment: { bg: "rgba(16,185,129,0.10)",   text: "#059669", border: "rgba(16,185,129,0.25)"   },
  Economy:     { bg: "rgba(217,119,6,0.10)",   text: "#2563EB", border: "rgba(217,119,6,0.25)"   },
  Education:   { bg: "rgba(37,99,235,0.10)",   text: "#2563EB", border: "rgba(37,99,235,0.25)"   },
};

