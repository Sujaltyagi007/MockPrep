import type { CSSProperties } from "react";
import { checkmark, hexagon, logoColors, sheets, wordmark } from "./logo-paths";

// Crops of the original 2048×1823 artwork (public/MockPrepLogo.svg).
const viewBoxes = {
  /** Hexagon, sheets and tick. */
  mark: "445 75 1305 1345",
  /** The MOCKPREP letters on their own, for a horizontal lockup. */
  wordmark: "100 1505 1890 262",
} as const;

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * One part of the MockPrep logo as inline SVG, with each shape tagged
 * (data-logo-part) so the `logo-animated` utility in globals.css can move it.
 * Apply that utility on a wrapper; this component only draws.
 */
export function LogoGraphic({ variant, className }: { variant: keyof typeof viewBoxes; className?: string }) {
  return (
    <svg viewBox={viewBoxes[variant]} className={className} aria-hidden>
      {variant === "mark" ? (
        <g data-logo-part="mark">
          <path data-logo-part="hexagon" fill={logoColors.dark} d={hexagon} />
          {sheets.map((sheet, i) => (
            <g key={i} data-logo-part="sheet" style={stagger(i)} fill={logoColors[sheet.fill]}>
              {sheet.paths.map((d, j) => (
                <path key={j} d={d} />
              ))}
            </g>
          ))}
          <path data-logo-part="check" fill={logoColors.dark} d={checkmark} />
        </g>
      ) : (
        wordmark.map((d, i) => <path key={i} data-logo-part="letter" style={stagger(i)} fill={logoColors.dark} d={d} />)
      )}
    </svg>
  );
}
