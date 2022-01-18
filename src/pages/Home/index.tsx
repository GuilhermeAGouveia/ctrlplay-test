import React from "react"
import styled from "styled-components"
import FlatTools from "../../components/FlatTools"
import ListHomeworks from "../../components/ListHomeworks"
import colors from "../../styles/colors"
export default class Home extends React.Component<any, any>{
    render() {
        return (
            <HomeContainer>
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
    display
`