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
        <div className="relative w-[260px] md:w-[380px] aspect-[3/4] overflow-hidden border border-[#2A2A2A] bg-black shadow-2xl group">
          <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700" />
        </div>

        <div className="text-center md:text-left flex flex-col">
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
  // Calculates translation dynamically to center index 0 on load and index 5 at the end
  const xValue = useTransform(scrollYProgress, [0, 1], [0, -1]);
  const x = useTransform(xValue, (val) => `calc(${val} * (min(400vw, 5000px) + 20vw))`);

  // Dynamically fades out the spotlight at the end of the scroll
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.95, 1], [1, 1, 0]);

  const team = [
    { id: 1, name: "Wissam", role: "Chef d'Organisation", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxiz4K8ZhNlnrljuw2qaB-9CUGxIgfqxGdtt_Lj7lxgHKeX-7VflbbD8JmyqIHzdW3xLJfFhdnOHKXZcog-qfLGKmIBWldYOLS8c_fwwvZer19h3t1HxIW_X1VNYGRG9q__KgC1weaTsC4wnygJ6RuKxlwjn3bEhsqv0Jrlgu_8bo8EqcdLLhIi5xLT0echIfKl-uevUEtMp0-unCcLru8CSZv-_O3GyGEcKhjiXCK50qwWqBxg9zKTyGfyMXLMdTAzlYIW9G-4iM" },
    { id: 2, name: "Dounia", role: "Directrice Artistique", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-0gkrdGI22JXYTHoOoFD3g4wf7vxeQgYvZPcN6XqFVxVPTwqQzvbwKajX9NQ5FiJYUa1C2T_6I7sl1mjWZwRN3aPT_Hfj61u32W2B_4HiDkvTRPU6H0EKf-Eces4BmJwGxo1Jf61eBDsGQsEsG7y89QLCeGz1VnK3gGul8kqX5NFtdxNpDEIGJ4JjYgf3WI-4b_y9AT6zVnVfRD9b31iAKGLPWuHKZthU791JANWsDi0HNFbyxATagFHKsi49wDCXajMsa10vqJI" },
    { id: 3, name: "Soufiane", role: "Responsable Technique", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs-jQ9mxdQS-gZ6KqdV8J_i9CSK7YQ0p1CxpxArTxoLkSpNutOrYkokvOkXkGSep123qZ9qT9m_PfxGL-eOsHRYdjRR-JPQLgOElA-KmPWalwYPBi2miD5Oz05lVI6ovyV_gFlxspI1QBecA8yy_DA6TuA69-5p5bDThWyzrN2cARycC758CV2pxfCaKA5fn-0Gv7SHoASKrQODU6f7vzPrE-Y7KUwnkRw5oPOJeMIQLImx-4qlaSh8QkMI8t1SMhqbXlqtY71DXU" },
    { id: 4, name: "Hiba", role: "Programmation", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDcTnKyS0gXNSiKIy5MA-OFfRO5xUbuCwgrnWKZ89jNqpib_qUsdLdBCOXaBRKX0gDRx7EatpmxJTa9WqY3duVGRt0bdTZuXNCKFCxLgpKKwO6u-Ou2zwSPQuEm5t6-Uvq-NkkDkzftlNtc8CAhoDbz_deT9cgmYf9Oykupqrg1md26yEdMDz6Ltz70RSAji0besg0B8V9resnKwYtPBqc25PY29VhyRhisVy-v_yau_cLQqHBhTsGQM8Bh-iZG2axLZuAGtNDiWg" },
    { id: 5, name: "Asmaa", role: "Communication", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQJvrdhQX7M16PlwwI1T1ajtbkoJeYisU7X8Wws3zR1izKjKmcOEmia9Ma_EAUIBg9WYo1L4rypNdDdVF4xVb8EMS2AjHovja3cMYDKOHbZ2vDomds-lvwAl14O1Nahu_xf96U9EU8f_cfcduJSAIAYmBm4vB-Klz8XHKLYi_tZZwAjliRB8aplgBQ7ctn5b3hYU9jPFG9ui9aMMWSas-pCjVaRrnqhZa0Nm12dYC58RFjXCMGM6v9N0FbqFSU1gXmGpTq_C9mtvM" },
    { id: 6, name: "Abla", role: "Logistique", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzp6TmA-M5cdE7gv5EHdCsCL33oGyWB49NKeJqKlK3kTCSw5Yd08Eei-2Vrdvnfmc2lEs4BCXVStkEm9wWbzb6OxoAxxLOirHtXQSYd_12bBvekl3bQ_wk18vBQNfTRSbM_ENOMV9gNmOxj4L0scuecKifYj3N-qX44e-pJ_NluBQ2ykwhhyggRgyNrnVjc1Zm-EtyoCzTM6dnxmL8nAUnyNUKyPRMZvW0RP6x2sUtSpYRiTuGbj8B2YxoJPK6ZsPDBkkrWCRLHo" }
  ];

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-black">
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