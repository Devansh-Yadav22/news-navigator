import { useState, useMemo } from "react";
import { useParams, Navigate, useSearchParams } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import {
  MOCK_ARTICLES,
  REGIONS,
  RegionId,
  CategoryId,
  getRegionName,
  getRegionFlag,
  getCategoryName,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const RegionPage = () => {
  const { region } = useParams<{ region: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isValidRegion = REGIONS.some(r => r.id === region);
  const selectedCategory = searchParams.get("category") as CategoryId | null;

  const filteredArticles = useMemo(() => {
    let articles = region === "global" 
      ? MOCK_ARTICLES 
      : MOCK_ARTICLES.filter(a => a.region === region);
    
    if (selectedCategory) {
      articles = articles.filter(a => a.category === selectedCategory);
    }
    
    return articles;
  }, [region, selectedCategory]);

  if (!isValidRegion) {
    return <Navigate to="/" replace />;
  }

  const regionName = getRegionName(region as RegionId);
  const regionFlag = getRegionFlag(region as RegionId);

  const handleCategorySelect = (category: CategoryId) => {
    if (selectedCategory === category) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header selectedRegion={region as RegionId} />

      <div className="flex-1 flex">
        {/* Category Sidebar */}
        <CategorySidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          selectedRegion={region as RegionId}
          onCategorySelect={handleCategorySelect}
        />

        {/* Main Content */}
        <main className="flex-1 container py-6 lg:py-10">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="liquid-button gap-2"
            >
              <Menu className="h-4 w-4" />
              Categories
            </Button>
          </div>

          <Breadcrumb 
            items={[
              { label: `${regionFlag} ${regionName}`, href: `/news/${region}` },
              ...(selectedCategory ? [{ label: getCategoryName(selectedCategory) }] : [])
            ]} 
          />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl animate-fade-in">{regionFlag}</span>
              <div>
                <h1 className="font-serif text-3xl lg:text-4xl font-bold">
                  {regionName} News
                </h1>
                {selectedCategory && (
                  <p className="text-primary font-medium mt-1">
                    {getCategoryName(selectedCategory)}
                  </p>
                )}
              </div>
            </div>
            <p className="text-muted-foreground">
              {filteredArticles.length} articles
              {selectedCategory && (
                <button
                  onClick={() => {
                    searchParams.delete("category");
                    setSearchParams(searchParams);
                  }}
                  className="ml-2 text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </p>
          </div>

          {/* Article Grid */}
          {filteredArticles.length > 0 ? (
            <ArticleGrid articles={filteredArticles} showFeatured />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found.</p>
              <Button
                variant="link"
                onClick={() => {
                  searchParams.delete("category");
                  setSearchParams(searchParams);
                }}
                className="mt-2"
              >
                View all {regionName} news
              </Button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default RegionPage;
