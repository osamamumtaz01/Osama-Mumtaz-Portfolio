import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  {
    href: "https://www.instagram.com/osama.1.malik/",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/osama.1.malik/",
    icon: FaFacebookSquare,
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com/in/osama1malik/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-ink/[0.06] mt-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-ink font-medium text-[15px]">Osama Mumtaz</p>
          <p className="text-secondary text-sm font-light mt-1">
            Technical Product Manager · Islamabad
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-xl bg-ink/[0.04] border border-ink/[0.08] flex items-center justify-center text-secondary hover:text-ink hover:border-brand/30 transition-colors"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-ink/[0.04] py-5 text-center">
        <p className="text-secondary/70 text-xs font-light">
          © {new Date().getFullYear()} Osama Mumtaz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
