import React, {ElementRef, ObjectHTMLAttributes, useEffect, useRef, useState} from "react"
import styled from "styled-components";
import {motion} from "framer-motion";

import BarIndicator from "./BarIndicator"


function FlatList() {
    const ref = {
        flatTools: useRef<any>()
    }
    useEffect(() => {
        function getCenterElement() {
            const len = ref.flatTools.current.children.length;
            if (len % 2 === 0) {
                return len / 2
            } else return (len + 1) / 2
        }
        setNElements(ref.flatTools.current.children.length)
        setSelect(getCenterElement())
        setCenter(getCenterElement())
    }, [ref.flatTools])


    const [select, setSelect] = useState(0)
    const [center, setCenter] = useState(0)
    const [nElements, setNElements] = useState(0)

    const [touchStart, setTouchStart] = useState(0)
    const [touchMove, setTouchMove] = useState(0)

    const [posX, setPosX] = useState(0)

    useEffect(() => {
        setPosX(260 * (center - select))

    }, [select, center])

    function determinatePos() {
        //Tratando click, quando click ocorrer touchMove será zero
        if (!touchMove) return;

        if (touchMove - touchStart < 0) {
            if (select !== 5) {
                setSelect(select + 1)
                //setPosX(260 * (center - select - 1))
            } else {
                setPosX(260 * (center - select))
            }
        } else {
            if (select !== 1) {
                setSelect(select - 1)
                //setPosX(260 * (center - select + 1))
            } else {
                setPosX(260 * (center - select))
            }
        }
        setTouchMove(0)
    }

    const animate = {
        center: {
            scale: 1.3,
            zIndex: 1,
            borderRadius: "3px",
            filter: "brightness(1) blur(0px)"
        },
        notCenter: {
            scale: 1,
            zIndex: 0,
            borderRadius: "0px",
            filter: "brightness(0.8) blur(2px)"
        }
    }


    return (
        <FlatToolsRoot>
            <FlatTools ref={ref.flatTools}
                       onTouchStart={(e: TouchEvent) => setTouchStart(e.changedTouches[0].pageX)}
                       onTouchMove={(e: TouchEvent) => {
                           setPosX(260 * (center - select) + e.changedTouches[0].pageX - touchStart)
                           setTouchMove(e.changedTouches[0].pageX)
                       }}
                       onTouchEnd={determinatePos}
                       animate={{
                           x: posX
                       }}>
                <Tool id={1} variants={animate} animate={1 === select ? "center" : "notCenter"}
                      onClick={() => setSelect(1)}>s</Tool>
                <Tool key={2} animate={animate[2 === select ? "center" : "notCenter"]}
                      onClick={() => setSelect(2)}>s</Tool>
                <Tool key={3} animate={animate[3 === select ? "center" : "notCenter"]}
                      onClick={() => setSelect(3)}>s</Tool>
                <Tool key={4} animate={animate[4 === select ? "center" : "notCenter"]}
                      onClick={() => setSelect(4)}>s</Tool>
                <Tool key={5} animate={animate[5 === select ? "center" : "notCenter"]}
                      onClick={() => setSelect(5)}>s</Tool>
            </FlatTools>
            <BarIndicatorRoot>
                <BarIndicator select={select} len={nElements}/>
            </BarIndicatorRoot>
        </FlatToolsRoot>

    )
}

export default FlatList

const FlatToolsRoot = styled("div")`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`

const FlatTools = styled<any>(motion.div)`
  position: absolute;
  width: auto;
  height: 300px;
  display: flex;
  align-items: center;
  overflow: visible;
`
const Tool = styled<any>(motion.div)`
  position: relative;
  width: 250px !important;
  height: 250px;
  background: white;
  margin: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  @media (max-height: 600px) {
    height: 230px;
  }
`

const BarIndicatorRoot = styled("div")`
  position: absolute;
  height: 250px;
  width: 31.3px;
  right: 5px;
  overflow: visible;
`