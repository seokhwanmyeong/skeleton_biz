//  Lib
import { useRecoilState } from "recoil";
//  State : Recoil
import { selectorSearchOption } from "@src/states/searchState/stateSearch";

const OptionHandler = (
  eventType: "add" | "remove",
  optionCate: string,
  optionName: string
) => {
  const [option, setOption] = useRecoilState(selectorSearchOption);

  setOption({
    eventType: eventType,
    optionCate: optionCate,
    optionVal: optionName,
  });
  return;
};

export { OptionHandler };
