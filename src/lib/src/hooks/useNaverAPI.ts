/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import loadjs from "loadjs"
import { NAVER_MAP_BASE_URI } from '../common/constants';


interface NaverAPIProps{
    ncpClientId: string
    submodules: string
}

const useNaverAPI = ({
    ncpClientId,
    submodules,
}: NaverAPIProps) =>{
    const [loaded, setLoaded] = useState(false)
    useEffect(()=>{
        if(typeof document === 'undefined') return
        const naverMapScriptUri = `${NAVER_MAP_BASE_URI}?ncpClientId=${ncpClientId}${submodules}`
        if(!loadjs.isDefined('map')) loadjs(naverMapScriptUri, 'map')
        loadjs.ready('map', {
            success: () => {
                setLoaded(true)
            },
            error: () => {
                loadjs.reset()
                console.error('Unable to fetch Naver Map sdk')
            }
        })
    }, [])

    return loaded
}

export default useNaverAPI