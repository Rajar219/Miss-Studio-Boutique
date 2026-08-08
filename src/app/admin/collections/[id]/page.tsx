import { getCollectionById } from "@/lib/collections";
import CollectionForm from "../CollectionForm";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({ params }: { params: { id: string } }) {
  const collection = await getCollectionById(params.id);
  
  if (!collection) {
    notFound();
  }

  return <CollectionForm initialData={collection} />;
}
