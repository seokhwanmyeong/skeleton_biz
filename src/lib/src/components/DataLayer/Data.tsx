
import { useState, useEffect, useContext } from 'react';
import { NaverMapContext } from '../../contexts/NaverMapContext';

const Data = ({

}) => {
    const {state, dispatch} = useContext(NaverMapContext)
    const [prevOpts, setPrevOpts] = useState('')
    const [data, setData] = useState<naver.maps.Data | undefined>(undefined)
    useEffect(()=>{
        if(state.map === undefined) return
        const Data = new naver.maps.Data()
        // setData()
        
        // state.map.data.addGpx(data)
    }, [])
}