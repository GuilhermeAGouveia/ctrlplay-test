import React, {useState, InputHTMLAttributes} from "react"
import styled from "styled-components"
import {motion, AnimationProps} from "framer-motion"
import colors from "../styles/colors";
import {FaExclamationCircle} from "react-icons/fa"

interface IInputProps extends AnimationProps, InputHTMLAttributes<any>{
    initial?: string;
    custom?: number;
    hiddenIcon?: boolean;
    value?: string
}

export default function Input ({custom, variants, initial, animate, ...rest} : IInputProps) {


        return (
            <InputContainer custom={custom} variants={variants} initial={initial} animate={animate} width={rest.width} heigth={rest.height}>
                <InputText value={rest.value} onChange={rest.onChange} type={rest.type} placeholder={rest.placeholder} required={rest.required}/>
                {rest.value && rest.value.length <= 2 && !rest.hiddenIcon && <InputIcon color={colors.primary} size={18}/>}
            </InputContainer>
        )

}

const InputContainer = styled<any>(motion.div)`
  position: relative;
  width:  ${props => props.width ? props.width : "90%"};
  min-height:  ${props => props.heigth ? props.heigth : "50px"};
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