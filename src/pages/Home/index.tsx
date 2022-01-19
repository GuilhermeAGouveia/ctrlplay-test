import React from "react"
import styled from "styled-components"
import FlatTools from "../../components/FlatTools"
import ListHomeworks from "../../components/ListHomeworks"
import colors from "../../styles/colors"
import grid from "../../assets/icons/grid.svg"


export default class Home extends React.Component<any, any> {
    render() {
        return (
            <HomeContainer>
                   <Header>
                     <TopBar>
                        <Menu src={grid} width={'40px'}/>
                        Página Inicial
                      </TopBar>
                    </Header>
                <FlatTools/>
                <ListHomeworks/>
            </HomeContainer>
        )
    }
}


const HomeContainer = styled("div")`
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: ${colors.secondary};
`

const SubjectContainer = styled("div")`
  
`


const Header = styled("header")`

  position: relative;
  top: 0;
  min-width: 100%;
  color: white;
  font-family: Poppins, sans-serif;

`

const TopBar = styled("div")`
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  line-height: 54px;


`

const Menu = styled("img")`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 40px;
`
