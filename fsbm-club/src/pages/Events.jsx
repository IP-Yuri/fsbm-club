import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- DATA ARCHITECTURE ---
const events = [
  {
    id: 1,
    date: "24 MAI",
    title: "ATELIER DE RÉALISATION",
    location: "Salle de Conférences — 14h00",
    status: "[ RÉSERVER ]",
    isActive: false,
  },
  {
    id: 2,
    date: "26 MAI",
    title: "PROJECTION: ANIMALS",
    location: "Auditorium Principal — 20h30",
    status: "[ RÉSERVER ]",
    isActive: false,
  },
  {
    id: 3,
    date: "02 JUIN",
    title: "MASTERCLASS SCRIPT",
    location: "Studio B — 10h00",
    status: "[ BIENTÔT ]",
    isActive: false,
  }
];

export default function Events() {
  const bentoRef = useRef(null);

  // Parallax physics for the Bento box image
  const { scrollYProgress } = useScroll({
    target: bentoRef,
    offset: ["start end", "end start"]
  });

  // The image moves from -15% to 15% vertically as the user scrolls past it
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <main className="flex-grow pt-32 pb-24 w-full bg-[#050505] min-h-screen">

      {/* HEADER SEQUENCE */}
      <header className="mb-24 overflow-hidden px-[20px] md:px-[64px] min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Anton'] text-[56px] md:text-[120px] leading-none text-[#e2e2e2] uppercase mb-6 tracking-tight"
        >
          CALENDRIER DES<br />ÉVÉNEMENTS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Inter'] text-[18px] md:text-[20px] text-[#c4c7c7] max-w-[600px] mt-6"
        >
          Découvrez notre programmation exclusive. Des projections intemporelles, des masterclass techniques et des ateliers pratiques réservés aux membres du club.
        </motion.p>
      </header>

      {/* THE EVENT TRACK */}
      <section className="w-full mb-32 border-t border-[#2A2A2A]">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover="hover"
            className="group flex flex-col md:flex-row items-start md:items-center justify-between py-12 border-b border-[#2A2A2A] transition-colors duration-500 cursor-pointer hover:bg-[#121414] px-[20px] md:px-[64px]"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 w-full md:w-3/4 mb-6 md:mb-0">

              <div className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] w-32 shrink-0 text-[#ffe259]">
                {event.date}
              </div>

              <motion.div
                variants={{
                  hover: { x: 15, transition: { duration: 0.4, ease: "easeOut" } }
                }}
                className="flex-grow"
              >
                <h2 className="font-['Anton'] text-[48px] leading-none mb-2 uppercase transition-colors duration-500 text-[#e2e2e2] group-hover:text-[#ffe259]">
                  {event.title}
                </h2>
                <p className="font-['Inter'] text-[16px] text-[#c4c7c7]">
                  {event.location}
                </p>
              </motion.div>

            </div>

            <div>
              {event.status === "[ RÉSERVER ]" ? (
                <Link
                  to="/#contact"
                  className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase border px-8 py-4 transition-all duration-300 whitespace-nowrap border-[#e2e2e2] text-[#e2e2e2] group-hover:bg-[#ffe259] group-hover:text-[#211b00] group-hover:border-[#ffe259] hover:bg-[#ffe259] hover:text-[#211b00] hover:border-[#ffe259] inline-block text-center cursor-pointer"
                >
                  {event.status}
                </Link>
              ) : (
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase border px-8 py-4 transition-all duration-300 whitespace-nowrap border-[#333] text-[#555] cursor-default inline-block text-center">
                  {event.status}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* FEATURED SPOTLIGHT (THE BENTO BOX) */}
      <section ref={bentoRef} className="grid grid-cols-1 md:grid-cols-12 gap-[24px] mb-24 px-[20px] md:px-[64px]">

        {/* Parallax Image Container */}
        <div className="col-span-1 md:col-span-8 bg-[#121414] p-8 border border-[#2A2A2A] relative overflow-hidden group min-h-[400px] md:min-h-[500px]">
          <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-700 group-hover:opacity-20"></div>

          <motion.img
            style={{ y: imageY }}
            alt="Cinematic vintage film reel projector"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpn6zL5-I2RYgSH3l8D3iu4hC2VigFbgjthF0JivekLPqDQZBXAlvBZQQBDv9SSIBboduOInvU5vhk3GyMBVA57Tfoac3PWHR7G_ENjlshEEw_phrxyzHGBA1wfAO6SYErgmyqxyXUSYZkG6sltJ3eMUqI6f4eGUINZJ2dJCF8TrKEtASa8lZ5fqrstCjH3eQf4LAqyv3SoiCdCEe7hsmxfhwC8cpg7fod-Suxg0yAiJmw7CAw0WEvkDeYd0XyiywJNbOAbV9wGKg"
            className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
          />

          <div className="relative z-20 flex flex-col justify-end h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block border border-[#ffe259] text-[#ffe259] font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] px-3 py-1 mb-4 w-fit bg-[#050505]/80 backdrop-blur-sm"
            >
              EN VEDETTE
            </motion.div>
            <h3 className="font-['Anton'] text-[56px] md:text-[80px] text-[#e2e2e2] uppercase mb-4 leading-none">
              RETROSPECTIVE NOIR
            </h3>
            <p className="font-['Inter'] text-[18px] text-[#e2e2e2] max-w-md">
              Une semaine dédiée aux classiques intemporels du cinéma brut.
            </p>
          </div>
        </div>

        {/* Information Panel */}
        <div className="col-span-1 md:col-span-4 bg-[#121414] p-8 border border-[#2A2A2A] flex flex-col justify-between">
          <div>
            <h4 className="font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] text-[#c4c7c7] mb-8 uppercase">
              INFORMATIONS
            </h4>
            <p className="font-['Inter'] text-[16px] text-[#e2e2e2] mb-4">
              L'accès aux projections est strictement réservé aux membres du club munis de leur carte en cours de validité.
            </p>
            <p className="font-['Inter'] text-[16px] text-[#c4c7c7]">
              Veuillez vous présenter 15 minutes avant le début de la séance.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/#contact"
              className="block w-full font-['JetBrains_Mono'] text-[12px] tracking-[0.1em] uppercase border border-[#e2e2e2] px-6 py-4 hover:bg-[#ffe259] hover:text-[#211b00] hover:border-[#ffe259] transition-colors duration-300 text-center text-[#e2e2e2] cursor-pointer"
            >
              CONTACTER L'ACCUEIL
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}