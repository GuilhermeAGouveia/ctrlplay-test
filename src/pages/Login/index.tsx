import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logo from "../../assets/lotties/study.json";

import {
    Logo,
    Container,
    FooterLF,
    GeneralForm,
    HeaderE,
    HeaderLF,
    LineSelect,
    ContainerB,
    ButtonB,
    Section,
    SectionForm,
    SectionFormContainer,
    SectionLF
} from "./styles";


import { useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi"
import Lottie from "react-lottie";

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
}

class Login extends React.Component<any, LoginState> {
    public headerERef: React.RefObject<any>[];
    public sectionRef: React.RefObject<any>;

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
            activeForm: false
        };


    }

    componentDidMount() {
        this.handleSelect(this.headerERef[0])
        window.addEventListener("resize", () => {
            this.handleSelect(this.state.selected)
        })
        var lottieDimensions : {
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
    }


    handleSelect({current : e} : React.RefObject<any>) {

            this.setState({
                lineSelectProps: {
                    ...e.getBoundingClientRect().toJSON(),
                    // left é calculado pegando a posição absoluta de e na tela menos o que tem antes, que é a largura de sectionRef e os 5 pixels de padding da borda
                    //left: e.getBoundingClientRect().left - this.sectionRef.current.getBoundingClientRect().width - 5
                    left: e.getBoundingClientRect().left - this.sectionRef.current.getBoundingClientRect().width - 5
                },
                selected: e
            }, () => {
                console.log(this.state)
            });
    }

    handleSignin = () => {
        this.setState(state => ({loading: !state.loading}))
        this.props.navigate("/home", {k: 1})
    }

    handleSignup = () => {
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

        const defaultProps = {
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
                <Section ref={this.sectionRef}>
                    <Lottie options={defaultPropsLottie} width={this.state.lottieDimensions.width} height={this.state.lottieDimensions.heigth}/>
                    <h2>Study</h2>
                </Section>
                <ContainerB activeForm={this.state.activeForm}>
                    <ButtonB onClick={this.handleSwap}>
                        Aluno
                        <FiChevronRight color={'white'} size={30}/>
                    </ButtonB>
                    <ButtonB onClick={this.handleSwap}>
                        Professor
                        <FiChevronRight color={'white'} size={30}/>
                    </ButtonB>
                </ContainerB>
                <GeneralForm activeForm={this.state.activeForm}>
                    <HeaderLF>
                        <HeaderE ref={this.headerERef[0]} id={"header1"}
                                 selected={this.headerERef[0].current === this.state.selected} onClick={
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
                                        left: this.state.lineSelectProps.left - 0.25 * this.state.lineSelectProps.width + "px",
                                        width: 1.5 * this.state.lineSelectProps.width + "px"
                                    }}
                        />
                    </HeaderLF>
                    <SectionFormContainer animate={{
                        left: this.state.selected === this.headerERef[0].current ? "0px" : "-100%"
                    }}>
                        <SectionForm>
                            <SectionLF {...defaultProps}>
                                <Input custom={0} {...defaultProps} type={"text"} placeholder={"User or email"}
                                       required/>
                                <Input custom={1} {...defaultProps} type={"password"} placeholder={"Pass"} required/>
                            </SectionLF>
                            <FooterLF>
                                <Button text={"Entrar"} onClick={this.handleSignin} loading={this.state.loading}/>
                            </FooterLF>
                        </SectionForm>
                        <SectionForm>
                            <SectionLF {...defaultProps}>
                                <Input custom={0} {...defaultProps} type={"text"} placeholder={"User"} required/>
                                <Input custom={0} {...defaultProps} type={"text"} placeholder={"Name"} required/>
                                <Input custom={0} {...defaultProps} type={"email"} placeholder={"Email"} required/>
                                <Input custom={0} {...defaultProps} type={"tel"} placeholder={"Phone"}/>
                                <Input custom={0} {...defaultProps} type={"select"} placeholder={"Role"} required/>
                                <Input custom={1} {...defaultProps} type={"password"} placeholder={"Pass"} required/>
                            </SectionLF>
                            <FooterLF>
                                <Button text={"Confirmar"} loading={this.state.loading} onClick={this.handleSignup}/>
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

