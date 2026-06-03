import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';

// --- THE RE-ENGINEERED PHYSICS SUB-COMPONENT (Option B: Viewport Tracking) ---
function CinematicFrame({ member, index, progress, total }) {
  const cardRef = useRef(null);
  const opacity = useMotionValue(0.1);
  const scale = useMotionValue(0.85);

  const updatePhysics = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    // We want the card to fade up and scale in within 35% of the viewport width from the center
    const threshold = window.innerWidth * 0.35;

    if (distance >= threshold) {
      opacity.set(0.1);
      scale.set(0.85);
    } else {
      const ratio = 1 - distance / threshold; // 0 at threshold, 1 at dead-center
      opacity.set(0.1 + ratio * 0.9);         // Fade from 0.1 to 1.0
      scale.set(0.85 + ratio * 0.15);         // Scale from 0.85 to 1.0
    }
  };

  // Bind update logic directly to the scroll progress value changes
  useMotionValueEvent(progress, "change", updatePhysics);

  // Sync physics on mount and handle viewport resizing
  useEffect(() => {
    updatePhysics();
    window.addEventListener("resize", updatePhysics);
    return () => window.removeEventListener("resize", updatePhysics);
  }, []);

  return (
    <article ref={cardRef} className="w-[80vw] max-w-[1000px] flex-shrink-0 flex items-center justify-center relative z-20">
      <motion.div
        style={{ opacity, scale }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full"
      >
        <div className="relative w-[260px] md:w-[380px] aspect-[3/4] overflow-hidden border border-[#2A2A2A] bg-black shadow-2xl group cursor-pointer">
          {/* Vignette & Contrast Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 opacity-70 group-hover:opacity-20 transition-opacity duration-500 z-10" />

          {/* Viewfinder Corners */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#ffe259] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#ffe259] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:translate-x-[4px] group-hover:translate-y-[-4px]" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#ffe259] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:translate-x-[-4px] group-hover:translate-y-[4px]" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#ffe259] opacity-40 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:translate-x-[4px] group-hover:translate-y-[4px]" />

          {/* Tech Spec Metadata */}
          <div className="absolute top-5 left-5 z-20 font-['JetBrains_Mono'] text-[9px] tracking-widest text-[#ffe259]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
            [CAST_ID_0{member.id}]
          </div>

          <img 
            src={member.img} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 group-hover:contrast-100 transition-all duration-700 ease-out" 
          />

          {/* Diagonal Glare Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out z-10" />
        </div>

        <div className="text-center md:text-left flex flex-col">
          <span className="font-['JetBrains_Mono'] text-xs md:text-sm tracking-[0.3em] text-white/40 mb-3 block">
            0{index + 1} / 0{total}
          </span>
          <div className="w-12 h-1 bg-[#ffe259] mb-6 mx-auto md:mx-0 shadow-[0_0_15px_rgba(255,226,89,0.5)]"></div>
          <h2 className="font-['Anton'] text-[48px] md:text-[80px] leading-[1] text-[#e2e2e2] uppercase mb-2">
            {member.name}
          </h2>
          <p className="font-['JetBrains_Mono'] text-[14px] md:text-[18px] tracking-[0.2em] font-medium text-[#ffe259] uppercase">
            {member.role}
          </p>
        </div>
      </motion.div>
    </article>
  );
}

// --- THE MASTER SEQUENCE ---
export default function Membres() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Maps the vertical scroll to the horizontal translation x
  // Calculates translation dynamically to center index 0 on load and index 6 at the end
  const xValue = useTransform(scrollYProgress, [0, 1], [0, -1]);
  const x = useTransform(xValue, (val) => `calc(${val} * (min(480vw, 6000px) + 24vw))`);

  // Dynamically fades out the spotlight at the end of the scroll
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

  const team = [
    { id: 1, name: "Achraf Rechag", role: "Social Media Manager", img: "/team/achraf_rechag.jpg" },
    { id: 2, name: "Abdelhamid Aitbouhmadi", role: "Responsable Communication", img: "/team/abdelhamid_aitbouhmadi.png" },
    { id: 3, name: "Anwar Slimani", role: "Président", img: "/team/anwar_slimani.jpg" },
    { id: 4, name: "Hajar Maafou", role: "Vice-Présidente", img: "/team/hajar_maafou.png" },
    { id: 5, name: "Kautar Fllafi", role: "Responsable Organisation", img: "/team/kautar_fllafi.png" },
    { id: 6, name: "Tabit Soufiane", role: "Directeur de la Photographie", img: "/team/tabit_soufiane.png" },
    { id: 7, name: "Soufiane Haoudi", role: "Responsable Sponsoring", img: "/team/soufiane_haoudi.png" }
  ];

  return (
    <section ref={targetRef} className="relative h-[700vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center pt-[96px] bg-black">

        {/* TITLE OVERLAY */}
        <div className="absolute top-28 left-0 w-full text-center z-50 pointer-events-none">
          <h1 className="font-['Anton'] text-[56px] md:text-[80px] text-[#ffe259] uppercase opacity-80 tracking-widest leading-none">
            LE CASTING
          </h1>
        </div>

        {/* THE ENVIRONMENTAL SPOTLIGHT */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            opacity: spotlightOpacity,
            background: 'radial-gradient(circle at center, rgba(255, 226, 89, 0.1) 0%, rgba(0,0,0,0) 40%)'
          }}
        ></motion.div>

        {/* THE TAPE */}
        <motion.div
          style={{ x }}
          className="flex w-max gap-[4vw] h-[70vh] md:h-[80vh] items-center pl-[calc(50vw-40vw)] xl:pl-[calc(50vw-500px)] pr-[calc(50vw-40vw)] xl:pr-[calc(50vw-500px)]"
        >
          {team.map((member, index) => (
            <CinematicFrame key={member.id} member={member} index={index} progress={scrollYProgress} total={team.length} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}