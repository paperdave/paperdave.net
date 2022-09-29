// Modified from W3C's example from CSS Colors 4, but just LCH and sRGB conversion
// https://www.w3.org/TR/css-color-4/#color-conversion-code

export type ColorArray = [number, number, number];
type Mat3 = [number, number, number, number, number, number, number, number, number];

const ILLUMINANT: ColorArray = [0.95, 1.05, 1.08];
const MATRIX_TO_XYZ: Mat3 = [0.41, 0.36, 0.18, 0.21, 0.72, 0.07, 0.02, 0.12, 0.95];
const MATRIX_FROM_XYZ: Mat3 = [3.24, -1.54, -0.5, -0.97, 1.88, 0.04, 0.06, -0.2, 1.06];

const ε = 216 / 24389; // 6^3/29^3
const κ = 24389 / 27; // 29^3/3^3

function applyColorMatrix(A: Mat3, B: ColorArray): ColorArray {
	const [a, b, c, d, e, f, g, h, i] = A;
	const [x, y, z] = B;

	return [
		//
		a * x + b * y + c * z,
		d * x + e * y + f * z,
		g * x + h * y + i * z
	];
}

/** uint8 sRGB (0-255) to LCH */
export function sRGB2LCH(rgb: ColorArray) {
	// Step 1. Linear
	const linear = rgb.map((x) => {
		let val = x / 255;
		let sign = val < 0 ? -1 : 1;
		let abs = Math.abs(val);

		if (abs < 0.04045) {
			return val / 12.92;
		}

		return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
	}) as ColorArray;

	// Step 2. XYZ
	// convert linear-light sRGB values to CIE XYZ using sRGB's own white, D65 (no chromatic adaptation)
	const xyz = applyColorMatrix(MATRIX_TO_XYZ, linear);

	// Step 3. Lab
	// convert to CIE Lab, which now defines these as a rational fraction
	const xyzScaled = xyz.map((value, i) => value / ILLUMINANT[i]);

	// now compute f
	const f = xyzScaled.map((value) => (value > ε ? Math.cbrt(value) : (κ * value + 16) / 116));

	// L in range [0,100]. For use in CSS, add a percent
	const L = 116 * f[1] - 16;
	const a = 500 * (f[0] - f[1]);
	const b = 200 * (f[1] - f[2]);

	// Step 4. LCH
	const hue = (Math.atan2(b, a) * 180) / Math.PI;
	return [
		L, // L is still L
		Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)), // Chroma
		hue >= 0 ? hue : hue + 360 // Hue, in degrees [0 to 360)
	];
}

/** LCH to uint8 sRGB */
export function LCH2sRGB(lch: ColorArray) {
	// Step 1. Lab
	const L = lch[0];
	const a = lch[1] * Math.cos((lch[2] * Math.PI) / 180);
	const b = lch[1] * Math.sin((lch[2] * Math.PI) / 180);

	// Step 2. XYZ

	// compute f, starting with the luminance-related term
	const f1 = (L + 16) / 116;
	const f0 = a / 500 + f1;
	const f2 = f1 - b / 200;
	const xyzScaled = [
		Math.pow(f0, 3) > ε ? Math.pow(f0, 3) : (116 * f0 - 16) / κ,
		L > κ * ε ? Math.pow((L + 16) / 116, 3) : L / κ,
		Math.pow(f2, 3) > ε ? Math.pow(f2, 3) : (116 * f2 - 16) / κ
	];
	const xyz = xyzScaled.map((value, i) => value * ILLUMINANT[i]) as ColorArray;

	// Step 3. Linear
	const linear = applyColorMatrix(MATRIX_FROM_XYZ, xyz);

	// Step 4. sRGB
	return linear.map((val) => {
		let sign = val < 0 ? -1 : 1;
		let abs = Math.abs(val);

		if (abs > 0.0031308) {
			return 255 * sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
		}

		return 255 * 12.92 * val;
	}) as ColorArray;
}

/** Converts an RGB array to a hex string. */
export function makeHex(rgb: ColorArray) {
	return (
		'#' +
		rgb
			.map((x) =>
				Math.round(Math.min(Math.max(x, 0), 255))
					.toString(16)
					.padStart(2, '0')
			)
			.join('')
	);
}

/** Parses 3, or 6 length hex strings to and RGB array, with or without the # */
export function parseHex(hex: string) {
	if (hex.startsWith('#')) {
		hex = hex.slice(1);
	}

	const split =
		hex.length === 3
			? (hex.split('') as [string, string, string])
			: ([hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)] as const);

	return split.map((x) => parseInt(x, 16)) as ColorArray;
}
