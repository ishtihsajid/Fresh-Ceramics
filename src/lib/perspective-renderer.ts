export interface Point2D {
  x: number;
  y: number;
}

export interface RenderOptions {
  groutWidth: number; // in mm
  groutColor: string;
  blendMode?: GlobalCompositeOperation;
  opacity?: number;
  gridSubdivisions?: number;
  tileRepeatX?: number;
  tileRepeatY?: number;
}

/**
 * Maps a unit grid (u, v) in [0, 1] to a perspective-warped quadrilateral defined by 4 corner points:
 * p0: Top-Left, p1: Top-Right, p2: Bottom-Right, p3: Bottom-Left
 */
export function bilinearQuadInterpolation(
  u: number,
  v: number,
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  p3: Point2D
): Point2D {
  const topX = p0.x + (p1.x - p0.x) * u;
  const topY = p0.y + (p1.y - p0.y) * u;
  const bottomX = p3.x + (p2.x - p3.x) * u;
  const bottomY = p3.y + (p2.y - p3.y) * u;

  // Apply subtle non-linear perspective foreshortening along vertical axis v
  // Near plane (bottom) is wider, far plane (top) is narrower
  const perspectiveV = Math.pow(v, 1.35);

  const x = topX + (bottomX - topX) * perspectiveV;
  const y = topY + (bottomY - topY) * perspectiveV;
  return { x, y };
}

/**
 * Draws a texture warped onto an arbitrary quadrilateral using triangle affine mapping
 */
export function drawPerspectiveTexture(
  ctx: CanvasRenderingContext2D,
  texture: HTMLImageElement,
  quad: [Point2D, Point2D, Point2D, Point2D], // [TL, TR, BR, BL]
  opts: RenderOptions
) {
  const [p0, p1, p2, p3] = quad;
  const subs = opts.gridSubdivisions || 10;
  const repX = opts.tileRepeatX || 6;
  const repY = opts.tileRepeatY || 6;

  ctx.save();
  if (opts.opacity !== undefined) ctx.globalAlpha = opts.opacity;
  if (opts.blendMode) ctx.globalCompositeOperation = opts.blendMode;

  const tw = texture.width || 300;
  const th = texture.height || 300;

  // Draw subdivided triangle grid
  for (let iy = 0; iy < subs; iy++) {
    for (let ix = 0; ix < subs; ix++) {
      const u0 = ix / subs;
      const u1 = (ix + 1) / subs;
      const v0 = iy / subs;
      const v1 = (iy + 1) / subs;

      // 4 points on the quad in screen coords
      const pt00 = bilinearQuadInterpolation(u0, v0, p0, p1, p2, p3);
      const pt10 = bilinearQuadInterpolation(u1, v0, p0, p1, p2, p3);
      const pt11 = bilinearQuadInterpolation(u1, v1, p0, p1, p2, p3);
      const pt01 = bilinearQuadInterpolation(u0, v1, p0, p1, p2, p3);

      // Texture coords
      const tx0 = (u0 * repX * tw) % tw;
      const tx1 = (u1 * repX * tw) % tw;
      const ty0 = (v0 * repY * th) % th;
      const ty1 = (v1 * repY * th) % th;

      // Upper Triangle (pt00, pt10, pt01)
      drawTriangleTextured(ctx, texture, pt00, pt10, pt01, { x: tx0, y: ty0 }, { x: tx1, y: ty0 }, { x: tx0, y: ty1 });

      // Lower Triangle (pt10, pt11, pt01)
      drawTriangleTextured(ctx, texture, pt10, pt11, pt01, { x: tx1, y: ty0 }, { x: tx1, y: ty1 }, { x: tx0, y: ty1 });
    }
  }

  // Draw Grout Grid Lines across perspective lines
  ctx.restore();
  ctx.save();
  ctx.strokeStyle = opts.groutColor || "#333333";
  ctx.lineWidth = Math.max(opts.groutWidth * 0.75, 1);
  ctx.globalAlpha = 0.65;
  ctx.beginPath();

  // Perspective horizontal grout lines
  for (let i = 0; i <= repY; i++) {
    const v = i / repY;
    const left = bilinearQuadInterpolation(0, v, p0, p1, p2, p3);
    const right = bilinearQuadInterpolation(1, v, p0, p1, p2, p3);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);
  }

  // Perspective vertical grout lines
  for (let j = 0; j <= repX; j++) {
    const u = j / repX;
    const top = bilinearQuadInterpolation(u, 0, p0, p1, p2, p3);
    const bottom = bilinearQuadInterpolation(u, 1, p0, p1, p2, p3);
    ctx.moveTo(top.x, top.y);
    ctx.lineTo(bottom.x, bottom.y);
  }
  ctx.stroke();
  ctx.restore();
}

/**
 * Affine transformation mapping triangle (t0, t1, t2) in texture space to (p0, p1, p2) in canvas space
 */
function drawTriangleTextured(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  p0: Point2D,
  p1: Point2D,
  p2: Point2D,
  t0: Point2D,
  t1: Point2D,
  t2: Point2D
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.closePath();
  ctx.clip();

  // Solve 2x2 affine matrix
  const denom = (t1.x - t0.x) * (t2.y - t0.y) - (t2.x - t0.x) * (t1.y - t0.y);
  if (Math.abs(denom) < 1e-5) {
    ctx.restore();
    return;
  }

  const a = ((p1.x - p0.x) * (t2.y - t0.y) - (p2.x - p0.x) * (t1.y - t0.y)) / denom;
  const b = ((p1.y - p0.y) * (t2.y - t0.y) - (p2.y - p0.y) * (t1.y - t0.y)) / denom;
  const c = ((p2.x - p0.x) * (t1.x - t0.x) - (p1.x - p0.x) * (t2.x - t0.x)) / denom;
  const d = ((p2.y - p0.y) * (t1.x - t0.x) - (p1.y - p0.y) * (t2.x - t0.x)) / denom;
  const e = p0.x - a * t0.x - c * t0.y;
  const f = p0.y - b * t0.x - d * t0.y;

  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(img, 0, 0);
  ctx.restore();
}
