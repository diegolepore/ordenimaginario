import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  try {
    const { slug } = await params;
    const { meta, content } = getPostBySlug(slug);
    
    return (
      <article className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{meta.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            <span>Por {meta.author}</span>
            <span>•</span>
            <time dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {meta.description && (
            <p className="text-xl text-gray-700 mb-6">{meta.description}</p>
          )}
          
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {meta.tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        {/* Cover Image */}
        {meta.coverImage && (
          <div className="mb-8">
            <Image 
              src={meta.coverImage} 
              alt={meta.title}
              width={800}
              height={400}
              className={`w-full h-64 ${meta.coverObjectFit === 'contain' ? 'object-contain' : 'object-cover'} rounded-lg`}
            />
          </div>
        )}
        
        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 prose-th:p-2 prose-td:border prose-td:border-gray-300 prose-td:p-2">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    notFound();
  }
}

// Generate static params for all posts (for static generation)
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  try {
    const { slug } = await params;
    const { meta } = getPostBySlug(slug);
    
    return {
      title: meta.title,
      description: meta.description || meta.excerpt,
      authors: [{ name: meta.author }],
      keywords: meta.tags,
      openGraph: {
        title: meta.title,
        description: meta.description || meta.excerpt,
        type: 'article',
        publishedTime: meta.date,
        authors: [meta.author],
        images: meta.coverImage ? [meta.coverImage] : undefined,
      },
    };
  } catch {
    return {
      title: 'Post Not Found'
    };
  }
}
