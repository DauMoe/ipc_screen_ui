import React, { useLayoutEffect, useRef, useState } from "react";
import "../styles/ipc.scss";

type GearType = "N" | "R" | "P" | "D";

type GearCarouselPropsType = {
  gear: GearType;
  className?: string;
  style?: any;
};

const GEAR_RING: GearType[] = ["N", "R", "P", "D"];
const RING_SIZE = GEAR_RING.length;

const GearCarousel: React.FC<GearCarouselPropsType> = ({ gear, className, style }) => {
  const activeIndex = GEAR_RING.indexOf(gear);

  const items = [...GEAR_RING, ...GEAR_RING, ...GEAR_RING];
  const centeredIndex = RING_SIZE + activeIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeEl = itemRefs.current[centeredIndex];
    if (!container || !activeEl) return;

    const containerCenter = container.clientWidth / 2;
    const itemCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
    setOffset(containerCenter - itemCenter);
  }, [centeredIndex]);

  return (
    <div ref={containerRef} className={"gear_carousel " + className} style={style}>
      <div
        className="gear_carousel_track"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {items.map((g, i) => {
          const isActive = i % RING_SIZE === activeIndex;
          return (
            <span
              key={`${g}-${i}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`gear_item${isActive ? " gear_item--active" : ""}`}
            >
              {g}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default GearCarousel;
