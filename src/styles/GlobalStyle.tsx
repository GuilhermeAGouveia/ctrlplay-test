import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
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
`

export default GlobalStyle