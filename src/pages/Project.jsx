import Cards from "../components/Cards";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();

  return (
    <div className="mb-16 h-auto w-full sm:mb-0 md:h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative">
        <div className="text-center space-y-4 xs:space-y-6 mb-8 xs:mb-16 px-4">
          <h1 className="font-poppins mx-auto w-[90%] text-3xl xs:text-4xl font-bold tracking-wider text-white lg:text-5xl">
            Featured <span className="text-[#f0c14b]">Projects</span>
          </h1>
          <p className="text-[#a3a3a3] max-w-2xl mx-auto px-4 text-sm xs:text-base">
            Discover some of my recent work and innovative solutions. Each
            project demonstrates my commitment to creating impactful digital
            experiences.
          </p>
        </div>
        <div className="mx-auto mb-8 xs:mb-12 w-[94%] xs:w-[90%]">
          <div className="grid grid-cols-1 gap-6 xs:gap-8 sm:mb-12 md:grid-cols-2 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#42403b] to-[#49260b] rounded-lg opacity-20 blur-lg group-hover:opacity-30 transition duration-500"></div>

            <Cards />
          </div>
        </div>
        <div className="mx-auto w-[90%] mt-8 xs:mt-12">
          <button
            onClick={() => navigate("/projectlist")}
            className="group flex items-center gap-2 xs:gap-3 mx-auto bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-4 xs:px-6 py-2 xs:py-3 rounded-lg border border-[#f0c14b] hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] transition-all duration-300 text-sm xs:text-base"
          >
            <span className="text-white font-semibold">
              View Full Project Archive
            </span>
            <FaArrowRight className="text-[#f0c14b] group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Project;
