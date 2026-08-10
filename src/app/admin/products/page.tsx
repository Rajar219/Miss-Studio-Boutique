import { getDbProducts } from "./actions";
import ProductsTable from "./ProductsTable";

export default async function AdminProductsPage() {
  const products = await getDbProducts();
  
  return <ProductsTable initialProducts={products} />;
}
