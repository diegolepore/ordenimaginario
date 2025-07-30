import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
// import ArticleHighlight from "@/components/ArticleHighlight";

const philosophyQuotes = [
  { quote: "La existencia precede a la esencia", author: "Jean-Paul Sartre" },
  { quote: "El infierno son los otros", author: "Jean-Paul Sartre" },
  { quote: "Estamos condenados a ser libres", author: "Jean-Paul Sartre" },
  { quote: "La vida no tiene sentido a priori", author: "Jean-Paul Sartre" },
  { quote: "Somos lo que hacemos con lo que hicieron de nosotros", author: "Jean-Paul Sartre" },
  { quote: "La angustia es el vértigo de la libertad", author: "Søren Kierkegaard" },
  { quote: "El hombre es una pasión inútil", author: "Jean-Paul Sartre" },
  { quote: "Crear es vivir dos veces", author: "Albert Camus" },
  { quote: "Solo hay un problema filosófico verdaderamente serio: el suicidio", author: "Albert Camus" },
  { quote: "La vida es aquello que te va sucediendo mientras tú te empeñas en hacer otros planes", author: "John Lennon" },
  { quote: "No hay nada más absurdo que la condición humana", author: "Albert Camus" },
  { quote: "La libertad es lo que haces con lo que te han hecho", author: "Jean-Paul Sartre" },
  { quote: "Vivir es lo más raro del mundo; la mayoría de la gente solo existe", author: "Oscar Wilde" },
  { quote: "El sentido de la vida es que se detenga", author: "Franz Kafka" },
  { quote: "Uno debe imaginar a Sísifo feliz", author: "Albert Camus" },
  { quote: "La vida oscila entre el dolor y el aburrimiento", author: "Arthur Schopenhauer" },
  { quote: "El hombre es el único animal que sabe que va a morir", author: "Martin Heidegger" },
  { quote: "Ser es ser percibido", author: "George Berkeley" },
  { quote: "La muerte no es el contrario de la vida, sino su ausencia", author: "Jorge Luis Borges" },
  { quote: "Todo lo que existe está aquí sin razón, se prolonga por debilidad y muere por casualidad", author: "Jean-Paul Sartre" }
];

function getRandomQuote() {
  return philosophyQuotes[Math.floor(Math.random() * philosophyQuotes.length)];
}

export default function Home() {
  const posts = getAllPosts();
  const randomQuoteData = getRandomQuote();
  const [latestPost, ...otherPosts] = posts;
  
  return (
    <main className="mx-auto max-w-6xl px-4 pb-32">
      {/* Philosophy Quote Header */}
      <header className="text-center py-12">
        <h1 className="text-3xl font-bold italic text-gray-800 mb-4">
          &ldquo;{randomQuoteData.quote}&rdquo;
        </h1>
        <p className="text-gray-600 mb-2">— {randomQuoteData.author} —</p>
        <p className="text-gray-500 text-sm">Orden Imaginario</p>
      </header>

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