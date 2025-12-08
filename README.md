# Student Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean and professional design with smooth animations
- **Dark Mode**: Automatic dark mode support
- **Sections Include**:
  - Hero/Introduction
  - About Me
  - GitHub Projects
  - Competitions & Awards (STEAM, MUN, Literature)
  - Education & Certifications (HKDSE, IAL, IELTS, Coursera)
  - Skills (Web Development, iOS Development, etc.)
  - Organizations & Experience (School, Clubs, External)
  - Contact Form

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information

Update the following files with your information:

1. **Hero Section** (`components/sections/Hero.tsx`):
   - Replace "Your Name" with your actual name
   - Update your tagline and description

2. **Projects** (`components/sections/Projects.tsx`):
   - Replace the sample projects with your actual GitHub projects
   - Update project titles, descriptions, technologies, and links

3. **Competitions** (`components/sections/Competitions.tsx`):
   - Add your actual competition participations and awards
   - Organize by category (STEAM, MUN, Literature, etc.)

4. **Education** (`components/sections/Education.tsx`):
   - Update with your actual educational background
   - Add your certifications (HKDSE, IAL, IELTS, Coursera, etc.)

5. **Skills** (`components/sections/Skills.tsx`):
   - Adjust skill levels based on your proficiency
   - Add or remove skills as needed

6. **Organizations** (`components/sections/Organizations.tsx`):
   - Replace with your actual organizational experiences
   - Include school leadership, clubs, and external organizations

7. **Contact** (`components/sections/Contact.tsx`):
   - Update email, phone, and location
   - Update social media links (GitHub, LinkedIn)

8. **Footer** (`components/Footer.tsx`):
   - Update social media links

## Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure settings
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to complete deployment

### Environment Variables

If you add any API integrations (like contact form backend), add environment variables in:
- Local: `.env.local` file
- Vercel: Project Settings → Environment Variables

## Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start Production**: `npm start`
- **Lint**: `npm run lint`

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Competitions.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Hero.tsx
│   │   ├── Organizations.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── Footer.tsx
│   └── Navbar.tsx
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## Performance Optimization

- Server-side rendering with Next.js
- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Minified CSS and JavaScript in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contact

For any questions or feedback, please reach out via the contact form on the website or email at your.email@example.com

---

Built with ❤️ using Next.js and TypeScript
