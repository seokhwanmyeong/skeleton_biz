import React, { useState, useContext, useRef } from "react";
import { NaverMapContext, Polygon } from "@src/lib/src";
import { NaverMapShape } from "@src/lib/src/common/types";
import CustomControl from "@src/lib/src/components/Control/CustomControl";
import { IconButton, ButtonGroup, Button, Flex, Text } from "@chakra-ui/react";
import PolyIcon from "../assets/polygon.svg";
import { IcoAim } from "@src/assets/icons/icon";

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: string | JSX.Element;
}

function ToggleButton(props: ToggleButtonProps) {
  const { active, onClick } = props;

  const activeStyle = {
    backgroundColor: "blue.500",
    color: "white",
    _hover: {
      backgroundColor: "blue.600",
    },
  };

  const inactiveStyle = {
    backgroundColor: "gray.200",
    color: "gray.500",
    _hover: {
      backgroundColor: "gray.300",
    },
  };

  return (
    <IconButton
      colorScheme="teal"
      aria-label="Call Segun"
      size="lg"
      style={{ margin: 0 }}
      icon={<IcoAim />}
      onClick={onClick}
      _focus={{ boxShadow: "none" }}
      {...(active ? activeStyle : inactiveStyle)}
    >
      {props.children}
    </IconButton>
  );
}
const mapClickEvent = (e: any) => {
  console.log(e.coord);
};
function ToggleButtonGroup() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { state } = useContext(NaverMapContext);
  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }

    if (index === 2) {
      if (activeIndex === -1) {
        console.log("폴리곤 그리기");
        naver.maps.Event.addListener(state.map, "click", mapClickEvent);
      } else {
        alert("폴리곤 그리기 중단");
        naver.maps.Event.removeListener(mapClickEvent);
      }
    }
  };

  return (
    <ButtonGroup display={"flex"} flexWrap={"wrap"}>
      <ToggleButton active={activeIndex === 0} onClick={() => handleClick(0)}>
        Button1
      </ToggleButton>
      <ToggleButton active={activeIndex === 1} onClick={() => handleClick(1)}>
        Button2
      </ToggleButton>
      <ToggleButton active={activeIndex === 2} onClick={() => handleClick(2)}>
        Button3
      </ToggleButton>
    </ButtonGroup>
  );
}
const DrawPolygon = () => {
  const drawingPolyId = "drawingPoly-manager";
  const [toggle, setToggle] = useState(false);
  const { state, dispatch } = useContext(NaverMapContext);
  const [shapeCount, setShapeCount] = useState(0);
  const shapeCountRef = useRef(0);
  const [values, setValues] = useState<string[]>([]);

  const handleToggle = (values: string[]) => {
    setValues(values);
  };

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    // if(prev)
  };
  const addShape = (shape: NaverMapShape) => {
    setShapeCount((shapeCount) => {
      dispatch({
        type: "add_object",
        object: shape,
        id: `${drawingPolyId}-${shapeCount}`,
      });
      return shapeCount + 1;
    });
  };

  const removeShapes = () => {
    for (let i = 0; i < shapeCountRef.current; i++) {
      dispatch({ type: "remove_object", id: `${drawingPolyId}-${i}` });
    }
  };

  return (
    <CustomControl id={"Draw"} bindingPosition="TOP_LEFT">
      <div style={{ position: "relative", top: "0px" }}>
        <ToggleButtonGroup />
      </div>
    </CustomControl>
  );
};

export default DrawPolygon;
