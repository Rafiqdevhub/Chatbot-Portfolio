import { useState, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { UserData } from "../data/UserData";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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
      <div>
        <p className="font-poppins mx-auto w-[50%] pb-10 pt-8 text-center text-2xl tracking-wider text-[#e2e8f0] lg:text-3xl">
          Contact Me
        </p>
      </div>

      <div className="mx-auto flex w-[90%] flex-col justify-between rounded-lg bg-transparent p-4 shadow-lg md:flex-row md:items-center lg:w-[80%]">
        <div className="w-full md:w-[45%]">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="font-poppins mb-1 block text-sm font-medium text-[#e2e8f0]"
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
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-1 focus:ring-[#4158d0]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-poppins mb-1 block text-sm font-medium text-[#e2e8f0]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-1 focus:ring-[#4158d0]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-poppins mb-1 block text-sm font-medium text-[#e2e8f0]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your message here..."
                className="font-poppins w-full rounded-lg bg-gray-800 bg-opacity-50 px-4 py-3 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-1 focus:ring-[#4158d0]"
              ></textarea>
            </div>

            {submitStatus === "success" && (
              <div className="font-poppins rounded-lg bg-green-500 bg-opacity-20 px-4 py-2 text-sm text-green-200">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="font-poppins rounded-lg bg-red-500 bg-opacity-20 px-4 py-2 text-sm text-red-200">
                Error sending message. Please try again or contact directly via
                email.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="button-UI flex h-12 w-full items-center justify-center gap-2 rounded-lg px-6 py-2 font-bold tracking-wider text-white shadow-xl transition-colors duration-300 hover:opacity-90 disabled:opacity-70"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <span>Send Message</span>
                  <FaPaperPlane />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <p className="font-poppins mb-2 text-sm text-[#94a3b8]">
              You can also reach me directly at:
            </p>
            <a
              href={`mailto:${UserData.email}`}
              className="font-poppins text-[#e2e8f0] hover:text-[#4158d0] transition-colors duration-300"
            >
              {UserData.email}
            </a>
          </div>
        </div>

        <div className="hidden md:block md:w-[50%] lg:w-[45%]">
          <div className="h-[300px] w-full rounded-lg bg-gradient-to-br from-[#4158d0] to-[#c850c0] flex items-center justify-center">
            <div className="text-center p-6 bg-gray-900 bg-opacity-20 backdrop-blur-sm rounded-lg">
              <h3 className="font-poppins text-2xl font-bold text-white mb-2">
                Get In Touch
              </h3>
              <p className="font-poppins text-sm text-[#e2e8f0]">
                I'm always interested in new opportunities and collaborations.
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="font-poppins text-lg font-semibold text-[#e2e8f0]">
              Let's work together!
            </p>
            <p className="font-poppins text-sm text-[#94a3b8]">
              I'm open to freelance opportunities, full-time positions, and
              collaborations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
