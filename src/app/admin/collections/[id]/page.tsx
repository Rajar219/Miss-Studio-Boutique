import { getDbCollectionById } from "@/lib/db-collections";
import CollectionForm from "../CollectionForm";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({ params }: { params: { id: string } }) {
  const collection = await getDbCollectionById(params.id);
  
  if (!collection) {
    notFound();
  }

  return <CollectionForm initialData={collection} />;
}
