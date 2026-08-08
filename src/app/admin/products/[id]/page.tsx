import { getProductById } from "@/lib/products";
import { getCollections } from "@/lib/collections";
import ProductForm from "../ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  const collections = await getCollections();
  
  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} collections={collections} />;
}
