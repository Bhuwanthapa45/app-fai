'use client';
import React from 'react';
// lucide-react icons
import {
  Leaf,
  Menu,
  CloudRain,
  Smartphone,
  PieChart,
  MessageCircle,
  BarChart,
  Bell,
  Satellite,
  HeartHandshake,
  Globe,
} from 'lucide-react';

/**
 * Main Landing Page Component
 */
export default function FarmersAiLandingPage() {
  return (
    <div className="relative w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />

      <main>
        <HeroSection />
        <ProblemSolutionSection />
        <KeyFeaturesSection />
        <HowItWorksSection />
        <MissionSection />
      </main>

      <Footer />
    </div>
  );
}

// --- Sub-Components ---

const Header = () => (
  <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-100/80 dark:bg-gray-800/80 border-b border-green-600/20">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Leaf className="text-green-700 text-3xl" />
          <h2 className="text-green-700 text-xl font-bold tracking-tight">Farmers AI</h2>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a className="nav-link" href="#features">Features</a>
          <a className="nav-link" href="#how-it-works">How It Works</a>
          <a className="nav-link" href="#mission">Mission</a>
        </nav>

        <button className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-green-600 text-white text-sm font-bold tracking-wide hover:opacity-90 transition-opacity">
          <span>Launch Assistant</span>
        </button>

        <button className="md:hidden text-green-600 dark:text-green-500">
          <Menu className="text-3xl" />
        </button>
      </div>
    </div>
  </header>
);

// const HeroSection = () => (
  
//   <section className="relative">
//     <div className="container mx-auto px-4 py-20 sm:py-32">
//       <div className="flex min-h-[480px] flex-col gap-8 rounded-xl items-center justify-center text-center bg-gradient-to-r from-green-700 to-green-900 p-6 sm:p-10">
//         <div className="flex flex-col gap-4 max-w-3xl">
//           <h1 className="text-white text-4xl font-black sm:text-6xl">
//             Empowering Farmers with Intelligent, Hyper-Localized Insights.
//           </h1>
//           <h2 className="text-gray-200 text-base sm:text-lg">
//             Farmers AI translates complex agricultural data into simple, actionable advice.
//           </h2>
//         </div>

//         <div className="flex flex-wrap gap-4 justify-center">
//           <button className="btn-primary-yellow">Launch Assistant</button>
//           <button className="btn-secondary-light">Learn More</button>
//         </div>
//       </div>
//     </div>
//   </section>
// );
function HeroSection() {
  const bgImage =
    'linear-gradient(rgba(11, 83, 69, 0.6), rgba(11, 83, 69, 0.8)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCS6T8cYyACwHzXWG-p1YIMRKR0KojQokU2z_8m0YjyO2bb7yBeuARdf3QchDYFg7YafyCVMPR9CF9NXfwHdhQVa15klbBYrgNcPPwjsMVNRdDrj-iEwhosFmpkaFQPmEsbtw1Rqn4z40k-jzbv8-mmO2I1-dm7P-gXG8Ijeue8__I15HgnwNtCnYuK8cHirDN93hM3EyGbmEQ_ug1ZOHPKFZ048y-BoQCGqmaduvcXR8wOwCIqzvtcDocjRNBFVUGdbKnLBZ_6n6qd")';

  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <div
          className="flex min-h-[480px] flex-col gap-8 rounded-xl items-center justify-center text-center bg-cover bg-center p-6 sm:p-10"
          style={{ backgroundImage: bgImage }}
        >
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-white text-4xl sm:text-6xl font-black tracking-tight">
              Empowering Farmers with Intelligent, Hyper-Localized Insights.
            </h1>
            <p className="text-light-gray/90 text-base sm:text-lg">
              Farmers AI translates complex agricultural data into simple, actionable advice.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary">Launch Assistant</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}





const ProblemSolutionSection = () => (
  <section className="container mx-auto px-4 py-16 sm:py-24" id="features">
    <div className="flex flex-col gap-6 text-center max-w-3xl mx-auto">
      <h2 className="section-title">The Challenge vs. The Solution</h2>

      <p className="section-subtext">
        Modern farming faces unprecedented challenges. Our AI System translates complex research and
        live data into simple, actionable advice.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoCard
        icon={<CloudRain className="icon" />}
        title="Climate Unpredictability"
        text="Receive hyper-localized forecasts and alerts to protect your crops."
      />
      <InfoCard
        icon={<Smartphone className="icon" />}
        title="Lack of Accessible Tools"
        text="An intuitive AI assistant on your phone — no expensive hardware required."
      />
      <InfoCard
        icon={<PieChart className="icon" />}
        title="Complex Data Overload"
        text="Get clear, simple answers instead of drowning in agricultural data."
      />
    </div>
  </section>
);

const InfoCard = ({ icon, title, text }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-green-600/20 bg-white dark:bg-gray-800 p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
    {icon}
    <h3 className="text-green-700 dark:text-green-400 text-lg font-bold">{title}</h3>
    <p className="text-gray-700 dark:text-gray-400 text-sm">{text}</p>
  </div>
);

const KeyFeaturesSection = () => (
  <section className="bg-white dark:bg-gray-800 py-16 sm:py-24">
    <div className="container mx-auto px-4">
      <h2 className="section-title text-center">Key Features</h2>
      <p className="section-subtext text-center">Everything you need to make smarter farming decisions.</p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Feature icon={<MessageCircle className="icon" />} title="AI Conversational Assistant" text="Get instant answers in your local language." />
        <Feature icon={<BarChart className="icon" />} title="Live Data Dashboard" text="Visualize soil moisture, crop health & more." />
        <Feature icon={<Bell className="icon" />} title="Hyper-Localized Alerts" text="Timely warnings for pests, diseases & weather." />
        <Feature icon={<Satellite className="icon" />} title="Satellite & Sensor Integration" text="Monitor your farm remotely with advanced tech." />
      </div>
    </div>
  </section>
);

const Feature = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <div className="feature-circle">{icon}</div>
    <p className="feature-title">{title}</p>
    <p className="feature-text">{text}</p>
  </div>
);

