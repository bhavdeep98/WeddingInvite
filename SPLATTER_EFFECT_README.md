# Splatter Effect Transition System

This project now includes a beautiful splatter effect transition system using Pixi.js that creates smooth transitions between sections when scrolling.

## Features

### 🎨 Splatter Effect
- **Particle-based animations** using Pixi.js for smooth 60fps performance
- **Physics-based particles** with gravity, friction, and rotation
- **Color morphing** - particles transition from section color to white
- **Background morphing** - smooth background color transitions
- **Multiple particle sizes** for visual variety

### 🎯 Section Transitions
- **Automatic detection** of section changes during scroll
- **Smooth scrolling** to target sections
- **Color-coded transitions** - each section has its own color theme
- **Responsive design** - works on all screen sizes

### 🧭 Navigation
- **Scroll indicator** - visual dots showing current section
- **Click navigation** - click dots to jump to sections
- **Auto-hide** - indicator fades when not scrolling

## Components

### SplatterEffect.tsx
The main Pixi.js canvas component that handles:
- Particle creation and animation
- Background morphing
- Physics simulation
- Color transitions

### SectionTransitionManager.tsx
Manages the overall transition system:
- Section detection
- Scroll handling
- Transition triggering
- Navigation coordination

### ScrollIndicator.tsx
Visual navigation component:
- Section dots
- Current section highlighting
- Click handlers

## Color Scheme

Each section has a unique color for the splatter effect:

1. **Hero** - Red (#FF6B6B)
2. **Events Intro** - Teal (#4ECDC4)
3. **Haldi** - Yellow (#FFE66D)
4. **Mehandi** - Orange (#FF8E53)
5. **Wedding** - Green (#A8E6CF)
6. **Contact** - Pink (#FF6B9D)

## Usage

The system is automatically integrated into the main Index page. Each section needs:

```tsx
<div data-section="section-name" className="animate-on-scroll section-container">
  <YourSectionComponent />
</div>
```

## Technical Details

### Performance Optimizations
- **RequestAnimationFrame** for smooth animations
- **Throttled scroll events** to prevent performance issues
- **Efficient particle management** with proper cleanup
- **Canvas-based rendering** for hardware acceleration

### Browser Compatibility
- Modern browsers with WebGL support
- Graceful fallback for older browsers
- Responsive design for mobile devices

### Dependencies
- `pixi.js` - 2D WebGL renderer
- `@pixi/events` - Event handling
- React hooks for state management

## Customization

### Particle Count
Modify `particleCount` in `SplatterEffect.tsx`:
```tsx
const particleCount = 300; // Adjust for performance
```

### Animation Speed
Adjust transition timing in `SplatterEffect.tsx`:
```tsx
transitionProgressRef.current += 0.02; // Faster/slower transitions
```

### Colors
Update `sectionColors` array in `SectionTransitionManager.tsx`:
```tsx
const sectionColors = [
  '#FF6B6B', // Your custom colors
  '#4ECDC4',
  // ...
];
```

## Troubleshooting

### Performance Issues
- Reduce particle count
- Check for memory leaks
- Ensure proper cleanup in useEffect

### Visual Glitches
- Verify Pixi.js initialization
- Check canvas sizing
- Ensure proper z-index values

### Scroll Issues
- Verify data-section attributes
- Check scroll event listeners
- Ensure proper section heights
