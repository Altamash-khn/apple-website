# Apple iPhone 15 Pro Website Clone

An Apple-inspired iPhone 15 Pro landing page built with React, TypeScript, React Three Fiber, Three.js, GSAP, and Tailwind CSS. The project recreates Apple's immersive product storytelling through interactive 3D models, smooth animations, synchronized video playback, and responsive design.

## Live Demo

**[View Live Demo](https://apple-website-one-ruby.vercel.app/)**

## Features

- Apple-inspired responsive landing page
- Interactive 3D iPhone model using React Three Fiber
- Dynamic color and model selection
- Smooth GSAP and ScrollTrigger animations
- Video carousel with synchronized playback progress
- Reusable and modular React component architecture
- Code splitting with `React.lazy()`
- Viewport-based lazy loading using the Intersection Observer API
- Asynchronous 3D asset loading with React Suspense
- Responsive design with Tailwind CSS
- Built with TypeScript for type safety
- Reduced initial bundle size through code splitting with React.lazy()
- Deferred loading of the 3D experience using the Intersection Observer API
- Improved the **Google PageSpeed Insights (Lighthouse)** mobile performance score from **58 to 95** after implementing code splitting and viewport-based lazy loading

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GSAP
- ESLint
- Three.js
- React Three Fiber
- React Three Drei

## Project Structure

<img src="/public/folder-structure.png" />

## Getting Started

```bash
git clone https://github.com/Altamash-khn/apple-website.git

cd apple-website

npm install

npm run dev
```

Visit the local development URL displayed by Vite (usually
http://localhost:5173).

## What I Learned

- Building interactive 3D experiences with React Three Fiber
- Working with cameras, lights, meshes, and materials in Three.js
- Creating smooth animations using GSAP and ScrollTrigger
- Synchronizing video playback with animation timelines
- Optimizing performance through code splitting and viewport-based lazy loading
- Managing asynchronous asset loading with React Suspense
