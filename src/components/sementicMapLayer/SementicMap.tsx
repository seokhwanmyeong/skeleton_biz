//  Lib
import { useEffect, useState, useRef, useContext } from "react";
import { CubeContext } from "@cubejs-client/react";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { Button, Flex, keyframes } from "@chakra-ui/react";
//  State
import {
  selectorSementicMapState,
  areaSelectActivator,
  atomArea,
  atomMapController,
} from "@states/searchState/stateSearch";
//  Services
import { addrAreaApiHandler, dong } from "@services/address/sgisDepthAddr";
//  Util
import { addrHCode } from "@util/data/address";
import { dongData } from "@util/data/dongData";
import { BaseAreaContext } from "./filter/BaseAreaProvider";

const SementicMap = () => {
  // const { cubejsApi } = useContext(CubeContext);
  // const [baseArea, setBaseArea] = useRecoilState(atomArea);
  // const [slctArea, setSlctArea] = useRecoilState(atomTmpSlctArea);
  // const resetController = useResetRecoilState(atomMapController);
  const {
    sido,
    sigungu,
    sidoList,
    sigunguList,
    dongList,
    sidoHandler,
    sigunguHandler,
  } = useContext(BaseAreaContext);
  const [siPol, setSiPol] = useState<any[]>([]);
  const [sigunguPol, setSigunguPol] = useState<any[]>([]);
  const [dongPol, setDongPol] = useState<any[]>([]);
  // const [addr, setAddr] = useState(null);
  // const [geoTop, setGeoTop] = useState<any>(null);
  // const [geoMid, setGeoMid] = useState<any>(null);
  // const [test, setTest] = useState<any>(null);

  const { event } = useRecoilValue(atomMapController);
  const mapEventReset = useResetRecoilState(atomMapController);
  const [mapState, setSementicMapState] = useRecoilState(
    selectorSementicMapState
  );
  const setMapControll = useSetRecoilState(areaSelectActivator);
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const [activeEvent, setActiveEvent] = useState<any>();
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [basePointer, setPointer] = useState<any>({
    pointer: {
      coord: {},
      address: "",
      isCheck: false,
    },
    area: {
      polygon: {},
      isCheck: true,
    },
  });

  const polygonCreator = (
    areaLi: { code: string; name: string; polygon: string }[],
    clickEvent: (area: { code: string; name: string; polygon: string }) => any
  ) => {
    return areaLi.map((area) => {
      const polygon = Object.values(JSON.parse(area.polygon)).map(
        (latLng: any) => {
          if (area.code === "28" || area.code === "46") {
            return latLng.map(
              (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
            );
          } else {
            return new naver.maps.LatLng(latLng[1], latLng[0]);
          }
        }
      );
      let color = "red";

      // 인천, 전라남도 예외조건 paths
      const setPolygon = new naver.maps.Polygon({
        map: mapRef.current,
        paths: area.code === "28" || area.code === "46" ? polygon : [polygon],
        fillColor: color,
        fillOpacity: 0.1,
        strokeColor: color,
        strokeWeight: 1,
        strokeOpacity: 0.6,
        clickable: true,
      });
      naver.maps.Event.addListener(setPolygon, "click", (e) => {
        clickEvent(area);
      });

      naver.maps.Event.addListener(setPolygon, "mouseover", (e) => {
        mapRef.current.setCursor("pointer");
        setPolygon.setOptions("fillOpacity", 0.4);
      });

      naver.maps.Event.addListener(setPolygon, "mouseout", (e) => {
        mapRef.current.setCursor("auto");
        setPolygon.setOptions("fillOpacity", 0.1);
      });

      return setPolygon;
    });
  };

  const MapController = (props: any) => {
    const { offset } = props;
    const polygonType = [
      {
        title: "ROUND",
        key: "round",
      },
      {
        title: "BOX",
        key: "box",
      },
      {
        title: "CUSTOM",
        key: "custom",
      },
    ];

    const boxAniKetframe = keyframes`
      0% {bottom: -50px}
      100% {bottom: 20px}
    `;

    return (
      <Flex
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        p="20px"
        bg="#ffffff"
        border="1px solid #555555"
        borderRadius="10px"
        gap="10px"
        animation={`${boxAniKetframe} 0.3s linear`}
      >
        {polygonType.map((list) => {
          const { title, key } = list;
          return (
            <Button
              key={key}
              onClick={() => {
                console.log("click");
              }}
              bg="#555555"
              fontWeight="bold"
              _hover={{
                backgroundColor: "#000000",
              }}
            >
              {title}
            </Button>
          );
        })}
        <Button
          key={"polygon-cancle"}
          onClick={() => {
            setMapControll("");
          }}
          bg="#ff6161"
          fontWeight="bold"
          _hover={{
            backgroundColor: "#ff2121",
          }}
        >
          CANCEL
        </Button>
      </Flex>
    );
  };

  const Test = () => {
    return (
      <Button
        style={{
          padding: "5px 10px",
          position: "absolute",
          left: `${offset.left}px`,
          top: `${offset.top - 60}px`,
          zIndex: "999",
          color: "#ffffff",
          borderRadius: "5px",
          backgroundColor: "#555555",
        }}
        onClick={() => {
          setMapControll("");
          setSementicMapState(basePointer);
          setOffset({ left: 0, top: 0 });
          setPointer({
            pointer: {
              coord: {},
              address: "",
              isCheck: false,
            },
            area: {
              polygon: {},
              isCheck: true,
            },
          });
        }}
      >
        설정완료
      </Button>
    );
  };

  const mapBasePointHandler = (e: any, baseMap: any) => {
    const point = e.coord;

    if (markerRef.current === undefined) {
      const marker = new naver.maps.Marker({
        position: point,
        map: baseMap,
      });

      markerRef.current = marker;
    } else {
      markerRef.current.setPosition(point);
    }

    const position: { x: number; y: number } = mapRef.current
      .getProjection()
      .fromCoordToOffset(point);

    setOffset({
      left: Math.floor(position.x),
      top: Math.floor(position.y),
    });

    naver.maps.Service.reverseGeocode(
      {
        coords: point,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("address api error");
        }
        const result = response.v2;
        setPointer({
          ...basePointer,
          pointer: {
            coord: point,
            address: result.address.jibunAddress,
            isCheck: true,
          },
        });
      }
    );
  };

  const mapBasePolygonHandler = (e: any, baseMap: any) => {
    const point = e.coord;
    console.log(point);
  };

  // sgis 주소기반 영역추출로직
  // const getDongArea = async (setGeo: any, code?: string) => {
  //   return await dong(code).then((res) => {
  //     console.log(res);

  //     if (res) {
  //       const map = mapRef.current;
  //       const { type, features } = res;
  //       const transFeatures = features.map((props: any) => {
  //         let coordinates;
  //         if (props.geometry.type === "MultiPolygon") {
  //           const calcLand = props.geometry.coordinates.map(
  //             (data: any[]) => data[0].length
  //           );
  //           let index;

  //           if (props.properties.adm_cd === "35580") {
  //             index = 16;
  //           } else if (props.properties.adm_cd === "21120") {
  //             index = 11;
  //           } else if (props.properties.adm_cd === "31092") {
  //             index = 12;
  //           } else {
  //             index = calcLand.indexOf(Math.max(...calcLand));
  //           }

  //           if (props.properties.adm_cd === "23") {
  //             let test: any[] = [];
  //             const tmp = props.geometry.coordinates.map(
  //               (group: any, idx: number) => {
  //                 if (idx === 12 || idx === 6) {
  //                   let result = group[0].map(
  //                     (coordinate: [number, number]) => {
  //                       const trans = naver.maps.TransCoord.fromUTMKToLatLng(
  //                         new naver.maps.Point(coordinate[0], coordinate[1])
  //                       );
  //                       return [trans.x, trans.y];
  //                     }
  //                   );
  //                   test.push(result);
  //                 } else if (idx === 7) {
  //                   let result = group[0].map(
  //                     (coordinate: [number, number]) => {
  //                       const trans = naver.maps.TransCoord.fromUTMKToLatLng(
  //                         new naver.maps.Point(coordinate[0], coordinate[1])
  //                       );
  //                       return [trans.x, trans.y];
  //                     }
  //                   );
  //                   test.push(result);
  //                 }
  //               }
  //             );
  //             coordinates = test;
  //           } else {
  //             coordinates = props.geometry.coordinates[index].map(
  //               (group: any) => {
  //                 return group.map((coordinate: [number, number]) => {
  //                   const trans = naver.maps.TransCoord.fromUTMKToLatLng(
  //                     new naver.maps.Point(coordinate[0], coordinate[1])
  //                   );
  //                   return [trans.x, trans.y];
  //                 });
  //               }
  //             );
  //           }
  //         } else {
  //           coordinates = props.geometry.coordinates.map((group: any) => {
  //             return group.map((coordinate: [number, number]) => {
  //               const trans = naver.maps.TransCoord.fromUTMKToLatLng(
  //                 new naver.maps.Point(coordinate[0], coordinate[1])
  //               );
  //               return [trans.x, trans.y];
  //             });
  //           });
  //         }

  //         return {
  //           ...props,
  //           geometry: {
  //             // type: props.geometry.type,
  //             type: "Polygon",
  //             coordinates: coordinates,
  //           },
  //         };
  //       });
  //       // console.log(transFeatures);
  //       setGeo({ type, features: transFeatures });
  //       map.data.addGeoJson({ type, features: transFeatures });
  //       map.data.setStyle((feature: any) => {
  //         let color = "red";

  //         if (feature.getProperty("isColorful")) {
  //           color = feature.getProperty("color");
  //         }

  //         return {
  //           fillColor: color,
  //           strokeColor: color,
  //           strokeWeight: 1,
  //           icon: null,
  //         };
  //       });
  //       map.data.addListener("click", (e: any) => {
  //         console.log(e.feature);
  //         e.feature.setProperty("isColorful", true);
  //         const coord = new naver.maps.Point(
  //           e.feature.property_x,
  //           e.feature.property_y
  //         );
  //         const location = naver.maps.TransCoord.fromUTMKToLatLng(coord);

  //         mapRef.current.setZoom(9, true);
  //         mapRef.current.panTo(location);
  //         setAddr(e.feature.property_adm_cd);
  //       });
  //       map.data.addListener("dblclick", (e: any) => {
  //         var bounds = e.feature.getBounds();

  //         if (bounds) {
  //           map.panToBounds(bounds);
  //         }
  //       });
  //       map.data.addListener("mouseover", (e: any) => {
  //         map.data.overrideStyle(e.feature, {
  //           strokeWeight: 3,
  //         });
  //       });
  //       map.data.addListener("mouseout", (e: any) => {
  //         map.data.revertStyle();
  //       });

  //       return transFeatures;
  //     } else {
  //       return null;
  //     }

  //     // res.map((area: any) => {
  //     //   const { geometry, properties } = area;

  //     //   geometry?.coordinates?.map((li: any) => {
  //     //     const coord = new naver.maps.Point(properties.x, properties.y);
  //     //     const location = naver.maps.TransCoord.fromUTMKToLatLng(coord);

  //     //     const marker = new naver.maps.Marker({
  //     //       position: location,
  //     //       map: mapRef.current,
  //     //     });
  //     //     console.log(li);
  //     //     return null;
  //     //   });
  //     // });
  //   });
  // };

  // 폴리곤 센터값 추출 로직
  // const getCenterPolygon = (polygons: any[]) => {
  //   const centers = polygons.map((polygon, idx: number) => {
  //     const bounds = polygon.getPath();
  //     const arr = bounds._array;
  //     const length = arr.length;
  //     let xcos = 0;
  //     let ycos = 0;
  //     let area = 0;

  //     for (let i = 0, len = length, j = length - 1; i < len; j = i++) {
  //       let p1 = arr[i];
  //       let p2 = arr[j];

  //       let f = p1.y * p2.x - p2.y * p1.x;
  //       xcos += (p1.x + p2.x) * f;
  //       ycos += (p1.y + p2.y) * f;
  //       area += f * 3;
  //     }

  //     return [xcos / area, ycos / area];
  //   });
  // };

  useEffect(() => {
    console.log("initialize Map Event");
    if (event) {
      mapEventReset();
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new naver.maps.Map("map", {
        // center: new naver.maps.LatLng(37.3614483, 127.1114883),
        center: new naver.maps.LatLng(36.1223291, 126.9101228),
        zoom: 8,
      });

      // cubejsApi
      //   .load({
      //     dimensions: ["AreaGungu.code", "AreaGungu.name"],
      //     filters: [
      //       {
      //         member: "AreaGungu.parent",
      //         operator: "equals",
      //         values: ["11"],
      //       },
      //     ],
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     const gunguList = res
      //       .rawData()
      //       .map((data: any) => data["AreaGungu.code"]);

      //     const niceAddr: { [key: string]: any } = {};
      //     const niceAddrKo = dongData
      //       .map((dongList: any) => {
      //         if (dongList.dongName.includes("서울특별시")) {
      //           niceAddr[dongList.dongName] = dongList.dongCode;
      //         }

      //         return dongList.dongName;
      //       })
      //       .filter((dongName) => dongName.includes("서울특별시"));

      //     const test = Promise.all(
      //       gunguList.map(async (code) => {
      //         const res = await getDongArea(setGeoMid, code);

      //         return res.map((li: any) => {
      //           const { properties, geometry } = li;

      //           if (
      //             !niceAddrKo.includes(properties.adm_nm.replace(/·/g, "."))
      //           ) {
      //             console.log(properties.adm_nm);
      //           }

      //           return {
      //             code: niceAddr[properties.adm_nm],
      //             name: properties.adm_nm,
      //             type: "dong",
      //             polygon:
      //               properties.adm_cd === "23" || properties.adm_cd === "36"
      //                 ? JSON.stringify({ ...geometry.coordinates })
      //                 : JSON.stringify({ ...geometry.coordinates[0] }),
      //           };
      //         });

      //         // try {
      //         //   const res = await getDongArea(setGeoMid, code);

      //         //   return res.map((li: any) => {
      //         //     const { properties, geometry } = li;

      //         //     return {
      //         //       code: properties.adm_cd,
      //         //       name: properties.adm_nm,
      //         //       nameEn: properties.addr_en,
      //         //       type: "dong",
      //         //       // parent: properties.adm_cd.slice(0, 2),
      //         //       polygon:
      //         //         properties.adm_cd === "23" || properties.adm_cd === "36"
      //         //           ? JSON.stringify({ ...geometry.coordinates })
      //         //           : JSON.stringify({ ...geometry.coordinates[0] }),
      //         //     };
      //         //   });
      //         // } catch (err) {
      //         //   return "error";
      //         // }
      //       })
      //     ).then((res) => {
      //       console.log([...res]);
      //       let toArr: any[] = [];
      //       res.map((group) => {
      //         group.map((li: any) => {
      //           toArr.push(li);
      //         });
      //       });
      //       console.log(toArr);
      //       setTest(toArr);
      //     });
      //   });
      return;

      // if (!areaTopList) {
      //   cubejsApi
      //     .load({
      //       dimensions: ["AreaSido.code", "AreaSido.name", "AreaSido.polygon"],
      //     })
      //     .then((res) => {
      //       const areaGroup = res.rawData().map((siList: any) => {
      //         const polygon = Object.values(
      //           JSON.parse(siList["AreaSido.polygon"])
      //         ).map((li: any) => {
      //           if (
      //             siList["AreaSido.code"] === "28" ||
      //             siList["AreaSido.code"] === "46"
      //           ) {
      //             return li.map(
      //               (depth: any) => new naver.maps.LatLng(depth[1], depth[0])
      //             );
      //           } else {
      //             return new naver.maps.LatLng(li[1], li[0]);
      //           }
      //         });
      //         let color = "red";

      //         const setPolygon = new naver.maps.Polygon({
      //           map: mapRef.current,
      //           paths:
      //             siList["AreaSido.code"] === "28" ||
      //             siList["AreaSido.code"] === "46"
      //               ? polygon
      //               : [polygon],
      //           fillColor: color,
      //           fillOpacity: 0.1,
      //           strokeColor: color,
      //           strokeWeight: 1,
      //           strokeOpacity: 0.6,
      //           clickable: true,
      //         });

      //         naver.maps.Event.addListener(setPolygon, "click", (e) => {
      //           console.log(e);

      //           // const location = naver.maps.TransCoord.fromUTMKToLatLng(coord);
      //           // mapRef.current.setZoom(9, true);
      //           // mapRef.current.panTo(location);

      //           cubejsApi
      //             .load({
      //               dimensions: [
      //                 "AreaGungu.code",
      //                 "AreaGungu.name",
      //                 "AreaGungu.polygon",
      //               ],
      //               filters: [
      //                 {
      //                   member: "AreaGungu.name",
      //                   operator: "contains",
      //                   values: [siList["AreaSido.name"]],
      //                 },
      //               ],
      //             })
      //             .then((res) => {
      //               const areaGroup = res.rawData().map((l: any) => {
      //                 const polygon = Object.values(
      //                   JSON.parse(l["AreaGungu.polygon"])
      //                 ).map((li: any) => {
      //                   if (
      //                     l["AreaGungu.code"] === "23" ||
      //                     l["AreaGungu.code"] === "36"
      //                   ) {
      //                     return li.map(
      //                       (depth: any) =>
      //                         new naver.maps.LatLng(depth[1], depth[0])
      //                     );
      //                   } else {
      //                     return new naver.maps.LatLng(li[1], li[0]);
      //                   }
      //                 });
      //                 let color = "red";

      //                 const setPolygon = new naver.maps.Polygon({
      //                   map: mapRef.current,
      //                   paths:
      //                     l["AreaGungu.code"] === "23" ||
      //                     l["AreaGungu.code"] === "36"
      //                       ? polygon
      //                       : [polygon],
      //                   fillColor: color,
      //                   fillOpacity: 0.1,
      //                   strokeColor: color,
      //                   strokeWeight: 1,
      //                   strokeOpacity: 0.6,
      //                   clickable: true,
      //                 });

      //                 naver.maps.Event.addListener(setPolygon, "click", (e) => {
      //                   console.log(e);
      //                   cubejsApi
      //                     .load({
      //                       dimensions: [
      //                         "AreaDong.code",
      //                         "AreaDong.name",
      //                         "AreaDong.polygon",
      //                       ],
      //                       filters: [
      //                         {
      //                           member: "AreaDong.name",
      //                           operator: "contains",
      //                           values: [l["AreaGungu.name"]],
      //                         },
      //                       ],
      //                     })
      //                     .then((res) => {
      //                       res.rawData().map((l: any) => {
      //                         const polygon = Object.values(
      //                           JSON.parse(l["AreaDong.polygon"])
      //                         ).map((li: any) => {
      //                           return new naver.maps.LatLng(li[1], li[0]);
      //                         });
      //                         let color = "red";

      //                         const setPolygon = new naver.maps.Polygon({
      //                           map: mapRef.current,
      //                           paths: [polygon],
      //                           fillColor: color,
      //                           fillOpacity: 0.1,
      //                           strokeColor: color,
      //                           strokeWeight: 1,
      //                           strokeOpacity: 0.6,
      //                           clickable: true,
      //                         });

      //                         naver.maps.Event.addListener(
      //                           setPolygon,
      //                           "click",
      //                           (e) => {
      //                             console.log(e);
      //                           }
      //                         );

      //                         naver.maps.Event.addListener(
      //                           setPolygon,
      //                           "mouseover",
      //                           (e) => {
      //                             mapRef.current.setCursor("pointer");
      //                             setPolygon.setOptions("fillOpacity", 0.4);
      //                           }
      //                         );

      //                         naver.maps.Event.addListener(
      //                           setPolygon,
      //                           "mouseout",
      //                           (e) => {
      //                             mapRef.current.setCursor("auto");
      //                             setPolygon.setOptions("fillOpacity", 0.1);
      //                           }
      //                         );

      //                         // return {
      //                         //   code: l["AreaGungu.code"],
      //                         //   name: l["AreaGungu.name"],
      //                         //   polygon: setPolygon,
      //                         // };
      //                       });
      //                     });
      //                 });

      //                 naver.maps.Event.addListener(
      //                   setPolygon,
      //                   "mouseover",
      //                   (e) => {
      //                     mapRef.current.setCursor("pointer");
      //                     setPolygon.setOptions("fillOpacity", 0.4);
      //                   }
      //                 );

      //                 naver.maps.Event.addListener(
      //                   setPolygon,
      //                   "mouseout",
      //                   (e) => {
      //                     mapRef.current.setCursor("auto");
      //                     setPolygon.setOptions("fillOpacity", 0.1);
      //                   }
      //                 );

      //                 return {
      //                   code: l["AreaGungu.code"],
      //                   name: l["AreaGungu.name"],
      //                   polygon: setPolygon,
      //                 };
      //               });

      //               setAddr(siList["AreaSido.code"]);
      //               setAreaMidList(areaGroup);
      //             });
      //         });

      //         naver.maps.Event.addListener(setPolygon, "mouseover", (e) => {
      //           mapRef.current.setCursor("pointer");
      //           setPolygon.setOptions("fillOpacity", 0.4);
      //         });

      //         naver.maps.Event.addListener(setPolygon, "mouseout", (e) => {
      //           mapRef.current.setCursor("auto");
      //           setPolygon.setOptions("fillOpacity", 0.1);
      //         });

      //         return {
      //           code: siList["AreaSido.code"],
      //           name: siList["AreaSido.name"],
      //           polygon: setPolygon,
      //         };
      //       });
      //       setAreaTopList(areaGroup);
      //     });
      // }

      // getDongArea(setGeoTop).then((res) => {
      //   const tmp = res.map((li: any) => {
      //     const { properties, geometry } = li;

      //     return {
      //       code: properties.adm_cd,
      //       name: properties.adm_nm,
      //       nameEn: properties.addr_en,
      //       polygon:
      //         properties.adm_cd === "23" || properties.adm_cd === "36"
      //           ? JSON.stringify({ ...geometry.coordinates })
      //           : JSON.stringify({ ...geometry.coordinates[0] }),
      //     };
      //   });
      // });

      // const test = Promise.all(
      //   addrHCode.map(async (addr) => {
      //     try {
      //       const res = await getDongArea(setGeoMid, addr.code);

      //       return res.map((li: any) => {
      //         const { properties, geometry } = li;

      //         return {
      //           code: properties.adm_cd,
      //           name: properties.adm_nm,
      //           nameEn: properties.addr_en,
      //           type: "sigungu",
      //           parent: properties.adm_cd.slice(0, 2),
      //           polygon:
      //             properties.adm_cd === "23" || properties.adm_cd === "36"
      //               ? JSON.stringify({ ...geometry.coordinates })
      //               : JSON.stringify({ ...geometry.coordinates[0] }),
      //         };
      //       });
      //     } catch (err) {
      //       return "error";
      //     }
      //   })
      // ).then((res) => {
      //   console.log([...res]);
      //   let toArr: any[] = [];
      //   res.map((group) => {
      //     group.map((li: any) => {
      //       toArr.push(li);
      //     });
      //   });
      //   console.log(toArr);
      //   setTest(toArr);
      // });
    }
  }, [mapRef]);

  useEffect(() => {
    console.log("Event State Change");
    console.log("Reset Map Event");
    naver.maps.Event.removeListener(activeEvent);

    if (event === "activePoint") {
      console.log("Event activePoint Start");
      let pointer = naver.maps.Event.addListener(
        mapRef.current,
        "click",
        (e) => {
          mapBasePointHandler(e, mapRef.current);
        }
      );
      setActiveEvent(pointer);
    } else if (event === "activePolygon") {
      console.log("Event activePolygon Start");

      if (!markerRef.current) {
        alert("지점을 먼저 설정해주세요");
        return;
      }

      const coord = markerRef.current.getPosition();

      mapRef.current.setZoom(15, true);
      mapRef.current.panTo(coord);
      // mapRef.current.updateBy(coord, 15);

      let polygon = naver.maps.Event.addListener(
        mapRef.current,
        "click",
        (e) => {
          mapBasePolygonHandler(e, mapRef.current);
        }
      );

      setActiveEvent(polygon);
    } else if (event === "" && markerRef.current) {
      // markerRef.current.setMap(null);
      // markerRef.current = undefined;
    }

    return naver.maps.Event.removeListener(activeEvent);
  }, [event]);

  // 지역선택 polygon
  useEffect(() => {
    if (siPol.length === 0) {
      console.log("staep1");
      const pol = polygonCreator(sidoList, (sido) => {
        sidoHandler({ code: sido.code, name: sido.name });
      });
      setSiPol(pol);
    } else if (
      siPol.length !== 0 &&
      sidoList.length !== 0 &&
      !sido.code &&
      !sigungu.code
    ) {
      console.log("step2");

      if (sigunguPol.length !== 0) {
        sigunguPol.map((polygon) => polygon.setMap(null));
      }

      if (dongPol.length !== 0) {
        dongPol.map((polygon) => polygon.setMap(null));
      }

      siPol.map((polygon) => polygon.setMap(mapRef.current));
    } else if (sido.code && !sigungu.code && sigunguList.length !== 0) {
      console.log("step3");
      siPol.map((polygon) => polygon.setMap(null));

      if (sigunguPol.length !== 0) {
        sigunguPol.map((polygon) => polygon.setMap(null));
      }

      if (dongPol.length !== 0) {
        dongPol.map((polygon) => polygon.setMap(null));
      }
      console.log(sigunguList);
      const pol = polygonCreator(sigunguList, (sigungu) => {
        sigunguHandler({ code: sigungu.code, name: sigungu.name });
      });
      setSigunguPol(pol);
    } else if (sido.code && sigungu.code && dongList.length !== 0) {
      console.log("step4");
      sigunguPol.map((polygon) => polygon.setMap(null));

      if (dongPol.length !== 0) {
        dongPol.map((polygon) => polygon.setMap(null));
      }

      const pol = polygonCreator(dongList, (dong) => {});
      dongList.map((li) => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(li.center[0], li.center[1]),
          map: mapRef.current,
          icon: {
            content: [
              "<div style='display: grid; gap: 1rem; grid-template-columns: 1fr 1fr; transform: translate(-50%, -50%);'>",
              "   <h3>test1</h3>",
              "   <h3>test2</h3>",
              "   <h3>test3</h3>",
              "   <h3>test4</h3>",
              "</div>",
            ].join(""),
          },
        });
      });

      // 센터값 로직
      // const centers = getCenterPolygon(pol)

      setDongPol(pol);
    }
  }, [sido, sigungu, sidoList, sigunguList, dongList]);

  const exportData = (data: any) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {event === "activePoint" && <Test />}
        {event === "activePolygon" && <MapController />}
        {/* <Button
          onClick={() => exportData(test)}
          position="absolute"
          bottom="0"
          left="0"
          zIndex={999}
        >
          test
        </Button> */}
      </div>
    </>
  );
};

export default SementicMap;
