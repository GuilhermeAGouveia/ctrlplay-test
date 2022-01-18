import React from "react"
import styled from "styled-components";
import colors from "../styles/colors";

interface BarIndicatorProps {
    len: number;
    select: number;
}

export default function BarIndicator(props: BarIndicatorProps) {
    return (
        <BarRoot>
            {[...Array(props.len)].map((item, index) => (
                <IndicatorSlot key={'indicatorslot' + index} len={props.len}/>
            ))}
            <Indicator len={props.len} select={props.select}/>
        </BarRoot>
    )
}

const BarRoot = styled("div")`
  position: relative;
  height: 100%;
  width: 25px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 2;
`

const IndicatorSlot = styled<any>("div")`
  position: relative;
  height: calc(100% / ${props => props.len});
  width: 90%;
  margin: 0 5% 0 5%;
  border-bottom: 1px solid #E7E7E7;
`
const Indicator = styled<any>("div")`
  position: absolute;
  width: 100%;
  height: calc(100% / ${props => props.len});
  top: calc(${props => props.select - 1} * 100% / ${props => props.len});
  transition: .2s linear;
  background: ${colors.primary};
`