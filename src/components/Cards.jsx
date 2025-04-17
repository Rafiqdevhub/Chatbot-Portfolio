import { useState, useMemo, memo, useCallback } from "react";
import { ProjectsList } from "../data/ProjectsList";

// Memoized individual project card component
const ProjectCard = memo(({ project, index, isExpanded, onToggle }) => {
  return (
    <div className="mb-8 h-auto rounded-lg bg-[#1a1a2e] p-4 shadow-lg hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] transition-shadow duration-300">
      {/* Hot label for the first project to mimic casino "HOT" tags */}
      {index === 0 && (
        <div className="absolute top-2 right-2 bg-[#e74c3c] px-2 py-0.5 text-xs font-bold text-white uppercase rounded-sm">
          Hot
        </div>
      )}

      {/* New label for the second project */}
      {index === 1 && (
        <div className="absolute top-2 right-2 bg-[#3498db] px-2 py-0.5 text-xs font-bold text-white uppercase rounded-sm">
          New
        </div>
      )}

      <h2 className="font-poppins mb-2 cursor-pointer text-base font-semibold text-white lg:text-xl relative">
        {project.name}
      </h2>
      <p className="font-poppins text-sm text-[#a3a3a3]">
        {isExpanded
          ? project.description
          : project.description.substring(0, 120)}
        <span
          className="ml-[5px] cursor-pointer text-[#f0c14b] hover:text-[#e57e31]"
          onClick={() => onToggle(index)}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          ....
        </span>
      </p>
      <div className="mt-3 flex flex-wrap lg:mt-6">
        {project.technologies.map((tech, techIndex) => (
          <p
            key={techIndex}
            className="mb-2 mr-2 inline-block rounded-full bg-[#1a1a2e] border border-[#f0c14b] px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#2a2a4e] transition-colors duration-300"
          >
            {tech}
          </p>
        ))}
      </div>
    </div>
  );
});

// Add display name for debugging purposes
ProjectCard.displayName = "ProjectCard";

function Cards() {
  const [showFullDescription, setShowFullDescription] = useState(null);

  // Memoize the projects to display
  const projectsToDisplay = useMemo(
    () => ProjectsList.projects.slice(0, 4),
    []
  );

  const toggleDescription = useCallback((index) => {
    setShowFullDescription((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <>
      {projectsToDisplay.map((project, index) => (
        <ProjectCard
          key={index}
          project={project}
          index={index}
          isExpanded={showFullDescription === index}
          onToggle={toggleDescription}
        />
      ))}
    </>
  );
}

export default Cards;
