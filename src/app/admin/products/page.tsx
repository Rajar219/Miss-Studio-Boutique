import { getProducts } from "@/lib/products";
import ProductsTable from "./ProductsTable";

export default async function AdminProductsPage() {
  const products = await getProducts();
  
  return <ProductsTable initialProducts={products} />;
}
