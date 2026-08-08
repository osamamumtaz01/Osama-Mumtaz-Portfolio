import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";

const ExperienceCard = ({ experience, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8"
  >
    <div className="md:text-right pt-1">
      <p className="text-brand-light text-sm font-light">{experience.date}</p>
    </div>

    <div className="relative pl-0 md:pl-8">
      {!isLast && (
        <span className="hidden md:block absolute left-[3px] top-8 bottom-0 w-px bg-white/10" />
      )}
      <span className="hidden md:block absolute left-0 top-2 w-[7px] h-[7px] rounded-full bg-brand border-2 border-primary" />

      <div className="glass-card p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <img
              src={experience.icon}
              alt={experience.company_name}
              loading="lazy"
              decoding="async"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h3 className="text-white text-lg font-medium">{experience.title}</h3>
            <p className="text-secondary text-sm font-light mt-1">
              {experience.company_name}
            </p>
          </div>
        </div>

        <ul className="mt-5 space-y-2.5">
          {experience.points.map((point, pointIndex) => (
            <li
              key={pointIndex}
              className="flex gap-3 text-white/75 text-[14px] font-light leading-relaxed"
            >
              <span className="text-brand-light shrink-0 mt-1.5 w-1 h-1 rounded-full bg-brand-light" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const Experience = () => {
  return (
    <>
      <SectionHeader
        label="Career"
        title="Work Experience"
        description="Roles where I've led teams, shipped products, and driven growth."
        align="center"
      />

      <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`${experience.title}-${experience.date}`}
            experience={experience}
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
