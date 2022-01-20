import React, {ButtonHTMLAttributes} from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import {motion} from 'framer-motion'

import loading from "../assets/lotties/loading.json"
import Lottie from "react-lottie"

interface ButtonProps extends ButtonHTMLAttributes<any> {
    loading?: boolean;
    text: string;
}

export default function Button(props: ButtonProps) {

    const defaultPropsLottie = {
        autoPlay: true,
        loop: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },

    }
    return (
        <ButtonC whileTap={{
            scale: 0.9
        }} onClick={props.onClick}> {!props.loading ? props.text : (
            <Lottie options={defaultPropsLottie} width={45} height={45}/>
        )} </ButtonC>
    )
}

const ButtonC = styled(motion.button)`
  position: relative;
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 11.5px;
  background: ${colors.primary};
  margin: 10px auto;
  font-family: Poppins, sans-serif;
  font-weight: bold;
  font-size: 17px;
  line-height: 36px;
  color: #FFFFFF;
  text-transform: uppercase;
  overflow: hidden;
`