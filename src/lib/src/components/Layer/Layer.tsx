/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext, useState } from "react";
import { LayerProps, NaverMapLayer } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";

const Layer = ({ type, opts }: LayerProps) => {
  const layerId = `${type}-layer`;
  const { state, dispatch } = useContext(NaverMapContext);
  const [layer, setLayer] = useState<NaverMapLayer | undefined>();

  const addLayer = (layer: NaverMapLayer) => {
    dispatch({ type: "add_object", object: layer, id: layerId });
  };
  const removeLayer = () => dispatch({ type: "remove_object", id: layerId });

  useEffect(() => {
    if (state.map === undefined) return;
    const layerNameToClass = {
      traffic: naver.maps.TrafficLayer,
      street: naver.maps.StreetLayer,
      cadastral: naver.maps.CadastralLayer,
      //  bicycle: naver.maps.BicycleLayer,
      label: naver.maps.LabelLayer,
    };
    const layer =
      type === "traffic"
        ? new layerNameToClass[type](opts)
        : new layerNameToClass[type]();
    layer.setMap(state.map);
    setLayer(layer);

    // 레이어 추가
    addLayer(layer);

    // clean up
    return () => removeLayer();
  }, [state.map]);

  useEffect(() => {
    // if(type !== 'traffic' || opts === undefined || layer === undefined) return
    // ;(layer as naver.maps.TrafficLayer).setOptions(opts)
  }, []);

  return null;
};

Layer.displayName = "layer";
export default Layer;
