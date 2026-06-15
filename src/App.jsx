import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButton from './components/FloatingButton'
import Hero from './components/Hero'
import Services from './components/Services'
import Instagram from './components/Instagram'
import BeforeAfter from './components/BeforeAfter'
import Reviews from './components/Reviews'
import Contact from './components/Contact'

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      <FloatingButton />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<><Hero /><Instagram /></>} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/before-after" element={<BeforeAfter />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
