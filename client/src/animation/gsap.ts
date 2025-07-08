import { gsap } from 'gsap';

export const loginPageAnimation = () => {
  gsap.fromTo('.login-container', 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  );
  
  gsap.fromTo('.input-field', 
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.3 }
  );
  
  gsap.fromTo('.login-btn', 
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, delay: 0.8 }
  );
  
  gsap.fromTo('.social-login', 
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, delay: 1.1 }
  );
};

export const hoverAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.02,
    duration: 0.3,
    ease: 'power1.out'
  });
};

export const hoverOutAnimation = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1,
    duration: 0.3,
    ease: 'power1.out'
  });
};