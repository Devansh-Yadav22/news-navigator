export const REGIONS = [
  { id: "us", name: "US", flag: "🇺🇸" },
  { id: "india", name: "India", flag: "🇮🇳" },
  { id: "europe", name: "Europe", flag: "🇪🇺" },
  { id: "global", name: "Global", flag: "🌍" },
] as const;

export const CATEGORIES = [
  { id: "politics", name: "Politics", color: "politics" },
  { id: "economy", name: "Economy", color: "economy" },
  { id: "geopolitics", name: "Geopolitics", color: "geopolitics" },
  { id: "security", name: "Security", color: "security" },
  { id: "technology", name: "Technology", color: "technology" },
  { id: "finance", name: "Finance", color: "finance" },
  { id: "sports", name: "Sports", color: "sports" },
  { id: "entertainment", name: "Entertainment", color: "entertainment" },
  { id: "science", name: "Science", color: "science" },
  { id: "health", name: "Health", color: "health" },
] as const;

export type RegionId = typeof REGIONS[number]["id"];
export type CategoryId = typeof CATEGORIES[number]["id"];

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: CategoryId;
  region: RegionId;
  source: string;
  publishedAt: Date;
  imageUrl?: string;
  url: string;
  readTime: number;
  isTrending?: boolean;
  isBreaking?: boolean;
}

// Mock data for demonstration
export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Global Leaders Gather for Historic Climate Summit as Temperatures Reach Record Highs",
    summary: "World leaders from over 190 countries convene to address the escalating climate crisis, with new commitments expected on carbon emissions and renewable energy targets.",
    category: "geopolitics",
    region: "global",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 1000 * 60 * 30),
    imageUrl: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 5,
    isTrending: true,
    isBreaking: true,
  },
  {
    id: "2",
    title: "Tech Giants Report Record Earnings Amid AI Revolution",
    summary: "Major technology companies surpass Wall Street expectations as artificial intelligence investments begin to pay dividends across multiple sectors.",
    category: "technology",
    region: "us",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 4,
    isTrending: true,
  },
  {
    id: "3",
    title: "India's Space Agency Successfully Launches Next-Gen Satellite Constellation",
    summary: "ISRO marks another milestone with the deployment of advanced communication satellites, boosting the nation's digital infrastructure capabilities.",
    category: "science",
    region: "india",
    source: "The Hindu",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 3,
  },
  {
    id: "4",
    title: "European Central Bank Signals Policy Shift in Inflation Fight",
    summary: "ECB officials hint at potential rate adjustments as eurozone inflation shows signs of cooling, markets react positively to the news.",
    category: "economy",
    region: "europe",
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 6,
    isTrending: true,
  },
  {
    id: "5",
    title: "US Congress Passes Landmark Defense Bill Amid Rising Tensions",
    summary: "Bipartisan support leads to approval of comprehensive security legislation, focusing on modernizing military capabilities.",
    category: "security",
    region: "us",
    source: "Washington Post",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 4,
    isTrending: true,
  },
  {
    id: "6",
    title: "Breakthrough Cancer Treatment Shows Remarkable Results in Clinical Trials",
    summary: "New immunotherapy approach demonstrates 90% success rate in early trials, offering hope to millions of patients worldwide.",
    category: "health",
    region: "global",
    source: "Nature Medicine",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 5,
  },
  {
    id: "7",
    title: "India's New Economic Policy Attracts Global Investment",
    summary: "Sweeping reforms in manufacturing and trade regulations position India as a key player in global supply chains.",
    category: "economy",
    region: "india",
    source: "Economic Times",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 3,
  },
  {
    id: "8",
    title: "European Leaders Debate New Security Framework for NATO",
    summary: "Defense ministers gather to discuss expanded cooperation and joint military initiatives in response to regional threats.",
    category: "security",
    region: "europe",
    source: "Der Spiegel",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 7,
  },
  {
    id: "9",
    title: "US Presidential Race Heats Up with Policy Debates",
    summary: "Candidates clash over domestic and foreign policy as primaries approach, voters weigh key issues.",
    category: "politics",
    region: "us",
    source: "NYT",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 14),
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 5,
    isBreaking: true,
  },
  {
    id: "10",
    title: "India-China Border Talks Resume After Diplomatic Push",
    summary: "High-level negotiations aim to ease tensions and establish clearer protocols along the disputed border region.",
    category: "geopolitics",
    region: "india",
    source: "NDTV",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 16),
    imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 4,
  },
  {
    id: "11",
    title: "European Parliament Votes on New Climate Legislation",
    summary: "Ambitious environmental policies face debate as member states balance economic concerns with sustainability goals.",
    category: "politics",
    region: "europe",
    source: "Euronews",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18),
    imageUrl: "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 6,
  },
  {
    id: "12",
    title: "Global Financial Markets React to Fed Interest Rate Decision",
    summary: "Stock markets worldwide adjust as Federal Reserve signals monetary policy direction for the coming quarter.",
    category: "finance",
    region: "global",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    url: "#",
    readTime: 4,
    isTrending: true,
  },
];

export const getCategoryColor = (category: CategoryId): string => {
  const colorMap: Record<CategoryId, string> = {
    politics: "bg-category-politics",
    economy: "bg-category-economy",
    geopolitics: "bg-category-geopolitics",
    security: "bg-category-security",
    finance: "bg-category-finance",
    technology: "bg-category-technology",
    sports: "bg-category-sports",
    entertainment: "bg-category-entertainment",
    science: "bg-category-science",
    health: "bg-category-health",
  };
  return colorMap[category];
};

export const getRegionFlag = (region: RegionId): string => {
  const regionData = REGIONS.find(r => r.id === region);
  return regionData?.flag || "🌍";
};

export const getRegionName = (region: RegionId): string => {
  const regionData = REGIONS.find(r => r.id === region);
  return regionData?.name || "Global";
};

export const getCategoryName = (category: CategoryId): string => {
  const categoryData = CATEGORIES.find(c => c.id === category);
  return categoryData?.name || category;
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return diffMins <= 1 ? "Just now" : `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
};
