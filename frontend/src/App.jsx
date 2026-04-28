import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyHultech from "./components/WhyHultech";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <div data-testid="home-page" className="bg-[#0f0f0f] text-[#f5f5f5]">
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyHultech />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#f5f5f5",
            border: "1px solid #2a2a2a",
            borderRadius: 0,
            fontFamily: "Inter, sans-serif",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
