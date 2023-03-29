/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext, useState } from "react";
import { v1 as uuid } from "uuid";
import { CircleProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";

const Circle = ({
  id,
  opts,
  onCenterChanged,
  onClick,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onRadiusChanged,
  onRightClick,
}: CircleProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [prevOpts, setPrevOpts] = useState("");
  const [circle, setCircle] = useState<naver.maps.Circle | undefined>(
    undefined
  );
  const [circleId] = useState(id ? id : `circle-${uuid()}`);
  const addCircle = (circle: naver.maps.Circle) => {
    dispatch({ type: "add_object", object: circle, id: circleId });
  };
  const removeCircle = () => {
    dispatch({ type: "remove_object", id: circleId });
  };

  useEffect(() => {
    if (state.map === undefined) return;
    const circle = new naver.maps.Circle({
      ...opts,
      map: state.map,
    });
    setCircle(circle);
    setPrevOpts(JSON.stringify(opts));

    // state.objects에 circle 추가
    addCircle(circle);

    // clean up
    return () => removeCircle();
  }, [state.map]);

  useNaverListener(circle, [
    { name: "click", handler: onClick },
    { name: "dblclick", handler: onDoubleClick },
    { name: "rightclick", handler: onRightClick },
    { name: "drag", handler: onDrag },
    { name: "dragend", handler: onDragEnd },
    { name: "dragstart", handler: onDragStart },
    { name: "mousedown", handler: onMouseDown },
    { name: "mouseout", handler: onMouseOut },
    { name: "mouseover", handler: onMouseOver },
    { name: "mouseup", handler: onMouseUp },
    { name: "center_changed", handler: onCenterChanged },
    { name: "radius_changed", handler: onRadiusChanged },
  ]);

  // 컴포넌트의 프랍이 바뀔 때 naver.maps.Circle 객체 재구성
  useEffect(() => {
    if (
      circle === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return;
    circle.setOptions(opts);
    setPrevOpts(JSON.stringify(opts));
  }, [circle, opts]);
  // 렌더
  return null;
};

export default Circle;
