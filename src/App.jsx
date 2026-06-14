import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Instagram from './components/Instagram'
import BeforeAfter from './components/BeforeAfter'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButton from './components/FloatingButton'

export default function App() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:rounded-lg focus:font-700">
        דלג לתוכן הראשי
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <Instagram />
        <BeforeAfter />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingButton />
    </>
  )
}
