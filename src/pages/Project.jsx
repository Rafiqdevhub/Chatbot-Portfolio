import Cards from "../components/Cards";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Project() {
  const navigate = useNavigate();
  return (
    <div className="mb-16 h-auto w-full sm:mb-0 md:h-screen">
      <div>
        <p className="font-poppins mx-auto w-[80%] pb-6 pt-4 text-center text-2xl tracking-wider text-white lg:text-3xl">
          Featured <span className="text-[#f0c14b]">Projects</span>
        </p>
      </div>
      <div className="mx-auto mb-2 grid w-[90%] grid-cols-1 gap-4 sm:mb-8 md:grid-cols-2">
        <Cards />
      </div>
      <div className="mx-auto w-[90%]">
        <p className="flex cursor-pointer items-center gap-2 font-semibold leading-tight text-white">
          <div
            className="font-poppins group relative"
            onClick={() => {
              navigate("/projectlist");
            }}
          >
            <span>View Full Project Archive</span>
            <span className="absolute bottom-0 left-0 top-6 h-[2px] w-full bg-[#f0c14b] opacity-0 transition-opacity group-hover:opacity-100"></span>
          </div>

          <FaLocationArrow className="text-[#f0c14b]" />
        </p>
      </div>
    </div>
  );
}

export default Project;
