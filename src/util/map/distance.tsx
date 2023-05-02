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
  console.log(paths);
  const origin = { _lat: paths[0]?.x, _lng: paths[0]?.y };
  let longDistance = 0;

  for (let i = 1; i < paths.length; i++) {
    let distance = calDist(origin, { _lat: paths[i]?.x, _lng: paths[i]?.y });
    longDistance = distance > longDistance ? distance : longDistance;
  }

  return longDistance;
};

export { calDist, calcPolyDistance };
