import { useState, useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { CategoryBadge } from "@/components/CategoryBadge";
import {
  MOCK_ARTICLES,
  CATEGORIES,
  CategoryId,
  RegionId,
  getCategoryName,
} from "@/lib/constants";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedRegion, setSelectedRegion] = useState<RegionId>("global");

  const isValidCategory = CATEGORIES.some(c => c.id === category);

  const filteredArticles = useMemo(() => {
    let articles = MOCK_ARTICLES.filter(a => a.category === category);
    if (selectedRegion !== "global") {
      articles = articles.filter(a => a.region === selectedRegion);
    }
    return articles;
  }, [category, selectedRegion]);

  if (!isValidCategory) {
    return <Navigate to="/" replace />;
  }

  const categoryName = getCategoryName(category as CategoryId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />

      <main className="flex-1 container py-6 lg:py-10">
        <Breadcrumb items={[{ label: categoryName }]} />

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <CategoryBadge category={category as CategoryId} size="md" />
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold">
              {categoryName} News
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredArticles.length} articles
            </p>
          </div>
        </div>

        {/* Article Grid */}
        <ArticleGrid articles={filteredArticles} showFeatured />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
