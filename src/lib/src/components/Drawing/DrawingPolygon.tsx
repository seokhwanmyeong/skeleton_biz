import React, { useContext,useEffect } from "react";
import { NaverMapContext } from "../../contexts/NaverMapContext";

const DrawingPolygon = () => {
  const { state } = useContext(NaverMapContext);
  useEffect(()=>{
    if(state.map === undefined) return;
  },[state.map]);
  return null;
};

export default DrawingPolygon;
