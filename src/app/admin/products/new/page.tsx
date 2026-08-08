import { getCollections } from "@/lib/collections";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const collections = await getCollections();
  return <ProductForm collections={collections} />;
}
