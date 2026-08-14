import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import SectionHeader from "./SectionHeader";
import { playstore } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";

const PROJECTS_PER_PAGE = 4;

const FILTERS = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web", label: "Web" },
];

const isPlayStoreLink = (url) => Boolean(url) && url.includes("play.google.com");

const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  index,
  hidden,
}) => (
  <motion.article
    hidden={hidden}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    // `flex` would override the [hidden] rule in the UA stylesheet, so the
    // display utility is swapped rather than layered on top of it.
    className={`glass-card overflow-hidden h-full group ${
      hidden ? "hidden" : "flex flex-col"
    }`}
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={`${name} — app screens`}
        width={1376}
        height={860}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-left transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b1a]/80 via-transparent to-transparent" />

      {source_code_link && (
        <a
          href={source_code_link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity hover:bg-white/20"
          aria-label={
            isPlayStoreLink(source_code_link)
              ? `View ${name} on the Play Store`
              : `Visit the ${name} website`
          }
        >
          {isPlayStoreLink(source_code_link) ? (
            <img
              src={playstore}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-5 h-5 object-contain"
            />
          ) : (
            <FaArrowUpRightFromSquare size={15} className="text-white" />
          )}
        </a>
      )}
    </div>

    <div className="p-6 sm:p-7 flex flex-col flex-1">
      <h3 className="text-white text-lg font-medium leading-snug">{name}</h3>
      <p className="mt-3 text-secondary text-[14px] font-light leading-relaxed line-clamp-4 flex-1">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={`${name}-${tag.name}`} className="tag-pill">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

const Works = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const counts = useMemo(
    () => ({
      all: projects.length,
      web: projects.filter((project) => project.category === "web").length,
      mobile: projects.filter((project) => project.category === "mobile").length,
    }),
    []
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  );

  // Guards against a stale page index if the visible set ever shrinks.
  const safePage = Math.min(currentPage, totalPages - 1);

  const selectFilter = (id) => {
    setActiveFilter(id);
    setCurrentPage(0);
  };

  const goToPage = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <SectionHeader
        label="Portfolio"
        title="Featured Projects"
        description="Real-world products I've built and scaled — from AI-powered mobile apps on the Play Store to tools on the web."
      />

      <div
        role="tablist"
        aria-label="Filter projects by platform"
        className="mb-8 sm:mb-10 flex flex-wrap gap-2"
      >
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeFilter === id}
            onClick={() => selectFilter(id)}
            className={`px-4 py-2 rounded-xl text-[13px] font-light transition-colors border ${
              activeFilter === id
                ? "bg-brand/15 border-brand/30 text-white"
                : "bg-white/[0.03] border-white/[0.08] text-secondary hover:text-white hover:border-white/20"
            }`}
          >
            {label}
            <span
              className={`ml-2 text-[11px] ${
                activeFilter === id ? "text-brand-light" : "text-secondary/60"
              }`}
            >
              {counts[id]}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeFilter}-${safePage}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6"
        >
          {/*
            Every project in the active filter stays in the DOM; off-page cards
            are hidden rather than unmounted. Slicing here would leave later
            pages out of the prerendered HTML, so crawlers and AI engines would
            only ever see the first four projects.
          */}
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              index={index % PROJECTS_PER_PAGE}
              hidden={Math.floor(index / PROJECTS_PER_PAGE) !== safePage}
              {...project}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 0}
            className="px-5 py-2.5 rounded-xl glass-card-static text-white text-sm font-light disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand/30 transition-colors"
            aria-label="Previous projects"
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
                aria-current={safePage === index ? "page" : undefined}
                className={`h-2 rounded-full transition-all ${
                  safePage === index
                    ? "w-7 bg-brand"
                    : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages - 1}
            className="px-5 py-2.5 rounded-xl glass-card-static text-white text-sm font-light disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand/30 transition-colors"
            aria-label="Next projects"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Works, "projects");
