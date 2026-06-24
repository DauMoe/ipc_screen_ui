import React from "react";

interface TextProps {
  content?: string | number;
  fontWeight?: React.CSSProperties["fontWeight"];
  fontSize?: number;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({
  content = "",
  fontWeight = "normal",
  fontSize = 30,
  textColor = "#D80B0B",
  className,
  style,
}) => {
  return (
    <span
      className={className}
      style={{
        fontWeight,
        fontSize,
        color: textColor,
        ...style,
      }}
    >
      {content}
    </span>
  );
};

export default Text;
