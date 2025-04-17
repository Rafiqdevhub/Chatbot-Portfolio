import { UserData } from "../data/UserData";

function Footer() {
  const currentYear = new Date().getFullYear();
  const { FooterLink } = UserData;

  return (
    <footer className="relative mt-auto">
      <div className="bg-gradient-to-t from-[#0f0f1a] to-transparent px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            <div className="font-poppins text-center text-sm text-[#a3a3a3]">
              © Copyright <b>{currentYear}</b> • Designed & Built by
            </div>
            <a
              href={FooterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm font-bold tracking-wider text-white transition-colors duration-300 hover:text-[#f0c14b]"
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
