/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { InfoWindowProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";

const InfoWindow = ({
  anchorId,
  opts,
  targetCoord,
  visible,
  children,
  onCloseClick,
  onContentChanged,
  onDOMReady,
  onPositionChanged,
  onZIndexChanged,
}: InfoWindowProps): React.ReactPortal | null => {
  if (typeof document === "undefined") return null;
  const { state } = useContext(NaverMapContext);
  const [infoWindow, setInfowindow] = useState<
    naver.maps.InfoWindow | undefined
  >(undefined);
  const [container] = useState(document.createElement("div"));

  useEffect(() => {
    if (state.map === undefined) return;
    const infoWindow = new naver.maps.InfoWindow({
      ...opts,
      content: !!children ? container : opts?.content,
    });
    setInfowindow(infoWindow);
    console.log("anchorId : " + anchorId);
    const anchor = anchorId ? state.objects.get(anchorId) : undefined;
    // console.log("anchor : " + anchor is naver.maps.Marker)
    //`visible` 프랍에 따라 info window를 열거나 닫습니다.
    if (targetCoord !== undefined) {
      if (visible) infoWindow.open(state.map, targetCoord);
      else infoWindow.close();
    }
  }, [state.map, visible, anchorId && state.objects.get(anchorId)]);

  useNaverListener(infoWindow, [
    { name: "closeclick", handler: onCloseClick },
    { name: "content_changed", handler: onContentChanged },
    { name: "domready", handler: onDOMReady },
    { name: "position_changed", handler: onPositionChanged },
    { name: "zindex_changed", handler: onZIndexChanged },
  ]);

  useEffect(() => {
    if (infoWindow === undefined) return;
    infoWindow.setOptions({
      ...opts,
      content: !!children ? container : opts?.content,
    });
  }, [opts]);

  return ReactDOM.createPortal(children, container);
};

InfoWindow.diplayName = "InfoWindow";

export default InfoWindow;
