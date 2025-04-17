import { useState, useEffect, useMemo } from "react";
import { UserData } from "../data/UserData";
import Marquee from "react-fast-marquee";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";
import AboutImage from "../Assets/images/AboutImage.png";

function About() {
  const { about } = UserData;
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    // Preload the about image
    const img = new Image();
    img.src = AboutImage;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="mb-24 h-auto w-full sm:mb-0">
      <div className="mx-auto flex w-[90%] flex-col justify-between rounded-lg bg-[#1a1a2e] p-6 shadow-lg border border-[#1a1a2e] hover:border-[#f0c14b] transition-colors duration-500 md:flex-row md:items-start">
        <div className="flex w-full flex-col md:w-[50%]">
          <p className="pb-2 text-2xl font-semibold tracking-wide text-[#f0c14b]">
            About Me
          </p>
          <p className="font-poppins text-sm text-[#a3a3a3] lg:text-base">
            {about}
          </p>

          <div className="mt-6 p-4 bg-[#12122a] rounded-lg border-l-4 border-[#f0c14b]">
            <p className="text-white font-bold mb-1">Full Stack Expertise</p>
            <p className="text-[#a3a3a3] text-sm">
              I specialize in end-to-end development, creating seamless
              experiences from database design to user interface, with a focus
              on performance and scalability.
            </p>
          </div>
        </div>

        <div
          className={`mt-6 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } md:w-[350px] lg:mt-0 md:pl-6`}
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 bg-[#3498db] text-white text-xs font-bold py-1 px-3 rounded-sm z-10">
              PROFESSIONAL
            </div>
            <img
              className="rounded-lg shadow-xl bg-cover bg-center bg-no-repeat h-full w-full object-cover border-2 border-[#f0c14b] p-1"
              src={AboutImage}
              alt="About Muhammad Rafiq"
              loading="eager"
              width="550"
              height="350"
            />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mx-auto mt-8 w-[90%] rounded-lg bg-[#1a1a2e] p-6 shadow-lg">
        <p className="text-xl font-semibold text-white mb-6">My Skill Stack</p>

        {/* Frontend Skills */}
        <div className="mb-8">
          <p className="text-[#f0c14b] font-semibold mb-4 border-b border-[#2a2a4e] pb-2">
            Frontend Development
          </p>
          <div className="flex flex-wrap gap-4">
            {skills
              .filter((skill) => skill.category === "frontend")
              .map((skill) => (
                <div
                  className="flex flex-col items-center justify-center p-3 bg-[#12122a] rounded-lg hover:bg-[#2a2a4e] transition-colors duration-300 w-[80px]"
                  key={skill.id}
                >
                  <img
                    className="h-[40px] w-[40px] bg-contain bg-no-repeat mb-2"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#a3a3a3] text-xs text-center">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div className="mb-8">
          <p className="text-[#f0c14b] font-semibold mb-4 border-b border-[#2a2a4e] pb-2">
            Backend Development
          </p>
          <div className="flex flex-wrap gap-4">
            {skills
              .filter((skill) => skill.category === "backend")
              .map((skill) => (
                <div
                  className="flex flex-col items-center justify-center p-3 bg-[#12122a] rounded-lg hover:bg-[#2a2a4e] transition-colors duration-300 w-[80px]"
                  key={skill.id}
                >
                  <img
                    className="h-[40px] w-[40px] bg-contain bg-no-repeat mb-2"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#a3a3a3] text-xs text-center">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Database Skills */}
        <div className="mb-8">
          <p className="text-[#f0c14b] font-semibold mb-4 border-b border-[#2a2a4e] pb-2">
            Database & Storage
          </p>
          <div className="flex flex-wrap gap-4">
            {skills
              .filter((skill) => skill.category === "database")
              .map((skill) => (
                <div
                  className="flex flex-col items-center justify-center p-3 bg-[#12122a] rounded-lg hover:bg-[#2a2a4e] transition-colors duration-300 w-[80px]"
                  key={skill.id}
                >
                  <img
                    className="h-[40px] w-[40px] bg-contain bg-no-repeat mb-2"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#a3a3a3] text-xs text-center">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* DevOps Skills */}
        <div className="mb-8">
          <p className="text-[#f0c14b] font-semibold mb-4 border-b border-[#2a2a4e] pb-2">
            DevOps & Deployment
          </p>
          <div className="flex flex-wrap gap-4">
            {skills
              .filter((skill) => skill.category === "devOps")
              .map((skill) => (
                <div
                  className="flex flex-col items-center justify-center p-3 bg-[#12122a] rounded-lg hover:bg-[#2a2a4e] transition-colors duration-300 w-[80px]"
                  key={skill.id}
                >
                  <img
                    className="h-[40px] w-[40px] bg-contain bg-no-repeat mb-2"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#a3a3a3] text-xs text-center">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Tools Skills */}
        <div className="mb-8">
          <p className="text-[#f0c14b] font-semibold mb-4 border-b border-[#2a2a4e] pb-2">
            Tools & Services
          </p>
          <div className="flex flex-wrap gap-4">
            {skills
              .filter((skill) => skill.category === "tools")
              .map((skill) => (
                <div
                  className="flex flex-col items-center justify-center p-3 bg-[#12122a] rounded-lg hover:bg-[#2a2a4e] transition-colors duration-300 w-[80px]"
                  key={skill.id}
                >
                  <img
                    className="h-[40px] w-[40px] bg-contain bg-no-repeat mb-2"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#a3a3a3] text-xs text-center">
                    {skill.name}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="text-white text-center text-sm">
            Always learning and exploring new technologies to stay at the
            cutting edge of web development
          </p>

          <div className="flex justify-center mt-4">
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg font-bold text-white border border-[#f0c14b] shadow-xl transition-all duration-300 hover:bg-[#f0c14b] hover:bg-opacity-20"
            >
              Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
