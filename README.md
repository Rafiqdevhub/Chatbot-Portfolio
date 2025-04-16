# Rafiq Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. This portfolio showcases my projects, skills, and professional background in a clean and interactive interface.

## 📋 Features

- **Responsive Design:** Works perfectly on all devices from mobile to desktop
- **Modern UI:** Beautiful gradient backgrounds with smooth scrolling and animations
- **Interactive Sections:** Home, About, Projects, and Contact sections
- **Dynamic Project Showcase:** Display projects with descriptions and technologies used
- **Skills Marquee:** Animated display of skills with corresponding icons
- **Social Media Integration:** Easy access to all professional profiles
- **Typewriter Effect:** Engaging animated text on the home page
- **Archive Projects Page:** View all projects in a dedicated page
- **Resume Access:** Quick link to download/view resume
- **Smart AI Chatbot:** Interactive assistant that answers questions about skills, projects, and experience
- **Functional Contact Form:** Email.js integration for sending real messages directly from the website

## 🛠️ Technologies Used

- **React 18** - Frontend library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - For navigation and routing
- **React Icons** - Icon library
- **React Scroll** - For smooth scrolling to page sections
- **Typewriter Effect** - For animated text typing
- **React Fast Marquee** - For the skills carousel
- **Framer Motion** - For animations
- **EmailJS** - For sending emails from the contact form
- **Environment Variables** - For secure API key storage

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git https://github.com/Rafiqdevhub/Chatbot-Portfolio.git
cd Chatbot-Portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

```
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── Assets/            # Images, SVGs, and other static files
│   ├── images/        # Portfolio images
│   └── svg/           # SVG icons for skills
├── components/        # Reusable components
│   ├── Cards.jsx      # Project card component
│   ├── Chatbot.jsx    # AI chatbot assistant
│   ├── Footer.jsx     # Footer component
│   ├── Header.jsx     # Navigation header
│   ├── Pre.jsx        # Preloader component
│   └── TypewriterText.jsx # Animated text component
├── data/              # Data files (user info, projects, skills)
│   ├── ProjectsList.jsx  # Project data
│   ├── SkillsData.jsx    # Technical skills data
│   └── UserData.jsx      # Personal information data
├── pages/             # Page components
│   ├── About.jsx      # About page
│   ├── ArchiveProjects.jsx # Projects archive page
│   ├── Contact.jsx    # Contact form page with EmailJS
│   ├── Home.jsx       # Home page
│   ├── Layout.jsx     # Main layout component
│   ├── NotFound.jsx   # 404 page
│   └── Project.jsx    # Project display page
├── utils/             # Utility functions
│   └── SkillsImage.js # Helper for skill icons
├── App.css            # Global styles
├── App.jsx            # Main App component
└── main.jsx           # Entry point
```

## 🤖 AI Chatbot Features

The portfolio includes an interactive AI chatbot that:

- Answers questions about skills, experience, and projects
- Provides detailed information about technical expertise
- Helps visitors navigate the portfolio
- Offers contact information and ways to get in touch
- Responds intelligently with contextual knowledge of the portfolio content

## 📨 Contact Form Integration

The contact form is fully functional with:

- EmailJS integration to send real emails
- Form validation for all fields
- Success and error status messages
- Responsive design that works on all devices
- Secure credential storage using environment variables

## 📄 Customization

### Personal Information

Edit the data files in the `src/data` directory:

- `UserData.jsx` - Your personal information, social links, and typewriter options
- `ProjectsList.jsx` - Your projects with descriptions and technologies
- `SkillsData.jsx` - Your technical skills

### Images

Replace the images in the `src/Assets/images` directory with your own.

### Colors & Styling

The main styling is defined in `src/App.css` and Tailwind configuration in `tailwind.config.js`.

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

This will generate a `dist` folder with all your optimized and minified files ready for deployment.

## 🚢 Deployment

This portfolio can be easily deployed to platforms like:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
