import { useState } from "react";
import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { faqs } from "../constants";
import { SectionWrapper } from "../hoc";

const FaqItem = ({ question, answer, index, isOpen, onToggle }) => {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card-static overflow-hidden"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 text-left p-5 sm:p-6 hover:bg-ink/[0.02] transition-colors"
        >
          <span className="text-ink text-[15px] sm:text-base font-medium leading-snug">
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 mt-0.5 text-brand-light text-xl leading-none transition-transform duration-300 ${
              isOpen ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>
      </h3>

      {/*
        Answers stay in the DOM and are collapsed with max-height rather than
        unmounted, so search engines and AI crawlers read every answer without
        needing to run JavaScript or click anything.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-secondary text-[14px] sm:text-[15px] font-light leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <SectionHeader
        label="FAQ"
        title="Frequently asked questions"
        description="What people usually want to know before getting in touch."
        align="center"
      />

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            {...faq}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Faq, "faq");
