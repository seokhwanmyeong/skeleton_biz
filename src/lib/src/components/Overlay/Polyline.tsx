import { useEffect, useContext, useState } from "react";
import { v1 as uuid } from "uuid";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import { PolylineProps } from "../../common/types";
import useNaverListener from "../../hooks/useNaverListener";

const Polyline = ({
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
}: PolylineProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [prevOpts, setPrevOpts] = useState("");
  const [polyline, setPolyline] = useState<naver.maps.Polyline | undefined>(
    undefined
  );
  const [polylineId] = useState(id ? id : `polyline-${uuid()}`);

  const addPolyline = (polyline: naver.maps.Polyline) => {
    dispatch({ type: "add_object", object: polyline, id: polylineId });
  };
  const removePolyline = () => {
    dispatch({ type: "remove_object", id: polylineId });
  };

  useEffect(() => {
    if (state.map === undefined) return;

    const polyline = new naver.maps.Polyline({ ...opts, map: state.map });

    setPolyline(polyline);
    setPrevOpts(JSON.stringify(opts));

    // polyline을 state.objects에 추가
    addPolyline(polyline);

    return () => removePolyline();
  }, [state.map]);

  // 맵 이벤트 리스너 등록
  useNaverListener(polyline, [
    { name: "click", handler: onClick },
    { name: "dblclick", handler: onDoubleClick },
    { name: "drag", handler: onDrag },
    { name: "dragend", handler: onDragEnd },
    { name: "dragstart", handler: onDragStart },
    { name: "mousedown", handler: onMouseDown },
    { name: "mouseout", handler: onMouseOut },
    { name: "mouseover", handler: onMouseOver },
    { name: "mouseup", handler: onMouseUp },
    { name: "rightclick", handler: onRightClick },
  ]);

  // 컴포넌트 프랍이 변경되면 naver.maps.Polyline 객체 수정
  useEffect(() => {
    if (
      polyline === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return;
    polyline.setOptions(opts);
    setPrevOpts(JSON.stringify(opts));
  }, [polyline, opts]);

  return null;
};
Polyline.displayName = "Polyline";
export default Polyline;
