// Lib
import { Fragment, useEffect } from "react";
import { Heading, Flex } from "@chakra-ui/react";
//Components
import SideMenu from "../components/menu/SideMenu";

const Maps = () => {
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

  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <Fragment>
      <Heading>Component : Map</Heading>
      <div id="map" style={mapStyle}></div>
    </Fragment>
  );
};

export default Maps;
