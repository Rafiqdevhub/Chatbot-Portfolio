import { useMemo, useCallback, memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { UserData } from "../data/UserData";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaLinkedinIn,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
// Import the image at the top level
import RafiqImageSrc from "../Assets/images/RafiqImage.svg";

// Lazy load components
const TypewriterText = lazy(() => import("../components/TypewriterText"));

// Memoize static icon mapping
const socialMediaIcons = {
  AiFillGithub,
  FaLinkedinIn,
  AiFillInstagram,
  FaSquareXTwitter,
};

// Memoize SocialMediaButton component
const SocialMediaButton = memo(({ icon: IconComponent, url }) => (
  <button
    className="flex items-center justify-center rounded-full border border-[#f0c14b] p-2 bg-transparent hover:bg-[#f0c14b] hover:bg-opacity-10 hover:border-[#e57e31] transition-all duration-300"
    onClick={() => window.open(url)}
  >
    <IconComponent className="icon text-[#f0c14b] hover:text-[#e57e31] transition-colors duration-300" />
  </button>
));

SocialMediaButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  url: PropTypes.string.isRequired,
};
SocialMediaButton.displayName = "SocialMediaButton";

// Memoize SkillItem component
const SkillItem = memo(({ icon: Icon, text }) => (
  <div className="flex items-center gap-2">
    <Icon className="text-[#f0c14b]" />
    <span>{text}</span>
  </div>
));

SkillItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
};
SkillItem.displayName = "SkillItem";

// Memoize ProfileImage component
const ProfileImage = memo(() => {
  return (
    <div className="mt-16 sm:mt-20 lg:mt-12 relative max-w-[500px] w-full mx-auto">
      <div className="absolute -top-8 -right-8 bg-[#3498db] text-white font-bold text-lg p-4 rounded-full rotate-12 shadow-lg border-2 border-white hidden lg:block">
        Full Stack Dev
      </div>
      <div className="w-full pb-[100%] relative overflow-hidden rounded-full border-4 border-[#1a1a2e] hover:border-[#f0c14b] transition-all duration-300 shadow-2xl bg-[#1a1a2e]">
        <img
          className="absolute inset-0 w-full  object-cover"
          src={RafiqImageSrc}
          alt="Developer profile"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
});

ProfileImage.displayName = "ProfileImage";

function Home() {
  const navigate = useNavigate();
  const socialMedia = useMemo(() => UserData.socialMedia, []);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const skillItems = useMemo(
    () => [
      { Icon: FaCode, text: "FRONTEND" },
      { Icon: FaServer, text: "BACKEND" },
      { Icon: FaDatabase, text: "DATABASE" },
      { Icon: FaMobile, text: "MOBILE" },
    ],
    []
  );

  return (
    <div className="mb-8 h-auto w-full sm:mb-0 min-h-[85vh] xs:min-h-[90vh] md:min-h-screen">
      <div className="mx-auto mt-16 xs:mt-20 sm:mt-24 md:mt-28 flex w-[94%] sm:w-[90%] flex-col items-center sm:flex-row lg:mt-20 lg:w-[80%] lg:justify-between">
        <div className="w-full">
          <h2 className="text-xl xs:text-2xl font-semibold leading-tight text-white lg:text-3xl">
            Welcome <span className="wave">👋</span>
          </h2>
          <h2 className="pt-2 text-xl xs:text-2xl font-semibold leading-tight text-[#f0c14b]">
            I&apos;m {UserData.name}
          </h2>

          <Suspense fallback={<div className="h-[30px] xs:h-[50px]"></div>}>
            <TypewriterText />
          </Suspense>

          <div className="mt-6 xs:mt-8 flex gap-4 xs:gap-6">
            {socialMedia.map((data, index) => (
              <SocialMediaButton
                key={index}
                icon={socialMediaIcons[data.icon]}
                url={data.url}
              />
            ))}
          </div>

          <div className="mt-6 xs:mt-8 flex flex-wrap gap-3 xs:gap-4">
            <button
              onClick={() => handleNavigate("/contact")}
              className="button-UI px-4 xs:px-6 py-2 xs:py-3 rounded-lg font-bold text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] text-sm xs:text-base"
            >
              Hire Me
            </button>

            <button
              onClick={() => handleNavigate("/projectlist")}
              className="px-4 xs:px-6 py-2 xs:py-3 rounded-lg font-bold text-white border border-[#f0c14b] shadow-xl transition-all duration-300 hover:bg-[#f0c14b] hover:bg-opacity-10 hover:border-[#e57e31] text-sm xs:text-base"
            >
              View Projects
            </button>
          </div>

          <div className="mt-6 xs:mt-8 flex flex-wrap gap-4 xs:gap-6 text-[#a3a3a3] text-xs xs:text-sm">
            {skillItems.map((item, index) => (
              <SkillItem key={index} icon={item.Icon} text={item.text} />
            ))}
          </div>
        </div>

        <ProfileImage />
      </div>
    </div>
  );
}

export default memo(Home);
