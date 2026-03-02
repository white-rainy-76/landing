import "./SectionSubtitle.css";

type SectionSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
};

export default function SectionSubtitle({
  children,
  className,
  styles,
}: SectionSubtitleProps) {
  return (
    <p
      className={["section-subtitle", className].filter(Boolean).join(" ")}
      style={styles}
    >
      {children}
    </p>
  );
}
