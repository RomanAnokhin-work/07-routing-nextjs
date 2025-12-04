import Notes from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NotesByTagPageProps {
  params: Promise<{ slug: string[] }>;
}

async function NotesByTagPage({ params }: NotesByTagPageProps) {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}

export default NotesByTagPage;
