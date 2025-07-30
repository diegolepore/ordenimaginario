import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Orden imaginario" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}