import { useEffect, useRef } from "react";

type Props = {};

const SementicMap = (props: Props) => {
  const mapRef = useRef({});
  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    mapRef.current = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.511337, 127.012084),
      zoom: 13,
    });
  }, []);

  return <div id="map" style={mapStyle}></div>;
};

export default SementicMap;
