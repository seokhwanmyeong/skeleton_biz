import React, { useState, useEffect, useContext, SVGProps } from "react";
import { InfoWindow, Marker, NaverMapContext, Polyline } from "@src/lib/src";
import OverlayView from "@src/lib/src/components/Overlay/OverlayView";
//import { PieChart } from "react-minimal-pie-chart";
//import { PathLine, polyline } from "react-svg-pathline";
//import {styled} from "styl"
interface InteractiveMarkerProps {
  num: number;
  positions: naver.maps.LatLngObjectLiteral[];
  setPositions: React.Dispatch<
    React.SetStateAction<naver.maps.LatLngObjectLiteral[]>
  >;
}
/*   let dataMock = [
    { title: "One", value: 10, color: "#E38627" },
    { title: "Two", value: 15, color: "#C13C37" },
    { title: "Three", value: 20, color: "#2864C2" },
    { title: "four", value: 20, color: "#C22860" },
  ]; */
const InteractiveMarker = ({
  num,
  positions,
  setPositions,
}: InteractiveMarkerProps) => {
  const [infoDisplay, setInfoDisplay] = useState(false);
  const { state, dispatch } = useContext(NaverMapContext);
  const [cont, setCont] = useState(0);
  const changeInfoDisplay = () => setInfoDisplay((display) => !display);
  const initData = Array.from({ length: 4 }, () => ({
    title: Math.floor(Math.random() * 4).toString(),
    value: Math.floor(Math.random() * 100),
    color: "#C22860",
  }));
  initData[0].color = "#E38627";
  initData[1].color = "#C13C37";
  initData[2].color = "#2864C2";
  initData[3].color = "#C22860";
  useEffect(() => {
    let setnum = 0.0035 * num;
    // console.log(parseFloat(setnum));
    setCont(parseFloat(setnum));
  }, [num]);
  /*   const contentString = [
    '<div class="iw_inner">',
    "   <h3>Seoul City Hall</h3>",
    "   <p>31, Taepyeong-ro 1-ga, Jung-gu, Seoul | 110 Sejong-daero, Jung-gu, Seoul<br />",
    "     <br />",
    "       02-120 | Public & Social Organization &gt; Metropolitan City Hall<br />",
    '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
    "   </p>",
    "</div>",
  ].join(""); */
  return (
    <>
      {/* <Marker
        id={`marker-${num}`}
        opts={{
          position: positions[num],
          icon: {
            path: [
              { x: 0, y: 0 },
              { x: 0, y: 0 },
              { x: 0, y: 150 },
              { x: 150, y: 250 },
              { x: 0, y: 150 },
            ],
            style: "closedPath",
            anchor: { x: 23, y: 103 },
            fillColor: "#ff0000",
            fillOpacity: 1,
            strokeColor: "#000000",
            strokeStyle: "solid",
            strokeWeight: 1,
          },
        }}
        onClick={changeInfoDisplay}
      /> */}
      {num > 4 ? (
        <div>
          <Polyline
            id={num}
            opts={{
              path: [
                positions[num],
                {
                  lat: 37.55794136784555 + cont - 0.018,
                  lng: 126.97319248899569 + 0.002,
                },
                {
                  lat: 37.55794136784555 + cont - 0.017,
                  lng: 126.97319248899569 - 0.001,
                },
              ],
              strokeColor: "#FF00DA",
              strokeStyle: "solid",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />

          <OverlayView
            id={`marker-${num}`}
            position={positions[num]}
            onClick={changeInfoDisplay}
          >
            {/* <PieChart
          data={initData}
          label={({ dataEntry }) => dataEntry.value}
          //radius={75}
          labelStyle={{ fill: "white" }}
          style={{ width: "50px", height: "50px" }}
        />  */}
            {/*  <svg>
          <polyline
            points="0,0 0,0 150,150 250,150"
            stroke="#7D9087"
            strokeWidth="2"
            fill="none"
            r={5}
          />
        </svg> */}
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#444"
                d="M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
              />
              <path
                fill="#444"
                d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
              />
            </svg>
          </OverlayView>
          <OverlayView
            position={{
              y: 37.55794136784555 + cont - 0.017,
              x: 126.97319248899569 - 0.006,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -15,
                width: "124px",
                height: "80px",
                backgroundColor: "#56CE92",
                textAlign: "center",
                border: "2px solid #6C483B",
              }}
            >
              <span style={{ fontWeight: "bold" }}> {num} </span>
            </div>
          </OverlayView>
        </div>
      ) : (
        <div>
          <Polyline
            id={num}
            opts={{
              path: [
                positions[num],
                {
                  lat: 37.55794136784555 + cont,
                  lng: 126.97319248899569 + 0.021,
                },
                {
                  lat: 37.55794136784555 + cont + 0.001,
                  lng: 126.97319248899569 + 0.025,
                },
              ],
              strokeColor: "#FF00DA",
              strokeStyle: "solid",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />

          <OverlayView
            id={`marker-${num}`}
            position={positions[num]}
            onClick={changeInfoDisplay}
          >
            {/* <PieChart
          data={initData}
          label={({ dataEntry }) => dataEntry.value}
          //radius={75}
          labelStyle={{ fill: "white" }}
          style={{ width: "50px", height: "50px" }}
        />  */}
            {/*  <svg>
          <polyline
            points="0,0 0,0 150,150 250,150"
            stroke="#7D9087"
            strokeWidth="2"
            fill="none"
            r={5}
          />
        </svg> */}
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 16 16"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                fill="#444"
                d="M8 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
              />
              <path
                fill="#444"
                d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z"
              />
            </svg>
          </OverlayView>
          <OverlayView
            position={{
              y: 37.55794136784555 + cont + 0.001,
              x: 126.97319248899569 + 0.025,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -15,
                width: "124px",
                height: "80px",
                backgroundColor: "#56CE92",
                textAlign: "center",
                border: "2px solid #6C483B",
              }}
            >
              <span style={{ fontWeight: "bold" }}> {num} </span>
            </div>
          </OverlayView>
        </div>
      )}

      {/*       <InfoWindow
        anchorId={`marker-${num}`}
        opts={{
          content: contentString,
          maxWidth: 140,
          backgroundColor: "#eee",
          borderColor: "#2db400",
          borderWidth: 1,
          anchorSize: { width: 20, height: 150 },
          anchorSkew: false,
          anchorColor: "#eee",
          pixelOffset: { x: 20, y: -20 },
        }}
        targetCoord={positions[num]}
        visible={true}
        //onCloseClick={() => setInfoDisplay(false)}
      /> */}
    </>
  );
};

InteractiveMarker.displayName = "InteractiveMarker";

export default InteractiveMarker;
