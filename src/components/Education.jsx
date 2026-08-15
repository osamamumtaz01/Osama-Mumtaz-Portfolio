import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { educations } from "../constants";
import { SectionWrapper } from "../hoc";

const EducationCard = ({ education, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="glass-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6"
  >
    <div className="w-12 h-12 shrink-0 rounded-xl bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center">
      <img
        src={education.icon}
        alt={education.institution}
        loading="lazy"
        decoding="async"
        className="w-7 h-7 object-contain"
      />
    </div>

    <div className="flex-1 min-w-0">
      <h3 className="text-ink text-lg font-medium">{education.title}</h3>
      <p className="text-secondary text-sm font-light mt-1">{education.institution}</p>
    </div>

    <span className="tag-pill shrink-0 self-start sm:self-center">{education.date}</span>
  </motion.div>
);

const Education = () => {
  return (
    <>
      <SectionHeader
        label="Academics"
        title="Education"
        description="Foundation in software engineering that shaped my technical career."
        align="center"
      />

      <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
        {educations.map((education, index) => (
          <EducationCard key={education.title} education={education} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
