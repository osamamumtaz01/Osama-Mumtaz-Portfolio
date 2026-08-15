import { motion } from "framer-motion";

const SectionHeader = ({ label, title, description, align = "left" }) => {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 sm:mb-16 ${isCenter ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}
    >
      <p className="text-brand-light text-sm font-light tracking-wide mb-3">{label}</p>
      <h2 className="text-ink text-[28px] sm:text-[36px] lg:text-[40px] font-normal tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-secondary text-[15px] sm:text-[16px] leading-relaxed font-light">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
