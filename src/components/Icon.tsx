import React from "react";

// Tự động gom tất cả icon trong assets/icons thành map { "high_beam": "/path/to/high_beam.svg", ... }
const iconModules = import.meta.glob("../assets/icons/*.svg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;

const icons: Record<string, string> = Object.fromEntries(
  Object.entries(iconModules).map(([path, mod]) => {
    const name = path.split("/").pop()!.replace(/\.svg$/, "");
    // Tùy version Vite, glob có thể trả về string hoặc object { default: url }
    const url =
      typeof mod === "string"
        ? mod
        : (mod as { default?: string })?.default ?? "";
    return [name, url];
  })
);

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 30,
  color = "#ffffff",
  className,
  style,
}) => {
  const src = icons[name];

  if (!src) {
    console.warn(`[Icon] Không tìm thấy icon "${String(name)}"`);
    return null;
  }

  return (
    <span
      className={className}
      role="img"
      aria-label={String(name)}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        ...style,
        backgroundColor: color,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
};

export default Icon;
