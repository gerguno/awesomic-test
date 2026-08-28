"use client";

import { Curve, type CurveProps } from "recharts";

/**
 * Area shape that interpolates between datasets instead of replaying Recharts'
 * one-shot clip reveal, so the fill follows the line when the range changes.
 * The stroke curve drops `baseLine` so only the top edge is drawn.
 */
export default function MorphArea(props: CurveProps) {
  const { stroke, baseLine, ...rest } = props;

  return (
    <>
      <Curve
        {...rest}
        baseLine={baseLine}
        stroke="none"
        className="recharts-area-area"
      />
      {stroke && stroke !== "none" ? (
        <Curve {...rest} fill="none" stroke={stroke} className="recharts-area-curve" />
      ) : null}
    </>
  );
}
