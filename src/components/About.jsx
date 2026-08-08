import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ title, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="glass-card p-6 sm:p-7 flex flex-col items-center text-center gap-5 h-full"
  >
    <div className="w-14 h-14 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center">
      <img
        src={icon}
        alt=""
        loading="lazy"
        decoding="async"
        className="w-8 h-8 object-contain"
      />
    </div>
    <h3 className="text-white text-[16px] sm:text-[17px] font-medium leading-snug">
      {title}
    </h3>
  </motion.div>
);

const About = () => {
  return (
    <>
      <SectionHeader
        label="Introduction"
        title="Overview"
        description="Technical Product Manager and Sr. Software Engineer with 6+ years in mobile development — leading cross-functional teams and shipping products that scale."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
