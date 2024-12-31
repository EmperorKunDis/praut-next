'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const PrautWireframe = () => {
  // State management
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);


  // Enhanced services with more details
const services = [
    {
      icon: "🤖",
      title: "Integrace AI do firmy",
      description: "AI řešení přímo padnoucí Vašemu podnikání na míru.",
      features: ["Zákaznické chatboty", "AI telefonická linka", "AI podpora a databáze produktů"],
      caseStudy: "Ušetří práci vykonávanou několika lidmi, nikdy nezapomene a není nemocný."
    },
    {
      icon: "🔄",
      title: "Automatizace",
      description: "Automatizace ukládaných procesů a řízení.",
      features: ["Inteligentní procesy", "Plánování procesů", "Optimalizace procesů"],
      caseStudy: "Zvýšení efektivity práce až o 100%."
    },
    {
      icon: "📊",
      title: "Analýza dat",
      description: "Transformujte svá data do praktických statistik.",
      features: ["Prediktivní analytika", "Vizualizace dat", "Reporting v reálném čase"],
      caseStudy: "Zlepšená přesnost rozhodování až o 60%."
    },
    {
      icon: "🌐",
      title: "Cílená extratrakce dat z internetu",
      description: "Nenechte se prekvapit zadnym krokem konkurence",
      features: ["Vlastní šablony na extrakci dat", "Zpracování extrahovaných dat", "Integrace API"],
      caseStudy: "Shromáždění, zpracování a automatické vyhodnocování cílů relevantních pro klienta."
    },
    {
      icon: "💬",
      title: "Automatizujte svou online prezentace",
      description: "Komunikace na týdny dopředu jedním úkonem a na jednom místě.",
      features: ["V reálném čase.", "Integrace chatbotů na weby a sociální kanály.", "Přizpůsobení dle potřeb uživatele."],
      caseStudy: "Zredukován čas na správu komunikace minimalně o 70 % a až několikanásobný nárůst klientely."
    },
    {
      icon: "📈",
      title: "Přehledy a vizualizace dat",
      description: "Interactive visualizations of your key metrics",
      features: ["Aktualizace v reálném čase", "Vlastní metriky", "Dostupnost kdykoliv a kdekoliv"],
      caseStudy: "Vylepšení sledování výkonosti a efektivity v dosahování klíčových cílů."
    }
  ];

  // Enhanced technology stack with categories
  const technologies = {
    "První kontakt": ["Nastíníme možnosti integrace.", "Posoudíme potenciální úspory.", "Dohodneme bližší spolupráci."],
    "Prezentace nabídky": ["Nalezení nejlepších AI řešení přímo padnoucí Vaší firmě. Nastíníme proces automatizace, který by vyhovoval Vašemu podnikání."],
    "Nalezneme řešění": ["Nejprve vytvoříme standardizovaný produkt, který poté upravíme přímo pro potřeby Vaší firmy."],
    "Nasazení": ["Nasazení do plného produkčního okruhu.", "Doladíme plnou funkčnost.", "Automatizované kalibrace."],
    "Dlouhodobé monitorování": ["Posuzování dlouhodobé efektivity", "Přispůsobování v realném čase době a trhu"],
    "Zaškolení zaměstnanců": ["Standartní školní všech potřebných zaměstnanců", "Možnost kompletního vyškolení Vašeho zaměstnance"]
  };

  // Enhanced projects with more details
  const projects = [
    {
      name: "Automatic Generation of Shift Plans",
      description: "A hospital has implemented an automatic system for generating work plans for nurses and doctors. The system automatically takes into account days off, holidays and sick leave.",
      image: "/api/placeholder/400/300",
      techStack: ["Python", "AI", "Scheduling"],
      results: "70% reduction in administrative work",
      clientTestimonial: "2.5 hours saved per week per employee"
    },
    {
      name: "Automated Document Processing",
      description: "An accounting firm is introducing automation for processing invoices and tax documents using OCR. Each document is automatically extracted and included in the system.",
      image: "/api/placeholder/400/300",
      techStack: ["OCR", "Python", "AI"],
      results: "50% time reduction",
      clientTestimonial: "Savings of 100,000 CZK per year"
    },
    {
      name: "Automated Email Marketing",
      description: "Automated sending of personalized emails and push notifications based on customer behavior on the website (e.g. abandoned cart, sales).",
      image: "/api/placeholder/400/300",
      techStack: ["Marketing", "Automation", "Email"],
      results: "15 hours saved per week",
      clientTestimonial: "120,000 CZK saved per year"
    },
    {
      name: "Automated Document Approval",
      description: "Implementation of an automated system for approving vacations and work requests. The system checks employee availability, respects rules and automatically generates approvals.",
      image: "/api/placeholder/400/300",
      techStack: ["Workflow", "Automation", "HR"],
      results: "30% reduction in admin work",
      clientTestimonial: "50,000 CZK saved per year"
    },
    {
      name: "Automated Company Reports",
      description: "Automate reporting of team and project performance using a data collection and analysis tool. Reports are generated every month without employee intervention.",
      image: "/api/placeholder/400/300",
      techStack: ["BI", "Reporting", "Analytics"],
      results: "25 hours monthly saved",
      clientTestimonial: "150,000 CZK saved per year"
    },
    {
      name: "Automated Order Management",
      description: "System for automatic order entry into ERP and tracking of stock levels. Automatically generates orders based on minimum stock levels and tracks deliveries.",
      image: "/api/placeholder/400/300",
      techStack: ["ERP", "Inventory", "Automation"],
      results: "250 hours saved per year",
      clientTestimonial: "60,000 CZK saved per year"
    },
    {
      name: "Automated Performance Reports",
      description: "Monthly reports on the performance of marketing campaigns are automatically generated using a BI tool, without the need for manual data collection.",
      image: "/api/placeholder/400/300",
      techStack: ["BI", "Marketing", "Analytics"],
      results: "10 hours saved per month",
      clientTestimonial: "30,000 CZK saved per year"
    },
    {
      name: "ML Training Platform",
      description: "Create an internal online course for developers, focused on machine learning and its implementation in enterprise systems.",
      image: "/api/placeholder/400/300",
      techStack: ["ML", "Education", "Python"],
      results: "40% faster training",
      clientTestimonial: "200,000 CZK saved per year"
    },
    {
      name: "AI Document Analysis",
      description: "AI system for automatic detection of irregularities in accounting or tax documents (e.g. unusual transactions or errors in amounts).",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Finance", "Analysis"],
      results: "50% time reduction",
      clientTestimonial: "100,000 CZK saved per year"
    },
    {
      name: "AI Supply Chain Optimization",
      description: "AI tool to optimize material supply and inventory management based on demand, thus avoiding over-ordering and delays.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Supply Chain", "Optimization"],
      results: "30% inventory reduction",
      clientTestimonial: "200,000 CZK saved per year"
    },
    {
      name: "AI Process Automation Training",
      description: "Creating an interactive online course for company employees focused on the use of AI tools for process automation.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Education", "Automation"],
      results: "50% training time reduction",
      clientTestimonial: "150,000 CZK saved per year"
    },
    {
      name: "Automated Communication Training",
      description: "Creating internal training focused on the effective use of automated chat tools to improve internal communication.",
      image: "/api/placeholder/400/300",
      techStack: ["Communication", "Training", "Automation"],
      results: "40% communication time saved",
      clientTestimonial: "200,000 CZK saved per year"
    },
    {
      name: "24/7 AI Customer Support",
      description: "Deploying an AI chatbot that answers common customer questions and solves problems around the clock.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Chatbot", "Support"],
      results: "50% service time reduction",
      clientTestimonial: "500,000 CZK saved per year"
    },
    {
      name: "AI Document Pattern Recognition",
      description: "AI system that automatically recognizes and flags errors or unusual transactions in accounting and tax documents.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Pattern Recognition", "Finance"],
      results: "20 hours saved per week",
      clientTestimonial: "300,000 CZK saved per year"
    },
    {
      name: "AI Customer Satisfaction Analysis",
      description: "Deploy AI that monitors customer feedback and detects negative sentiment, thereby immediately alerting to problems.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Sentiment Analysis", "Customer Service"],
      results: "30% reduction in negative reviews",
      clientTestimonial: "100,000 CZK saved per year"
    },
    {
      name: "AI Logistics Optimization",
      description: "Implemented AI to optimize storage and distribution of materials, ensuring the correct delivery schedule.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Logistics", "Optimization"],
      results: "25% inventory reduction",
      clientTestimonial: "500,000 CZK saved per year"
    },
    {
      name: "AI Predictive Maintenance",
      description: "Implementing predictive maintenance using AI that monitors equipment status and predicts when maintenance is needed.",
      image: "/api/placeholder/400/300",
      techStack: ["AI", "Maintenance", "Prediction"],
      results: "40% downtime reduction",
      clientTestimonial: "1,000,000 CZK saved per year"
    },
    {
      name: "Automated HR Reports",
      description: "Automatically generate employee performance reports and distribute them to managers at the end of each month.",
      image: "/api/placeholder/400/300",
      techStack: ["HR", "Reporting", "Automation"],
      results: "80% time reduction",
      clientTestimonial: "100,000 CZK saved per year"
    },
    {
      name: "Automated Order Tracking",
      description: "Automated system for generating orders and monitoring their status according to demand forecast.",
      image: "/api/placeholder/400/300",
      techStack: ["Order Management", "Automation", "Tracking"],
      results: "15 hours saved per week",
      clientTestimonial: "200,000 CZK saved per year"
    },
    {
      name: "Production Line Planning",
      description: "Automatic generation of production plans based on demand and material availability.",
      image: "/api/placeholder/400/300",
      techStack: ["Production", "Planning", "Automation"],
      results: "90% time reduction",
      clientTestimonial: "150,000 CZK saved per year"
    }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Update active section based on scroll position
      const sections = ['home', 'services', 'technology', 'references', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  // Animation for section transitions
  const SectionTransition = ({ children }) => (
    <div className="transition-all duration-500 hover:transform hover:scale-102">
      {children}
    </div>
  );

  // Enhanced Card component
  const ServiceCard = ({ service }) => (
    <div className="p-6 border rounded-lg hover:shadow-xl transition-all duration-300 bg-white">
      <div className="text-4xl mb-4 transform hover:scale-110 transition-transform">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
      <p className="mb-4">{service.description}</p>
      <div className="space-y-2">
        <h4 className="font-semibold">Key Features:</h4>
        <ul className="list-disc pl-5">
          {service.features.map((feature, index) => (
            <li key={index} className="text-sm">{feature}</li>
          ))}
        </ul>
        <div className="mt-4 text-sm text-gray-600 italic">
          Case Study: {service.caseStudy}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrollingDown ? '-top-20' : 'top-0'
      } bg-white shadow-md`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              praut
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['services', 'technology', 'references', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className={`${
                    activeSection === item
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600'
                  } hover:text-blue-600 transition-colors capitalize`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              {['services', 'technology', 'references', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className="block py-2 text-gray-600 hover:text-blue-600 capitalize"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-r from-blue-50 via-purple-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-auto mx-auto">
            <AnimatedLogo />
            <p className="text-xl text-gray-600 mb-12 mt-8">
              Transformujte svoji firmu díky AI Automatizaci a obohaťte ji tak, aby byla konkurence schopna i v moderním světě.
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Posuňte svou firmu dál
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Nabídka přímo pro Vás
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <SectionTransition>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Jaké produkty a služby nabízíme ?</h2>
              <p className="text-gray-600">Objevte naši komplexní nabídku služeb navržených pro transformaci vašeho podnikání.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
            <div className="text-center mt-16">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
                <span>Takto Vám pomůžeme s modernizací</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Enhanced Technology Section */}
      <section id="technology" className="py-20 bg-white">
        <SectionTransition>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Jak pomáháme modernizovat firmy</h2>
              <p className="text-gray-600">Používáme nejmodernejši postupy pro naše klienty</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(technologies).map(([category, techs]) => (
                <div key={category} className="p-6 border rounded-lg hover:shadow-lg transition-all">
                  <h3 className="text-xl font-semibold mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Enhanced References Section */}
      <section id="references" className="py-20 bg-gray-50">
        <SectionTransition>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Příklady naší práce</h2>
              <p className="text-gray-600">
                Discover how we have helped our clients achieve their goals
              </p>
            </div>
            <div className="relative">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentProjectIndex(prev => Math.max(0, prev - 4))}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                  disabled={currentProjectIndex === 0}
                >
                  <ChevronLeft className={currentProjectIndex === 0 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
                <div className="flex gap-8 mx-4">
                  {projects.slice(currentProjectIndex, currentProjectIndex + 4).map((project, index) => (
                    <div key={index} className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
                      <img src={project.image} alt={project.name} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        {/* Previous code remains the same until the project card content */}
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="border-t pt-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <p className="text-sm font-semibold">{project.results}</p>
                            </div>
                          </div>
                          <div className="italic text-sm text-gray-600">
                            {project.clientTestimonial}
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 inline-flex items-center space-x-2 text-sm">
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentProjectIndex(prev => Math.min(projects.length - 4, prev + 4))}
                  className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
                  disabled={currentProjectIndex >= projects.length - 4}
                >
                  <ChevronRight className={currentProjectIndex >= projects.length - 4 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: Math.ceil(projects.length / 4) }).map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentProjectIndex / 4 === idx ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentProjectIndex(idx * 4)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <SectionTransition>
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Spojit se </h2>
              <p className="text-gray-600">
                Připravení transformovat vasi firmu? Proberme jak muzeme zlepsit fungovani vasich systemu a jeste Vam pomoct usetrit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">Pošli nám zprávu</h3>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Vaše Jméno</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Frantisek Novak"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Váš Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="franovak@priklad.cz"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Důvod kontaktu</label>
                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                      <option>Automatizace pracovních postupu</option>
                      <option>Integrace AI</option>
                      <option>AI pro zákaznickou podporu</option>
                      <option>Vyškolení zaměstnanců</option>
                      <option>Technická podpora</option>
                      <option>Něco jiného ....</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Zpráva</label>
                    <textarea
                      rows={4}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Řekněte nám o Vašem případě ....."
                    ></textarea>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <span>Odeslat Zprávu</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">Kontaktní Informace</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Sídlo Firmy</h4>
                    <p className="text-gray-600">Berliner Strasse 13.</p>
                    <p className="text-gray-600">Weiden, DE 95666</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Detailní kontakty</h4>
                    <p className="text-gray-600">Email: contact@praut.com</p>
                    <p className="text-gray-600">Česky hovořící zastoupení: +49 (0) 175 90 96 96 5</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      {['LinkedIn', 'Twitter', 'GitHub'].map((platform) => (
                        <Link
                          key={platform}
                          href="#"
                          className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {platform}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
            <div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                praut
              </div>
              <p className="text-gray-600">
                Transforming businesses through intelligent automation solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                {services.map((service) => (
                  <li key={service.title}>
                    <Link href="#" className="hover:text-blue-600 transition-colors">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates.
              </p>
              <form className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t py-6 text-center text-gray-600">
            <p> 2024 praut. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrautWireframe;
