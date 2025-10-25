import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/lib/posts";

interface ArticleCardProps {
  post: PostMeta;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link href={`/articles/${post.slug}`}>
      <article className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 h-full">
        {/* Featured badge */}
        {post.featured && (
          <div className="mb-3">
            <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Destacado
            </span>
          </div>
        )}
        
        {/* Cover image */}
        {post.coverImage && (
          <div className="mb-4">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              width={400}
              height={200}
              className={`w-full h-48 ${post.coverObjectFit === 'contain' ? 'object-contain' : 'object-cover'} rounded-lg`}
            />
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {post.title}
        </h2>
        
        {/* Excerpt/Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt || post.description}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Por {post.author}</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} más
              </span>
            )}
          </div>
        )}
      </article>
    </Link>
  );
}
