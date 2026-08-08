import {
  About,
  Contact,
  Education,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Tech,
  WhatsAppFloat,
  Works,
} from "./components";

const App = () => {
  return (
    <div className="relative z-0 bg-primary">
      <Navbar />
      <Hero />

      <main className="relative">
        <About />
        <Experience />
        <Education />
        <Tech />
        <Works />
        <Feedbacks />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default App;
