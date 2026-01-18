# 🚀 Quick Start Guide

## Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd spiderman-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate manually to the URL shown in terminal

## 🔧 Next Steps

### 1. Personalize Your Portfolio

- **Hero Section**: Edit `src/components/Hero.jsx`
  - Change "YOUR NAME" to your actual name (line ~65)
  - Update social media links (GitHub, LinkedIn, Email)

- **Skills**: Edit `src/components/Skills.jsx`
  - Modify the `skills` array with your skills and proficiency levels

- **Projects**: Edit `src/components/Projects.jsx`
  - Replace the `projects` array with your actual projects
  - Add real GitHub and live demo links

- **Contact**: Edit `src/components/Contact.jsx`
  - Set up EmailJS (see EmailJS setup below)
  - Update the direct email address at the bottom

### 2. EmailJS Setup (Optional but Recommended)

1. Sign up at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your credentials from the dashboard
5. Update `src/components/Contact.jsx` (lines ~25-30) with your IDs:
   ```javascript
   await emailjs.sendForm(
     'YOUR_SERVICE_ID',      // From EmailJS dashboard
     'YOUR_TEMPLATE_ID',     // From EmailJS dashboard
     formRef.current,
     'YOUR_PUBLIC_KEY'       // From EmailJS dashboard
   )
   ```

### 3. Add 3D Model (Optional)

The portfolio includes a placeholder Spider-Man model. To use your own GLB:

1. Download a Spider-Man GLB model from Sketchfab or similar
2. Place it in `public/models/spiderman.glb`
3. Uncomment and modify the GLB loading code in `src/3D/SpiderModel.jsx`

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The `dist` folder contains static files ready for deployment to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## 🎨 Customization Tips

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Fonts**: Already configured (Space Grotesk, JetBrains Mono)
- **Animations**: Adjust Framer Motion animations in component files
- **Particles**: Modify particle count in `src/components/Hero.jsx` (line ~45)

## 🐛 Troubleshooting

- **Port already in use**: Change port in `vite.config.js` or use `npm run dev -- --port 3001`
- **Build errors**: Make sure all dependencies are installed (`npm install`)
- **3D not showing**: Check browser console, ensure WebGL is enabled

## ✅ Checklist Before Deploy

- [ ] Updated name in Hero section
- [ ] Updated skills with your actual skills
- [ ] Added your real projects
- [ ] Set up EmailJS (or removed contact form)
- [ ] Updated social media links
- [ ] Tested on mobile and desktop
- [ ] Built and tested production version (`npm run build`)

---

**Ready to swing into action!** 🕷️
