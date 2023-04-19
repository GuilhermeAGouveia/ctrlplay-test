import React from "react";
import { FiChevronRight } from "react-icons/fi";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Input from "../../components/Input";
import Select from "../../components/Select";

import logo from "../../assets/lotties/study.json";
import api from "../../services/api";
import colors from "../../styles/colors";

import {
    BackIcon,
    BannerError,
    ButtonB,
    Container,
    ContainerB,
    FooterLF,
    GeneralForm,
    HeaderE,
    HeaderLF,
    LineSelect,
    Section,
    SectionForm,
    SectionFormContainer,
    SectionLF
} from "./styles";

//import Select from "react-select"
interface OptionSelect {
    label: string;
    value: string;
}

interface LoginState {
    lineSelectProps: {
        left: number;
        width: number;
    };
    selected: React.RefObject<any>;
    loading: boolean;
    activeForm: boolean;
    lottieDimensions: {
        width: number;
        heigth: number
    };
    optionsSelect: OptionSelect[];
    username: string;
    password: string;

    selectValue: string

    showPass: boolean;

    errorLogin: boolean
}

class Login extends React.Component<any, LoginState> {
    private headerERef: React.RefObject<any>[];
    private sectionRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.headerERef = [React.createRef(), React.createRef()]
        this.sectionRef = React.createRef()
        this.state = {
            lineSelectProps: {
                left: 0,
                width: 0
            },
            lottieDimensions: {
                width: 0,
                heigth: 0
            },
            selected: this.headerERef[0],
            loading: false,
            activeForm: false,
            optionsSelect: [],
            username: "",
            password: "",
            selectValue: "Tipo de ensino",
            showPass: false,
            errorLogin: false
        };


    }

    async componentDidMount() {
        window.addEventListener("resize", () => {
            this.handleSelect(this.state.selected)
        })

        //Reponsivididade lottie
        var lottieDimensions: {
            width: number;
            heigth: number
        };

        if (window.innerWidth <= 450) {
            lottieDimensions = {
                width: 350,
                heigth: 350
            }
        } else {
            lottieDimensions = {
                width: 500,
                heigth: 500
            }
        }

        this.setState({lottieDimensions})
        this.handleSelect(this.headerERef[0])


        const {data: optionsSelect} = await api.get<OptionSelect[]>("/selectValues")


        this.setState({optionsSelect})

    }

    /**
     *
     * @param e Elemento que foi selecionado
     * @description Ajusta a barra de selecao utilizando critérios absolutos de posição
     */

    handleSelect({current: e}: React.RefObject<any>) {

        this.setState({
            lineSelectProps: {
                width: e.offsetWidth,
                // left é calculado pegando a posição absoluta de e na tela menos o que tem antes, que é a largura de sectionRef e os 5 pixels de padding da borda
                left: e.offsetLeft,
                // left: e.getBoundingClientRect().left - this.sectionRef.current.getBoundingClientRect().width - 5
            },
            selected: e
        });
    }

    handleSignin = async (e: any) => {
        e.preventDefault()
        this.setState(state => ({loading: !state.loading}))
        const {data: users} = await api.get<{
            username: string;
            password: string
        }[]>("/users")

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.setState(state => ({loading: !state.loading}))

        if (users.find(item => item.password === user.password && item.username === user.username)) this.props.navigate("/home", {k: 1})
        else this.setState({errorLogin: true})
    }

    handleSignup = (e: any) => {
        e.preventDefault()
        this.setState(state => ({loading: !state.loading}))
    }

    handleSwap = () => {
        this.setState(state => ({activeForm: !state.activeForm}))
    }

    render() {
        const variants = {
            inputList: {
                hidden: {
                    opacity: 0,
                    y: 150
                },
                visible: (i: number) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: 0.2 * i
                    }
                })
            }
        }

        const defaultPropsMotion = {
            variants: variants.inputList,
            animate: "visible",
            initial: "hidden"
        }

        const defaultPropsLottie = {
            autoPlay: true,
            loop: true,
            animationData: logo,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return (
            <Container>
                {this.state.activeForm && <BackIcon size={30} color={colors.primary}
                                                    onClick={() => this.setState(state => ({activeForm: !state.activeForm}))}/>}
                <Section ref={this.sectionRef}>
                    <Lottie options={defaultPropsLottie} width={this.state.lottieDimensions.width}
                            height={this.state.lottieDimensions.heigth}/>
                    <h2>Study</h2>
                </Section>
                <ContainerB activeForm={this.state.activeForm}>
                    <ButtonB onClick={this.handleSwap} whileTap={{scale: 0.9}}>
                        Aluno
                        <FiChevronRight color={'white'} size={30}/>
                    </ButtonB>
                    <ButtonB onClick={this.handleSwap} whileTap={{scale: 0.9}}>
                        Professor
                        <FiChevronRight color={'white'} size={30}/>
                    </ButtonB>
                </ContainerB>
                <GeneralForm activeForm={this.state.activeForm}>
                    <HeaderLF>
                        <HeaderE ref={this.headerERef[0]} id={"header1"}
                                 selected={this.headerERef[0].current === this.state.selected}
                                 onClick={
                                     () => {
                                         this.handleSelect(this.headerERef[0]);
                                     }
                                 }>
                            Sign in
                        </HeaderE>
                        <HeaderE selected={this.headerERef[1].current === this.state.selected
                        } ref={this.headerERef[1]} onClick={
                            () => {

                                this.handleSelect(this.headerERef[1]);

                            }
                        }>
                            Sign up
                        </HeaderE>
                        <LineSelect initial={{
                            left: "0px",
                            width: "0px"
                        }}
                                    animate={{
                                        left: this.state.lineSelectProps.left - 0.25 * this.state.lineSelectProps.width + "px",//this.state.lineSelectProps.left - 0.25 * this.state.lineSelectProps.width + "px",
                                        width: 1.5 * this.state.lineSelectProps.width + "px"
                                    }}
                        />
                    </HeaderLF>
                    <SectionFormContainer animate={{
                        left: this.state.selected === this.headerERef[0].current ? "0px" : "-100%"
                    }}>
                        <SectionForm>
                            {this.state.errorLogin && (
                                <BannerError animate={{opacity: 1, y: 0}} initial={{y: -10, opacity: 0}}>Usuário ou
                                    senha inválidos!</BannerError>
                            )}
                            <SectionLF {...defaultPropsMotion}>
                                <Input custom={0} {...defaultPropsMotion} type={"text"} placeholder={"User or email"}
                                       required value={this.state.username}
                                       onChange={e => this.setState(({username: e.target.value, errorLogin: false}))}/>
                                <Input custom={1} {...defaultPropsMotion} type={this.state.showPass ? "text" : "password"}
                                       placeholder={"Password"}
                                       required value={this.state.password}
                                       onChange={e => this.setState(({password: e.target.value, errorLogin: false}))}/>
                                <Checkbox label={"Mostrar senha"} checked={this.state.showPass}
                                          onChange={e => this.setState({showPass: e.target.checked})}></Checkbox>
                            </SectionLF>
                            <FooterLF>
                                <Button text={"Entrar"} type={"submit"} onClick={e => this.handleSignin(e)}
                                        loading={this.state.loading}/>
                                        <Button text={"Visitante"} type={"button"} onClick={e => this.props.navigate("/home", {k: 1}}
                                        loading={this.state.loading}/>
                            </FooterLF>
                        </SectionForm>
                        <SectionForm>
                            <SectionLF>
                                <Input type={"text"} placeholder={"User"} required/>
                                <Input type={"text"} placeholder={"Name"} required/>
                                <Input type={"email"} placeholder={"Email"} required/>
                                <Input type={"tel"} placeholder={"Phone"}/>
                                <Select value={this.state.selectValue}
                                        setValue={(value => this.setState({selectValue: value}))}
                                        options={this.state.optionsSelect}/>
                                <Input type={"password"} placeholder={"Pass"} required/>
                            </SectionLF>
                            <FooterLF>
                                <Button text={"Confirmar"} type={"submit"} loading={this.state.loading}
                                        onClick={e => this.handleSignup(e)}/>
                            </FooterLF>
                        </SectionForm>
                    </SectionFormContainer>
                </GeneralForm>
            </Container>
        )
    }
}

const LoginEnvelop = () => {
    const navigate = useNavigate()
    return (
        <Login navigate={navigate}/>
    )
}
export default LoginEnvelop

