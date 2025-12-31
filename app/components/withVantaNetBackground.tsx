import React, { useEffect, useRef } from "react";

interface VantaNetBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: number;
  backgroundColor?: number;
  points?: number;
  maxDistance?: number;
  spacing?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
}

const VantaNetBackground: React.FC<VantaNetBackgroundProps> = ({
  children,
  className,
  style,
  color = 0xffffff,
  backgroundColor = 0x0a0a0a,
  points = 10.0,
  maxDistance = 20.0,
  spacing = 15.0,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200.0,
  minWidth = 200.0,
  scale = 1.0,
  scaleMobile = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<any | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const isDarkMode = () => {
      try {
        if (document.documentElement.classList.contains("dark")) return true;
      } catch (e) {
        // ignore
      }
      try {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      } catch (e) {
        return false;
      }
    };

    const getThemeColors = () => {
      const dark = isDarkMode();
      if (dark) {
        return { color: 0xffffff, backgroundColor: 0x000000 };
      }
      return { color: 0x000000, backgroundColor: 0xffffff };
    };

    const applyColorsToVanta = (opts: { color: number; backgroundColor: number }) => {
      try {
        if (vantaRef.current && typeof vantaRef.current.setOptions === "function") {
          vantaRef.current.setOptions(opts);
        }
      } catch (e) {
        // ignore
      }
    };

    const initVanta = async () => {
      if (!containerRef.current || vantaRef.current) return;

      const vantaModule = await import("vanta/dist/vanta.net.min.js");
      const threeModule = await import("three");
      const NET = (vantaModule as any).default || vantaModule;
      const THREE = (threeModule as any).default || threeModule;

      if (!mounted) return;

      try {
        const themeColors = getThemeColors();
        vantaRef.current = NET({
          el: containerRef.current,
          THREE,
          mouseControls,
          touchControls,
          gyroControls,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          color: themeColors.color,
          backgroundColor: themeColors.backgroundColor,
          points,
          maxDistance,
          spacing,
        });
      } catch (e) {
        vantaRef.current = null;
        // eslint-disable-next-line no-console
        console.warn("Vanta initialization failed:", e);
      }
    };

    initVanta();

    // Observe theme changes on <html> class (tailwind dark class) and prefer-color-scheme
    const observer = new MutationObserver(() => {
      const themeColors = getThemeColors();
      applyColorsToVanta(themeColors);
    });
    try {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    } catch (e) {
      // ignore
    }

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "theme") {
        const themeColors = getThemeColors();
        applyColorsToVanta(themeColors);
      }
    };
    window.addEventListener("storage", storageHandler);

    let mql: MediaQueryList | null = null;
    try {
      mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
      if (mql && typeof mql.addEventListener === "function") {
        mql.addEventListener("change", () => {
          const themeColors = getThemeColors();
          applyColorsToVanta(themeColors);
        });
      } else if (mql && typeof mql.addListener === "function") {
        // fallback
        mql.addListener(() => {
          const themeColors = getThemeColors();
          applyColorsToVanta(themeColors);
        });
      }
    } catch (e) {
      // ignore
    }

    return () => {
      mounted = false;
      if (vantaRef.current && typeof vantaRef.current.destroy === "function") {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
      try {
        observer.disconnect();
      } catch (e) {
        // ignore
      }
      window.removeEventListener("storage", storageHandler);
      try {
        if (mql) {
          if (typeof mql.removeEventListener === "function") {
            mql.removeEventListener("change", () => {});
          } else if (typeof mql.removeListener === "function") {
            mql.removeListener(() => {});
          }
        }
      } catch (e) {
        // ignore
      }
    };
    // Intentionally run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%", minHeight: "100vh", ...style }}
    >
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
};

export default VantaNetBackground;
