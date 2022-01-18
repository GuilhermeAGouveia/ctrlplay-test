import React from "react"
import styled from "styled-components";
import {motion} from "framer-motion"
import {FiX, FiList} from "react-icons/fi";
import colors from "../styles/colors"
import api from "../services/api"
import {formatDistance} from "date-fns"
import {ptBR} from "date-fns/locale"

interface homework {
    id: string | number;
    title: string;
    desc: string;
    info: {
        subject: string;
        value: number;
        timeRest: string
    }
}

interface ListOrderState {
    homeworks: homework[],
    isActive: boolean,
    showResume: boolean
}
class ListOrder extends React.Component<any, ListOrderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            homeworks: [],
            isActive: false,
            showResume: true
        }
    }

    async componentDidMount() {

        const {data: homeworksData} = await api.get<homework[]>("/homeworks")

        const homeworks = homeworksData.map(item => ({
            ...item,
            info: {
                ...item.info,
                timeRest: formatDistance(new Date(item.info.timeRest), new Date(), { locale: ptBR})
            }
            //desc: item.desc.length > 60 ? item.desc.substring(0, 59) + "..." : item.desc
        }))
        this.setState({homeworks});

    }

    render() {
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
                    this.state.homeworks.map((homework, index) => (
                        <Order key={"homework" + index}>
                            <div className="titleList">
                                {homework.title}
                            </div>
                            <div className="descList">
                                {this.state.showResume ? homework.desc.substring(0, 59) + "..." : homework.desc}
                                {homework.desc.length > 60 && (
                                    <ShowResumeController onClick={() => this.setState(state => ({showResume: !state.showResume}))} animate={{
                                        rotate: this.state.showResume ? 0 : 45
                                    }} whileTap={{scale: 0.8}}>
                                        +
                                    </ShowResumeController>
                                )}
                            </div>  
                            <div className="infoList">
                                <span>{homework.info.subject}</span>
                                <span>{homework.info.value} pts</span>
                                <span>Faltam {homework.info.timeRest}</span>
                            </div>
                        </Order>
                    ))
                }
                {!this.state.homeworks.length && (<NotHomework>Nenhuma tarefa para ser exibida</NotHomework>)}
            </ListSchContainer>
        )
    }
}

export default ListOrder

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
    font-weight: normal;
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

const Order = styled("li")`
  position: relative;
  margin: 0px 10px;
  border-bottom: 1px solid #C5C5C5;
  list-style: none;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  .titleList {
    position: relative;
    width: 100%;
    padding: 5px 9px;
    display: flex;
    justify-content: flex-start;
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
    overflow-y: hidden;
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
  }
`

const ActiveButton = styled("button")`
    position: fixed;
    top: 10px;
    right: 20px;
    width: 30px;
    height: 30px;
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
    width: 30px;
    height: 30px;
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