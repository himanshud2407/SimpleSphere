import { useState, useEffect } from 'react';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

const logos = [
  {
    id: "logo-1",
    description: "Claude",
    image: "/tools-logo/claude-ai.svg",
    className: "h-10 md:h-14 w-auto",
  },
  {
    id: "logo-2",
    description: "Antigravity",
    image: "/tools-logo/Google-Antigravity-Icon.png",
    className: "h-20 md:h-24 w-auto",
  },
  {
    id: "logo-3",
    description: "Clerk",
    image: "/tools-logo/Clerk.svg",
    className: "h-14 md:h-18 w-auto",
  },
  {
    id: "logo-4",
    description: "OpenAI",
    image: "/tools-logo/Openai.svg",
    className: "h-30 md:h-34 w-auto",
  },
  {
    id: "logo-5",
    description: "React",
    image: "/tools-logo/React.svg",
    className: "h-20 md:h-24 w-auto",
  },
  {
    id: "logo-6",
    description: "Figma",
    image: "/tools-logo/Figma.svg",
    className: "h-14 md:h-18 w-auto",
  },
  {
    id: "logo-7",
    description: "Next.js",
    image: "https://www.shadcnblocks.com/images/block/logos/nextjs.svg",
    className: "h-10 md:h-14 w-auto",
  },
];

export function LogosSlider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className='relative h-[120px] md:h-[160px] w-full overflow-hidden'>

      <InfiniteSlider 
        className='flex h-full w-full items-center' 
        duration={35}
        gap={isMobile ? 24 : 64}
      >
        {logos.map((logo) => (
          <div 
            key={logo.id} 
            className={`flex w-24 md:w-56 items-center justify-center transition-all duration-300 ${!isMobile ? 'grayscale hover:grayscale-0' : ''}`}
          >
            <img
              src={logo.image}
              alt={logo.description}
              className={logo.className}
            />
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[200px] z-10'
        direction='left'
        blurIntensity={1}
      />
      <ProgressiveBlur
        className='pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[200px] z-10'
        direction='right'
        blurIntensity={1}
      />
    </div>
  );
}
