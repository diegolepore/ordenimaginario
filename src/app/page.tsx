import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import PhilosophyQuote from "@/components/PhilosophyQuote";
import Image from "next/image";
// import ArticleHighlight from "@/components/ArticleHighlight";

export default function HomePage() {
  const posts = getAllPosts();
  const [latestPost, ...otherPosts] = posts;
  
  return (
    <main className="mx-auto max-w-6xl px-4 pb-32">
      {/* Philosophy Quote Header */}
      <PhilosophyQuote />

      {/* Hero Section - Latest Article */}
      {latestPost && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Último Artículo</h2>
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {latestPost.coverImage && (
              <div className="aspect-video">
                <Image 
                  src={latestPost.coverImage} 
                  alt={latestPost.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                {latestPost.featured && (
                  <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Destacado
                  </span>
                )}
                <time className="text-sm text-gray-500">
                  {new Date(latestPost.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                <a href={`/articles/${latestPost.slug}`} className="hover:text-blue-600 transition-colors">
                  {latestPost.title}
                </a>
              </h3>
              
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {latestPost.excerpt || latestPost.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Por {latestPost.author}</span>
                  {latestPost.tags && latestPost.tags.length > 0 && (
                    <div className="flex gap-2">
                      {latestPost.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <a 
                  href={`/articles/${latestPost.slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Leer más →
                </a>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Other Articles Grid */}
      {otherPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Más Artículos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map(post => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}