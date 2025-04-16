import { UserData } from "../data/UserData";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { FooterLink, socialMedia } = UserData;

  const getIcon = (iconName) => {
    switch (iconName) {
      case "AiFillGithub":
        return <AiFillGithub />;
      case "FaLinkedinIn":
        return <FaLinkedinIn />;
      case "FaSquareXTwitter":
        return <FaSquareXTwitter />;
      case "AiFillInstagram":
        return <AiFillInstagram />;
      default:
        return null;
    }
  };

  return (
    <footer className="relative mt-auto">
      <div className="bg-gradient-to-t from-gray-900/5 to-transparent px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-6">
            {socialMedia.map((social) => (
              <a
                key={social.socialMediaName}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] transition-all duration-300 hover:scale-110 hover:text-[#cbd5e1]"
              >
                <span className="text-xl">{getIcon(social.icon)}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="font-poppins text-center text-sm text-[#94a3b8]">
              © Copyright <b>{currentYear}</b> • Designed & Built by
            </div>
            <a
              href={FooterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm font-bold tracking-wider text-[#e2e8f0] transition-colors duration-300 hover:text-[#4158d0]"
            >
              Muhammad Rafiq
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
