import TypewriterText from "../components/TypewriterText";
import { UserData } from "../data/UserData";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import {
  FaSquareXTwitter,
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
} from "react-icons/fa6";
import imagedeveloper from "../Assets/images/imagedeveloper.png";

function Home() {
  const socialMedia = UserData.socialMedia;

  const socialMediaIcons = {
    AiFillGithub: AiFillGithub,
    FaLinkedinIn: FaLinkedinIn,
    AiFillInstagram: AiFillInstagram,
    FaSquareXTwitter: FaSquareXTwitter,
  };

  return (
    <div className="mb-28 h-auto w-full sm:mb-0 md:h-screen">
      <div className="mx-auto mt-40 flex w-[90%] flex-col items-center sm:flex-row lg:mt-32 lg:w-[80%] lg:justify-between">
        <div className="w-full">
          <h2 className="text-2xl font-semibold leading-tight text-white lg:text-3xl">
            Welcome <span className="wave">👋</span>
          </h2>
          <h2 className="pt-2 text-2xl font-semibold leading-tight text-[#f0c14b]">
            I'm {UserData.name}
          </h2>
          <TypewriterText />

          <div className="mt-8 flex gap-6">
            {socialMedia.map((data, index) => {
              const IconComponent = socialMediaIcons[data.icon];
              return (
                <button
                  className="flex items-center justify-center rounded-full border border-[#f0c14b] p-2 bg-transparent hover:bg-[#f0c14b] hover:bg-opacity-20 transition-all duration-300"
                  key={index}
                  onClick={() => window.open(data.url)}
                >
                  <IconComponent className="icon text-[#f0c14b]" />
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="button-UI px-6 py-3 rounded-lg font-bold text-[#0f0f1a] shadow-xl transition-all duration-300 hover:opacity-90"
            >
              Hire Me
            </a>

            <a
              href="/projectlist"
              className="px-6 py-3 rounded-lg font-bold text-white border border-[#f0c14b] shadow-xl transition-all duration-300 hover:bg-[#f0c14b] hover:bg-opacity-20"
            >
              View Projects
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-[#a3a3a3]">
            <div className="flex items-center gap-2">
              <FaCode className="text-[#f0c14b]" />
              <span>FRONTEND</span>
            </div>
            <div className="flex items-center gap-2">
              <FaServer className="text-[#f0c14b]" />
              <span>BACKEND</span>
            </div>
            <div className="flex items-center gap-2">
              <FaDatabase className="text-[#f0c14b]" />
              <span>DATABASE</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMobile className="text-[#f0c14b]" />
              <span>MOBILE</span>
            </div>
          </div>
        </div>

        <div className="mt-20 lg:mt-12 relative">
          <div className="absolute -top-8 -right-8 bg-[#3498db] text-white font-bold text-lg p-4 rounded-full rotate-12 shadow-lg border-2 border-white hidden lg:block">
            Full Stack Dev
          </div>
          <img
            className="max-w[550px] bg-cover bg-center bg-no-repeat lg:h-[400px] lg:w-[600px] rounded-lg shadow-2xl"
            src={imagedeveloper}
            alt="Developer profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
