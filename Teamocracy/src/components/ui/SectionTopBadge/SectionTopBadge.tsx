import "./SectionTopBadge.css";

type SectionTopBadgeProps = {
  children: React.ReactNode;
};

export default function SectionTopBadge({ children }: SectionTopBadgeProps) {
  return <span className="section-top-badge">{children}</span>;
}
