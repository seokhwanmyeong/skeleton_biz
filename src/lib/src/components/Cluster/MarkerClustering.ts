type Nullable<T> = T | null;

/* interface ClusterOptions {
  map: Nullable<naver.maps.Map>;
  markers: Array<naver.maps.Marker>;
  disableClickZoom: boolean;
  minClusterSize: number;
  maxZoom: number;
  gridSize: number;
  icons: Array<Parameters<naver.maps.Marker["setIcon"]>[0]>;
  indexGenerator: Array<number> | ((count: number) => number);
  averageCenter: boolean;
  stylingFunction: (clusterMarker: naver.maps.Marker, count: number) => void;
}
 */
type OptionKey = keyof naver.maps.MarkerClusteringOptionsType;

const DEFAULT_OPTIONS: naver.maps.MarkerClusteringOptionsType = {
  // 클러스터 마커를 올릴 지도입니다.
  map: null,
  // 클러스터 마커를 구성할 마커입니다.
  markers: [],
  // 클러스터 마커 클릭 시 줌 동작 여부입니다.
  disableClickZoom: true,
  // 클러스터를 구성할 최소 마커 수입니다.
  minClusterSize: 2,
  // 클러스터 마커로 표현할 최대 줌 레벨입니다. 해당 줌 레벨보다 높으면, 클러스터를 구성하고 있는 마커를 노출합니다.
  maxZoom: 13,
  // 클러스터를 구성할 그리드 크기입니다. 단위는 픽셀입니다.
  gridSize: 100,
  // 클러스터 마커의 아이콘입니다. NAVER Maps JavaScript API v3에서 제공하는 아이콘, 심볼, HTML 마커 유형을 모두 사용할 수 있습니다.
  icons: [],
  // 클러스터 마커의 아이콘 배열에서 어떤 아이콘을 선택할 것인지 인덱스를 결정합니다.
  indexGenerator: [10, 100, 200, 500, 1000],
  // 클러스터 마커의 위치를 클러스터를 구성하고 있는 마커의 평균 좌표로 할 것인지 여부입니다.
  averageCenter: false,
  // 클러스터 마커를 갱신할 때 호출하는 콜백함수입니다. 이 함수를 통해 클러스터 마커에 개수를 표현하는 등의 엘리먼트를 조작할 수 있습니다.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stylingFunction() {},
};

export class MarkerClustering extends naver.maps.OverlayView {
  _clusters: Cluster[] = [];
  options: any;
  _mapRelations: any = null;
  _markerRelations: any[] = [];
  _geoTree = null;

  constructor(options: naver.maps.MarkerClusteringOptionsType) {
    super();
    this.options = {};
    this._clusters = [];

    this._mapRelations = null;
    this._markerRelations = [];

    this.setOptions({ ...DEFAULT_OPTIONS, ...options });
    this.setMap(options.map||null);
  }

  onAdd() {
    const map = this.getMap();

    this._mapRelations = naver.maps.Event.addListener(
      map,
      "idle",
      this._onIdle.bind(this)
    );

    if (this.getMarkers().length > 0) {
      this._createClusters();
      this._updateClusters();
    }
  }

  onRemove() {
    if (this._mapRelations) naver.maps.Event.removeListener(this._mapRelations);

    this._clearClusters();

    this._geoTree = null;
    this._mapRelations = null;
  }

  setMap(map: naver.maps.Map | null) {
    if (this.getMap()) {
      this.onRemove();
    }
    this.set("map", map)
    if (map) {
      this.onAdd();
    }
  }
  getMap() {
    return this.getOptions("map");
  }

  draw() {}


  setOptions(newOptions: Partial<naver.maps.MarkerClusteringOptionsType>) {
    const _this = this;

    if (typeof newOptions === "string") {
      const key = newOptions;
      const value = arguments[1];

      _this.set(key, value);
    } else {
      const isFirst = arguments[1];

      Object.entries(newOptions).forEach(([key, value]) => {
        if (key !== "map") {
          _this.set(key, value);
        }
      });

      if (newOptions.map && !isFirst) {
        _this.setMap(newOptions.map);
      }
    }
  }
  set(key: string, value: any) {
    this.options[key] = value;
  }

