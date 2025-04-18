import { useEffect, useState } from "react";
import { Link, Events, scrollSpy } from "react-scroll";
import { CgMenuRight } from "react-icons/cg";
import { UserData } from "../data/UserData";

const Header = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);

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

  // Animation class for active link
  const getActiveClass = (section) => {
    return activeSection === section
      ? "font-semibold text-[#f0c14b] scale-110 animate-pulse-subtle"
      : `text-[#a3a3a3] hover:text-[#f0c14b] transition-all duration-300 
         ${hoverItem === section ? "scale-110" : ""}`;
  };

  return (
    <header
      className={`fixed top-0 z-50 flex w-full items-center justify-center py-3 xs:py-4 text-base transition-all sm:px-4 lg:px-28
      ${isScrolling ? "sticky backdrop-blur-md bg-opacity-90 shadow-md" : ""}`}
    >
      <style jsx>{`
        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 5px rgba(240, 193, 75, 0);
          }
          50% {
            text-shadow: 0 0 10px rgba(240, 193, 75, 0.5);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out,
            glow 2s infinite ease-in-out;
        }
        .link-hover-effect {
          position: relative;
          transition: all 0.3s ease;
        }
        .link-hover-effect::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #f0c14b;
          transition: width 0.3s ease;
        }
        .link-hover-effect:hover::after {
          width: 100%;
        }
      `}</style>
      <nav className="hidden w-full lg:block">
        <div className="flex cursor-pointer items-center justify-center space-x-6 sm:space-x-8">
          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            to="Home-section"
            onMouseEnter={() => setHoverItem("Home-section")}
            onMouseLeave={() => setHoverItem(null)}
          >
            <p
              className={`link-hover-effect ${getActiveClass("Home-section")}`}
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
            onMouseEnter={() => setHoverItem("About-section")}
            onMouseLeave={() => setHoverItem(null)}
          >
            <p
              className={`link-hover-effect ${getActiveClass("About-section")}`}
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
            onMouseEnter={() => setHoverItem("Project-section")}
            onMouseLeave={() => setHoverItem(null)}
          >
            <p
              className={`link-hover-effect ${getActiveClass(
                "Project-section"
              )}`}
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
            onMouseEnter={() => setHoverItem("Contact-section")}
            onMouseLeave={() => setHoverItem(null)}
          >
            <p
              className={`link-hover-effect ${getActiveClass(
                "Contact-section"
              )}`}
            >
              Contact
            </p>
          </Link>
          <div
            className="transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoverItem("resume")}
            onMouseLeave={() => setHoverItem(null)}
          >
            <button
              onClick={() => {
                window.open(resumeUrl);
              }}
              className={`button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 
                hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.3)]
                ${hoverItem === "resume" ? "animate-float" : ""}`}
              style={{
                animation:
                  hoverItem === "resume"
                    ? "float 2s ease-in-out infinite"
                    : "none",
              }}
            >
              Resume
            </button>
          </div>
        </div>
      </nav>

      <div className="flex w-full px-4 justify-between items-center lg:hidden">
        <div className="text-[#f0c14b] font-semibold text-sm xs:text-base animate-pulse-subtle">
          <span className="hidden xs:inline">Muhammad</span> Rafiq
        </div>
        <button
          className="block text-[#f0c14b] hover:text-[#e57e31] focus:outline-none transition-all duration-300 hover:rotate-180"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <CgMenuRight size={28} />
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="absolute left-0 top-full block w-full cursor-pointer lg:hidden">
          <div className="navbar-bg flex flex-col items-center justify-center space-y-5 py-5 shadow-lg animate-fadeIn">
            <Link
              activeClass="active"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              to="Home-section"
              onMouseEnter={() => setHoverItem("Home-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Home-section"
                )}`}
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
              onMouseEnter={() => setHoverItem("About-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "About-section"
                )}`}
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
              onMouseEnter={() => setHoverItem("Project-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Project-section"
                )}`}
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
              onMouseEnter={() => setHoverItem("Contact-section")}
              onMouseLeave={() => setHoverItem(null)}
            >
              <p
                className={`link-hover-effect ${getActiveClass(
                  "Contact-section"
                )}`}
                onClick={toggleMobileMenu}
              >
                Contact
              </p>
            </Link>
            <div className="transform transition-transform duration-300 hover:scale-105">
              <button
                onClick={() => {
                  window.open(resumeUrl);
                  toggleMobileMenu();
                }}
                className="button-UI w-[120px] rounded-lg px-4 py-1.5 font-bold tracking-wider text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.3)]"
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
