import { useEffect, useContext, useState, useRef } from "react";
import { DrawingManagerProps, NaverMapShape } from "../../common/types";
import { NaverMapContext } from "../../contexts/NaverMapContext";
import useNaverListener from "../../hooks/useNaverListener";

const DrawingManager = ({
  opts,
  onEllipseComplete,
  onMarkerComplete,
  onPolygonComplete,
  onPolylineComplete,
  onRectangleComplete,
}: DrawingManagerProps) => {
  const drawingManagerId = "drawing-manager";
  const { state, dispatch } = useContext(NaverMapContext);
  const [prevOpts, setPrevOpts] = useState("");
  const [drawingMgr, setDrawingMgr] = useState<
    naver.maps.drawing.DrawingManager | undefined
  >(undefined);
  const [shapeCount, setShapeCount] = useState(0);
  const shapeCountRef = useRef(0);
  const addShape = (shape: NaverMapShape) => {
    setShapeCount((shapeCount) => {
      dispatch({
        type: "add_object",
        object: shape,
        id: `${drawingManagerId}-${shapeCount}`,
      });
      return shapeCount + 1;
    });
  };
  const removeShapes = () => {
    for (let i = 0; i < shapeCountRef.current; i++) {
      dispatch({ type: "remove_object", id: `${drawingManagerId}-${i}` });
    }
  };
  const addDrawingManager = (
    drawingManger: naver.maps.drawing.DrawingManager
  ) => {
    dispatch({
      type: "add_object",
      object: drawingManger,
      id: drawingManagerId,
    });
  };
  const removeDrawingManager = () => {
    removeShapes();
    dispatch({ type: "remove_object", id: drawingManagerId });
  };

  useEffect(() => {
    if (state.map === undefined) return;
    naver.maps.Event.once(state.map, "init", () => {
      const drawingManager = new naver.maps.drawing.DrawingManager({
        ...opts,
        map: state.map,
      });
      setDrawingMgr(drawingManager);
      setPrevOpts(JSON.stringify(opts));
      addDrawingManager(drawingManager);
      return () => removeDrawingManager();
    });
  }, [state.map]);

  useNaverListener(drawingMgr, [
    { name: "ellipseComplete", handler: onEllipseComplete },
    { name: "polygoncomplete", handler: onPolygonComplete },
    { name: "polylinecomplete", handler: onPolylineComplete },
    { name: "rectanglecomplete", handler: onRectangleComplete },
    { name: "markercomplete", handler: onMarkerComplete },
  ]);
  // 컴포넌트 속성이 변경되면 drawingMgr 객체 수정
  useEffect(() => {
    if (
      drawingMgr === undefined ||
      opts === undefined ||
      JSON.stringify(opts) === prevOpts
    )
      return;
    drawingMgr.setOptions(opts);
    setPrevOpts(JSON.stringify(opts));
  }, [drawingMgr, opts]);
  return null;
};

DrawingManager.displayName = "DrawingManager";
export default DrawingManager;
