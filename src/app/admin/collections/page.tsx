import { getCollections } from "@/lib/collections";
import CollectionsTable from "./CollectionsTable";

export default async function AdminCollectionsPage() {
  const collections = await getCollections();
  
  return <CollectionsTable initialCollections={collections} />;
}
