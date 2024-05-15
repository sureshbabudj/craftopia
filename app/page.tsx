import About from "@/components/About";
import { Carousel } from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Store from "@/components/Store";

// pages/index.tsx
export default function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <Store />
      <About />
      <Footer />
    </>
  );
}
