import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#ffe259] font-bold border-b-2 border-[#ffe259] pb-1 font-['Inter'] text-[16px] leading-[24px] uppercase tracking-widest transition-all duration-100 ease-in-out"
      : "text-[#e2e2e2] hover:text-[#ffe259] font-['Inter'] text-[16px] leading-[24px] uppercase tracking-widest hover:bg-[#ffe259] hover:text-[#393000] transition-all duration-100 ease-in-out px-2 py-1";

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-visible bg-[#121414] text-[#e2e2e2] selection:bg-[#ffe259] selection:text-[#393000]">
      {/* TopNavBar Component */}
      <header className={`fixed top-0 left-0 w-full z-50 border-b border-[#333535] transition-all duration-100 ease-in-out ${
        isScrolled ? 'bg-[#121414]' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center px-[64px] py-6 w-full max-w-[1440px] mx-auto">
          <Link to="/" className="font-['Anton'] text-[48px] leading-[52px] tracking-[0em] text-[#e2e2e2] font-bold uppercase hover:text-[#ffe259] transition-colors">
            CLUB CINÉMA
          </Link>
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={navLinkClass}>
              ACCUEIL
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              ÉVÉNEMENTS
            </NavLink>
            <NavLink to="/membres" className={navLinkClass}>
              L'ÉQUIPE
            </NavLink>
          </nav>
          <Link to="/#contact" className="border border-[#ffe259] bg-[#ffe259] text-[#393000] font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] px-6 py-3 uppercase hover:bg-transparent hover:text-[#ffe259] transition-colors duration-200 cursor-pointer inline-block text-center">
            REJOINDRE LE CLUB
          </Link>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <main className="flex-grow overflow-visible">
        <Outlet />
      </main>

      {/* Footer Component */}
      <footer className="bg-[#121414] relative z-20 w-full py-12 px-[64px] border-t border-[#333535]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center w-full gap-[24px]">
          <div className="font-['Anton'] text-[80px] leading-[80px] tracking-[-0.02em] text-[#e2e2e2] mb-6 md:mb-0">
            CLUB CINÉMA
          </div>
          <nav className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-6 md:mb-0">
            <Link to="/#legal" className="text-[#c4c7c7] hover:text-[#e2e2e2] font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] uppercase hover:text-[#ffe259] transition-opacity duration-200">
              MENTIONS LÉGALES
            </Link>
            <Link to="/events" className="text-[#c4c7c7] hover:text-[#e2e2e2] font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] uppercase hover:text-[#ffe259] transition-opacity duration-200">
              ARCHIVES
            </Link>
            <Link to="/#contact" className="text-[#c4c7c7] hover:text-[#e2e2e2] font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] uppercase hover:text-[#ffe259] transition-opacity duration-200">
              CONTACT
            </Link>
          </nav>
          <div className="font-['JetBrains_Mono'] text-[12px] leading-[16px] tracking-[0.1em] font-[500] uppercase text-[#c4c7c7] text-center md:text-right">
            © 2024 CLUB CINÉMA. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}