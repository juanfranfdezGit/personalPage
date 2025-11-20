import About from "./components/about/About";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Projects from "./components/projects/Projects";

export default function App() {
  return (
    <>
      <Header></Header>

      <Hero></Hero>

      <About></About>

      <Projects></Projects>
    </>
  );
}