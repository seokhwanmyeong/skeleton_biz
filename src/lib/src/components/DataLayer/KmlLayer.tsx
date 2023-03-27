/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react'
import { v1 as uuid} from 'uuid'
import { NaverMapContext } from '../../contexts/NaverMapContext';
import useNaverListener from '../../hooks/useNaverListener';
const KmlLayer = ({
  
}) => {
    const {state, dispatch} = useContext(NaverMapContext)
    const [kmlLayer, setKmlLayer] = useState<naver.maps.Data | undefined>(
      undefined,
    )
    //  const [kmlLayerId] = useState(id ? id : `kml-layer-${uuid()}`)
    const addKmlLayer = (kmlLayer: naver.maps.Data) =>{
    //  dispatch({type: 'add_object', object: kmlLayer, id: kmlLayerId})
    }
    const removeKmlLayer = () => {
     // dispatch({type: 'remove_object', id: kmlLayerId})
    }

    useEffect(() => {
      if(state.map === undefined) return
      // state.map.data.addKml(xmlDoc, false)
    
      return () => removeKmlLayer()
    }, [state.map])
    
    useNaverListener(kmlLayer,[])
}