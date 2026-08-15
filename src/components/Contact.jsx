import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaLinkedin, FaWhatsapp } from "react-icons/fa";

import SectionHeader from "./SectionHeader";
import { SectionWrapper } from "../hoc";

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-success-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />

      <div className="relative glass-card-static p-8 sm:p-10 max-w-md w-full text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink/10 text-ink text-xl leading-none hover:bg-ink/20 transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-brand/15 border border-brand/25 flex items-center justify-center text-brand-light text-2xl">
          ✓
        </div>

        <h3 id="contact-success-title" className="text-ink font-medium text-2xl">
          Message sent
        </h3>

        <p className="mt-4 text-secondary text-[15px] font-light leading-relaxed">
          Thank you. I will get back to you as soon as possible.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 hero-cta-primary px-8 py-3 rounded-xl text-white font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const contactLinks = [
  {
    label: "Email",
    value: "osamamumtaz96@gmail.com",
    href: "mailto:osamamumtaz96@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "LinkedIn",
    value: "osamamumtaz01",
    href: "https://www.linkedin.com/in/osamamumtaz01/",
    icon: FaLinkedin,
  },
  {
    label: "WhatsApp",
    value: "+92 318 5297392",
    href: "https://wa.me/+923185297392",
    icon: FaWhatsapp,
  },
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const emailjsServiceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

  const isEmailJsConfigured = Boolean(
    emailjsServiceId && emailjsTemplateId && emailjsPublicKey
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailJsConfigured) {
      alert(
        "The contact form is not configured yet. Please add your EmailJS credentials to a .env file and restart the dev server."
      );
      return;
    }

    setLoading(true);

    emailjs
      .send(
        emailjsServiceId,
        emailjsTemplateId,
        {
          from_name: form.name,
          to_name: "Osama Mumtaz",
          from_email: form.email,
          to_email: "osamamumtaz96@gmail.com",
          message: form.message,
        },
        emailjsPublicKey
      )
      .then(
        () => {
          setLoading(false);
          setShowSuccessModal(true);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <>
      <SectionHeader
        label="Contact"
        title="Let's work together"
        description="Have a product idea, role, or collaboration in mind? Send a message — I typically reply within 24 hours."
        align="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-5 sm:gap-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card-static p-6 sm:p-8 space-y-6"
        >
          <div>
            <h3 className="text-ink text-lg font-medium">Direct channels</h3>
            <p className="text-secondary text-sm font-light mt-2 leading-relaxed">
              Prefer reaching out directly? Use any of these — I&apos;m happy to connect.
            </p>
          </div>

          <div className="space-y-3">
            {contactLinks.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-xl bg-ink/[0.03] border border-ink/[0.06] hover:border-brand/25 hover:bg-ink/[0.05] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand-light group-hover:text-ink transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-secondary text-xs font-light">{label}</p>
                  <p className="text-ink text-sm font-light mt-0.5">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card-static p-6 sm:p-8"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-ink/80 text-sm font-light">Your name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="modern-input py-3.5 px-4 text-ink text-[15px] font-light placeholder:text-secondary/60"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-ink/80 text-sm font-light">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="modern-input py-3.5 px-4 text-ink text-[15px] font-light placeholder:text-secondary/60"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-ink/80 text-sm font-light">Message</span>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                required
                className="modern-input py-3.5 px-4 text-ink text-[15px] font-light placeholder:text-secondary/60 resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="hero-cta-primary mt-2 py-3.5 px-8 rounded-xl text-white text-[15px] font-medium w-fit disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default SectionWrapper(Contact, "contact");
