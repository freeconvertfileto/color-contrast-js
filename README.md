# Color Contrast Checker

Calculate WCAG contrast ratios between foreground and background colors and check AA/AAA accessibility compliance, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/color-contrast-online

## How It Works

`hexToRgb` parses 3- and 6-digit hex strings (automatically expanding 3-digit shorthand by doubling each character) using `parseInt(hex.slice(n, n+2), 16)`. `linearize(c)` applies the sRGB gamma linearization formula defined in the WCAG specification: values below 0.04045 divide by 12.92, all others use `Math.pow((c + 0.055) / 1.055, 2.4)`. `relativeLuminance` computes `0.2126 * R + 0.7152 * G + 0.0722 * B` on the linearized channels. `contrastRatio` applies `(lighter + 0.05) / (darker + 0.05)`. The ratio is evaluated against four WCAG 2.1 thresholds: AA normal text (4.5:1), AA large text (3:1), AAA normal text (7:1), AAA large text (4.5:1). A color picker and a hex text field are kept in bidirectional sync via `input` events.

## Features

- WCAG 2.1 contrast ratio calculation using the full sRGB linearization formula
- Four compliance levels: AA Normal, AA Large, AAA Normal, AAA Large (Pass/Fail badges)
- Live preview rendering sample text on the selected background color
- Color picker and hex text input with bidirectional sync
- Relative luminance display for both colors

## Browser APIs Used

- (No external APIs — pure DOM and math)

## Code Structure

| File | Description |
|------|-------------|
| `color-contrast.js` | `hexToRgb`, sRGB `linearize`, `relativeLuminance` (WCAG formula), `contrastRatio`, 4-threshold WCAG badge evaluation |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#ccrFg` | Foreground color picker |
| `#ccrFgHex` | Foreground hex text input |
| `#ccrBg` | Background color picker |
| `#ccrBgHex` | Background hex text input |
| `#ccrPreview` | Live preview container |
| `#ccrPreviewText` | Sample text in the preview |
| `#ccrRatio` | Contrast ratio display (e.g. "4.50:1") |
| `#ccrAaNormal`, `#ccrAaLarge` | AA pass/fail badges |
| `#ccrAaaNormal`, `#ccrAaaLarge` | AAA pass/fail badges |
| `#ccrFgLum`, `#ccrBgLum` | Relative luminance values |

## License

MIT
