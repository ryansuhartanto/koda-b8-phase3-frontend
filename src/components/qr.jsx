import { correction, generate, mode } from "lean-qr";
import { toSvg } from "lean-qr/extras/svg";
import { useEffect, useMemo, useRef } from "react";

/**
 * @import { ComponentProps, RefObject } from "react"
 */

/**
 * @param { ComponentProps<"svg"> & { text: string }} props
 */
export default function QRCode({ text, ...rest }) {
	const code = useMemo(() => {
		return generate(text.toUpperCase(), {
			minCorrectionLevel: correction.L,
			maxCorrectionLevel: correction.M,
			minVersion: 3,

			modes: [mode.alphaNumeric],
		});
	}, [text]);

	/** @type {RefObject<SVGSVGElement | null>} */
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			toSvg(code, ref.current);
		}
	}, [code, ref.current]);

	return (
		<svg
			ref={ref}
			{...rest}
		/>
	);
}
