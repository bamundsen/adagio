import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    InputGroup,
    Row,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";
import styles from "./form_tarefas.module.scss";
import DatePicker from "react-datepicker";

const FormTarefas = () => {
    const windowDimensions = useWindowDimensions();
    const [titulo, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [startHour, setStartHour] = useState("");
    const [startHourAux, setAuxStartHour] = useState<Date>(new Date());
    const [endHour, setEndHour] = useState("");
    const [endHourAux, setAuxEndHour] = useState(
        new Date(new Date().setHours(23, 59))
    );
    const [finishedOrNot, setFinishedOrNot] = useState("");


    useEffect(() => {
        setStartHour(
            `${startHourAux.getHours()}:${startHourAux.getMinutes()}:${startHourAux.getSeconds()}`
        );

        setEndHour(
            `${endHourAux.getHours()}:${endHourAux.getMinutes()}:${endHourAux.getSeconds()}`
        );
    }, []);

    const onChangeStartHour = (date: Date) => {
        setAuxStartHour(date);
        setStartHour(
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );
        return true;
    };
    const onChangeEndHour = (date: Date) => {
        setAuxEndHour(date);
        setEndHour(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        return true;
    };

    const onChangeFinishedOrNot = (ev: any ) =>{
        setFinishedOrNot(ev.target.value);
    }

    const onSubmit = async (ev: any) => {
        ev.preventDefault();
        console.log(titulo);
        console.log(description);
        console.log(`${startHour}`);
        console.log(`${endHour}`);
    };

    return (
        <main className={`${commonStyles.main_content}`}>
            <AdagioSideBar itemsNav={sideBarData} />
            <section
                style={{
                    flex: 1,
                }}
            >
                <h1 style={{ fontSize: "26px", marginLeft: "18px", marginTop: "10px" }}>
                    CADASTRE UMA TAREFA:
                </h1>
                <Container className={"mt-5 center"}>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Form onSubmit={onSubmit}>
                                <div
                                    className={`${styles.set_tarefas_form}`}
                                    style={{
                                        flexDirection: `${windowDimensions.width >= 768 ? "row" : "column"
                                            }`,
                                        width: `${windowDimensions.width >= 1300 ? "100%" : "100%"
                                            }`,
                                    }}
                                >
                                    <div
                                        style={{
                                            paddingRight: `${windowDimensions.width >= 480 ? "40px" : "0"
                                                }`,
                                            width: `${windowDimensions.width >= 580 ? "95%" : "100%"
                                                }`,
                                        }}
                                    >
                                        <Form.Group
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                            }}
                                        >
                                            Titulo da Tarefa:
                                            <InputGroup className={"mt-2"}>
                                                <Form.Control
                                                    type="text"
                                                    value={titulo}
                                                    onChange={(ev: any) => {
                                                        setTitle(ev.target.value);
                                                    }}
                                                    name="title"
                                                    placeholder="Defina um titulo para o projeto"
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                                marginTop: "20px",
                                            }}
                                        >
                                            Descrição da Tarefa:
                                            <InputGroup className={"mt-2"}>
                                                <Form.Control
                                                    as="textarea"
                                                    aria-label="With textarea"
                                                    type="text"
                                                    style={{ height: "150px", maxHeight: "218px" }}
                                                    value={description}
                                                    onChange={(ev: any) => {
                                                        setDescription(ev.target.value);
                                                    }}
                                                    name="descripiton"
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                                marginTop: "20px",
                                            }}
                                        >
                                            Prioridade da Tarefa:
                                            <select className={`mt-2 ${styles.member_tarefas_form}`} value={priority} onChange={(ev: any) => {
                                                setPriority(ev.target.value);
                                            }}>
                                                <option value="baixa">Baixa</option>
                                                <option value="média">Média</option>
                                                <option value="alta">Alta</option>
                                                <option value="critica">Crítica</option>
                                            </select>
                                        </Form.Group>

                                    </div>
                                    <div
                                        style={{
                                            width: `${windowDimensions.width >= 580 ? "95%" : "100%"
                                                }`,
                                        }}
                                    >
                                        <FormGroup
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                            }}
                                        >
                                            Hora inicial:
                                            <DatePicker
                                                className={`mt-2 ${styles.member_tarefas_form}`}
                                                selected={startHourAux}
                                                onChange={onChangeStartHour}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeFormat="HH:mm"
                                                timeIntervals={1}
                                                dateFormat="HH:mm"
                                            />
                                        </FormGroup>

                                        <FormGroup
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                                marginTop: "20px",
                                            }}
                                        >
                                            Hora final:
                                            <DatePicker
                                                className={`mt-2 ${styles.member_tarefas_form}`}
                                                selected={endHourAux}
                                                onChange={onChangeEndHour}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeFormat="HH:mm"
                                                timeIntervals={1}
                                                dateFormat="HH:mm"
                                            />
                                        </FormGroup>
                                        <Form.Group
                                            style={{
                                                width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                    }`,
                                                marginTop: "20px",
                                            }}
                                        >
                                            Projetos:
                                            <div
                                                className={"mt-2"}
                                                style={{
                                                    width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                        }`,
                                                }}
                                            >
                                                <button
                                                    style={{
                                                        color: "#FFFFFF",
                                                        borderRadius: "5px",
                                                        backgroundColor: "#463a8b",
                                                        borderColor: "#463a8b",
                                                    }}
                                                    type="button"
                                                >
                                                    Clique aqui
                                                </button>
                                            </div>
                                            <Form.Group
                                                style={{
                                                    width: `${windowDimensions.width > 580 ? "95%" : "100%"
                                                        }`,
                                                    marginTop: "20px",
                                                }}>
                                                   <input type = "radio" name = "escolha" value={"true"} onClick={onChangeFinishedOrNot}/> vou iniciar uma tarefa
                                                   <br></br>
                                                   <input type = "radio" name = "escolha"  value={"false"}  onClick={onChangeFinishedOrNot}/>  tarefa concluida
                                                   
                                            </Form.Group>
                                        </Form.Group>
                                        <div className={`${styles.buttons_area_register}`}>
                                            <Button
                                                style={{
                                                    backgroundColor: "#d3d3d3",
                                                    borderRadius: "5px",
                                                    border: "1px solid",
                                                    borderColor: "#d3d3d3",
                                                    width: "150px",
                                                }}
                                                type="button"
                                            >
                                                Cancelar
                                            </Button>

                                            <Button
                                                style={{
                                                    color: "#FFFFFF",
                                                    borderRadius: "5px",
                                                    backgroundColor: "#463a8b",
                                                    border: "1px solid",
                                                    width: "150px",
                                                }}
                                                type="submit"
                                            >
                                                Cadastrar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main >
    );

}
export default FormTarefas;