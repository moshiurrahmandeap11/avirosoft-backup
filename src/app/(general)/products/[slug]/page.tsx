import { notFound } from "next/navigation";
import ProductDetailPage from "../../../../components/productsComponents/ProductDetailPage";
import { getAllProductSlugs } from "../../../../data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  if (!getAllProductSlugs().includes(slug)) {
    notFound();
  }

  return <ProductDetailPage slug={slug} />;
}
