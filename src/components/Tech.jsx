import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";

const Tech = () => {
  return (
    <>
      <SectionHeader
        label="Stack"
        title="Technologies"
        description="Tools and frameworks I use to build and ship mobile products."
        align="center"
      />

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4">
        {technologies.map((technology, index) => (
          <motion.div
            key={technology.name}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="glass-card p-4 sm:p-5 flex flex-col items-center gap-3 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img
                src={technology.icon}
                alt={technology.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-secondary text-[11px] sm:text-xs font-light text-center leading-tight group-hover:text-ink/80 transition-colors">
              {technology.name}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "expertise");
