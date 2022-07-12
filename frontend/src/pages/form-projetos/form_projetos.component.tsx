import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";
import styles from "./form_projetos.module.scss";
import DatePicker from "react-datepicker";
import { isDataView } from "util/types";



const FormProjetos = () => {
  const windowDimensions = useWindowDimensions();
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startHourAux, setAuxStartHour] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState("");
  const [startDateAux, setAuxStartDate] = useState(new Date());
  const [endDate, setEndtDate] = useState("");
  const [endDateAux, setAuxEndDate] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState("");
  const [endHourAux, setAuxEndHour] = useState(new Date(new Date().setHours(23,59)));
  useEffect(()=>{
    setStartHour(`${startHourAux.getHours()}:${startHourAux.getMinutes()}:${startHourAux.getSeconds()}`) 
    setStartDate(`${startDateAux.getFullYear()}-${startDateAux.getMonth()+1}-${startDateAux.getDate()}`) 
    setEndtDate(`${endDateAux.getFullYear()}-${endDateAux.getMonth()+1}-${endDateAux.getDate()}`) 
    setEndHour(`${endHourAux.getHours()}:${endHourAux.getMinutes()}:${endHourAux.getSeconds()}`)
  },[titulo, description, startHour, startDate, endDate, endHour])
  const changeYear = (newDate: Date) => {
    const newCurrentYear = Math.abs(newDate.getFullYear());
    console.log(newCurrentYear);
  };

  const onChangeStartHour = (date : Date) => {
    setAuxStartHour(date)
    setStartHour(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`) 
    return true
  }

  const onChangeStartDate = (date : Date) => {
    setStartDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`) 
    setAuxStartDate(date)
    return true
  }

  const onChangeEndDate = (date : Date) => {
    setEndtDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`) 
    setAuxEndDate(date)
    return true
  }

  const onChangeEndHour = (date : Date) => {
    setAuxEndHour(date)
    setEndHour(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`) 
    return true
  }

  const onSubmit = async (ev: any) => {
    ev.preventDefault();
    console.log(titulo);
    console.log(description);
    console.log(`${startDate}T${startHour}`);
    console.log(`${endDate}T${endHour}`);
  };
  return <main className={`${commonStyles.main_content}`}>
    <AdagioSideBar itemsNav={sideBarData} />
    <section
      style={{
        flex: 1,
      }}
    >
      <h1>CADASTRE UM PROJETO:</h1>
      <Container className={"mt-5 center"}>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Form onSubmit={onSubmit}>
              <div
                className={`${styles.set_projetos_form}`}
                style={{
                  flexDirection: `${windowDimensions.width >= 768 ? "row" : "column"
                    }`,
                  width: `${windowDimensions.width >= 1300 ? "100%" : "100%"}`,
                }}
              >
                <div
                  style={{
                    paddingRight:`${windowDimensions.width >= 480 ? "40px" : "0" }`,
                  width: `${windowDimensions.width >= 580 ? "95%" : "100%"}`,
                  }}
                >
                  <Form.Group
                    style={{
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                    }}
                  >
                    Titulo do Projeto:
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
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                      marginTop: "20px",
                    }}
                  >
                    Descrição do Projeto:
                    <InputGroup className={"mt-2"}>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        type="text"
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
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                      marginTop: "20px",
                    }}
                  >
                    Incluir tarefa:
                    <div
                      className={"mt-2"}
                      style={{
                        width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,

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
                  </Form.Group>
                </div>
                <div
                    style={{
                      
                    width: `${windowDimensions.width >= 580 ? "95%" : "100%"}`,
                    }}
                >
                  <FormGroup
                    style={{
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                    }}
                  >
                    Hora inicial:
                    <DatePicker 
                      className={`mt-2 ${styles.member_projeto_form}`}
                      selected={startHourAux}
                      onChange={onChangeStartHour}
                      locale="pt-BR"
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      dateFormat="HH:mm"
                    />
                  </FormGroup>

                  <FormGroup
                    style={{
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                      marginTop: "20px"
                    }}
                  >
                    Data Inicial:
                    <DatePicker 
                      className={`mt-2 ${styles.member_projeto_form}`}
                      selected={startDateAux}
                      onChange={onChangeStartDate} 
                      dateFormat="dd/MM/yyyy"
                    />
                  </FormGroup>

                  <FormGroup
                    style={{
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                      marginTop: "20px"
                    }}
                  >
                    Data final:
                    <DatePicker 
                      className={`mt-2 ${styles.member_projeto_form}`}
                      selected={endDateAux}
                      onChange={onChangeEndDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </FormGroup>

                  <FormGroup
                    style={{
                      width: `${windowDimensions.width > 580 ? "95%" : "100%"}`,
                      marginTop: "20px"
                    }}
                  >
                    Hora final:
                    <DatePicker 
                      className={`mt-2 ${styles.member_projeto_form}`}
                      selected={endHourAux}
                      onChange={onChangeEndHour}
                      showTimeSelect
                      showTimeSelectOnly
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      dateFormat="HH:mm"
                    />
                  </FormGroup>

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
  </main>;
}
export default FormProjetos;