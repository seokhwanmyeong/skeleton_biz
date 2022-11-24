//  Lib
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
//  Components
import { CheckBoxTag } from "@src/components/common/CheckBox";
//  State
import {
  atomSementicBaseList,
  atomInfoCom,
  selectorInfoCom,
} from "@states/searchState/stateSearch";

const FilterInfoCom = (props: any) => {
  const { isDisabled } = props;
  const baseList = useRecoilValue(atomSementicBaseList);
  const infocomList = useRecoilValue(atomInfoCom);
  const setInfoCom = useSetRecoilState(selectorInfoCom);

  return (
    <Accordion variant={"searchEngine"} allowMultiple>
      {baseList.infoCom.content.map(
        (info: { title: string; cate: string; list: [] }, idx: number) => {
          const { title, cate, list } = info;

          return (
            <AccordionItem key={`infoCom-list-${cate}`} isDisabled={isDisabled}>
              <AccordionButton color="#ffffff">
                {title}
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                display="flex"
                flexDirection="column"
                backgroundColor="#ededed"
                color="#555555"
                fontSize="0.8rem"
                fontWeight="bold"
              >
                <Stack spacing="10px">
                  {list &&
                    list.map((item: { title: string; key: string }) => {
                      const { title, key } = item;
                      return (
                        <CheckBoxTag
                          isChecked={infocomList.includes(key)}
                          isDisabled={isDisabled}
                          key={key}
                          value={key}
                          title={title}
                          onChange={(e: any) => {
                            if (
                              infocomList.length > 3 &&
                              !infocomList.includes(key)
                            ) {
                              alert("선택제한 : 4");
                            } else {
                              setInfoCom({
                                method: infocomList.includes(key)
                                  ? "remove"
                                  : "add",
                                infoCom: key,
                              });
                            }
                          }}
                        />
                      );
                    })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        }
      )}
    </Accordion>
  );
};

export default FilterInfoCom;
