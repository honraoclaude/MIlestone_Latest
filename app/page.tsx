import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import AutomationDemo from '@/components/AutomationDemo'
import HowItWorks from '@/components/HowItWorks'
import WhyUs from '@/components/WhyUs'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-mgil-bg">
      <Navbar />
      <Hero />
      <Services />
      <AutomationDemo />
      <HowItWorks />
      <WhyUs />
      <ContactForm />
      <Footer />
      <ChatWidget />
    </main>
  )
}
