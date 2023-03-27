import { PointerEvent } from "react";

export declare type NaverMapSubmodules =
  | "panorama"
  | "geocoder"
  | "drawing"
  | "visualization";

// 네이버 맵 도형
export declare type NaverMapShape =
  | naver.maps.Marker // 마커
  | naver.maps.Polygon // 다각 형
  | naver.maps.Polyline // 다각 선
  | naver.maps.Circle // 원
  | naver.maps.Ellipse // 타원
  | naver.maps.Rectangle // 사각형
  | naver.maps.OverlayView;

export declare type NaverMapLayer =
  | naver.maps.TrafficLayer
  | naver.maps.CadastralLayer
  | naver.maps.LabelLayer
  | naver.maps.StreetLayer;

export declare type NaverMapObjectWithSetMap =
  | NaverMapShape
  | NaverMapLayer
  | naver.maps.GroundOverlay
  | naver.maps.drawing.DrawingManager;

export declare type NaverMapObjectWithSetOptions = NaverMapShape;
// | naver.maps.Map

export declare type NaverMapObject =
  | naver.maps.CustomControl
  | NaverMapObjectWithSetMap
  | NaverMapShape
  | naver.maps.Data;

export declare type MapPanes =
  | "floatPane" // 오버레이보다 위에 위치하는 정보창 요소를 포함
  | "overlayImage"
  | "overlayLayer";

export declare type InfoPosition =
  | naver.maps.Marker
  | naver.maps.Coord
  | naver.maps.CoordLiteral;

export declare type Layers = "street" | "traffic" | "cadastral";
// Layer
export interface LayerProps {
  type: Layers;
  opts?: naver.maps.TrafficLayerOptions;
}

export interface NaverMapReducer {
  state: NaverMapState;
  dispatch: React.Dispatch<NaverMapAction>;
}

export interface NaverMapState {
  map?: naver.maps.Map;
  objects: Map<string, NaverMapObject>;
}

export interface NaverMapAction {
  type: string;
  map?: naver.maps.Map;
  object?: NaverMapObject;
  id?: string;
}

export interface NaverMapProviderProps {
  children: React.ReactNode;
}

export interface MapPointerEvent {
  coord: naver.maps.Coord;
  point: naver.maps.Point;
  latlng: naver.maps.LatLng;
  offset: naver.maps.Point;
  originalEvent: PointerEvent;
}

//Map
export interface MapProps {
  id?: string;
  ncpClientId?: string;
  className?: string;
  style?: React.CSSProperties;
  language?: string;
  region?: string;
  usePanorama?: boolean;
  useGeocoder?: boolean;
  useDrawing?: boolean;
  useVisualization?: boolean;
  LoadingComponent?: React.ReactNode;
  LoadedComponent?: React.ReactNode;
  opts?: naver.maps.MapOptions;

  onAddLayer?: (layer: naver.maps.Layer) => any;
  onRemoveLayer?: (layername: string) => any;
  onBoundsChanged?: (bounds: naver.maps.Bounds) => any;
  onCenterChanged?: (center: naver.maps.Coord) => any;
  onCenterPointChanged?: (centerPoint: naver.maps.Point) => any;
  onClick?: (pointerEvent: PointerEvent) => any;
  onDoubleClick?: (pointerEvent: PointerEvent) => any;
  onDoubleTap?: (event: PointerEvent) => any;
  onDrag?: () => any;
  onHeadingChanged?: () => any;
  onIdle?: () => any;
  onMapTypeIdChanged?: () => any;
  onProjectionChanged?: () => any;
  onTilesLoaded?: () => any;
  onTiltChanged?: () => any;
  onZoomChanged?: () => any;
  onInitStyleMap?: () => any;
  onKeyDown?: () => any;
  onKeyUp?: () => any;
  onLongTap?: () => any;
  onMapTypeChanged?: () => any;
  onRightClick?: (event: MouseEvent) => any;
  onMouseDown?: () => any;
  onMouseUp?: () => any;
  onPanning?: () => any;
  onPinch?: () => any;
  onPinchEnd?: () => any;
  onPinchStart?: () => any;
  onDragEnd?: () => any;
  onDragStart?: () => any;
  onResize?: () => any;
  onSizeChanged?: () => any;
  onTap?: () => any;
  onTouchEnd?: () => any;
  onTouchMove?: () => any;
  onTouchStart?: () => any;
  onTwoFingerTap?: () => any;
  onZooming?: () => any;
  onMouseMove?: (event: MouseEvent) => any;
  onMouseOut?: (event: MouseEvent) => any;
  onMouseOver?: (event: MouseEvent) => any;
  children: React.ReactNode;
}

