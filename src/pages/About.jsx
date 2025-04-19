import { useState, useEffect, useMemo } from "react";
import { UserData } from "../data/UserData";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";
import AboutImage from "../Assets/images/AboutImage.png";
import { useNavigate } from "react-router-dom";

function About() {
  const { about } = UserData;
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("frontend");
  const navigate = useNavigate();
  const [animateSkills, setAnimateSkills] = useState(false);

  // Define skill categories
  const skillCategories = {
    frontend: [
      "html",
      "CSS",
      "Javascript",
      "Typescript",
      "React",
      "Next JS",
      "ViteJS",
      "Tailwind",
      "Bootstrap",
      "MaterialUI",
    ],
    backend: [
      "NodeJS",
      "Express",
      "Python",
      "Django",
      "Flask",
      "FastAPI",
      "golang",
    ],
    database: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
    devOps: ["Git", "Github", "Docker", "Nginx", "Ubuntu"],
    tools: ["Figma", "Canva", "Stripe"],
  };

  // Memoize skills to prevent unnecessary recalculations
  const skills = useMemo(
    () =>
      skillsData.map((skill, id) => ({
        id,
        name: skill,
        image: skillsImage(skill),
        category:
          Object.keys(skillCategories).find((category) =>
            skillCategories[category].includes(skill)
          ) || "other",
      })),
    [skillCategories]
  );

  // Add animation classes for skills
  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };

  useEffect(() => {
    // Preload the about image
    const img = new Image();
    img.src = AboutImage;
    img.onload = () => setIsLoaded(true);

    // Add scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            if (entry.target.id === "skills-section") {
              setAnimateSkills(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Add a slight delay before triggering skill animations
    setTimeout(() => {
      setAnimateSkills(true);
    }, 800);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mb-8 h-auto w-full sm:mb-0 space-y-6 xs:space-y-8">
      {/* Hero Section */}
      <div className="mx-auto w-[94%] xs:w-[90%] rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#12122a] p-4 xs:p-6 sm:p-8 shadow-2xl border border-[#1a1a2e] hover:shadow-[0_0_20px_rgba(240,193,75,0.3)] transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div
            className="flex-1 space-y-4 xs:space-y-6 animate-on-scroll"
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className="text-3xl xs:text-4xl font-bold text-white mb-2 xs:mb-4 relative">
              <span className="text-[#f0c14b] relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-[#f0c14b] after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                About
              </span>{" "}
              <span className="relative after:content-[''] after:absolute after:w-full after:h-[3px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Me
              </span>
            </h1>
            <p className="font-poppins text-base xs:text-lg leading-relaxed text-[#a3a3a3]">
              {about}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 mt-4 xs:mt-6">
              <div className="p-3 xs:p-4 bg-[#12122a]/50 rounded-lg border-l-4 border-[#f0c14b] shadow-lg hover:shadow-[0_5px_15px_rgba(240,193,75,0.2)] transition-all duration-300">
                <p className="text-white font-bold mb-1 xs:mb-2 text-sm xs:text-base">
                  Full Stack Expert
                </p>
                <p className="text-[#a3a3a3] text-xs xs:text-sm">
                  End-to-end development specialist
                </p>
              </div>
              <div className="p-3 xs:p-4 bg-[#12122a]/50 rounded-lg border-l-4 border-blue-500 shadow-lg hover:shadow-[0_5px_15px_rgba(52,152,219,0.2)] transition-all duration-300">
                <p className="text-white font-bold mb-1 xs:mb-2 text-sm xs:text-base">
                  Problem Solver
                </p>
                <p className="text-[#a3a3a3] text-xs xs:text-sm">
                  Creative solutions architect
                </p>
              </div>
            </div>
          </div>
          <div
            className={`mt-6 md:mt-0 md:w-[400px] transition-all duration-700 ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#f0c14b] to-[#3498db] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative">
                <div className="absolute -top-3 -left-3 xs:-top-4 xs:-left-4 bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white text-xs font-bold py-1 px-2 xs:py-2 xs:px-4 rounded-full z-10 shadow-lg hover:shadow-[0_0_10px_rgba(52,152,219,0.5)] transition-all duration-300">
                  PROFESSIONAL
                </div>
                <img
                  className="rounded-lg shadow-2xl w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(240,193,75,0.3)]"
                  src={AboutImage}
                  alt="About Muhammad Rafiq"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div
        id="skills-section"
        className="mx-auto w-[94%] xs:w-[90%] rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#12122a] p-4 xs:p-6 sm:p-8 shadow-2xl hover:shadow-[0_0_25px_rgba(52,152,219,0.2)] transition-all duration-500 animate-on-scroll"
      >
        <h2 className="text-2xl xs:text-3xl font-bold text-white mb-6 xs:mb-8 relative inline-block">
          Technical{" "}
          <span className="text-[#f0c14b] relative">
            Expertise
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#f0c14b] to-[#3498db] transform origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
          </span>
          <div className="absolute -bottom-2 left-0 w-1/3 h-[3px] bg-gradient-to-r from-[#f0c14b] to-transparent animate-pulse"></div>
        </h2>

        {/* Skills Navigation */}
        <div className="flex flex-wrap gap-2 xs:gap-4 mb-6 xs:mb-8">
          {Object.keys(skillCategories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-2 xs:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                activeTab === category
                  ? "bg-[#f0c14b] text-[#1a1a2e] shadow-[0_0_10px_rgba(240,193,75,0.3)]"
                  : "bg-[#12122a] text-[#a3a3a3] hover:bg-[#f0c14b] hover:bg-opacity-20 hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 xs:gap-6">
          {skills
            .filter((skill) => skill.category === activeTab)
            .map((skill, index) => (
              <div
                key={skill.id}
                className={`group flex flex-col items-center justify-center p-2 xs:p-4 bg-[#12122a]/50 rounded-lg hover:bg-[#2a2a4e] transition-all duration-500 shadow-md hover:shadow-[0_5px_15px_rgba(52,152,219,0.2)] ${
                  animateSkills ? "animate-fadeIn" : "opacity-0"
                }`}
                style={{ animationDelay: getAnimationDelay(index) }}
              >
                <div className="relative w-12 h-12 xs:w-16 xs:h-16 mb-2 xs:mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f0c14b] to-[#3498db] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      className="w-8 h-8 xs:w-12 xs:h-12 transition-transform duration-500 group-hover:scale-110"
                      src={skill.image}
                      alt={skill.name}
                      loading="lazy"
                    />
                  </div>
                </div>
                <p className="text-[#a3a3a3] text-xs xs:text-sm font-medium group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </p>
              </div>
            ))}
        </div>

        <div className="mt-8 xs:mt-12 text-center">
          <button
            onClick={() => navigate("/projectlist")}
            className="px-6 xs:px-8 py-3 xs:py-4 rounded-lg font-bold text-white bg-gradient-to-r from-[#f0c14b] to-[#3498db] hover:from-[#3498db] hover:to-[#f0c14b] transition-all duration-500 shadow-xl hover:shadow-[0_10px_25px_rgba(52,152,219,0.3)] relative overflow-hidden group"
          >
            <span className="relative z-10">View My Projects</span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
