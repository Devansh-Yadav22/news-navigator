import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import {
  MOCK_ARTICLES,
  REGIONS,
  RegionId,
  getRegionName,
  getRegionFlag,
} from "@/lib/constants";

const RegionPage = () => {
  const { region } = useParams<{ region: string }>();

  const isValidRegion = REGIONS.some(r => r.id === region);

  const filteredArticles = useMemo(() => {
    if (region === "global") return MOCK_ARTICLES;
    return MOCK_ARTICLES.filter(a => a.region === region);
  }, [region]);

  if (!isValidRegion) {
    return <Navigate to="/" replace />;
  }

  const regionName = getRegionName(region as RegionId);
  const regionFlag = getRegionFlag(region as RegionId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        selectedRegion={region as RegionId}
        onRegionChange={() => {}}
      />

      <main className="flex-1 container py-6 lg:py-10">
        <Breadcrumb items={[{ label: `${regionFlag} ${regionName}` }]} />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{regionFlag}</span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold">
              {regionName} News
            </h1>
          </div>
          <p className="text-muted-foreground">
            Latest stories from {regionName} • {filteredArticles.length} articles
          </p>
        </div>

        {/* Article Grid */}
        <ArticleGrid articles={filteredArticles} showFeatured />
      </main>

      <Footer />
    </div>
  );
};

export default RegionPage;