const HowItWorksSection = () => (
  <section className="container mx-auto px-4 py-16 sm:py-24" id="how-it-works">
    <h2 className="section-title text-center">Get Started in 3 Simple Steps</h2>
    <p className="section-subtext text-center">Simple and intuitive — get advice when you need it.</p>

    <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <Step number="1" title="Sign Up & Pin Your Farm" text="Create an account and outline your farm on the map." />
      <Step number="2" title="System Fetches Data" text="AI gathers satellite, weather, soil, and local data." />
      <Step number="3" title="Chat with Farmers AI" text="Ask questions and receive personalized guidance." />
    </div>
  </section>
);

const Step = ({ number, title, text }) => (
  <div className="relative flex flex-col items-center text-center gap-4 p-4">
    <div className="step-number">{number}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-text">{text}</p>
  </div>
);

const MissionSection = () => (
  <section className="bg-green-700" id="mission">
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-white text-3xl sm:text-4xl font-bold">Our Mission: For the Farmer, For the Future</h2>
          <p className="text-gray-200 text-lg">
            We aim to empower farmers, improve livelihoods, and strengthen national food security with advanced agricultural intelligence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <MissionCard
            icon={<HeartHandshake className="text-yellow-400 text-4xl" />}
            title="Improving Livelihoods"
            text="Increase yield, reduce losses, and build a secure future."
          />
          <MissionCard
            icon={<Globe className="text-yellow-400 text-4xl" />}
            title="Enhancing Food Security"
            text="Empowering farmers strengthens the nation's food supply."
          />
        </div>
      </div>
    </div>
  </section>
);

const MissionCard = ({ icon, title, text }) => (
  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/10">
    {icon}
    <h3 className="text-white text-lg font-bold">{title}</h3>
    <p className="text-gray-300 text-sm">{text}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-800 border-t border-green-600/20">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          © 2024 Farmers AI. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <a className="footer-link" href="#">Privacy Policy</a>
          <a className="footer-link" href="#">Terms of Service</a>
          <a className="footer-link" href="#">Contact</a>
        </div>

        <div className="flex gap-4">
          {/* Facebook */}
          <a aria-label="Facebook" className="social-icon" href="#">
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>

          {/* Twitter */}
          <a aria-label="Twitter" className="social-icon" href="#">
            <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.075.188.593 1.884 2.308 3.256 4.341 3.294-1.724 1.352-3.883 2.14-6.243 2.05.525 3.434 4.585 5.56 8.441 5.56 9.421 0 14.937-7.93 14.47-15.318.971-.699 1.815-1.575 2.458-2.549z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
);