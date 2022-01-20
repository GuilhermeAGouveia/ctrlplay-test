import { createGlobalStyle } from "styled-components"

import Poppins from "../assets/fonts/Poppins-Regular.ttf"
import PoppinsBold from "../assets/fonts/Poppins-Bold.ttf"
import PoppinsLight from "../assets/fonts/Poppins-Light.ttf"

import colors from "./colors"


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(${Poppins}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBold}) format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsLight}) format("truetype");
    font-weight: lighter;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  body {
    position: relative;
    min-height: 100vh;
  }
  
  button:focus, button:hover {
    outline: none;
  }

  button {
    cursor: pointer;
  }

  @media (min-width: 450px){

  *::-webkit-scrollbar{
    width: 11px;
  }

  *::-webkit-scrollbar-track {
    width: 11px;
    background: ${colors.secondary};
  }

  *::-webkit-scrollbar-thumb {
    width: 10px;
    border-radius: 5px;
    background: #67EE89;
  }
  }
`

export default GlobalStyle