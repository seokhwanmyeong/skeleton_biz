/* eslint-disable react-hooks/exhaustive-deps */

import {
  useEffect,
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { v1 as uuid } from "uuid";
import { PolygonProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";
/* 
({
  id,
  opts,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRightClick,
}: PolygonProps) => {

 */

const Polygon = forwardRef<naver.maps.Polygon, PolygonProps>((props, ref) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [prevOpts, setPrevOpts] = useState("");
  const [polygon, setPolygon] = useState<naver.maps.Polygon | undefined>(
    undefined
  );

  //useImperativeHandle<naver.maps.Polygon | undefined, naver.maps.Polygon | undefined>(ref, ()=> polygon)
  const [polygonId] = useState(props.id ? props.id : `polygon-${uuid()}`);

  const addPolygon = (polygon: naver.maps.Polygon) => {
    dispatch({ type: "add_object", object: polygon, id: polygonId });
  };
  const removePolygon = () => {
    dispatch({ type: "remove_object", id: polygonId });
  };

  useEffect(() => {
    if (state.map === undefined) return;
    const polygon = new naver.maps.Polygon({
      ...props.opts,
      map: state.map,
    });
    setPolygon(polygon);
    setPrevOpts(JSON.stringify(props.opts));
    // state.objects에 폴리곤 추가
    addPolygon(polygon);
    // clean up
    return () => removePolygon();
  }, [state.map]);

  // 네이버 맵 이벤트 리스너 등록
  useNaverListener(polygon, [
    { name: "click", handler: props.onClick },
    { name: "dblclick", handler: props.onDoubleClick },
    { name: "drag", handler: props.onDrag },
    { name: "dragend", handler: props.onDragEnd },
    { name: "dragstart", handler: props.onDragStart },
    { name: "mousedown", handler: props.onMouseDown },
    { name: "mouseout", handler: props.onMouseOut },
    { name: "mouseover", handler: props.onMouseOver },
    { name: "mouseup", handler: props.onMouseUp },
    { name: "rightclick", handler: props.onRightClick },
  ]);

  useEffect(() => {
    if (
      polygon === undefined ||
      props.opts === undefined ||
      JSON.stringify(props.opts) === prevOpts
    )
      return;
    polygon.setOptions(props.opts);
    setPrevOpts(JSON.stringify(props.opts));
  }, [polygon, props.opts]);

  return null;
});
Polygon.displayName = "Polygon";

export default Polygon;
