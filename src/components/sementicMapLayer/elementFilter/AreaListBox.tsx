import { Button, Grid, Heading } from "@chakra-ui/react";
//  Deco
import { Deco01 } from "@assets/deco/DecoSvg";
import {
  DecoBoxL,
  DecoBoxR,
  DecoTopFilterModal,
} from "@components/sementicMapLayer/elementDeco/Deco";
//  Type
import type {
  SlctProps,
  AreaProps,
  TransAreaProps,
} from "@states/sementicMap/stateMap";

type Props = {
  title: string;
  isOpen: boolean;
  list: TransAreaProps[];
  setSlctArea: (props: SlctProps) => any;
  onClick?: (props?: any) => any;
};

const AreaListBox = ({ title, isOpen, list, setSlctArea, onClick }: Props) => {
  return (
    <DecoTopFilterModal isOpen={isOpen}>
      <Heading
        as={"h5"}
        bg="none"
        fontSize="md"
        lineHeight="1.5rem"
        color="font.title"
        textAlign="center"
      >
        {title}
      </Heading>
      <Deco01 margin="0.125rem 0rem 1.5rem" width="100%" height="4px" />
      <Grid
        w="100%"
        templateColumns="repeat(5, calc(20% - 0.2rem))"
        gap="0.75rem 0.25rem"
      >
        {list.map(
          ({ _id, lat, lng, bounds, zoomLevel, code, name, idx, feature }) => {
            return (
              <Button
                variant="slctArea"
                key={`key-${_id}`}
                onClick={() => {
                  setSlctArea({
                    slctName: name,
                    slctCode: code,
                    slctIdx: idx,
                    slctPath: feature,
                    slctLat: lat,
                    slctLng: lng,
                    slctZoom: zoomLevel,
                    slctBounds: bounds,
                  });
                  onClick && onClick();
                }}
              >
                {name}
              </Button>
            );
          }
        )}
      </Grid>
      <DecoBoxL
        position="absolute"
        top="50%"
        left="-0.5rem"
        transform="translateY(-50%)"
        width="5%"
        height="107%"
        color="#FFFFFF"
      />
      <DecoBoxR
        position="absolute"
        top="50%"
        right="-0.5rem"
        transform="translateY(-50%)"
        width="5%"
        height="107%"
        color="#FFFFFF"
      />
    </DecoTopFilterModal>
  );
};

export default AreaListBox;
