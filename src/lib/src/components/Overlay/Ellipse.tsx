/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from 'react';
import {v1 as uuid} from 'uuid'
import { EllipseProps } from '../../common/types';
import { NaverMapContext } from '../../contexts/NaverMapContext';
import useNaverListener from '../../hooks/useNaverListener';
const Ellipse  = ({
    id,
    opts,
    onClick,
    onDoubleClick,
    onRightClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onBoundsChanged,
    onClickableChanged,
    onVisibleChanged,
    onZIndexChanged
}: EllipseProps) => {
    const {state, dispatch} = useContext(NaverMapContext)
    const [prevOpts, setPrevOpts] = useState('')
    const [ellipse, setEllipse] = useState<naver.maps.Ellipse | undefined>(undefined,)
    const [ellipseId] = useState(id? id : `ellipse-${uuid()}`)
    const addEllipse = (ellipse: naver.maps.Ellipse) => {
        dispatch({type: 'add_object', object: ellipse, id: ellipseId})
    }
    const removeEllipse = () => {
        dispatch({type:'remove_object', id: ellipseId})
    }
    useEffect(()=>{
        if(state.map === undefined) return
        const ellipse = new naver.maps.Ellipse({
            ...opts,
            map: state.map,
        })

        setEllipse(ellipse)
        setPrevOpts(JSON.stringify(opts))
        // 타원 추가
        addEllipse(ellipse)

        // clean up
        return () => removeEllipse()
    },[state.map])

    useNaverListener(ellipse, [
        {name: 'click', handler: onClick},
        {name: 'dblclick', handler: onDoubleClick},
        {name: 'rightclick', handler: onRightClick},
        {name: 'drag', handler: onDrag},
        {name: 'dragend', handler: onDragEnd},
        {name: 'dragstart', handler: onDragStart},
        {name: 'mousedown', handler: onMouseDown},
        {name: 'mouseout', handler: onMouseOut},
        {name: 'mouseover', handler: onMouseOver},
        {name: 'mouseup', handler: onMouseUp},
        {name: 'bounds_changed', handler: onBoundsChanged},
        {name: 'clickable_changed', handler: onClickableChanged},
        {name: 'visible_changed', handler: onVisibleChanged},
        {name: 'zindex_changed', handler: onZIndexChanged},
    ])

    useEffect(()=>{
        if(ellipse === undefined ||
           opts === undefined ||
           JSON.stringify(opts) === prevOpts
        )
        return
        ellipse.setOptions(opts);
        setPrevOpts(JSON.stringify(opts))
    }, [ellipse, opts])
    return null
}

Ellipse.displayName = 'Ellipse'

export default Ellipse