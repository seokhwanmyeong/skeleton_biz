/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
// @ts-ignore
import { v1 as uuid } from "uuid";
import ReactDom from "react-dom";
import { OverlayViewProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
const OverlayView = ({
  id,
  pane = "overlayLayer",
  pointerevent,
  position,
  anchorPoint,
  children,
  onClick,
  onDoubleClick,
  onMouseDown,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onTouchEnd,
  onTouchStart,
  onPointOver,
}: //disableMapHits = true,
// disableMapHitsAndGestures = true,
OverlayViewProps): React.ReactPortal | null => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [container] = useState<HTMLDivElement>(document.createElement("div"));
  const [markerId] = useState(id ? id : `marker-${uuid()}`);

  const addMarker = (marker: naver.maps.OverlayView) => {
    dispatch({ type: "add_object", object: marker, id: markerId });
  };
  const removeMarker = () => {
    dispatch({ type: "remove_object", id: markerId });
  };
  const [overlay, setOverlay] = useState<naver.maps.OverlayView | undefined>(
    undefined
  );
  // 맵 오버레이 효과
  useEffect(() => {
    if (state.map === undefined) return;
    const overlay = new naver.maps.OverlayView();
    // 오버레이 추가
    overlay.onAdd = () => {
      if (pointerevent === false) {
        container.style.position = "relative";
        container.style.pointerEvents = "none";
        container.style.zIndex = "1";
      } else {
        container.style.position = "absolute";
        container.style.zIndex = "2";
      }

      container.onclick = onClick || null;
      container.ondblclick = onDoubleClick || null;
      container.onmousedown = onMouseDown || null;
      container.onmouseover = onMouseOver || null;
      container.onmouseout = onMouseOut || null;
      container.onmouseup = onMouseUp || null;
      container.ontouchend = onTouchEnd || null;
      container.ontouchstart = onTouchStart || null;

      /*       if (disableMapHitsAndGestures)
        (naver.maps.OverlayView as any).preventMapHitsAndGesturesFrom(
          container
        );
      else if (disableMapHits)
        (naver.maps.OverlayView as any).preventMapHitsFrom(container); */
      (overlay.getPanes() as naver.maps.MapPanes)[pane].appendChild(container);
    };
    // 오버레이 제거
    overlay.onRemove = () => {
      container.parentNode && container.parentNode.removeChild(container);
    };
    overlay.draw = () => {};
    overlay.setMap(state.map);
    setOverlay(overlay);
    addMarker(overlay);
    return () => {
      removeMarker();
      overlay.setMap(null);
    };
  }, [state.map]);
  // 위치가 바뀔때 효과
  useEffect(() => {
    if (overlay !== undefined) {
      overlay.setMap(null);
      overlay.draw = () => {
        // @ts-ignore
        const location = overlay.getProjection().fromCoordToOffset(position);
        container.style.left =
          JSON.stringify(location.x + (anchorPoint?.x || 0)) + "px";
        container.style.top =
          JSON.stringify(location.y + (anchorPoint?.y || 0)) + "px";
      };
      overlay.setMap(state.map || null);
    }
  }, [overlay, position]);

  return ReactDom.createPortal(children, container);
};

OverlayView.diplayName = "OverlayView";

export default OverlayView;
