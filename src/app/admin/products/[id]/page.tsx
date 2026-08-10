import { getDbProductById } from "../actions";
import { getCollections } from "@/lib/collections";
import ProductForm from "../ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getDbProductById(id);
  const collections = await getCollections();
  
  if (!product) {
    notFound();
  }

  return <ProductForm initialData={product} collections={collections} />;
}
