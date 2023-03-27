import React, { useReducer } from "react";
import {
  NaverMapObject,
  NaverMapState,
  NaverMapReducer,
  NaverMapAction,
  NaverMapObjectWithSetMap,
  NaverMapProviderProps,
} from "../common/types";

// 상태 초기화
const initialState = (): NaverMapState => ({
  map: undefined,
  objects: new Map<string, NaverMapObject>(),
});

//컨텍스트 정의
const NaverMapContext = React.createContext<NaverMapReducer>({
  state: undefined as unknown as NaverMapState,
  dispatch: undefined as unknown as React.Dispatch<NaverMapAction>,
});

// 리듀서 함수 정의
/** 레이어 추가 및 관리 기능 개발 필요
 *  recoil 및 jotai 검토
 *  기존 데이터 저장 기능 강화 필요
 */
const reducer = (state: NaverMapState, action: NaverMapAction) => {
  switch (action.type) {
    case "reset": // 리셋
      return initialState();

    case "init_map": // 맵 초기화
      if (action.map === undefined)
        throw new Error("맵 인스턴스를 지정해야 합니다.");
      if (state.map !== undefined)
        throw new Error("컨텍스트에 맵 인스턴스는 하나만 있어야 합니다.");

      return { ...state, map: action.map };

    case "add_object": // 객체 추가
      if (action.object === undefined)
        throw new Error("맵 인스턴스를 지정해야 합니다.");
      if (action.id === undefined) throw new Error("아이디를 지정해야 합니다.");
      if (!state.objects.has(action.id)) {
        state.objects.set(action.id, action.object);
        if(state.map!== undefined){
          state.objects.get(action.id)?.setMap(state.map);
        }
      }
      return state;
    case "remove_object": // 객체 제거
      if (action.id === undefined) throw new Error();
      const objectRemove = state.objects.get(action.id);
      // @ts-ignore
   
      if (objectRemove !== undefined) {
       // (objectRemove as NaverMapObjectWithSetMap).setMap(null);
        objectRemove.setMap(null);
        state.objects.delete(action.id);
      }
      return state;

    default:
      return state;
  }
};

const NaverMapProvider = ({ children }: NaverMapProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const value = { state, dispatch };
  return (
    <>
      <NaverMapContext.Provider value={value}>
        {children}
      </NaverMapContext.Provider>
    </>
  );
};

const NaverMapConsumer = NaverMapContext.Consumer;

export { NaverMapContext, NaverMapProvider, NaverMapConsumer };
