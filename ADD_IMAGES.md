# 📸 How to Add Your Background Images

I've set up an animated background system! Here's how to add the 4 images you showed me:

## 📁 Step 1: Save Your Images

Save the 4 images you have with these exact filenames in `public/images/backgrounds/`:

```
public/images/backgrounds/
├── spiderman-city-swing.png    (Miles swinging through city)
├── miles-gwen.png              (Miles & Gwen floating together)
├── silhouette-fire.png         (Silhouette with fiery hair/glowing eyes)
└── baseball-character.png      (Character with baseball bat)
```

## 🎨 Image Requirements

- **Format**: PNG (recommended) or JPG
- **Sizes**: 
  - `spiderman-city-swing.png`: Large landscape (1920x1080+ recommended)
  - `miles-gwen.png`: Portrait (800x1200+ recommended)
  - `silhouette-fire.png`: Portrait (600x800+ recommended)
  - `baseball-character.png`: Any size (400x600+ works)

## ✨ What Happens With These Images

Once you add them, they'll automatically:

1. **Parallax Scroll**: Images move at different speeds as you scroll
2. **Float & Rotate**: Smooth floating animations
3. **Pulse & Glow**: Dynamic glow effects on the silhouette
4. **Web Lines**: Animated web lines sweep across
5. **Fade Effects**: Opacity changes based on scroll position

## 🚀 Quick Steps

1. Open `public/images/backgrounds/` folder
2. Drag and drop your 4 images
3. Rename them to match the filenames above
4. Refresh your browser - animations will appear!

## 💡 Note

The site works perfectly without these images - they just enhance the visual experience. The component gracefully handles missing images.

## 🎬 Animation Details

- **Spider-Man City**: Main background with parallax scroll and scale animation
- **Miles & Gwen**: Top-right, floating up/down with rotation
- **Fire Silhouette**: Bottom-left, pulsing glow effect
- **Baseball Character**: Middle-left, rotating and floating

All animations are smooth, performant, and won't affect page load speed!
