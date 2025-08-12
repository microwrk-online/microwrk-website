"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

export default function Animated3DHackerShape() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: "#00ffcc",
      metalness: 1,
      roughness: 0.1,
      emissive: "#00ffcc",
      emissiveIntensity: 0.6,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lights
    const pointLight = new THREE.PointLight("#00ffcc", 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight("#ff00ff", 1.2);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // GSAP animations
    gsap.to(mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
    });

    // Pulsating emissive glow
    gsap.to(material, {
      emissiveIntensity: 2,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Moving lights
    gsap.to(pointLight.position, {
      x: 3,
      z: 3,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    gsap.to(pointLight2.position, {
      x: -3,
      z: -3,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Floating camera effect
    gsap.to(camera.position, {
      y: 0.5,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Resize handling
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      scene.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-neutral-800 w-96 h-64 rounded-xl flex items-center justify-center"
    />
  );
}
