import React from "react"
import styled from "styled-components";
import {motion} from "framer-motion"
import {FiX, FiList} from "react-icons/fi";
import colors from "../styles/colors"
import api from "../services/api"
import {formatDistance} from "date-fns"
import {ptBR} from "date-fns/locale"
import Input from "./Input"

interface homework {
    id: string | number;
    title: string;
    desc: string;
    subject: string;
    value: number;
    timeRest: string;

}

interface homeworkShow extends homework {
    isLate: boolean
}

interface ListHomeworkState {
    homeworks: homeworkShow[],
    homeworksFilter: homeworkShow[],
    isActive: boolean,
    showResume: boolean[],
    filterSelect: string
}
class ListHomework extends React.Component<any, ListHomeworkState> {
    constructor(props: any) {
        super(props);
        this.state = {
            homeworks: [],
            homeworksFilter: [],
            isActive: false,
            showResume: [],
            filterSelect: ""
        }
    }

    async componentDidMount() {

        const {data: homeworksData} = await api.get<homework[]>("/homeworks")

        homeworksData.sort((a, b) => new Date(a.timeRest).getTime() - new Date(b.timeRest).getTime())

        const homeworks = homeworksData.map(item => ({
            ...item,
            isLate: new Date(item.timeRest).getTime() < new Date().getTime(),
            timeRest: formatDistance(new Date(item.timeRest), new Date(), { locale: ptBR})
            
            //desc: item.desc.length > 60 ? item.desc.substring(0, 59) + "..." : item.desc
        }))

        this.setState({homeworks, homeworksFilter: homeworks, showResume: Array(homeworks.length).fill(true, 0, homeworks.length)});

    }

    render() {
        const optionsSelect = [
            {
                label: "História",
                value: "História"
            }
        ]
        return (
            <ListSchContainer active={this.state.isActive}>
                {!this.state.isActive && (
                    <ActiveButton onClick={() => this.setState(state => ({isActive: !state.isActive}))}>
                        <FiList color={colors.primary} size={24}/>
                    </ActiveButton>
                )}
                <HeaderList>
                    <span>Lista de Tarefas</span>
                    <span>{this.state.homeworks.length} tarefas</span>
                    <FiX onClick={() => this.setState(state => ({isActive: !state.isActive}))} color={colors.primary} size={30}/>
                </HeaderList>
               
                {
                    this.state.homeworksFilter.map((homework, index) => (
                        <Homework key={"homework" + index} isLate={homework.isLate}>
                            <div className="titleList">
                                {homework.title}

                                {homework.desc.length > 60 && (
                                    <ShowResumeController 
                                    onClick={() => {
                                        this.setState(state => ({showResume: state.showResume.map((item, indexS) => indexS === index ? !item : item)}))
                                        
                                    }} 
                                    animate={{
                                        rotate: this.state.showResume[index] ? 0 : 45
                                    }} 
                                    
                                    whileTap={{scale: 0.8}}>
                                        +
                                    </ShowResumeController>
                                )}
                            </div>
                            <div className="descList">
                                {this.state.showResume[index] ? homework.desc.substring(0, 59) + "..." : homework.desc}
                    
                            </div>  
                            <div className="infoList">
                                <span>{homework.subject}</span>
                                <span>{homework.value} pts</span>
                                <span>{homework.isLate ? "Atrasado" : "Faltam"} {homework.timeRest}</span>
                            </div>
                        </Homework>
                    ))
                }
                {!this.state.homeworks.length && (<NotHomework>Nenhuma tarefa para ser exibida</NotHomework>)}
                <FilterContainer>
                    <InputFilter value={this.state.filterSelect} onChange={e => this.setState({filterSelect: e.target.value})}/>
                    <ButtonFilter type={'submit'} onClick={() => this.setState(state => ({homeworksFilter: state.homeworks.filter(h => h.subject.toLowerCase().includes(state.filterSelect.toLowerCase()))}))}>Filtrar</ButtonFilter>
                </FilterContainer>
            </ListSchContainer>
        )
    }
}

export default ListHomework

const ListSchContainer = styled<any>("ul")`
  position: fixed;
  height: 100%;
  width: 350px;
  background: #F2F2F2;
  overflow-y: auto;
  right: ${props => props.active ? "0px" : "-350px"};
  top: 0px;
  transition: right .2s ease-in-out;
  z-index: 3;
`

const HeaderList = styled("div")`
  position: relative;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #C5C5C5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & span:nth-child(1){
    font-family: Montserrat, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;

    display: flex;
    align-items: center;

    color: ${colors.primary};
    
  }

  & span:nth-child(2){
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    display: flex;
    align-items: flex-end;
    

    color: #000000;
  }
`

const Homework = styled<any>("li")`
  position: relative;
  margin: 0px 10px;
  border-bottom: 1px solid #C5C5C5;
  list-style: none;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  transition: height .2s;
  .titleList {
    position: relative;
    width: 100%;
    padding: 5px 9px;
    min-height: 30px;
    overflow-y: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: ${colors.primary}
  }

  .descList {
    position: relative;
    width: 100%;
    padding: 5px 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    min-height: 40px;
    overflow-y: visible;
    color: rgba(0, 0, 0, 0.80);
  }

  .infoList {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center; 
      font-size: 13px;
      padding: 0px 10px;
      margin-top: 10px;
      margin-bottom: 7px;

      span {
          color:rgba(0, 0, 0, 0.80)
      }

      span:nth-child(2){
          color: ${colors.primary};
          font-weight: 600;
      }


      span:nth-child(2n + 1){
        padding: 4px 5px;
        background: ${colors.primary};
        color: white;
        border-radius: 3px;
      }

      span:nth-child(3){
          background: ${props => props.isLate ? "rgb(180, 50, 70)" : colors.primary}
      }
  }
`

const ActiveButton = styled("button")`
    position: fixed;
    top: 10px;
    right: 20px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 3px 0px 0px rgba(0, 0, 0, 0.2);
    z-index: 3;
`

const ShowResumeController = styled(motion.button)`
    position: absolute;
    right: 5px;
    top: 5px;
    width: 25px;
    height: 25px;
    border: none;
    background: ${colors.primary};
    color: white;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 600;
    
`

const NotHomework = styled("div")`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-family: sans-serif;
    font-weight: 600;
    color: ${colors.primary}
`

const FilterContainer = styled("div")`
  position: fixed;
  height: 50px;
  width: 350px;
  background: white;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center
`
const ButtonFilter = styled(motion.button)`
  position: relative;
  height: 30px;
  width: 100px;
  color: white;
  background: ${colors.primary};
  border-radius: 5px;
  border: none;
  font-family: Poppins, "sans-serif";
  font-weight: bold;
  user-select: none;
  font-size: 1.05em;
`

const InputFilter = styled(motion.input)`
  position: relative;
  height: 30px;
  width: 100px;
  color:  ${colors.primary};
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  font-family: Poppins, "sans-serif";
  font-weight: bold;
  user-select: none;
  font-size: 1.05em;
  padding: 0px 5px;
  text-align: center;

`