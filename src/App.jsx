import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppInner() {
  const [loaded, setLoaded] = useState(false);
  const { dark } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={dark ? 'dark' : ''}>
      <Preloader done={loaded} />
      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <AppInner />
    </ThemeProvider>
  );
}
