/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";
import { useState } from "react";
import useNaverListener from "../../hooks/useNaverListener";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import { MarkerProps } from "../../common/types";
const Marker = ({
  id,
  opts,
  onAnimationChanged,
  onClick,
  onClickableChanged,
  onCursorChanged,
  onDoubleClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onDraggableChanged,
  onFlatChanged,
  onIconChanged,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onPositionChanged,
  onRightClick,
  onShapeChanged,
  onTitleChanged,
  onVisibleChanged,
  onZIndexChanged,
}: MarkerProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [prevOpts, setPrevOpts] = useState("");
  const [marker, setMarker] = useState<naver.maps.Marker | undefined>(
    undefined
  );
  const [markerId] = useState(id ? id : `marker-${uuid()}`);

  const addMarker = (marker: naver.maps.Marker) => {
    dispatch({ type: "add_object", object: marker, id: markerId });
  };
  const removeMarker = () => {
    dispatch({ type: "remove_object", id: markerId });
  };
  useEffect(() => {
    if (state.map === undefined) return;
    const marker = new naver.maps.Marker({ ...opts, map: state.map });
    setMarker(marker);
    setPrevOpts(JSON.stringify(opts));

    // 마커 state.objects에 추가
    addMarker(marker);

    // clean up
    return () => removeMarker();
  }, [state.map]);
  /**
 * clickable_changed
   cursor_changed
   draggable_changed
   icon_changed
   position_changed
   shape_changed
   title_changed
   visible_changed
   zIndex_changed
 */
  useNaverListener(marker, [
    { name: "animation_changed", handler: onAnimationChanged },
    { name: "click", handler: onClick },
    { name: "clickable_changed", handler: onClickableChanged },
    { name: "cursor_changed", handler: onCursorChanged },
    { name: "dblclick", handler: onDoubleClick },
    { name: "drag", handler: onDrag },
    { name: "dragend", handler: onDragEnd },
    { name: "draggable_changed", handler: onDraggableChanged },
    { name: "dragstart", handler: onDragStart },
    { name: "flat_changed", handler: onFlatChanged },
    { name: "icon_changed", handler: onIconChanged },
    { name: "mousedown", handler: onMouseDown },
    { name: "mouseout", handler: onMouseOut },
    { name: "mouseover", handler: onMouseOver },
    { name: "mouseup", handler: onMouseUp },
    { name: "position_changed", handler: onPositionChanged },
    { name: "rightclick", handler: onRightClick },
    { name: "shape_changed", handler: onShapeChanged },
    { name: "title_changed", handler: onTitleChanged },
    { name: "visible_changed", handler: onVisibleChanged },
    { name: "zindex_changed", handler: onZIndexChanged },
  ]);
  // 컴포넌트 프랍이 변경되면 마커 객체 수정
  useEffect(() => {
    if (
      marker === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return;
    marker.setOptions(opts);
    setPrevOpts(JSON.stringify(opts));
  }, [marker, opts]);

  return null;
};

Marker.displayName = "marker";

export default Marker;
