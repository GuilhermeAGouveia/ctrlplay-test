import React, {useState} from "react"
import styled from "styled-components"
import {motion} from "framer-motion"
import {FaChevronDown} from "react-icons/fa"

import colors from "../styles/colors";


interface SelectProps {
    value: string;
    setValue: (value: string) => void;
    options: {
        label: string;
        value: string
    }[],
    width?: string;
    heigth?: string
}


export default function Input({options, setValue, value, ...rest}: SelectProps) {
    const [selectValue, setSelectValue] = useState({
        label: value,
        value: ""
    })
    const [click, setClick] = useState(false)

    return (
        <SelectContainer onClick={() => setClick(!click)} {...rest}>
            <Span>{selectValue.label} <SelectIcon size={18} color={colors.primary}/></Span>
            <ListSelectContainer click={click}>
                <ListSelect>
                    {options.map(option => (
                        <li key={option.value} onClick={() => {
                            setValue(option.value);
                            setSelectValue(option)
                        }}>
                            {option.label}
                        </li>
                    ))}

                </ListSelect>
            </ListSelectContainer>
        </SelectContainer>
    )

}
const Span = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
`

const SelectContainer = styled<any>(motion.div)`
  position: relative;
  width: ${props => props.width ? props.width : "90%"};
  min-height: ${props => props.heigth ? props.heigth : "50px"};
  display: block;
  text-align: center;
  border-radius: 11.5px;
  border: 2px solid ${colors.primary};
  margin: 10px auto;
  overflow: visible;
  font-family: Poppins, "sans-serif";
  user-select: none;
  font-size: 1.05em;
  line-height: 36px;
  color: ${colors.primary};
`

const SelectIcon = styled(FaChevronDown)`
  position: absolute;
  right: 10px;
`

const ListSelectContainer = styled<any>("div")`
  position: absolute;
  width: 100%;
  top: 50px;
  height: ${props => props.click ? "auto" : "0px"};
  max-height: 100px;
  background: #F1f1f1;
  z-index: 2;
  border-radius: 0 0 5px 5px;

`

const ListSelect = styled("ul")`
  position: relative;
  width: 100%;
  font-weight: 500;

  li {
    height: 50px;
    width: 90%;
    margin: 0 auto;
    list-style: none;
    border-bottom: 1px solid ${colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;

    transition: background .2s, color .1s;

  }

  li:last-of-type {
    border-bottom: none;
  }

  li:hover {
    background: ${colors.primary};
    color: white;
  }

`