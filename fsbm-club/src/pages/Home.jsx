import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroVideo from '../assets/hero-loop.mp4';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Triggers when user scrolls past 100px down from Hero
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // 1. THE MAIN WRAPPER
    <main className="relative w-full antialiased selection:bg-[#ffe259] selection:text-[#393000]">
      
      {/* 2. THE VIDEO LAYER (Ground Floor: z-0) */}
      <div className="fixed inset-0 w-full h-full z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isScrolled ? 'opacity-90' : 'opacity-100'
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* The Noir Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${
          isScrolled ? 'opacity-80' : 'opacity-60'
        }`}></div>
      </div>

      {/* 3. THE CONTENT WRAPPER (Second Floor: z-10) */}
      {/* Everything inside this div naturally scrolls over the fixed video */}
      <div className="relative z-10">

        {/* HERO SECTION (TRANSPARENT) */}
        <section className="relative bg-transparent min-h-screen flex items-center justify-center pt-32 px-[20px] md:px-[64px] overflow-hidden">
          <div className="max-w-[1440px] w-full grid grid-cols-12 gap-[24px] relative z-10">
            <div className="col-span-12 md:col-span-10 md:col-start-2 text-center md:text-left flex flex-col justify-center">
              <h1 className="font-['Anton'] text-[56px] leading-[56px] md:text-[120px] md:leading-[110px] md:tracking-[-0.04em] text-[#e2e2e2] uppercase mb-4 drop-shadow-lg">
                WE SPEAK ART.
              </h1>
              <h1 className="font-['Anton'] text-[56px] leading-[56px] md:text-[120px] md:leading-[110px] md:tracking-[-0.04em] text-[#ffe259] uppercase drop-shadow-lg mt-[-20px] md:mt-[-40px]">
                WE ARE CINEMA.
              </h1>
            </div>
          </div>
        </section>

        {/* MANIFESTO SECTION (SOLID BG: Slides over video) */}
        <section className="bg-transparent relative py-32 px-[20px] md:px-[64px]">          
          <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-[24px] items-center">
            {/* Image Left */}
            <div className="col-span-12 md:col-span-6 relative group h-[600px] bg-[#333535] border border-[#444748] overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrzp6TmA-M5cdE7gv5EHdCsCL33oGyWB49NKeJqKlK3kTCSw5Yd08Eei-2Vrdvnfmc2lEs4BCXVStkEm9wWbzb6OxoAxxLOirHtXQSYd_12bBvekl3bQ_wk18vBQNfTRSbM_ENOMV9gNmOxj4L0scuecKifYj3N-qX44e-pJ_NluBQ2ykwhhyggRgyNrnVjc1Zm-EtyoCzTM6dnxmL8nAUnyNUKyPRMZvW0RP6x2sUtSpYRiTuGbj8B2YxoJPK6ZsPDBkkrWCRLHo')" }}
              />
              <div className="absolute bottom-4 right-4 bg-[#121414] px-3 py-1 border border-[#444748]">
                <span className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] text-[#e2e2e2] uppercase">01 / ORIGIN</span>
              </div>
            </div>
            
            {/* Text Right */}
            <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col justify-center pt-12 md:pt-0">
              <div className="w-16 h-1 bg-[#ffe259] mb-8" />
              <h2 className="font-['Anton'] text-[56px] leading-[56px] md:text-[80px] md:leading-[80px] md:tracking-[-0.02em] text-[#ffe259] uppercase mb-8 leading-none">
                NOTRE MISSION
              </h2>
              <div className="space-y-6">
                <p className="font-['Inter'] text-[18px] leading-[28px] font-[400] text-[#e2e2e2] leading-relaxed">
                  Le Club Cinéma Ben M'Sik est un espace d'expérimentation brut. Nous ne cherchons pas la perfection stérile, mais l'authenticité de l'expression étudiante à travers l'objectif.
                </p>
                <p className="font-['Inter'] text-[16px] leading-[24px] font-[400] text-[#c4c7c7] leading-relaxed">
                  Fondé sur les principes de la cinématographie indépendante, notre collectif repousse les limites narratives et techniques. Nous offrons le matériel, la critique et la plateforme pour que les visions marginales deviennent des œuvres monumentales.
                </p>
              </div>
              <div className="mt-12">
                  <Link className="inline-flex items-center group" to="/events">
                    <span className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] text-[#e2e2e2] uppercase tracking-widest mr-4 group-hover:text-[#ffe259] transition-colors">
                      DÉCOUVRIR LES ARCHIVES
                    </span>
                    <span className="material-symbols-outlined text-[#e2e2e2] group-hover:text-[#ffe259] transition-transform transform group-hover:translate-x-2" style={{ fontVariationSettings: "'FILL' 0" }}>
                      arrow_forward
                    </span>
                  </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION (SOLID BG: Slides over video) */}
        <section id="contact" className="bg-transparent relative py-32 px-[20px] md:px-[64px]">          
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[24px] items-start">
            {/* Left side */}
            <div className="flex flex-col">
              <h2 className="font-['Anton'] text-[56px] leading-[56px] md:text-[120px] md:leading-[110px] md:tracking-[-0.04em] text-[#e2e2e2] uppercase leading-none break-words">
                NOUS CONTACTER
              </h2>
              <p className="font-['Anton'] text-[48px] leading-[52px] tracking-[0em] text-[#ffe259] uppercase mt-6 leading-tight">
                ENTRER DANS LE CADRE
              </p>
            </div>

            {/* Right side */}
            <div className="w-full">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col">
                  <label className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] text-[#e2e2e2] uppercase tracking-widest mb-2" htmlFor="name">
                    NOM COMPLET
                  </label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-[#e2e2e2] rounded-none px-0 py-3 text-[#e2e2e2] font-['Inter'] text-[18px] leading-[28px] focus:ring-0 focus:border-[#ffe259] outline-none transition-colors placeholder:text-[#333535]" 
                    id="name" 
                    type="text" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] text-[#e2e2e2] uppercase tracking-widest mb-2" htmlFor="email">
                    EMAIL
                  </label>
                  <input 
                    className="w-full bg-transparent border-0 border-b border-[#e2e2e2] rounded-none px-0 py-3 text-[#e2e2e2] font-['Inter'] text-[18px] leading-[28px] focus:ring-0 focus:border-[#ffe259] outline-none transition-colors placeholder:text-[#333535]" 
                    id="email" 
                    type="email" 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] text-[#e2e2e2] uppercase tracking-widest mb-2" htmlFor="message">
                    MESSAGE
                  </label>
                  <textarea 
                    className="w-full bg-transparent border-0 border-b border-[#e2e2e2] rounded-none px-0 py-3 text-[#e2e2e2] font-['Inter'] text-[18px] leading-[28px] focus:ring-0 focus:border-[#ffe259] outline-none transition-colors placeholder:text-[#333535] resize-none" 
                    id="message" 
                    rows={4} 
                  />
                </div>
                <button 
                  className="w-full bg-[#ffe259] text-[#393000] font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-bold px-8 py-5 uppercase hover:bg-transparent hover:text-[#ffe259] border border-[#ffe259] transition-all duration-300 mt-4 cursor-pointer" 
                  type="submit"
                >
                  [ ENVOYER LE MESSAGE ]
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}