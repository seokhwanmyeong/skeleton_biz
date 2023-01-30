import React from "react";
import {
  AvailableCube,
  MeasureUpdater,
  DimensionUpdater,
  SegmentUpdater,
  TimeDimensionUpdater,
} from "@cubejs-client/react";
import {
  TCubeMeasure,
  TCubeDimension,
  TCubeSegment,
} from "@cubejs-client/core";
import { Flex } from "@chakra-ui/react";
// Components
import SearchMenu from "./SearchMenu";
import ElementTag from "./ElementTag";

type PropsMember = {
  members: ((TCubeMeasure | TCubeDimension | TCubeSegment) & {
    index: number;
  })[];
  availableMembers: TCubeMeasure[] | TCubeDimension[] | TCubeSegment[];
  addMemberName: "Measure" | "Dimension" | "Segment" | "Time";
  updateMethods:
    | MeasureUpdater
    | DimensionUpdater
    | SegmentUpdater
    | TimeDimensionUpdater;
};

const SearchMember = ({
  members,
  availableMembers,
  addMemberName,
  updateMethods,
}: PropsMember) => {
  return (
    <Flex flexWrap="wrap" gap="10px">
      {members.map((m) => {
        return (
          <ElementTag
            key={m.index || m.name}
            onRemoveClick={() => updateMethods.remove(m)}
          >
            <SearchMenu
              addMemberName={m.title}
              availableMembers={availableMembers}
              updateMethods={(updateWith: any) =>
                updateMethods.update(m, updateWith)
              }
            />
          </ElementTag>
        );
      })}
      <SearchMenu
        addMemberName={addMemberName}
        availableMembers={availableMembers}
        updateMethods={(m: any) => updateMethods.add(m)}
      />
    </Flex>
  );
};

export default SearchMember;
