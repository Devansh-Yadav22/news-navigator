import { useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrendingSection } from "@/components/TrendingSection";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Footer } from "@/components/Footer";
import { MOCK_ARTICLES } from "@/lib/constants";

const Index = () => {
  const heroArticle = useMemo(() => 
    MOCK_ARTICLES.find(a => a.isBreaking) || MOCK_ARTICLES[0], 
    []
  );
  
  const trendingArticles = useMemo(() => 
    MOCK_ARTICLES.filter(a => a.isTrending).slice(0, 5), 
    []
  );
  
  const remainingArticles = useMemo(() => 
    MOCK_ARTICLES.filter(a => a.id !== heroArticle?.id), 
    [heroArticle]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

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