// Marker
export interface MarkerProps {
  id?: string;
  opts?: naver.maps.MarkerOptions;
  // 클릭 이벤트
  onClick?: (event: MouseEvent) => any;
  onClickableChanged?: () => any;
  onCursorChanged?: () => any;
  onDoubleClick?: (event: MouseEvent) => any;
  onRightClick?: (event: MouseEvent) => any;
  // 드레그 이벤트
  onDragStart?: (event: MouseEvent) => any;
  onDrag?: (event: MouseEvent) => any;
  onDragEnd?: (event: MouseEvent) => any;
  onDraggableChanged?: () => any;
  // 마우스 이벤트
  onMouseOut?: (event: MouseEvent) => any;
  onMouseDown?: (event: MouseEvent) => any;
  onMouseOver?: (event: MouseEvent) => any;
  onMouseUp?: (event: MouseEvent) => any;
  // 프로퍼티 이벤트
  onPositionChanged?: () => any;
  onAnimationChanged?: () => any;
  onFlatChanged?: () => any;
  onIconChanged?: () => any;
  onShapeChanged?: () => any;
  onTitleChanged?: () => any;
  onVisibleChanged?: () => any;
  onZIndexChanged?: () => any;
}

// InfoWindow
export interface InfoWindowProps {
  anchorId?: string;
  opts?: naver.maps.InfoWindowOptions;
  targetCoord?: naver.maps.CoordLiteral;
  visible?: boolean;
  children?: React.ReactNode;
  onCloseClick?: () => any;
  onContentChanged?: () => any;
  onDOMReady?: () => any;
  onPositionChanged?: () => any;
  onZIndexChanged?: () => any;
}

//Shape
interface ShapeProps {
  id?: string;
  onClick?: (event: MouseEvent) => any;
  onDoubleClick?: (event: MouseEvent) => any;
  onDrag?: (event: MouseEvent) => any;
  onDragEnd?: (event: MouseEvent) => any;
  onDragStart?: (event: MouseEvent) => any;
  onMouseDown?: (event: PointerEvent) => any;
  onMouseOut?: (event: PointerEvent) => any;
  onMouseOver?: (event: PointerEvent) => any;
  onMouseUp?: (event: PointerEvent) => any;
  onRightClick?: (event: PointerEvent) => any;
}

export interface PolylineProps extends ShapeProps {
  opts?: naver.maps.PolylineOptions;
}

export interface PolygonProps extends ShapeProps {
  opts?: naver.maps.PolygonOptions;
}

export interface CircleProps extends ShapeProps {
  opts?: naver.maps.CircleOptions;
  onCenterChanged?: () => any;
  onRadiusChanged?: (event: MouseEvent) => any;
}

export interface EllipseProps extends ShapeProps {
  opts?: naver.maps.EllipseOptions;
  onBoundsChanged?: () => any;
  onClickableChanged?: () => any;
  onVisibleChanged?: () => any;
  onZIndexChanged?: () => any;
}

export interface RectangleProps extends ShapeProps {
  opts?: naver.maps.RectangleOptions;
  onBoundsChanged?: () => any;
}

// GroundOverlay

export interface GroundOverlayOptions {
  url: string;
  bounds: naver.maps.LatLngBoundsLiteral;
  clickable?: boolean;
  opacity?: number;
}

export interface GroundOverlayProps {
  id?: string;
  opts: GroundOverlayOptions;
  onClick?: (event: MouseEvent) => any;
  onDoubleClick?: (event: MouseEvent) => any;
}

// 히트맵 프랍
export interface HeateMapProps {
  id?: string;
  opts?: naver.maps.visualization.HeatMapOptions;
}

// 닷맵 프랍
export interface DotMapProps {
  id?: string;
  opts?: naver.maps.visualization.DotMapOptions;
}

// 오버레이 뷰 프랍
export interface OverlayViewProps {
  id: string;
  pane?: MapPanes;
  pointerevent?: boolean;
  children: React.ReactNode;
  position:
    | naver.maps.PointLiteral
    | naver.maps.CoordLiteral
    | naver.maps.LatLngLiteral;
  onClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onDoubleClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseDown?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseOver?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseOut?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseUp?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onTouchEnd?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
  onTouchStart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
  onPointOver?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  // disableMapHits?: boolean;
  // disableMapHitsAndGestures?: boolean;
}
declare type ControlPositionName =
  | "CENTER"
  | "TOP_LEFT"
  | "TOP_CENTER"
  | "TOP_RIGHT"
  | "LEFT_CENTER"
  | "LEFT_TOP"
  | "LEFT_BOTTOM"
  | "RIGHT_TOP"
  | "RIGHT_CENTER"
  | "RIGHT_BOTTOM"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT";

// CustomControl
export interface CustomControlProps {
  id?: string;
  opts?: naver.maps.ControlOptions;
  bindingPosition: ControlPositionName;
  children: React.ReactNode;
  onClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onDoubleClick?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseDown?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseOver?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseOut?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
  onMouseUp?: (this: GlobalEventHandlers, ev: MouseEvent) => any;
}

export interface DrawingManagerProps {
  opts?: naver.maps.drawing.DrawingOptions;
  onRectangleComplete?: (rectangle: naver.maps.Rectangle) => any;
  onEllipseComplete?: (circle: naver.maps.Ellipse) => any;
  onPolylineComplete?: (polyline: naver.maps.Polyline) => any;
  onPolygonComplete?: (polygon: naver.maps.Polygon) => any;
  onMarkerComplete?: (marker: naver.maps.Marker) => any;
}
