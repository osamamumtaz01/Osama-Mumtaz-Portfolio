import { motion } from "framer-motion";
import { useState } from "react";

import { styles } from "../styles";
import { heroStats, heroStack, heroProfile } from "../constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="hero-glow hero-glow-accent" />
    <div className="hero-glow hero-glow-teal" />
    <div className="hero-grid absolute inset-0 opacity-[0.25]" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
  </div>
);

const HeroProfileCard = () => {
  const [profileError, setProfileError] = useState(false);

  return (
    <motion.div
      {...fadeUp(0.3)}
      className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto"
    >
      <div className="relative hero-glass rounded-[28px] border border-white/10 overflow-hidden">
        <div className="relative aspect-[5/4] sm:aspect-[16/12] bg-tertiary overflow-hidden">
          {!profileError ? (
            <img
              src="/profile.webp"
              alt="Osama Mumtaz"
              width={1000}
              height={1620}
              decoding="async"
              fetchpriority="high"
              className="absolute inset-0 w-full h-50 object-cover object-[center_0%] scale-[0.5] origin-top"
              onError={() => setProfileError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/20 via-tertiary to-primary">
              <span className="text-6xl font-light text-white/70">OM</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a] via-[#0d0b1a]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-accent text-xs tracking-wide">
                Available for new opportunities
              </span>
            </div>
            <h2 className="text-white text-2xl sm:text-[28px] font-medium tracking-tight">
              Osama Mumtaz
            </h2>
            <p className="text-white/70 text-sm sm:text-[15px] mt-1 font-light">
              {heroProfile.title}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <p className="text-secondary text-[15px] leading-relaxed font-light">
            {heroProfile.bio}
          </p>

          <ul className="space-y-3">
            {heroProfile.highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[14px] text-white/80 font-light leading-snug"
              >
                <span className="text-brand-light mt-1 shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-secondary font-light">
            <span>
              <span className="text-white/50">Based in </span>
              {heroProfile.location}
            </span>
            <span>
              <span className="text-white/50">At </span>
              {heroProfile.company}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3 pt-2 border-t border-white/[0.06]">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-white text-lg sm:text-xl font-medium">{stat.value}</p>
                <p className="text-secondary text-[10px] sm:text-[11px] mt-1 leading-tight font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {heroStack.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full text-[11px] text-white/75 bg-white/[0.04] border border-white/[0.08] font-light"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <HeroBackground />

      <div className={`relative z-10 w-full ${styles.paddingX} pt-28 pb-20 max-w-7xl mx-auto`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          <HeroProfileCard />

          <div className="max-w-xl">
            <motion.p
              {...fadeUp(0)}
              className="text-brand-light text-sm font-light tracking-wide mb-5"
            >
              Technical Product Manager · Islamabad
            </motion.p>

            <motion.h1
              {...fadeUp(0.08)}
              className="text-white font-normal text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.15] tracking-tight"
            >
              I build mobile products that{" "}
              <span className="hero-gradient-text font-medium">scale</span> - and
              teams that deliver.
            </motion.h1>

            <motion.p
              {...fadeUp(0.16)}
              className="mt-5 text-secondary text-[16px] leading-relaxed font-light max-w-lg"
            >
              From product vision to Play Store launch, I help founders and companies
              ship Android apps with clarity, speed, and craft.
            </motion.p>

            <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="hero-cta-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-[15px] font-medium transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="text-secondary text-[15px] font-light hover:text-white transition-colors"
              >
                View experience →
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
