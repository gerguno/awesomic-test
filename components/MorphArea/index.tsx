"use client";

import { Curve, type CurveProps } from "recharts";

type MorphAreaProps = CurveProps & {
  isEntrance?: boolean;
  animationElapsedTime?: number;
};

/**
 * Area shape that interpolates between datasets instead of replaying Recharts'
 * one-shot clip reveal, so the fill follows the line when the range changes.
 * On first paint, points grow from the baseline so the stroke rises with the fill.
 * The stroke curve drops `baseLine` so only the top edge is drawn.
 */
export default function MorphArea(props: MorphAreaProps) {
  const { stroke, baseLine, points, isEntrance, animationElapsedTime = 1, ...rest } = props;
  const origin = typeof baseLine === "number" ? baseLine : undefined;
  const grown =
    isEntrance && origin != null && animationElapsedTime < 1 && points
      ? points.map((point) =>
          point.y == null ? point : { ...point, y: origin + (point.y - origin) * animationElapsedTime },
        )
      : points;

  return (
    <>
      <Curve
        {...rest}
        points={grown}
        baseLine={baseLine}
        stroke="none"
        className="recharts-area-area"
      />
      {stroke && stroke !== "none" ? (
        <Curve
          {...rest}
          points={grown}
          fill="none"
          stroke={stroke}
          className="recharts-area-curve"
        />
      ) : null}
    </>
  );
}
