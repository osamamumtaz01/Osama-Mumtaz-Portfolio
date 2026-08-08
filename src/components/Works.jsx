import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader";
import { playstore } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";

const ProjectCard = ({ name, description, tags, image, source_code_link, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="glass-card overflow-hidden h-full flex flex-col group"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={`${name} — app screens`}
        width={1376}
        height={768}
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
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
          aria-label={`View ${name} on Play Store`}
        >
          <img src={playstore} alt="" loading="lazy" decoding="async" className="w-5 h-5 object-contain" />
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
  return (
    <>
      <SectionHeader
        label="Portfolio"
        title="Featured Projects"
        description="Real-world apps I've built and scaled — from AI-powered learning to utility products on the Play Store."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
