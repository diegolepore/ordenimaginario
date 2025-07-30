import { redirect } from "next/navigation";

export default function ArticlesPage() {
  // Redirect to the first page of articles
  redirect("/articles/page/1");
}