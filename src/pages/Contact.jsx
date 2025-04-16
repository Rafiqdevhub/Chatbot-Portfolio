import { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { UserData } from "../data/UserData";
import emailjs from "@emailjs/browser";
import { getEnv, validateEnv } from "../utils/env";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [envError, setEnvError] = useState(false);

  // Validate required env variables on component mount
  useEffect(() => {
    const isValid = validateEnv([
      "VITE_EMAILJS_SERVICE_ID",
      "VITE_EMAILJS_TEMPLATE_ID",
      "VITE_EMAILJS_PUBLIC_KEY",
    ]);

    if (!isValid) {
      setEnvError(true);
      console.error(
        "Missing required environment variables for the contact form"
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (envError) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = getEnv("VITE_EMAILJS_SERVICE_ID");
    const templateId = getEnv("VITE_EMAILJS_TEMPLATE_ID");
    const publicKey = getEnv("VITE_EMAILJS_PUBLIC_KEY");

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-24 h-auto w-full sm:mb-0 md:h-screen">
      <div className="text-center pb-2">
        <p className="text-3xl font-semibold text-[#e2e8f0] animate-pulse">
          💬
        </p>
        <p className="font-poppins mx-auto w-[90%] md:w-[70%] lg:w-[50%] pb-10 pt-4 text-center text-2xl tracking-wider text-[#e2e8f0] lg:text-3xl">
          Get in Touch – Let's Connect
        </p>
      </div>

      <div className="mx-auto flex w-[90%] flex-col justify-between rounded-lg bg-transparent p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:flex-row md:items-center lg:w-[80%]">
        <div className="w-full md:w-[45%]">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="font-poppins mb-2 block text-sm font-medium text-[#e2e8f0]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-2 focus:ring-[#4158d0] transition-all duration-300"
                aria-label="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-poppins mb-2 block text-sm font-medium text-[#e2e8f0]"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-2 focus:ring-[#4158d0] transition-all duration-300"
                aria-label="Your email address"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-poppins mb-2 block text-sm font-medium text-[#e2e8f0]"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Share your thoughts or project ideas..."
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-2 focus:ring-[#4158d0] transition-all duration-300 resize-none"
                aria-label="Your message"
              ></textarea>
            </div>

            {submitStatus === "success" && (
              <div
                className="font-poppins rounded-lg bg-green-500 bg-opacity-20 px-4 py-3 text-sm text-green-200 flex items-center"
                role="alert"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="font-poppins rounded-lg bg-red-500 bg-opacity-20 px-4 py-3 text-sm text-red-200 flex items-center"
                role="alert"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Error sending message. Please try again or contact directly via
                email.
              </div>
            )}

            {envError && (
              <div
                className="font-poppins rounded-lg bg-yellow-500 bg-opacity-20 px-4 py-3 text-sm text-yellow-200 flex items-center"
                role="alert"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Contact form is currently unavailable. Please reach out directly
                via email.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || envError}
              className="button-UI flex h-12 w-full items-center justify-center gap-3 rounded-lg px-6 py-2 font-bold tracking-wider text-white shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-2xl disabled:opacity-70"
              aria-label="Send message"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <span>Send Message</span>
                  <FaPaperPlane className="text-lg" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-700 pt-5">
            <p className="font-poppins mb-3 text-sm text-[#94a3b8] flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Reach me directly at:
            </p>
            <a
              href="mailto:rafkhan9323@gmail.com"
              className="font-poppins flex items-center text-[#e2e8f0] hover:text-[#4158d0] transition-colors duration-300"
              aria-label={`Email ${UserData.name} at rafkhan9323@gmail.com`}
            >
              rafkhan9323@gmail.com
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="hidden md:block md:w-[50%] lg:w-[45%] md:pl-8">
          <div className="h-[320px] w-full rounded-lg bg-gradient-to-br from-[#4158d0] to-[#c850c0] flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)]">
            <div className="text-center p-8 bg-gray-900 bg-opacity-20 backdrop-blur-sm rounded-lg w-[85%]">
              <h3 className="font-poppins text-2xl font-bold text-white mb-3">
                Let's Build Something Amazing
              </h3>
              <p className="font-poppins text-sm text-[#e2e8f0] mb-4">
                I'm always interested in new opportunities, collaborations, and
                innovative projects.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {UserData.socialMedia.slice(0, 3).map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
                    aria-label={`Connect on ${platform.socialMediaName}`}
                  >
                    <span className="text-white text-xl">
                      {platform.socialMediaName === "github" ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ) : platform.socialMediaName === "linkedin" ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      )}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="font-poppins text-lg font-semibold text-[#e2e8f0] mb-2">
              Let's work together!
            </p>
            <p className="font-poppins text-sm text-[#94a3b8]">
              I'm open to freelance opportunities, full-time positions, and
              creative collaborations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
