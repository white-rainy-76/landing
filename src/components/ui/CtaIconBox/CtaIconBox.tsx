import "./CtaIconBox.css";

type CtaIconBoxProps = {
  children: React.ReactNode;
};

export default function CtaIconBox({ children }: CtaIconBoxProps) {
  return <div className="cta-icon-box">{children}</div>;
}
