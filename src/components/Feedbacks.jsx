import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";

const TESTIMONIALS_PER_PAGE = 6;
const PREVIEW_CHAR_LIMIT = 160;

const TestimonialText = ({ text, id, className = "", paragraphClassName = "" }) => {
  const paragraphs = text
    .split("\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div id={id} className={className}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className={`${paragraphClassName}${index > 0 ? " mt-4" : ""}`}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

const truncateTestimonial = (text, limit) => {
  if (text.length <= limit) {
    return { preview: text, isTruncated: false };
  }

  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");
  const preview = `${lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated}...`;

  return { preview, isTruncated: true };
};

const TestimonialModal = ({ testimonial, onClose }) => {
  useEffect(() => {
    if (!testimonial) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [testimonial, onClose]);

  if (!testimonial) return null;

  const { testimonial: text, name, designation, company, image } = testimonial;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close testimonial"
        onClick={onClose}
      />

      <div className="relative glass-card-static p-8 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/10 text-ink text-xl leading-none hover:bg-ink/20 transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-brand-light text-4xl leading-none font-serif">&ldquo;</p>

        <TestimonialText
          text={text}
          id="testimonial-modal-title"
          className="mt-2"
          paragraphClassName="text-ink/90 text-[16px] leading-relaxed font-light"
        />

        <div className="mt-8 flex justify-between items-center gap-4 border-t border-ink/10 pt-6">
          <div className="flex-1 flex flex-col">
            <p className="text-ink font-medium text-[15px]">{name}</p>
            <p className="mt-1 text-secondary text-[13px] font-light">
              {designation} · {company}
            </p>
          </div>

          <img
            src={image}
            alt={`Photo of ${name}`}
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            className="w-11 h-11 rounded-full object-cover border border-ink/10"
          />
        </div>
      </div>
    </div>
  );
};

const FeedbackCard = ({ testimonial, name, designation, company, image, onReadMore, index }) => {
  const { preview, isTruncated } = truncateTestimonial(testimonial, PREVIEW_CHAR_LIMIT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
      className="glass-card p-6 sm:p-7 h-full flex flex-col min-h-[280px]"
    >
      <p className="text-brand-light text-3xl leading-none font-serif">&ldquo;</p>

      <div className="mt-3 flex flex-col flex-1">
        <TestimonialText
          text={preview}
          className="line-clamp-5"
          paragraphClassName="text-[14px] text-ink/80 font-light leading-relaxed"
        />

        {isTruncated && (
          <button
            type="button"
            onClick={() =>
              onReadMore({ testimonial, name, designation, company, image })
            }
            className="mt-4 self-start text-[13px] text-brand-light hover:text-ink transition-colors font-light"
          >
            Read more →
          </button>
        )}

        <div className="mt-auto pt-6 flex items-center gap-3 border-t border-ink/[0.06]">
          <img
            src={image}
            alt={`Photo of ${name}`}
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className="w-9 h-9 rounded-full object-cover border border-ink/10"
          />
          <div>
            <p className="text-ink text-[14px] font-medium">{name}</p>
            <p className="text-secondary text-[12px] font-light mt-0.5">
              {designation} · {company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Feedbacks = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(testimonials.length / TESTIMONIALS_PER_PAGE);

  const paginatedTestimonials = useMemo(
    () =>
      testimonials.slice(
        currentPage * TESTIMONIALS_PER_PAGE,
        (currentPage + 1) * TESTIMONIALS_PER_PAGE
      ),
    [currentPage]
  );

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <SectionHeader
        label="Social proof"
        title="Testimonials"
        description="What colleagues and leaders say about working with me."
        align="center"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {paginatedTestimonials.map((item, index) => (
            <FeedbackCard
              key={item.name}
              index={index}
              {...item}
              onReadMore={setSelectedTestimonial}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-5 py-2.5 rounded-xl glass-card-static text-ink text-sm font-light disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand/30 transition-colors"
            aria-label="Previous testimonials"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
                aria-current={currentPage === index ? "page" : undefined}
                className={`h-2 rounded-full transition-all ${
                  currentPage === index
                    ? "w-7 bg-brand"
                    : "w-2 bg-ink/25 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-5 py-2.5 rounded-xl glass-card-static text-ink text-sm font-light disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand/30 transition-colors"
            aria-label="Next testimonials"
          >
            Next
          </button>
        </div>
      )}

      <TestimonialModal
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
