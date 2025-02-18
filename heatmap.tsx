import React, { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import heatmapSVG from "../locales/heatmap.svg";

interface HeatmapProps {
  data: Record<string, number>;
  width?: string | number;
  height?: string | number;
  colorRange?: [string, string];
}

const Heatmap: React.FC<HeatmapProps> = ({ 
  data, 
  width = "100%", 
  height = "400px",
  colorRange = ["rgba(254, 93, 33, 0.2)", "rgba(254, 93, 33, 1)"]
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState({ show: false, content: "", x: 0, y: 0 });
  const abortController = useRef<AbortController>(new AbortController());

  useEffect(() => {
    if (!svgRef.current || !data || Object.keys(data).length === 0) return;

    abortController.current = new AbortController();
    
    const loadSVG = async () => {
      try {
        const response = await fetch(heatmapSVG, { 
          signal: abortController.current?.signal 
        });
        let svgContent = await response.text();

        // Make SVG responsive
        svgContent = svgContent
          .replace(/<svg([^>]+)>/i, (_, attrs) => {
            const cleanAttrs = attrs
              .replace(/\s(width|height)=["'][^"']*["']/gi, "")
              .replace(/(preserveAspectRatio|style)=["'][^"']*["']/gi, "");
            return `<svg ${cleanAttrs} preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">`;
          });

        svgRef.current!.innerHTML = svgContent;

        const values = Object.values(data);
        const minVal = Math.min(...values);
        const maxVal = Math.max(...values);
        
        const colorScale = scaleLinear<string>()
          .domain([minVal, maxVal])
          .range(colorRange);

        const paths = svgRef.current!.querySelectorAll("path");
        
        const eventHandlers = new Map();

        paths.forEach(path => {
          const id = path.getAttribute("id");
          const name = path.getAttribute("name");
          
          if (id && data[id] !== undefined) {
            const value = data[id];
            path.setAttribute("fill", colorScale(value));
            path.setAttribute("aria-label", `${name}: ${value}`);
            path.setAttribute("role", "img");
            path.style.transition = "all 0.3s ease-out";

            // Event handlers
            const showTooltip = (e: MouseEvent) => {
              setTooltip({
                show: true,
                content: `${name}: ${value.toLocaleString()}`,
                x: e.clientX,
                y: e.clientY
              });
              
              path.style.transform = "scale(1.02)";
              path.style.filter = "brightness(1.2) drop-shadow(0 0 8px rgba(254, 93, 33, 0.5))";
              path.style.zIndex = "1";
              
              paths.forEach(p => {
                if (p !== path) {
                  p.style.opacity = "0.3";
                }
              });
            };

            const hideTooltip = () => {
              setTooltip(t => ({ ...t, show: false }));
              path.style.transform = "scale(1)";
              path.style.filter = "none";
              path.style.zIndex = "auto";
              paths.forEach(p => {
                p.style.opacity = "1";
              });
            };

            const moveTooltip = (e: MouseEvent) => {
              setTooltip(t => ({ ...t, x: e.clientX, y: e.clientY }));
            };

            // Store handlers for cleanup
            eventHandlers.set(path, {
              showTooltip,
              hideTooltip,
              moveTooltip
            });

            path.addEventListener("mouseenter", showTooltip);
            path.addEventListener("mouseleave", hideTooltip);
            path.addEventListener("mousemove", moveTooltip);
          }
        });

        return () => {
          paths.forEach(path => {
            const handlers = eventHandlers.get(path);
            if (handlers) {
              path.removeEventListener("mouseenter", handlers.showTooltip);
              path.removeEventListener("mouseleave", handlers.hideTooltip);
              path.removeEventListener("mousemove", handlers.moveTooltip);
            }
          });
        };
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error loading SVG:", error);
        }
      }
    };

    const cleanup = loadSVG();

    return () => {
      abortController.current?.abort();
      if (cleanup) {
        cleanup.then(cleanupFn => cleanupFn?.());
      }
    };
  }, [data, colorRange]);

  return (
    <div className="relative" style={{ width, height }}>
      <div ref={svgRef} className="w-full h-full" />
      {tooltip.show && (
        <div 
          className="absolute z-50 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200"
          style={{
            left: `${tooltip.x + 15}px`,
            top: `${tooltip.y - 15}px`,
            transform: "translateY(-100%)",
            pointerEvents: "none"
          }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-900">
              {tooltip.content.split(":")[0]}
            </span>
            <span className="text-xs text-gray-600">
              {tooltip.content.split(":")[1].trim()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
