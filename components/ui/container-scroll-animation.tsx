"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

/**
 * ContainerScroll Component
 * Creates a scroll-based 3D animation effect with perspective
 * Adapted for CloakDesk styling and color scheme
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

/**
 * Header Component
 * Animated header that moves up as user scrolls
 */
export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-16 md:mb-24"
    >
      {titleComponent}
    </motion.div>
  );
};

/**
 * Card Component
 * 3D card that rotates and scales based on scroll position
 * Styled with CloakDesk colors and theme
 */
export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 rgba(124, 58, 237, 0.3), 0 9px 20px rgba(124, 58, 237, 0.2), 0 37px 37px rgba(124, 58, 237, 0.15), 0 84px 50px rgba(124, 58, 237, 0.1), 0 149px 60px rgba(124, 58, 237, 0.05), 0 233px 65px rgba(124, 58, 237, 0.02)",
      }}
      className="max-w-5xl -mt-8 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-primaryEnd/30 p-2 md:p-6 bg-bg800 rounded-[30px] shadow-neon-lg backdrop-blur-xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-bg900 md:rounded-2xl md:p-4 border border-white/10">
        {children}
      </div>
    </motion.div>
  );
};

