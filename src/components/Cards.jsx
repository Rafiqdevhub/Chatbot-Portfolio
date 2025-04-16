import { useState, useMemo, memo, useCallback } from "react";
import { ProjectsList } from "../data/ProjectsList";

// Memoized individual project card component
const ProjectCard = memo(({ project, index, isExpanded, onToggle }) => {
  return (
    <div className="mb-8 h-auto rounded-lg bg-transparent p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <h2 className="font-poppins mb-2 cursor-pointer text-base font-semibold text-[#e2e8f0] lg:text-xl">
        {project.name}
      </h2>
      <p className="font-poppins text-sm text-[#94a3b8]">
        {isExpanded
          ? project.description
          : project.description.substring(0, 120)}
        <span
          className="ml-[5px] cursor-pointer text-[#94a3b8] hover:text-[#cbd5e1]"
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
            className="mb-2 mr-2 inline-block rounded-full bg-[#4158d0] bg-opacity-10 px-3 py-1 text-sm font-semibold text-[#e2e8f0] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] hover:bg-opacity-20"
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
