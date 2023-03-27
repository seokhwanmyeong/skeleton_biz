/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext, useState } from "react";
import { v1 as uuid } from "uuid";
import { GroundOverlayProps } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";
const GroundOverlay = ({
  id,
  opts,
  onClick,
  onDoubleClick,
}: GroundOverlayProps) => {
  const { state, dispatch } = useContext(NaverMapContext);
  const [groundOverlay, setGroundOverlay] = useState<
    naver.maps.GroundOverlay | undefined
  >(undefined);
  const [groundOverlayId] = useState(id ? id : `ground-overlay-${uuid()}`);
  const [prevBounds, setPrevBounds] = useState<
    naver.maps.LatLngBoundsLiteral | undefined
  >(undefined);
  const [prevClickable, setPrevClickable] = useState(true);

  const addGroundOverlay = (groundOverlay: naver.maps.GroundOverlay) => {
    dispatch({
      type: "add_object",
      object: groundOverlay,
      id: groundOverlayId,
    });
  };
  const removeGroundOverlay = () => {
    dispatch({ type: "remove_object", id: groundOverlayId });
  };

  const createGroundOverlay = () => {
    const groundOverlay = new naver.maps.GroundOverlay(
      opts.url,
      opts?.bounds,
      {
        clickable: opts?.clickable,
        opacity: opts?.opacity,
        map: state.map,
      }
    );
    setGroundOverlay(groundOverlay);

    // 바운드와 클릭커블 기록
    setPrevBounds(opts?.bounds);
    setPrevClickable(opts?.clickable === undefined ? true : opts.clickable);

    addGroundOverlay(groundOverlay);
  };

  useEffect(() => {
    if (state.map === undefined) return;
    createGroundOverlay();

    // clean up
    return () => removeGroundOverlay();
  }, [state.map]);

  useNaverListener(groundOverlay, [
    { name: "click", handler: onClick },
    { name: "dblclick", handler: onDoubleClick },
  ]);

  // naver.maps.GroundOverlay 객체의 Opacity가 수정
  useEffect(() => {
    if (groundOverlay === undefined) return;
    if (opts?.opacity && opts.opacity !== groundOverlay.getOpacity())
      groundOverlay.setOpacity(opts.opacity);
  }, [opts?.opacity]);

  // url/bounds/clickable 변경 시 객체 재생성
  useEffect(() => {
    if (state.map === undefined || groundOverlay === undefined) return;
    const clickable = opts?.clickable === undefined ? true : opts.clickable;
    if (
      opts?.url !== groundOverlay.getUrl() ||
      !Object.is(JSON.stringify(opts.bounds), JSON.stringify(prevBounds)) ||
      clickable !== prevClickable
    ) {
      removeGroundOverlay();
      createGroundOverlay();
    }
  }, [opts?.url, opts?.bounds, opts?.clickable]);
  return null;
};

GroundOverlay.displayNaqme = "GroundOverlay";

export default GroundOverlay;
