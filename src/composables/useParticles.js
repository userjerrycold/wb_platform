import { loadFull } from "tsparticles";
import { ref } from 'vue';

export const useParticles = async (container) => {
  const particles = ref(null);

  const initParticles = async () => {
    const particlesInstance = await loadFull(particles);
    await particlesInstance.load({
      container,
      options: {
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      },
    });
  };

  await initParticles();
  return particles;
}; 