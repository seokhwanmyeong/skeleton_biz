import React from "react";
import ReactDOM from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { Flex, Button } from "@chakra-ui/react";

type Props = {};

const PointerInfobox = (props: any) => {
  const { text, event } = props;
  return (
    <div style={{ display: "flex" }}>
      <button
        style={{
          padding: "5px 10px",
          color: "#777777",
          borderRadius: "10px",
          backgroundColor: "#ededed",
        }}
        type="button"
        onClick={event}
      >
        {text}
      </button>
    </div>
  );
};

const infoBoxMaker = () => {
  const event = () => {
    console.log("click");
  };

  const render = renderToStaticMarkup(
    <PointerInfobox text="설정완료" event={event} />
  );

  const infowBox = new naver.maps.InfoWindow({
    content: render,
    maxWidth: 140,
    backgroundColor: "none",
    borderWidth: 0,
    anchorSize: new naver.maps.Size(5, 5),
    anchorSkew: true,
    anchorColor: "#eee",
    pixelOffset: new naver.maps.Point(5, -5),
  });

  return infowBox;
};

export default infoBoxMaker;
