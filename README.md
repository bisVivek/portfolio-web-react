# 🕷️ Spider-Man Portfolio Website

An interactive, game-themed portfolio website built with React 18+, Vite, Framer Motion, and Three.js. Navigate through missions showcasing skills, projects, and contact information in a Spider-Man themed experience.

## 🎮 Features

- **3D Spider-Man Model**: Swinging through NYC skyline (placeholder included, ready for GLB model)
- **Game HUD**: Progress bars, level counter, and mission tracker
- **Custom Web Cursor**: Red glowing cursor with trail effects
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Interactive Sections**:
  - Hero: 3D model with web particle background
  - Skills: Health bar-style progress meters
  - Projects: Flip-card villain defeats
  - Contact: EmailJS integrated web form

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Navigate to project directory
cd spiderman-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Update Your Information

1. **Hero Section** (`src/components/Hero.jsx`):
   - Replace `"Vivek BIsht"` with your name
   - Update social media links (GitHub, LinkedIn)

2. **Skills** (`src/components/Skills.jsx`):
   - Modify the `skills` array with your skills and levels

3. **Projects** (`src/components/Projects.jsx`):
   - Update the `projects` array with your actual projects
   - Add project links, descriptions, and tech stacks

4. **Contact** (`src/components/Contact.jsx`):
   - Set up EmailJS (see below)
   - Update direct email address

### 3D Model Integration

The portfolio includes a placeholder Spider-Man model. To use your own GLB model:

1. Place your GLB file in `public/models/spiderman.glb`
2. Uncomment the GLB loading code in `src/3D/SpiderModel.jsx`
3. Replace `SpiderPlaceholder` with `SpiderManModel`

Example:
```jsx
// In SpiderModel.jsx
function SpiderManModel({ url }) {
  const { scene } = useGLTF('/models/spiderman.glb')
  // ... rest of implementation
}
```

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials from the dashboard:
   - Service ID
   - Template ID
   - Public Key

5. Update `src/components/Contact.jsx`:
```javascript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',      // Replace
  'YOUR_TEMPLATE_ID',     // Replace
  formRef.current,
  'YOUR_PUBLIC_KEY'       // Replace
)
```

**Recommended**: Use environment variables (create `.env.local`):
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then in `Contact.jsx`:
```javascript
import.meta.env.VITE_EMAILJS_SERVICE_ID
import.meta.env.VITE_EMAILJS_TEMPLATE_ID
import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

## 🎯 Tech Stack

- **React 18+**: UI framework
- **Vite**: Build tool and dev server
- **Framer Motion**: Animation library
- **Three.js / React Three Fiber**: 3D graphics
- **TailwindCSS**: Styling
- **Lenis**: Smooth scrolling
- **EmailJS**: Contact form handling
- **Lucide React**: Icons

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables (if using EmailJS env vars)
4. Deploy!

### Other Platforms

The project builds to static files in the `dist` folder and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🎮 Game Mechanics

- **HP Bar**: Fills as you progress through sections
- **Level Counter**: Tracks current section (1-4)
- **Mission Dots**: Visual progress indicator
- **Web Ammo**: Scroll progress indicator (infinite!)
- **Web Cursor**: Custom cursor that follows your mouse

## 🐛 Troubleshooting

### 3D Model Not Loading
- Check browser console for GLB loading errors
- Ensure model is in `public/models/` directory
- Verify file path in `SpiderModel.jsx`

### EmailJS Not Working
- Verify service/template IDs and public key
- Check EmailJS dashboard for API quotas
- Ensure form fields match template variables

### Animations Lagging
- Reduce particle count in `Hero.jsx` (line ~45)
- Lower 3D model complexity
- Check browser performance with DevTools

## 📝 License

MIT License - Feel free to use this for your own portfolio!

## 🙏 Credits

- Design inspired by Spider-Man video games
- Built with modern web technologies
- Ready for customization and deployment

---

**Made with great power and great responsibility** 🕷️
