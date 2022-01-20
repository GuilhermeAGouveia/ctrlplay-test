import React from "react"
import styled from "styled-components"
import Lottie from "react-lottie"
import {motion} from "framer-motion"
import {FiActivity, FiFilter, FiRotateCcw, FiSliders} from "react-icons/fi"

import FlatCards from "../../components/FlatCards"
import ListHomeworks from "../../components/ListHomeworks"

import colors from "../../styles/colors"
import grid from "../../assets/icons/grid.svg"
import api from "../../services/api"
import loading from "../../assets/lotties/loading.json"
import study from "../../assets/lotties/study_greenbg.json"


interface Module {
    name: string;
    aulas: number;
    duration: number;
    imgUrl?: string;
}

interface Subject {
    name: string;
    code: string;
    modules: Module[];
}

interface HomeState {
    subjects: Subject[]
}

export default class Home extends React.Component<any, HomeState> {
    constructor(props: any) {
        super(props)
        this.state = {
            subjects: []
        }
    }

    async componentDidMount() {
        const {data: subjects} = await api.get<Subject[]>("/subjects")
        this.setState({subjects})
    }

    getTotalDuration(modules: Module[]) {
        var total = 0;
        modules.forEach(e => total += e.duration)
        return total
    }

    render() {
        const defaultPropsLottie = (animationData: any) => ({
            autoPlay: true,
            loop: true,
            animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        })


        return (
            <HomeContainer>
                <Header>
                    <TopBar>
                        <Menu src={grid} width={'40px'}/>
                        Página Inicial
                    </TopBar>
                    <HeaderContent>
                        <Salutation>
                            <div>Olá,</div>
                            <div>Guilherme</div>
                        </Salutation>

                        <div><Lottie options={defaultPropsLottie(study)} width={120} height={120}/></div>
                    </HeaderContent>
                    <ToolBar>
                        <Tool whileTap={{scale: 0.8}}>
                            <FiFilter color={colors.primary} size={18}/>
                        </Tool>
                        <Tool whileTap={{scale: 0.8}}>
                            <FiActivity color={colors.primary} size={18}/>
                        </Tool>
                        <Tool whileTap={{scale: 0.8}}>
                            <FiRotateCcw color={colors.primary} size={18}/>
                        </Tool>
                        <Tool whileTap={{scale: 0.8}}>
                            <FiSliders color={colors.primary} size={18}/>
                        </Tool>

                    </ToolBar>
                </Header>
                <Section>
                    {!this.state.subjects[0] && (
                        <Lottie options={defaultPropsLottie(loading)} width={40} height={40}/>)}
                    {this.state.subjects.map((subject, index) => (
                        <SubjectContainer key={"subject" + index}>
                            <div className="headerCard">
                                <h2>{subject.name}</h2>
                                <span>{this.getTotalDuration(subject.modules)}h</span>
                                <span><span>cód</span>{" " + subject.code}</span>
                            </div>
                            <FlatCards modules={subject.modules}/>
                        </SubjectContainer>
                    ))}


                </Section>

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
  padding-bottom: 50px; /*para o conteúdo da pagina não ficar muito próximo ao max bottom da tela de device*/
`

const Header = styled("header")`

  position: relative;
  min-width: 100%;
  height: 30vh;
  min-height: 300px;
  color: white;
  font-family: Poppins, sans-serif;
  background: ${colors.primary};
  text-align: center;
  overflow: visible;

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
  overflow: visible;


`

const Menu = styled("img")`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 40px;
`

const Salutation = styled("div")`
  position: relative;
  font-family: Poppins, sans-serif;
  padding: 0 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  div:nth-child(1) {
    font-weight: lighter;
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;
  }

  div:nth-child(2) {
    font-weight: bold;
    font-size: 25px;
    margin-left: 5px;
  }
`

const HeaderContent = styled("div")`
  position: relative;
  height: 60%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

`

const ToolBar = styled("nav")`
  position: absolute;
  width: 300px;
  height: 50px;
  bottom: -25px;
  left: 50%;
  transform: translate(-50%);
  background: white;
  border-radius: 20px;
  box-shadow: inset 2px 0 3px rgba(0, 0, 0, 0.2),
  2px 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
`

const Tool = styled(motion.button)`
  position: relative;
  height: 100%;
  width: 100%;
  border: none;
  border-left: .5px solid rgba(0, 0, 0, 0.1);
  border-right: .5px solid rgba(0, 0, 0, 0.1);
  background: white;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`

const Section = styled("section")`
  position: relative;
  width: 90%;
  max-width: 1000px;
  margin: 50px auto 0 auto;
  border-radius: 5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
`

const SubjectContainer = styled("div")`
  position: relative;
  width: 100%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);

  .headerCard {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Montserrat, sans-serif;
    margin-bottom: 25px;
  }

  .headerCard h2 {
    font-size: 1.3em;
    color: ${colors.primary};
    max-width: 50%;

  }

  .headerCard span {
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.8em;
    font-weight: 600;
  }

  .headerCard span span {
    font-weight: normal;
  }
`