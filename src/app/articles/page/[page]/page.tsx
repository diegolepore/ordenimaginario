import { getPaginatedPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";

export const dynamicParams = false;          // prerender completo

export async function generateStaticParams() {   //  [oai_citation:4‡nextjs.org](https://nextjs.org/docs/app/api-reference/functions/generate-static-params?utm_source=chatgpt.com)
  const { totalPages } = getPaginatedPosts(1);
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
}

export default async function Articles({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNum = Number(page) || 1;
  const { posts, totalPages } = getPaginatedPosts(pageNum);

  return (
    <main className="mx-auto max-w-5xl px-4">
      <h1 className="text-3xl font-bold my-8">Artículos</h1>
      <section className="grid md:grid-cols-2 gap-8">
        {posts.map(p => <ArticleCard key={p.slug} post={p} />)}
      </section>
      <Pagination current={pageNum} total={totalPages} />
    </main>
  );
}