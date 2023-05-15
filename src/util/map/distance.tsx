const calDist = (point01: any, point02: any) => {
  const { _lat: lat1, _lng: lon1 } = point01;
  const { _lat: lat2, _lng: lon2 } = point02;

  const EARTH_R = 6371000.0;
  const rad = Math.PI / 180;
  const radLat1 = rad * lat1;
  const radLat2 = rad * lat2;
  const radDist = rad * (lon1 - lon2);

  let distance = Math.sin(radLat1) * Math.sin(radLat2);
  distance =
    distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
  const ret = EARTH_R * Math.acos(distance);

  return Math.round(ret); // 미터 단위
};

const calcPolyDistance = (paths: naver.maps.LatLng[]) => {
  let longDistance = 0;

  paths.map((path, idx: number) => {
    const origin = { _lat: path?.x, _lng: path?.y };

    for (let i = idx + 1; i < paths.length; i++) {
      let distance = calDist(origin, { _lat: paths[i]?.x, _lng: paths[i]?.y });
      longDistance = distance > longDistance ? distance : longDistance;
    }
  });

  return longDistance;
};

const getCenterPolygon = (polygon: any): [number, number] => {
  const bounds = polygon.getPath();
  const arr = bounds._array;
  const length = arr.length;
  let xcos = 0;
  let ycos = 0;
  let area = 0;

  for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
    let p1 = arr[i];
    let p2 = arr[j];

    let f = p1.y * p2.x - p2.y * p1.x;
    xcos += (p1.x + p2.x) * f;
    ycos += (p1.y + p2.y) * f;
    area += f * 3;
  }

  return [xcos / area, ycos / area];
};

const getCenter = (paths: [number, number][]): [number, number] => {
  const length = paths.length;
  let xcos = 0;
  let ycos = 0;
  let area = 0;

  for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
    let p1 = paths[i];
    let p2 = paths[j];

    let f = p1[1] * p2[0] - p2[1] * p1[0];
    xcos += (p1[0] + p2[0]) * f;
    ycos += (p1[1] + p2[1]) * f;
    area += f * 3;
  }

  return [xcos / area, ycos / area];
};

export { calDist, calcPolyDistance, getCenterPolygon, getCenter };
