import React, {useEffect, useState} from "react"
import styled from "styled-components";
import {motion} from "framer-motion";

import BarIndicator from "./BarIndicator"
import colors from "../styles/colors"

interface Module {
    name: string;
    aulas: number;
    duration: number;
    imgUrl?: string;
}

interface FlatCardsProps {
    modules: Module[];
}

function FlatCards_({modules}: FlatCardsProps) {

    useEffect(() => {
        function getCenterElement() {
            const len = modules.length;
            if (len % 2 === 0) {
                setWeigth(130)
                return len / 2
            } else return (len + 1) / 2
        }

        setNElements(modules.length)
        setCenter(getCenterElement())

    }, [modules])


    const [select, setSelect] = useState(1)
    const [center, setCenter] = useState(0)
    const [reload, setReload] = useState(true)
    const [weigth, setWeigth] = useState(0)
    const [nElements, setNElements] = useState(0)

    const [touchStart, setTouchStart] = useState(0)
    const [touchMove, setTouchMove] = useState(0)

    const [posX, setPosX] = useState(0)

    useEffect(() => {
        setPosX(260 * (center - select) + weigth)

    }, [select, center, reload])

    function determinatePos() {
        //Tratando click e deslize pequeno. Quando click ocorrer touchMove será zero
        if (!touchMove || Math.abs(touchMove - touchStart) < 70) {
            setReload(!reload);
            return;
        }


        if (touchMove - touchStart < 0) {
            if (select !== modules.length) {
                setSelect(select + 1)
                //setPosX(260 * (center - select - 1))
            } else {
                setPosX(260 * (center - select) + weigth)
            }
        } else {
            if (select !== 1) {
                setSelect(select - 1)
                //setPosX(260 * (center - select + 1))
            } else {
                setPosX(260 * (center - select) + weigth)
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
        <FlatCardsRoot>
            <FlatCards
                onTouchStart={(e: TouchEvent) => setTouchStart(e.changedTouches[0].pageX)}
                onTouchMove={(e: TouchEvent) => {
                    setPosX(260 * (center - select) + e.changedTouches[0].pageX - touchStart)
                    setTouchMove(e.changedTouches[0].pageX)
                }}
                onTouchEnd={determinatePos}
                animate={{
                    x: posX
                }}>
                {modules.map((module, index) => (
                    <Card key={"module" + index + 1} imgUrl={module.imgUrl} variants={animate}
                          animate={index + 1 === select ? "center" : "notCenter"}
                          onClick={() => setSelect(index + 1)}>
                        <div className="titleCard">{module.name}</div>
                        <div className="imgCard"></div>
                        <div className="infoCard">
                            <div><strong>{module.aulas}</strong> aulas</div>
                            <div><strong>{module.duration}h</strong> de duração</div>
                        </div>
                    </Card>
                ))}


            </FlatCards>
            <BarIndicatorRoot>
                <BarIndicator select={select} len={nElements}/>
            </BarIndicatorRoot>
        </FlatCardsRoot>

    )
}

export default FlatCards_

const FlatCardsRoot = styled("div")`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`
const FlatCards = styled<any>(motion.div)`
  position: absolute;
  width: auto;
  height: 300px;
  display: flex;
  align-items: center;
  overflow: visible;
`
const Card = styled<any>(motion.div)`
  position: relative;
  width: 250px !important;
  height: 250px;
  background: white;
  margin: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  cursor: pointer;

  .titleCard {
    position: relative;
    width: 100%;
    height: 30px;
    font-family: sans-serif;
    font-size: 11px;
    padding: 0px 7px;
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgCard {
    position: relative;
    height: 190px;
    width: 250px;
    background-image: url(${props => props.imgUrl ? props.imgUrl : "data:image/jpeg;base64,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"});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }


  .imgCard::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #EEEEEE;
    z-index: -1;

  }

  .infoCard {
    position: relative;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-family: Poppins, sans-serif;
    font-size: 10px;

  }

  .infoCard strong {
    color: ${colors.primary}
  }


`

const BarIndicatorRoot = styled("div")`
  position: absolute;
  height: 250px;
  width: 25px;
  right: 5px;
  overflow: visible;

  @media (max-width: 450px) {
    right: -10px;
  }
`