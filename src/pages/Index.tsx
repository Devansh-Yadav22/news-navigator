import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Footer } from "@/components/Footer";
import { MOCK_ARTICLES, RegionId } from "@/lib/constants";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionId>("global");

  const filteredArticles = useMemo(() => {
    if (selectedRegion === "global") return MOCK_ARTICLES;
    return MOCK_ARTICLES.filter(article => article.region === selectedRegion);
  }, [selectedRegion]);

  const heroArticle = filteredArticles.find(a => a.isBreaking) || filteredArticles[0];
  const trendingArticles = filteredArticles.filter(a => a.isTrending).slice(0, 5);
  const remainingArticles = filteredArticles.filter(a => a.id !== heroArticle?.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />

      <main className="flex-1 container py-6 lg:py-10">
        {/* Hero Section */}
        {heroArticle && <HeroSection article={heroArticle} />}

        {/* Trending Section */}
        <TrendingSection articles={trendingArticles} />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold">Latest News</h2>
          <span className="text-sm text-muted-foreground">
            {remainingArticles.length} articles
          </span>
        </div>

        {/* Article Grid */}
        <ArticleGrid articles={remainingArticles} showFeatured />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
