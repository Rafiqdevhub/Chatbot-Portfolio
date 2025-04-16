import { useState, useEffect, useMemo } from "react";
import { UserData } from "../data/UserData";
import Marquee from "react-fast-marquee";
import { skillsData } from "../data/SkillsData";
import { skillsImage } from "../utils/SkillsImage";
import AboutImage from "../Assets/images/AboutImage.png";

function About() {
  const { about } = UserData;
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize skills to prevent unnecessary recalculations
  const skills = useMemo(
    () =>
      skillsData.map((skill, id) => ({
        id,
        name: skill,
        image: skillsImage(skill),
      })),
    []
  );

  useEffect(() => {
    // Preload the about image
    const img = new Image();
    img.src = AboutImage;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="mb-24 h-auto w-full sm:mb-0 md:h-screen">
      <div className="mx-auto flex w-[90%] flex-col justify-between rounded-lg bg-transparent p-4 shadow-lg md:flex-row md:items-center">
        <div className="flex w-full flex-col md:w-[50%]">
          <p className="pb-2 text-2xl font-semibold tracking-wide text-[#e2e8f0]">
            Who I am
          </p>
          <p className="font-poppins text-sm text-[#94a3b8] lg:text-base">
            {about}
          </p>
          <div className="mt-8">
            <Marquee
              gradient={false}
              speed={150}
              pauseOnClick={true}
              delay={0}
              play={true}
              direction="right"
            >
              {skills.map((skill) => (
                <div
                  className="ml-4 flex h-24 w-24 flex-col items-center justify-center gap-2"
                  key={skill.id}
                >
                  <img
                    className="h-[50px] w-[60px] bg-contain bg-no-repeat"
                    src={skill.image}
                    alt={skill.name}
                    loading="lazy"
                  />
                  <p className="text-[#94a3b8]">{skill.name}</p>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <div
          className={`mt-4 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } md:w-[350px] lg:mt-0 lg:h-[350px] lg:w-[550px]`}
        >
          <img
            className="max-w[500px] bg-cover bg-center bg-no-repeat h-full w-full object-cover"
            src={AboutImage}
            alt="About Me illustration"
            loading="eager"
            width="550"
            height="350"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
