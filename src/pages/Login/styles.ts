import styled from "styled-components";
import colors from "../../styles/colors";
import {motion} from "framer-motion";
import {FiChevronLeft} from "react-icons/fi"

export const Container = styled.div`
  position: relative;
  background: ${colors.primary};
  height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 5px;
  overflow: hidden;

  @media (max-width: 450px) {
    display: block;
  }
`

export const GeneralForm = styled<any>("div")`
  position: relative;
  width: 30%;
  right: ${props => props.activeForm ? "0px" : "-35%"};
  min-height: 100%;
  background: #FEFEFE;
  overflow: hidden;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.2);
  transition: right .5s .3s;


  @media (max-width: 450px) {
    position: absolute;
    z-index: 2;
    background: white;
    width: 100%;
    right: ${props => props.activeForm ? "0px" : "-105%"};
    top: 0px;
    height: calc(100vh - 10px);
  }
`


export const Section = styled.div`
  position: relative;
  min-width: 70%;
  height: 100%;
  background: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: Montserrat;
    font-size: 40px;
    color: ${colors.primary};
    font-weight: bold;
  }

  @media (max-width: 450px) {
    height: 75%;
    width: 100%;
  }
`

export const ContainerB = styled<any>("div")`
  position: absolute;
  width: 30%;
  min-height: 100%;
  right: ${props => props.activeForm ? "-30%" : "5px"};
  background: ${colors.secondary};
  overflow: visible;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  transition: right 0.5s;

  @media (max-width: 450px) {
    position: relative;
    background: white;
    width: 100%;
    right: auto;
    box-shadow: none;
    min-height: 25%;
    align-items: center;
  }

`

export const ButtonB = styled(motion.button)`
  position: relative;
  width: 300px;
  height: 70px;
  font-family: Poppins, sans-serif;
  font-size: 25px;
  font-weight: 600;
  background: ${colors.primary};
  left: -70px;
  border: none;
  border-radius: 20px;
  color: white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 450px) {
    left: auto;
    width: 250px;
  }

  svg {
    position: absolute;
    right: 10%;
  }
`
export const SectionLF = styled(motion.section)`
  position: relative;
  height: calc(100% - 70px);
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`


export const SectionForm = styled.form`
  position: relative;
  height: 100%;
  width: 50%;
  overflow: hidden;
`

export const SectionFormContainer = styled(motion.div)`
  position: relative;
  height: calc(100% - 50px);
  width: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`


export const HeaderLF = styled("header")`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #ABABAB;
`
export const FooterLF = styled("footer")`
  position: absolute;
  overflow: hidden;
  bottom: 0px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const HeaderE = styled<any>("span")`
  position: relative;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 0.9em;
  line-height: 29px;
  color: ${props => props.selected ? colors.primary : "#ABABAB"};
  text-transform: uppercase;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
`

export const LineSelect = styled<any>(motion.span)`
  position: absolute;
  bottom: 0px;
  height: 3px;
  background: ${colors.primary};
`

export const BackIcon = styled(FiChevronLeft)`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 3;
  cursor: pointer;
`

export const BannerError = styled(motion.div)`
  position: absolute;
  top: 10px;
  width: 90%;
  left: 5%;
  height: 40px;
  background: #EF3020;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  font-family: Poppins, sans-serif;
  font-size: 13px;
  color: white;

`