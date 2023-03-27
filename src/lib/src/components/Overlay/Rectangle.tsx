/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import {v1 as uuid} from 'uuid'
import { NaverMapContext } from '../../contexts/NaverMapContext';
import { RectangleProps } from '../../common/types';
import useNaverListener from '../../hooks/useNaverListener';

const Rectangle = ({
    id,
    opts,
    onBoundsChanged,
    onClick,
    onDoubleClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onRightClick,
}: RectangleProps) => {
    const {state, dispatch} = useContext(NaverMapContext)
    const [prevOpts, setPrevOpts] = useState('')
    const [rectangle, setRectangle] = useState<naver.maps.Rectangle | undefined>(undefined,)
    const [rectangleId] = useState(id ? id : `rectangle-${uuid()}`)

    const addRectangle = (rectagle: naver.maps.Rectangle) => {
        dispatch({type: 'add_object', object: rectangle, id: rectangleId})
    }
    const removeRectangle = () => {
        dispatch({type: 'remove_object', id: rectangleId})
    }
   
    useEffect(()=>{
        if(state.map === undefined) return
        const rectangle = new naver.maps.Rectangle({
            ...opts,
            map: state.map,
        })
        setRectangle(rectangle)
        setPrevOpts(JSON.stringify(opts))

        // state.objects 에 rectangle 추가
        addRectangle(rectangle)

        // clean up
        return () => removeRectangle()
    },[state.map])

    useNaverListener(rectangle, [
        {name: 'bounds_changed', handler: onBoundsChanged},
        {name: 'click', handler: onClick},
        {name: 'dblclick', handler: onDoubleClick},
        {name: 'drag', handler: onDrag},
        {name: 'dragend', handler: onDragEnd},
        {name: 'dragstart', handler: onDragStart},
        {name: 'mousedown', handler: onMouseDown},
        {name: 'mouseout', handler: onMouseOut},
        {name: 'mouseover', handler: onMouseOver},
        {name: 'mouseup', handler: onMouseUp},
        {name: 'rightclick', handler: onRightClick},
    ])
    // 컴포넌트 속성이 변경되면 Reactangle 객체 수정
    useEffect(()=>{
        if(rectangle === undefined ||
           opts === undefined ||
           JSON.stringify(opts) === prevOpts
        )
        return
        rectangle.setOptions(opts);
        setPrevOpts(JSON.stringify(opts))
    }, [rectangle, opts])

    return null
}

Rectangle.displayName = 'Rectangle'

export default Rectangle