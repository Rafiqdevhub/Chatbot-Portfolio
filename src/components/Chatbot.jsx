import { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { UserData } from "../data/UserData";
import { ProjectsList } from "../data/ProjectsList";

const portfolioContext = {
  owner: {
    name: UserData.name,
    email: UserData.email,
    role: "Full Stack Developer",
    expertise: [
      "Frontend Development with React and Next.js",
      "Backend Development with Node.js and Python",
      "Cloud Services (AWS, GCP)",
      "Database Management (SQL and NoSQL)",
      "API Development and Integration",
      "Mobile App Development",
      "DevOps and CI/CD",
    ],
    biography: UserData.about,
  },
  skills: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
    ],
    backend: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "FastAPI",
      "Flask",
      "Go",
    ],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    cloud: ["AWS", "GCP", "Azure", "Netlify", "Vercel"],
    devops: ["Docker", "GitHub Actions", "CI/CD", "Nginx"],
    other: [
      "Git",
      "RESTful APIs",
      "GraphQL",
      "Stripe",
      "Authentication Systems",
    ],
  },
  experience: {
    summary:
      "Experienced in developing scalable web applications, implementing responsive designs, and optimizing application performance. Strong focus on clean code, user experience, and modern development practices.",
    highlights: [
      "Developed enterprise-level applications with 99.9% uptime",
      "Reduced application load times by 60% through optimization techniques",
      "Built secure payment processing systems integrated with Stripe",
      "Implemented OAuth and JWT-based authentication systems",
      "Created RESTful APIs consumed by thousands of users daily",
    ],
  },
  education: {
    degree: "Bachelor of Science in Computer Science",
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "MongoDB Certified Developer",
    ],
  },
  projects: ProjectsList.projects.map((project) => ({
    name: project.name,
    description: project.description,
    technologies: project.technologies,
    link: project.projectLink || "",
  })),
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (inputText.trim() === "") return;

    // Add user message
    setMessages([...messages, { text: inputText, sender: "user" }]);

    // Process the user's message and generate a response
    const userMessage = inputText.toLowerCase();

    // Clear input field
    setInputText("");

    // Show typing indicator
    setIsTyping(true);

    // Add bot response with a short delay for natural feel
    setTimeout(() => {
      const response = generateContextualResponse(userMessage);
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1200);
  };

  // Advanced contextual response generator
  const generateContextualResponse = (userMessage) => {
    // Intent matching patterns with regular expressions
    const intents = [
      {
        patterns: [
          /\b(?:hi|hello|hey|greetings|howdy)\b/i,
          /\bstart\b/i,
          /\bgood (?:morning|afternoon|evening)\b/i,
        ],
        responses: [
          `Hello! I'm ${portfolioContext.owner.name}'s virtual assistant. How can I help you today?`,
          `Hi there! I'd be happy to tell you about ${portfolioContext.owner.name}'s skills, projects, or experience.`,
          `Welcome to ${portfolioContext.owner.name}'s portfolio! What would you like to know?`,
        ],
      },
      {
        patterns: [
          /\b(?:who|what|tell me about|describe) (?:is|are|about) (?:you|rafiq|your creator|developer)\b/i,
          /\b(?:who|what) (?:created|made|developed|built) (?:you|this website|this portfolio|this site)\b/i,
          /\babout\b/i,
        ],
        responses: [
          `${portfolioContext.owner.name} is a ${
            portfolioContext.owner.role
          } specializing in ${portfolioContext.owner.expertise[0]} and ${
            portfolioContext.owner.expertise[1]
          }. ${portfolioContext.owner.biography.substring(
            0,
            150
          )}... You can read more in the About section.`,
          `${
            portfolioContext.owner.name
          } is a passionate developer with expertise in ${portfolioContext.skills.frontend
            .slice(0, 3)
            .join(", ")} for frontend and ${portfolioContext.skills.backend
            .slice(0, 3)
            .join(", ")} for backend development.`,
          `${portfolioContext.owner.name} is a software developer with a focus on creating scalable, high-performance applications. Some career highlights include ${portfolioContext.experience.highlights[0]} and ${portfolioContext.experience.highlights[1]}.`,
        ],
      },
      {
        patterns: [
          /\b(?:skills|technologies|tech stack|what can you do|expertise|proficient|good at)\b/i,
          /\bwhat (?:languages|frameworks|tools) (?:does|do) (?:rafiq|he|she|they) (?:know|use|work with)\b/i,
        ],
        responseGenerator: () => {
          const frontendSkills = portfolioContext.skills.frontend
            .slice(0, 4)
            .join(", ");
          const backendSkills = portfolioContext.skills.backend
            .slice(0, 4)
            .join(", ");
          const otherSkills = [
            ...portfolioContext.skills.database.slice(0, 2),
            ...portfolioContext.skills.cloud.slice(0, 2),
          ].join(", ");

          return `${portfolioContext.owner.name} is skilled in various technologies including:
• Frontend: ${frontendSkills}
• Backend: ${backendSkills}
• Database & Cloud: ${otherSkills}
• And many more! Is there a specific technology you'd like to know about?`;
        },
      },
      {
        patterns: [
          /\b(?:projects|work|portfolio|what have you built|applications|apps)\b/i,
          /\bwhat (?:projects|apps|applications|websites) (?:has|have) (?:rafiq|he|she|they) (?:built|made|created|developed|worked on)\b/i,
        ],
        responseGenerator: () => {
          const projectCount = portfolioContext.projects.length;
          const featuredProjects = portfolioContext.projects
            .slice(0, 3)
            .map((p) => p.name)
            .join(", ");

          return `${
            portfolioContext.owner.name
          } has worked on ${projectCount} projects including ${featuredProjects}, and more. Here are a few highlights:
          
1. ${
            portfolioContext.projects[0].name
          }: ${portfolioContext.projects[0].description.substring(0, 100)}...
2. ${portfolioContext.projects[1]?.name || "Project 2"}: ${
            portfolioContext.projects[1]?.description.substring(0, 100) ||
            "Another exciting project"
          }...

You can explore all projects in the Projects section. Would you like details about a specific project?`;
        },
      },
      {
        patterns: [
          /\b(?:contact|email|reach out|connect|get in touch|hire)\b/i,
          /\bhow (?:can|do) i (?:contact|reach|email|connect with|hire|work with) (?:rafiq|you|him|her|them)\b/i,
        ],
        responses: [
          `You can connect with ${portfolioContext.owner.name} through the Contact section of this website, or directly via email at ${portfolioContext.owner.email}.`,
          `The best way to reach ${portfolioContext.owner.name} is through the Contact form on this website. You can also connect via LinkedIn (link in the footer).`,
          `If you'd like to discuss a project or opportunity, please use the Contact form on this website or send an email directly to ${portfolioContext.owner.email}.`,
        ],
      },
      {
        patterns: [
          /\b(?:resume|cv|download|experience)\b/i,
          /\bwhere (?:can|do) i (?:find|see|get|download|view) (?:your|rafiq's|the) (?:resume|cv)\b/i,
        ],
        responses: [
          `You can view and download ${portfolioContext.owner.name}'s resume by clicking the Resume button in the navigation bar.`,
          `${portfolioContext.owner.name}'s resume is available for download through the Resume button at the top of the page.`,
          `The Resume button in the navigation bar will let you view and download ${portfolioContext.owner.name}'s complete CV.`,
        ],
      },
      {
        patterns: [
          /\b(?:experience|work history|background|career)\b/i,
          /\bhow (?:much|long) experience\b/i,
          /\bwhat (?:is|was) (?:your|rafiq's) (?:experience|background|history)\b/i,
        ],
        responseGenerator: () => {
          return `${portfolioContext.owner.name} has extensive experience as a ${portfolioContext.owner.role}. Some notable achievements include:
• ${portfolioContext.experience.highlights[0]}
• ${portfolioContext.experience.highlights[1]}
• ${portfolioContext.experience.highlights[2]}

${portfolioContext.experience.summary}`;
        },
      },
      {
        patterns: [
          /\b(?:education|degree|university|college|school|study|studied)\b/i,
          /\bwhere (?:did|has) (?:you|rafiq) (?:study|go to school|learn|graduate|get your degree)\b/i,
        ],
        responseGenerator: () => {
          return `${portfolioContext.owner.name} has a ${
            portfolioContext.education.degree
          }. Additionally, professional certifications include ${portfolioContext.education.certifications
            .slice(0, 2)
            .join(" and ")}.`;
        },
      },
      {
        patterns: [
          /\b(?:services|offer|provide|help with|hire for|available for)\b/i,
          /\bwhat (?:services|help) (?:does|do) (?:rafiq|you) (?:offer|provide)\b/i,
          /\bcan (?:rafiq|you) (?:help|assist) (?:me|us) with\b/i,
        ],
        responseGenerator: () => {
          return `${portfolioContext.owner.name} offers the following services:
• Full-stack web application development
• Mobile app development
• Frontend design and implementation
• Backend API development
• Database design and optimization
• Performance optimization for existing applications
• Technical consultation and architecture planning

Feel free to reach out through the Contact form to discuss your specific project needs!`;
        },
      },
      {
        patterns: [
          /\b(?:thanks|thank you|helpful|appreciate|great|awesome)\b/i,
        ],
        responses: [
          `You're welcome! Feel free to ask if you have any other questions about ${portfolioContext.owner.name}'s portfolio, skills, or projects.`,
          `Happy to help! Is there anything else you'd like to know about ${portfolioContext.owner.name}'s work?`,
          `Glad I could assist. Don't hesitate to ask if you need any more information about ${portfolioContext.owner.name}'s background or projects.`,
        ],
      },
    ];

    // Check for specific skill inquiries
    const allSkills = [
      ...portfolioContext.skills.frontend,
      ...portfolioContext.skills.backend,
      ...portfolioContext.skills.database,
      ...portfolioContext.skills.cloud,
      ...portfolioContext.skills.devops,
      ...portfolioContext.skills.other,
    ];

    for (const skill of allSkills) {
      if (userMessage.includes(skill.toLowerCase())) {
        // Determine skill category
        let category = "technology";
        let projects = [];

        if (portfolioContext.skills.frontend.includes(skill))
          category = "frontend technology";
        else if (portfolioContext.skills.backend.includes(skill))
          category = "backend technology";
        else if (portfolioContext.skills.database.includes(skill))
          category = "database technology";
        else if (portfolioContext.skills.cloud.includes(skill))
          category = "cloud service";
        else if (portfolioContext.skills.devops.includes(skill))
          category = "DevOps tool";

        // Find projects using this skill
        portfolioContext.projects.forEach((project) => {
          if (project.technologies && project.technologies.includes(skill)) {
            projects.push(project.name);
          }
        });

        if (projects.length > 0) {
          return `Yes, ${
            portfolioContext.owner.name
          } is proficient in ${skill}, which is a ${category}. It was used in projects such as ${projects
            .slice(0, 2)
            .join(" and ")}${projects.length > 2 ? " and others" : ""}.`;
        } else {
          return `Yes, ${portfolioContext.owner.name} is proficient in ${skill}, which is a ${category}. You can see examples of work with this technology in the Projects section.`;
        }
      }
    }

    // Check for specific project inquiries
    for (const project of portfolioContext.projects) {
      if (userMessage.includes(project.name.toLowerCase())) {
        return `"${project.name}" is one of ${
          portfolioContext.owner.name
        }'s featured projects. ${
          project.description
        } It was built using technologies like ${
          project.technologies
            ? project.technologies.slice(0, 3).join(", ")
            : "various modern technologies"
        }. ${project.link ? `You can check it out here: ${project.link}` : ""}`;
      }
    }

    // Match intents
    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(userMessage)) {
          if (intent.responseGenerator) {
            return intent.responseGenerator();
          } else {
            const responses = intent.responses;
            return responses[Math.floor(Math.random() * responses.length)];
          }
        }
      }
    }

    // Default response
    return `I'm here to help you learn more about ${portfolioContext.owner.name}'s skills, projects, and experience. Feel free to ask about specific technologies, projects, or professional background. You can also inquire about how to get in touch if you'd like to collaborate.`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot button */}
      <button
        onClick={toggleChatbot}
        className="button-UI flex h-14 w-14 items-center justify-center rounded-full shadow-lg hover:opacity-90 transition-all duration-300"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <FaTimes className="text-white" />
        ) : (
          <FaRobot className="text-white" />
        )}
      </button>

      {/* Chatbot window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 h-[400px] w-[300px] overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] sm:w-[350px] transition-all duration-300">
          {/* Header */}
          <div className="navbar-bg flex h-12 items-center justify-between px-4">
            <p className="font-poppins text-sm font-semibold text-[#e2e8f0]">
              Chat with {UserData.name}'s Assistant
            </p>
            <button
              onClick={toggleChatbot}
              className="text-[#e2e8f0] hover:text-[#cbd5e1]"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages area */}
          <div
            className="flex h-[300px] flex-col overflow-y-auto bg-gray-900 bg-opacity-90 p-4"
            style={{ backdropFilter: "blur(15px)" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 max-w-[80%] rounded-lg px-3 py-2 ${
                  message.sender === "user"
                    ? "ml-auto bg-[#4158d0] bg-opacity-80 text-white"
                    : "bg-gray-800 bg-opacity-80 text-[#e2e8f0]"
                }`}
              >
                <p className="font-poppins text-sm whitespace-pre-line">
                  {message.text}
                </p>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="mb-4 max-w-[80%] rounded-lg px-3 py-2 bg-gray-800 bg-opacity-80 text-[#e2e8f0]">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-[#e2e8f0] animate-pulse"></div>
                  <div
                    className="h-2 w-2 rounded-full bg-[#e2e8f0] animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-[#e2e8f0] animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}

            {/* Empty div for scrolling to the end */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex h-[52px] items-center border-t border-gray-700 bg-gray-800 px-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg bg-gray-700 bg-opacity-50 px-3 py-2 text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-1 focus:ring-[#4158d0]"
            />
            <button
              onClick={handleSend}
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#4158d0] bg-opacity-80 text-white hover:bg-opacity-100 transition-colors duration-300"
              disabled={inputText.trim() === ""}
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
