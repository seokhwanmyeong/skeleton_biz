import { useEffect } from "react";

type Props = {};

const SementicMap = (props: Props) => {
  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    let map = null;
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });
    };
    initMap();
  }, []);

  return <div id="map" style={mapStyle}></div>;
};

export default SementicMap;