  get(key: string) {
    return this.options[key];
  }
  getOptions(key?: OptionKey) {
    const options: Record<string, unknown> = {};

    if (key !== undefined) {
      return this.get(key);
    } else {
      Object.keys(DEFAULT_OPTIONS).forEach((key) => {
        options[key] = this.get(key);
      });

      return options;
    }
  }

  getMinClusterSize() {
    return this.getOptions("minClusterSize");
  }

  setMinClusterSize(size: number) {
    this.setOptions({ minClusterSize: size });
  }

  getMaxZoom() {
    return this.getOptions("maxZoom");
  }

  setMaxZoom(zoom: number) {
    this.setOptions({ maxZoom: zoom });
  }

  getGridSize() {
    return this.getOptions("gridSize");
  }

  setGridSize(size: number) {
    this.setOptions({ gridSize: size });
  }

  getIndexGenerator() {
    return this.getOptions("indexGenerator");
  }

  setIndexGenerator(indexGenerator: naver.maps.MarkerClusteringOptionsType["indexGenerator"]) {
    this.setOptions({ indexGenerator });
  }

  getMarkers() {
    return this.getOptions("markers");
  }

  setMarkers(markers: naver.maps.Marker[]) {
    this.setOptions({ markers });
  }

  getIcons() {
    return this.getOptions("icons");
  }

  setIcons(icons: naver.maps.MarkerIconType[]) {
    this.setOptions({ icons });
  }

  getStylingFunction() {
    return this.getOptions("stylingFunction");
  }

  setStylingFunction(
    stylingFunction: (marker: naver.maps.Marker, count: number) => void
  ) {
    this.setOptions({ stylingFunction });
  }

  getDisableClickZoom(): naver.maps.MarkerClusteringOptionsType["disableClickZoom"] {
    return this.getOptions("disableClickZoom");
  }

  setDisableClickZoom(disableClickZoom: naver.maps.MarkerClusteringOptionsType["disableClickZoom"]) {
    this.setOptions({ disableClickZoom });
  }
  getAverageCenter(): boolean {
    return this.getOptions("averageCenter");
  }

  setAverageCenter(averageCenter: boolean): void {
    this.setOptions({ averageCenter });
  }

  // KVO event handler
  changed(key: OptionKey | "marker", value?: boolean) {
    if (!this.getMap()) return;

    switch (key) {
      case "marker":
      case "minClusterSize":
      case "gridSize":
      case "averageCenter":
        this._redraw();
        break;
      case "indexGenerator":
      case "icons":
        this._clusters.forEach(function (cluster) {
          cluster.updateIcon();
        });
        break;
      case "maxZoom":
        this._clusters.forEach(function (cluster) {
          if (cluster.getCount() > 1) {
            cluster.checkByZoomAndMinClusterSize();
          }
        });
        break;
      case "stylingFunction":
        this._clusters.forEach(function (cluster) {
          cluster.updateCount();
        });
        break;
      case "disableClickZoom":
        // eslint-disable-next-line no-case-declarations
        let exec: "enableClickZoom" | "disableClickZoom" = "enableClickZoom";

        if (value) {
          exec = "disableClickZoom";
        }

        this._clusters.forEach(function (cluster) {
          cluster[exec]();
        });
        break;
    }
  }

  _createClusters(): void {
    const map = this.getMap();

    if (!map) return;

    const bounds = map.getBounds(),
      markers = this.getMarkers();

    for (let i = 0, ii = markers.length; i < ii; i++) {
      const marker = markers[i],
        position = marker.getPosition();

      if (!bounds.hasLatLng(position)) continue;

      const closestCluster = this._getClosestCluster(position);

      closestCluster.addMarker(marker);

      this._markerRelations.push(
        naver.maps.Event.addListener(
          marker,
          "dragend",
          this._onDragEnd.bind(this)
        )
      );
    }
  }

  _updateClusters(): void {
    const clusters = this._clusters;

    for (let i = 0, ii = clusters.length; i < ii; i++) {
      clusters[i].updateCluster();
    }
  }

