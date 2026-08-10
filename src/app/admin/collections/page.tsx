import { getDbCollections } from "@/lib/db-collections";
import CollectionsTable from "./CollectionsTable";

export default async function AdminCollectionsPage() {
  const collections = await getDbCollections();
  
  return <CollectionsTable initialCollections={collections} />;
}
