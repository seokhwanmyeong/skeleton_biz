import { useEffect } from 'react';

interface NaverMapEvent{
    name: string
    handler?: (event: any) => any
}

const useNaverListener = (
    instnace: naver.maps.KVO | undefined,
    events: NaverMapEvent[],
) =>{
    useEffect(()=> {
        if(instnace === undefined) return
        const listeners: naver.maps.MapEventListener[] = []
        events.forEach(event =>{
            if(event.handler)
            listeners.push(
                naver.maps.Event.addListener(instnace, event.name, event.handler)
            )
        })
        return () =>{
            // 등록된 리스너 제거
            listeners.forEach(listener => instnace.removeListener(listener))
        }
    }, [instnace, events])
}

export default useNaverListener