  _clearClusters(): void {
    const clusters = this._clusters;

    for (let i = 0, ii = clusters.length; i < ii; i++) {
      clusters[i].destroy();
    }

    naver.maps.Event.removeListener(this._markerRelations);

    this._markerRelations = [];
    this._clusters = [];
  }

  _redraw(): void {
    this._clearClusters();
    this._createClusters();
    this._updateClusters();
  }

  _getClosestCluster(position: naver.maps.LatLng): Cluster {
    const map = this.getMap();

    const proj = this.getProjection() || map?.getProjection();

    if (!proj) return;
    const clusters = this._clusters;
    let closestCluster = null;
    let distance = Infinity;

    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i];
      const center = cluster.getCenter();

      if (cluster.isInBounds(position) && center) {
        const delta = proj.getDistance(center, position);

        if (delta < distance) {
          distance = delta;
          closestCluster = cluster;
        }
      }
    }

    if (!closestCluster) {
      closestCluster = new Cluster(this);
      this._clusters.push(closestCluster);
    }

    return closestCluster;
  }

  private _onIdle(): void {
    this._redraw();
  }

  private _onDragEnd(): void {
    this._redraw();
  }
}

class Cluster {
  private _clusterCenter: naver.maps.Coord;
  private _clusterBounds: naver.maps.LatLngBounds;
  private _clusterMarker: naver.maps.Marker;
  private _relation: any | null;
  private _clusterMember: naver.maps.Marker[];
  private _markerClusterer: MarkerClustering;

  constructor(markerClusterer: MarkerClustering) {
    this._clusterCenter = null;
    this._clusterBounds = null;
    this._clusterMarker = null;
    this._relation = null;
    this._clusterMember = [];
    this._markerClusterer = markerClusterer;
  }

  addMarker(marker: naver.maps.Marker): void {
    if (this._isMember(marker)) return;

    if (!this._clusterCenter) {
      const position = marker.getPosition();

      this._clusterCenter = new naver.maps.LatLng(position);
      this._clusterBounds = this._calcBounds(new naver.maps.LatLng(position));
    }

    this._clusterMember.push(marker);
  }

  destroy(): void {
    naver.maps.Event.removeListener(this._relation);

    const members = this._clusterMember;

    for (let i = 0, ii = members.length; i < ii; i++) {
      members[i].setMap(null);
    }

    this._clusterMarker.setMap(null);

    this._clusterMarker = null;
    this._clusterCenter = null;
    this._clusterBounds = null;
    this._relation = null;

    this._clusterMember = [];
  }

  getCenter(): naver.maps.Coord | null {
    return this._clusterCenter;
  }

  getBounds(): naver.maps.LatLngBounds | null {
    return this._clusterBounds;
  }

  getCount(): number {
    return this._clusterMember.length;
  }

  getClusterMember(): naver.maps.Marker[] {
    return this._clusterMember;
  }

  isInBounds(latlng: naver.maps.LatLng): boolean {
    return this._clusterBounds && this._clusterBounds.hasLatLng(latlng);
  }

  enableClickZoom(): void {
    if (this._relation) return;

    const map = this._markerClusterer.getMap();

    this._relation = naver.maps.Event.addListener(
      this._clusterMarker,
      "click",
      function (e: any) {
        if (!map) return;
        map.morph(e.coord, map.getZoom() + 1);
      }.bind(this)
    );
  }
  disableClickZoom(): void {
    if (!this._relation) return;

    naver.maps.Event.removeListener(this._relation);
    this._relation = null;
  }
  updateCluster(): void {
    if (!this._clusterMarker) {
      let position : naver.maps.Coord;

      if (this._markerClusterer.getAverageCenter()) {
        position = this._calcAverageCenter(this._clusterMember);
      } else {
        position = this._clusterCenter;
      }

      this._clusterMarker = new naver.maps.Marker({
        position: position,
        map: this._markerClusterer.getMap(),
      });

      if (!this._markerClusterer.getDisableClickZoom()) {
        this.enableClickZoom();
      }
    }

    this.updateIcon();
    this.updateCount();

    this.checkByZoomAndMinClusterSize();
  }

