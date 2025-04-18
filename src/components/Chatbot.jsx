import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash } from "react-icons/fa";
import { UserData } from "../data/UserData";
import { ProjectsList } from "../data/ProjectsList";
import { generateContextualResponse } from "../utils/chatbotResponses";

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

  // Memoize the portfolio context to prevent recreation on each render
  const portfolioContext = useMemo(
    () => ({
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
    }),
    []
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChatbot = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSend = useCallback(() => {
    if (inputText.trim() === "") return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user" },
    ]);

    // Process the user's message and generate a response
    const userMessage = inputText.toLowerCase();

    // Clear input field
    setInputText("");

    // Show typing indicator
    setIsTyping(true);

    // Add bot response with a short delay for natural feel
    setTimeout(() => {
      const response = generateContextualResponse(
        userMessage,
        portfolioContext
      );
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1200);
  }, [inputText, portfolioContext]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    },
    [handleSend]
  );

  const clearConversation = useCallback(() => {
    setMessages([
      {
        text: `Hi there! I'm ${UserData.name}'s virtual assistant. How can I help you today?`,
        sender: "bot",
      },
    ]);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleChatbot}
        className="button-UI flex h-12 w-12 xs:h-14 xs:w-14 items-center justify-center rounded-full shadow-lg hover:opacity-90 hover:shadow-[0_8px_30px_rgba(240,193,75,0.15)] transition-all duration-300"
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <FaTimes className="text-white text-sm xs:text-base" />
        ) : (
          <FaRobot className="text-white text-sm xs:text-base" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 xs:bottom-20 right-0 h-[350px] xs:h-[400px] w-[280px] xs:w-[300px] sm:w-[350px] overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300">
          {/* Header */}
          <div className="navbar-bg flex h-10 xs:h-12 items-center justify-between px-3 xs:px-4">
            <p className="font-poppins text-xs xs:text-sm font-semibold text-[#e2e8f0] truncate">
              Chat with {UserData.name}&#39;s Assistant
            </p>
            <div className="flex items-center space-x-2 xs:space-x-3">
              <button
                onClick={clearConversation}
                className="text-[#e2e8f0] hover:text-[#f0c14b] transition-colors duration-300"
                aria-label="Clear conversation"
                title="Clear conversation"
              >
                <FaTrash className="text-xs xs:text-sm" />
              </button>
              <button
                onClick={toggleChatbot}
                className="text-[#e2e8f0] hover:text-[#f0c14b] transition-colors duration-300"
                aria-label="Close chatbot"
              >
                <FaTimes className="text-xs xs:text-sm" />
              </button>
            </div>
          </div>

          <div
            className="flex h-[260px] xs:h-[300px] flex-col overflow-y-auto bg-gray-900 bg-opacity-90 p-3 xs:p-4"
            style={{ backdropFilter: "blur(15px)" }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 xs:mb-4 max-w-[80%] rounded-lg px-2 xs:px-3 py-1.5 xs:py-2 ${
                  message.sender === "user"
                    ? "ml-auto bg-[#4158d0] bg-opacity-80 text-white"
                    : "bg-gray-800 bg-opacity-80 text-[#e2e8f0]"
                }`}
              >
                <p className="font-poppins text-xs xs:text-sm whitespace-pre-line">
                  {message.text}
                </p>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 xs:mb-4 max-w-[80%] rounded-lg px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-800 bg-opacity-80 text-[#e2e8f0]">
                <div className="flex space-x-1">
                  <div className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-[#e2e8f0] animate-pulse"></div>
                  <div
                    className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-[#e2e8f0] animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-1.5 w-1.5 xs:h-2 xs:w-2 rounded-full bg-[#e2e8f0] animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="flex h-[45px] xs:h-[52px] items-center border-t border-gray-700 bg-gray-800 px-3 xs:px-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg bg-gray-700 bg-opacity-50 px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm text-[#e2e8f0] placeholder-[#94a3b8] outline-none focus:ring-1 focus:ring-[#f0c14b] transition-all duration-300"
            />
            <button
              onClick={handleSend}
              className="ml-2 flex h-8 w-8 xs:h-10 xs:w-10 items-center justify-center rounded-lg bg-[#f0c14b] text-white hover:bg-[#e57e31] transition-colors duration-300"
              disabled={inputText.trim() === ""}
            >
              <FaPaperPlane className="text-xs xs:text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
