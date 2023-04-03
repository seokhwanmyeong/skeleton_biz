/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { CustomControlProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";

const CustomControl = ({
  bindingPosition = "RIGHT_TOP",
  children,
}: CustomControlProps): React.ReactPortal | null => {
  const { state } = useContext(NaverMapContext);
  const containerRef = useRef<HTMLDivElement>();
  const [control, setControl] = useState<naver.maps.CustomControl | undefined>(
    undefined
  );
  const [mounted, setMounted] = useState(false);
  const [lastBindingPosition, setLastBindingPosition] =
    useState(bindingPosition);

  useEffect(() => {
    if (state.map === undefined) return;
    naver.maps.Event.once(state.map, "init", () => {
      const control = new naver.maps.CustomControl(
        document.createElement("div"),
        {}
      );
      containerRef.current = document.createElement("div");
      containerRef.current.style.zIndex = "999";
      control.getElement().appendChild(containerRef.current);
      control.setOptions({ position: naver.maps.Position[bindingPosition] });
      control.setMap(state.map);
      setControl(control);
      setMounted(true);
    });
    if (bindingPosition !== lastBindingPosition) {
      control?.setOptions({ position: naver.maps.Position[bindingPosition] });
    }
  }, [state.map, bindingPosition]);

  // @ts-ignore
  return mounted ? ReactDOM.createPortal(children, containerRef.current) : null;
};

CustomControl.displayName = "CustomControl";

export default CustomControl;
