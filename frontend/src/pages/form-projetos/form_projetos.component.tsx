import { useContext, useEffect, useState } from "react";
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
import styles from "./form_projetos.module.scss";
import DatePicker from "react-datepicker";
import { isDataView } from "util/types";
import { AuthContext } from "../../contexts/auth.context";
import { Project } from "../../types/Project";
import { ProjectContext } from "../../contexts/project.context";
import { Navigate } from "react-router-dom";

const FormProjetos = () => {
  const { user } = useContext(AuthContext);
  const { createProject } = useContext(ProjectContext);
  const windowDimensions = useWindowDimensions();
  const [isToGoToProjects, setIsToGoToProjects] = useState(false);
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startHourAux, setAuxStartHour] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState("");
  const [startDateAux, setAuxStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [endDateAux, setAuxEndDate] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState("");
  const [endHourAux, setAuxEndHour] = useState(
    new Date(new Date().setHours(23, 59))
  );

  useEffect(() => {
    setStartHour(
      `${String(startHourAux.getHours()).padStart(2, "0")}:${String(
        startHourAux.getMinutes()
      ).padStart(2, "0")}:${String(startHourAux.getSeconds()).padStart(2, "0")}`
    );
    setStartDate(
      `${String(startDateAux.getFullYear()).padStart(2, "0")}-${String(
        startDateAux.getMonth() + 1
      ).padStart(2, "0")}-${String(startDateAux.getDate()).padStart(2, "0")}`
    );
    setEndDate(
      `${String(endDateAux.getFullYear()).padStart(2, "0")}-${String(
        endDateAux.getMonth() + 1
      ).padStart(2, "0")}-${String(endDateAux.getDate()).padStart(2, "0")}`
    );
    setEndHour(
      `${String(endHourAux.getHours()).padStart(2, ")")}:${String(
        endHourAux.getMinutes()
      ).padStart(2, "0")}:${String(endHourAux.getSeconds()).padStart(2, "0")}`
    );
  }, []);

  const onChangeStartHour = (date: Date) => {
    setAuxStartHour(date);
    setStartHour(
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
    );
    return true;
  };

  const onChangeStartDate = (date: Date) => {
    setStartDate(
      `${String(date.getFullYear()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    );
    setAuxStartDate(date);
    return true;
  };

  const onChangeEndDate = (date: Date) => {
    setEndDate(
      `${String(date.getFullYear()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    );
    setAuxEndDate(date);
    return true;
  };

  const onChangeEndHour = (date: Date) => {
    setAuxEndHour(date);
    setEndHour(
      `${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
      ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
    );
    return true;
  };

  const goToProjects = () => {
    setIsToGoToProjects(true);
  };
  const onSubmit = async (ev: any) => {
    ev.preventDefault();

    const projectToRegister: Project = {
      title: titulo.trim(),
      description: description.trim(),
      dateTimeStart: `${startDate}T${startHour}`,
      dateTimeEnd: `${endDate}T${endHour}`,
      idUser: user?.id,
      tasksIds: [],
    };

    try {
      const responseToCreate = await createProject(projectToRegister);
      console.log(responseToCreate);
      if (responseToCreate.status === 201) {
        alert("Projeto criado com sucesso !");
        goToProjects();
      }
    } catch (erro) {
      alert("Houve um erro");
    }

    console.log(user?.id);
    console.log(titulo);
    console.log(description);
    console.log(`${startDate}T${startHour}`);
    console.log(`${endDate}T${endHour}`);
  };
  return !isToGoToProjects ? (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <section style={{ flex: 1 }}>
        <h1 style={{ fontSize: "26px", marginLeft: "18px", marginTop: "10px" }}>
          CADASTRE UM PROJETO:
        </h1>
        <Container className={"mt-5 center"}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Form onSubmit={onSubmit}>
                <div
                  className={`${styles.set_projetos_form}`}
                  style={{
                    flexDirection: `${
                      windowDimensions.width >= 768 ? "row" : "column"
                    }`,
                    width: `${
                      windowDimensions.width >= 1300 ? "100%" : "100%"
                    }`,
                  }}
                >
                  <div
                    style={{
                      paddingRight: `${
                        windowDimensions.width >= 480 ? "40px" : "0"
                      }`,
                      width: `${
                        windowDimensions.width >= 580 ? "95%" : "100%"
                      }`,
                    }}
                  >
                    <Form.Group
                      style={{
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      Descrição do Projeto:
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      Incluir tarefas:
                      <div
                        className={"mt-2"}
                        style={{
                          width: `${
                            windowDimensions.width > 580 ? "95%" : "100%"
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
                    </Form.Group>
                  </div>
                  <div
                    style={{
                      width: `${
                        windowDimensions.width >= 580 ? "95%" : "100%"
                      }`,
                    }}
                  >
                    <FormGroup
                      style={{
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                      }}
                    >
                      Hora inicial:
                      <DatePicker
                        className={`mt-2 ${styles.member_projeto_form}`}
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
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
    </main>
  ) : (
    <Navigate to="/adagio/projetos" />
  );
};
export default FormProjetos;
