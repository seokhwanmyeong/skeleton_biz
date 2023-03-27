export const Centroid = (poly: number[][]): number[] => {
  let minx: number = poly[0][0];
  let miny: number = poly[0][1];
  let maxx: number = poly[0][0];
  let maxy: number = poly[0][1];

  for (let i = 0; i < poly.length; i++) {
    let point = poly[i];
    let x = point[0];
    let y = point[1];

    if (x < minx) minx = x;
    else if (x > maxx) maxx = x;
    if (y < miny) miny = y;
    else if (y > maxy) maxy = y;
  }

  return [minx + (maxx - minx) / 2, miny + (maxy - miny) / 2];
};
