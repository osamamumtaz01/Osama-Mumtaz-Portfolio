import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { om, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.paddingX} fixed top-0 inset-x-0 z-30 pt-4 pb-4`}>
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-primary/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <a
          href="/"
          className="flex items-center gap-3 shrink-0"
          onClick={(event) => {
            event.preventDefault();
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent p-[1px]">
            <div className="w-full h-full rounded-[11px] bg-primary flex items-center justify-center">
              <img src={om} alt="Osama Mumtaz" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <div className="hidden xs:block">
            <p className="text-white font-medium text-[15px] leading-tight">Osama Mumtaz</p>
            <p className="text-secondary text-[11px]">Product & Engineering</p>
          </div>
        </a>

        <ul className="list-none hidden md:flex items-center gap-1">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.title)}
                className={`px-4 py-2 rounded-xl text-[14px] font-normal transition-colors ${
                  active === nav.title
                    ? "text-white bg-white/10"
                    : "text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setToggle(!toggle)}
        >
          <img
            src={toggle ? close : menu}
            alt=""
            className="w-7 h-7 object-contain"
          />
        </button>
      </div>

      {toggle && (
        <div className="md:hidden max-w-7xl mx-auto mt-3 px-4 py-5 rounded-2xl bg-primary/95 backdrop-blur-xl border border-white/10">
          <ul className="list-none flex flex-col gap-2">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                  className="block px-4 py-3 rounded-xl text-secondary hover:text-white hover:bg-white/5 text-[15px] font-medium"
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