  checkByZoomAndMinClusterSize(): void {
    const clusterer = this._markerClusterer;
    const minClusterSize = clusterer.getMinClusterSize();
    const maxZoom = clusterer.getMaxZoom();
    const currentZoom = clusterer.getMap().getZoom();

    if (this.getCount() < minClusterSize) {
      this._showMember();
    } else {
      this._hideMember();

      if (maxZoom <= currentZoom) {
        this._showMember();
      }
    }
  }

  updateCount(): void {
    const stylingFunction = this._markerClusterer.getStylingFunction();
    stylingFunction && stylingFunction(this._clusterMarker, this.getCount());
  }

  updateIcon(): void {
    const count = this.getCount();
    const index = this._getIndex(count);
    const icons = this._markerClusterer.getIcons();

    const adjustedIndex = Math.max(index, 0);
    const finalIndex = Math.min(adjustedIndex, icons.length - 1);

    this._clusterMarker.setIcon(icons[finalIndex]);
  }

  private _showMember(): void {
    const map = this._markerClusterer.getMap();
    const marker = this._clusterMarker;
    const members = this._clusterMember;

    for (const member of members) {
      member.setMap(map);
    }

    if (marker) {
      marker.setMap(null);
    }
  }

  private _hideMember(): void {
    const map = this._markerClusterer.getMap();
    const marker = this._clusterMarker;
    const members = this._clusterMember;

    for (const member of members) {
      member.setMap(null);
    }

    if (marker && !marker.getMap()) {
      marker.setMap(map);
    }
  }

  private _calcBounds(position: naver.maps.LatLng): naver.maps.LatLngBounds {
    const map = this._markerClusterer.getMap();
    const bounds = new naver.maps.LatLngBounds(
      position.clone(),
      position.clone()
    );
    const mapBounds = map.getBounds();
    const proj = map.getProjection();
    const map_max_px = proj.fromCoordToOffset(mapBounds.getNE());
    const map_min_px = proj.fromCoordToOffset(mapBounds.getSW());
    const max_px = proj.fromCoordToOffset(bounds.getNE());
    const min_px = proj.fromCoordToOffset(bounds.getSW());
    const gridSize = this._markerClusterer.getGridSize() / 2;

    max_px.add(gridSize, -gridSize);
    min_px.add(-gridSize, gridSize);

    const max_px_x = Math.min(map_max_px.x, max_px.x);
    const max_px_y = Math.max(map_max_px.y, max_px.y);
    const min_px_x = Math.max(map_min_px.x, min_px.x);
    const min_px_y = Math.min(map_min_px.y, min_px.y);
    const newMax = proj.fromOffsetToCoord(
      new naver.maps.Point(max_px_x, max_px_y)
    );
    const newMin = proj.fromOffsetToCoord(
      new naver.maps.Point(min_px_x, min_px_y)
    );

    return new naver.maps.LatLngBounds(newMin, newMax);
  }

  private _getIndex(count: number) {
    const indexGenerator = this._markerClusterer.getIndexGenerator();

    if (typeof indexGenerator === "function") {
      return indexGenerator(count);
    } else if (Array.isArray(indexGenerator)) {
      let index = 0;

      for (let i = index, ii = indexGenerator.length; i < ii; i++) {
        const factor = indexGenerator[i];

        if (count < factor) break;

        index++;
      }

      return index;
    }
  }

  private _isMember(marker: naver.maps.Marker): boolean {
    return this._clusterMember.indexOf(marker) !== -1;
  }

  private _calcAverageCenter(markers: naver.maps.Marker[]): naver.maps.Coord {
    const numberOfMarkers = markers.length;
    const averageCenter = [0, 0];

    for (let i = 0; i < numberOfMarkers; i++) {
      averageCenter[0] += markers[i].getPosition().x;
      averageCenter[1] += markers[i].getPosition().y;
    }

    averageCenter[0] /= numberOfMarkers;
    averageCenter[1] /= numberOfMarkers;

    return new naver.maps.LatLng(averageCenter[0], averageCenter[1]);
  }
}
