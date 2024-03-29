import React, {InputHTMLAttributes} from "react"
import styled from "styled-components"
import colors from "../styles/colors"

interface CheckboxProps extends InputHTMLAttributes<any> {
    label: string
}

export default function Checkbox({width, height, label, ...rest}: CheckboxProps) {
    return (
        <CheckboxRoot>
            <CheckboxInput data-testid={"checkbox"} type={"checkbox"} {...rest}/>
            <CheckboxContainer>
                <CheckboxIcon/>
            </CheckboxContainer>
            {label}
        </CheckboxRoot>

    )
}

const CheckboxRoot = styled("div")`
  position: relative;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 25px;
  font-family: Poppins, sans-serif;
  font-size: 0.8em;

`

const CheckboxContainer = styled("div")`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${colors.primary};
  overflow: hidden;
  border-radius: 4px;
  margin-right: 10px;

`

const CheckboxInput = styled("input")`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0;
  z-index: 2;

  cursor: pointer;

  &:checked ~ div div {
    opacity: 1;
  }
`

const CheckboxIcon = styled("div")`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${colors.primary};
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    width: 50%;
    height: 25%;
    border-bottom: 3px solid white;
    border-left: 3px solid white;
    transform: rotate(-45deg);
  }
`