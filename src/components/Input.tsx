import React, {useState} from "react"
import styled from "styled-components"
import {motion, AnimationProps} from "framer-motion"
import colors from "../styles/colors";
import {FaExclamationCircle} from "react-icons/fa"

interface IInputProps extends AnimationProps{
    type: string;
    placeholder: string;
    required?: boolean;
    custom?: number;
}

export default function Input ({type, placeholder, required, ...rest} : IInputProps) {
    const [inputValue, setInputValue] = useState("")

        return (
            <InputContainer {...rest}>
                <InputText value={inputValue} onChange={e => setInputValue(e.target.value)} type={type} placeholder={placeholder} required={required}/>
                {inputValue.length <= 2 && <InputIcon color={colors.primary} size={18}/>}
            </InputContainer>
        )

}

const InputContainer = styled(motion.div)`
  position: relative;
  width: 90%;;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 11.5px;
  border: 2px solid ${colors.primary};
  margin: 10px auto 10px auto;
`

const InputText = styled("input")`
  background: transparent;
  border: none;
  text-align: center;
  font-family: Poppins, "sans-serif";
  font-weight: bold;
  user-select: none;
  font-size: 1.05em;
  line-height: 36px;
  color: ${colors.primary};
  
  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
  
  &::placeholder{
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 300;
    user-select: none;
    font-size: 1.05em;
    line-height: 36px;
    color: ${colors.primary};
  }
  
`

const InputIcon = styled(FaExclamationCircle)`
  position: absolute;
  right: 10px;
`