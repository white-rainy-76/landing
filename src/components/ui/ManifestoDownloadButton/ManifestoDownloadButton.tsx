import "./ManifestoDownloadButton.css";

export default function ManifestoDownloadButton({
  href,
  label,
  onClick,
  className,
  download,
}: {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
  /** If set, browser saves the file with this name instead of opening a new tab (same-origin URLs). */
  download?: string;
}) {
  const openInNewTab = download == null;

  return (
    <a
      className={["manifesto-download-btn", className].filter(Boolean).join(" ")}
      href={href}
      {...(openInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" as const }
        : { download })}
      onClick={onClick}
    >
      <span className="manifesto-download-btn__icon" aria-hidden>
        <svg
          width="43"
          height="47"
          viewBox="0 0 43 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.6321 31.7382C9.98218 31.74 7.4272 30.7514 5.46852 28.9666C3.50983 27.1817 2.28882 24.7293 2.04507 22.0905C1.80131 19.4518 2.55241 16.8172 4.15098 14.7037C5.74955 12.5903 8.0802 11.1504 10.6856 10.6667C11.1433 8.23075 12.4378 6.03131 14.3454 4.44874C16.2529 2.86618 18.6536 2 21.1321 2C23.6107 2 26.0113 2.86618 27.9189 4.44874C29.8265 6.03131 31.121 8.23075 31.5786 10.6667C34.1754 11.1602 36.495 12.6036 38.085 14.7151C39.675 16.8266 40.4213 19.4547 40.1781 22.0867C39.935 24.7187 38.72 27.1657 36.7701 28.9502C34.8202 30.7347 32.2753 31.7287 29.6321 31.7382M14.7571 38.1132L21.1321 44.4882M21.1321 44.4882L27.5071 38.1132M21.1321 44.4882V18.9882"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="manifesto-download-btn__label">{label}</span>
    </a>
  );
}

