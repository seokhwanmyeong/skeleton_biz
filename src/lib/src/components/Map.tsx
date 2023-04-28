/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { NAVER_MAP_SUBMODULES_NAMES } from "../common/constants";
import { MapProps } from "../common/types";
import { NaverMapContext } from "../contexts/NaverMapContext";
import useNaverAPI from "../hooks/useNaverAPI";
import useNaverListener from "../hooks/useNaverListener";

const Map = ({
  id,
  ncpClientId = "",
  className,
  style,
  opts,
  usePanorama = true,
  useGeocoder = true,
  useDrawing = true,
  useVisualization = true,
  LoadedComponent = null,
  LoadingComponent = <p>Loading...</p>,
  onAddLayer,
  onRemoveLayer,
  onBoundsChanged,
  onCenterChanged,
  onCenterPointChanged,
  onClick,
  onDoubleClick,
  onDoubleTap,
  onDrag,
  onDragEnd,
  onDragStart,
  onIdle,
  onInitStyleMap,
  onKeyDown,
  onKeyUp,
  onLongTap,
  onMapTypeChanged,
  onMapTypeIdChanged,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onPanning,
  onPinch,
  onPinchEnd,
  onPinchStart,
  onProjectionChanged,
  onResize,
  onRightClick,
  onSizeChanged,
  onTap,
  onTilesLoaded,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  onTwoFingerTap,
  onZoomChanged,
  onZooming,
  children,
}: MapProps) => {
  const { dispatch } = useContext(NaverMapContext);
  const [map, setMap] = useState<naver.maps.Map | undefined>(undefined);
  const [prevOpts, setPrevOpts] = useState("");
  const mapElementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));
  // 액션 디스패쳐 정의
  const initMap = (map: naver.maps.Map) =>
    dispatch({ type: "init_map", map: map });

  const reset = () => dispatch({ type: "reset" });

  const submodules = {
    panorama: usePanorama,
    geocoder: useGeocoder,
    drawing: useDrawing,
    visualization: useVisualization,
  };
  const SubmoduleParams = NAVER_MAP_SUBMODULES_NAMES.filter(
    (submodule) => submodules[submodule]
  ).join(",");
  const loaded = useNaverAPI({
    ncpClientId: ncpClientId,
    submodules: SubmoduleParams === "" ? "" : `&submodules=${SubmoduleParams}`,
  });

  //Load Naver Map
  useEffect(() => {
    if (!loaded) return;
    const stringifiedOpts = JSON.stringify(opts);

    const map = new naver.maps.Map(
      mapElementRef.current!!,
      JSON.parse(stringifiedOpts)
    );
    containerRef.current.style.cssText =
      "width: inherit;height: inherit;zIndex: 1;";
    map.getElement().appendChild(containerRef.current);
    setMap(map);

    setPrevOpts(stringifiedOpts);
    initMap(map); // 맵 생성

    return () => reset();
  }, [loaded]);

  // 컴포넌트 속성이 변경되면 Map 객체 수정
  useEffect(() => {
    if (
      map === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return;
    map.setOptions(opts);
    setPrevOpts(JSON.stringify(opts));
  }, [map, opts]);

  useNaverListener(map, [
    { name: "addLayer", handler: onAddLayer },
    { name: "removeLayer", handler: onRemoveLayer },
    { name: "bounds_changed", handler: onBoundsChanged },
    { name: "center_changed", handler: onCenterChanged },
    { name: "centerPoint_changed", handler: onCenterPointChanged },
    { name: "click", handler: onClick },
    { name: "dblclick", handler: onDoubleClick },
    { name: "doubletap", handler: onDoubleTap },
    { name: "drag", handler: onDrag },
    { name: "dragend", handler: onDragEnd },
    { name: "dragstart", handler: onDragStart },
    { name: "idle", handler: onIdle },
    { name: "init_stylemap", handler: onInitStyleMap },
    { name: "keydown", handler: onKeyDown },
    { name: "keyup", handler: onKeyUp },
    { name: "longtap", handler: onLongTap },
    { name: "mapType_changed", handler: onMapTypeChanged },
    { name: "mapTypeId_changed", handler: onMapTypeIdChanged },
    { name: "mousedown", handler: onMouseDown },
    { name: "mousemove", handler: onMouseMove },
    { name: "mouseout", handler: onMouseOut },
    { name: "mouseover", handler: onMouseOver },
    { name: "mouseup", handler: onMouseUp },
    { name: "panning", handler: onPanning },
    { name: "pinch", handler: onPinch },
    { name: "pinchend", handler: onPinchEnd },
    { name: "pinchstart", handler: onPinchStart },
    { name: "projection_changed", handler: onProjectionChanged },
    { name: "resize", handler: onResize },
    { name: "rightclick", handler: onRightClick },
    { name: "size_changed", handler: onSizeChanged },
    { name: "tap", handler: onTap },
    { name: "tilesloaded", handler: onTilesLoaded },
    { name: "touchend", handler: onTouchEnd },
    { name: "touchmove", handler: onTouchMove },
    { name: "touchstart", handler: onTouchStart },
    { name: "twofingertap", handler: onTwoFingerTap },
    { name: "zoom_changed", handler: onZoomChanged },
    { name: "zooming", handler: onZooming },
  ]);

  return (
    <>
      {loaded ? LoadedComponent : LoadingComponent}
      <div ref={mapElementRef} style={style} className={className} />
      {ReactDOM.createPortal(children, containerRef.current)}
    </>
  );
};

Map.displayName = "Map";

export default Map;
