import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Ecosystem } from "@/components/ecosystem";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Ecosystem />
      <Footer />
    </main>
  );
}
