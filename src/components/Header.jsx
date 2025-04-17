import { useEffect, useState } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { resumeUrl } = UserData;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isCurrentScrolled = scrollTop > 0;
      setIsScrolling(isCurrentScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    Events.scrollEvent.register("begin", function (to) {
      setActiveSection(to);
    });

    scrollSpy.update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 z-50 flex w-full items-center justify-center py-4 text-base transition-all sm:px-4 lg:px-28
      ${isScrolling ? "sticky backdrop-blur-md bg-opacity-90" : ""}`}
    >
      <nav className="hidden w-full lg:block">
        <div className="flex cursor-pointer items-center justify-center space-x-8">
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="Home-section"
          >
            <p
              className={
                activeSection === "Home-section"
                  ? "font-semibold text-white"
                  : "text-[#a3a3a3] hover:text-[#f0c14b]"
              }
            >
              Home
            </p>
          </Link>

          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="About-section"
          >
            <p
              className={
                activeSection === "About-section"
                  ? "font-semibold text-white"
                  : "text-[#a3a3a3] hover:text-[#f0c14b]"
              }
            >
              About
            </p>
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="Project-section"
          >
            <p
              className={
                activeSection === "Project-section"
                  ? "font-semibold text-white"
                  : "text-[#a3a3a3] hover:text-[#f0c14b]"
              }
            >
              Projects
            </p>
          </Link>
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="Contact-section"
          >
            <p
              className={
                activeSection === "Contact-section"
                  ? "font-semibold text-white"
                  : "text-[#a3a3a3] hover:text-[#f0c14b]"
              }
            >
              Contact
            </p>
          </Link>
          <div>
            <button
              onClick={() => {
                window.open(resumeUrl);
              }}
              className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-colors duration-300 hover:text-white"
            >
              Resume
            </button>
          </div>
        </div>
      </nav>

      <div className="block w-full px-4 lg:hidden">
        <button
          className="ml-auto block text-[#f0c14b] hover:text-[#e57e31] focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <CgMenuRight size={32} />
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="absolute left-0 top-full block w-full cursor-pointer lg:hidden">
          <div className="navbar-bg flex flex-col items-center justify-center space-y-6 py-6">
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Home-section"
            >
              <p
                className={
                  activeSection === "Home-section"
                    ? "font-semibold text-white"
                    : "text-[#a3a3a3] hover:text-[#f0c14b]"
                }
                onClick={toggleMobileMenu}
              >
                Home
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="About-section"
            >
              <p
                className={
                  activeSection === "About-section"
                    ? "font-semibold text-white"
                    : "text-[#a3a3a3] hover:text-[#f0c14b]"
                }
                onClick={toggleMobileMenu}
              >
                About
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Project-section"
            >
              <p
                className={
                  activeSection === "Project-section"
                    ? "font-semibold text-white"
                    : "text-[#a3a3a3] hover:text-[#f0c14b]"
                }
                onClick={toggleMobileMenu}
              >
                Projects
              </p>
            </Link>
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Contact-section"
            >
              <p
                className={
                  activeSection === "Contact-section"
                    ? "font-semibold text-white"
                    : "text-[#a3a3a3] hover:text-[#f0c14b]"
                }
                onClick={toggleMobileMenu}
              >
                Contact
              </p>
            </Link>
            <div>
              <button
                onClick={() => {
                  window.open(resumeUrl);
                }}
                className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-colors duration-300 hover:text-white"
              >
                Resume
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
