import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Prism from "prismjs";

// Import additional languages for syntax highlighting
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  author: string;
  coverImage?: string;
  excerpt?: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
}

const POSTS_DIR = path.join(process.cwd(), "content/posts");

// Configure marked renderer for syntax highlighting
const renderer = new marked.Renderer();

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  if (lang && Prism.languages[lang]) {
    const highlighted = Prism.highlight(text, Prism.languages[lang], lang);
    return `<pre class="language-${lang}"><code class="language-${lang}">${highlighted}</code></pre>`;
  }
  return `<pre><code>${text}</code></pre>`;
};

marked.setOptions({
  renderer: renderer
});

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(file => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as PostMeta;
    })
    .filter(post => post.published) // Only show published posts
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllPostsIncludingDrafts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
    .map(file => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...data } as PostMeta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPaginatedPosts(page = 1, limit = 20) {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / limit);
  return {
    posts: posts.slice((page - 1) * limit, page * limit),
    totalPages,
  };
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  
  // Convert Markdown content to HTML
  const htmlContent = marked(content);
  
  return { meta: data as PostMeta, content: htmlContent };
}