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
import { Project } from "../../types/ProjectType";
import { ProjectContext } from "../../contexts/project.context";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ChooseTasksModal from "./components/choose_tasks_modal.component";
import { Task } from "../../types/TaskType";

const FormProjetos = () => {
  const { user } = useContext(AuthContext);
  const {
    createProject,
    editProject,
    getProject,
    setTriggerToSearchProjectsAgainAfterRegister,
    triggerToSearchProjectsAgainAfterRegister,
    isToRestartFormAgain,
    setIsToRestartFormAgain,
  } = useContext(ProjectContext);
  const windowDimensions = useWindowDimensions();
  const { id } = useParams();
  const [tasksModalIsOpen, setTasksModalIsOpen] = useState(false);
  const [isToGoToProjects, setIsToGoToProjects] = useState(false);
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [auxSelectedTasks, setAuxSelectedTasks] = useState<number[]>([]);
  const [idsTasks, setIdsTasks] = useState<number[]>([]);
  const [startHour, setStartHour] = useState("");
  const [startHourAux, setStartHourAux] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState("");
  const [startDateAux, setStartDateAux] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [endDateAux, setEndDateAux] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState("");
  const [endHourAux, setEndHourAux] = useState(
    new Date(new Date().setHours(23, 59))
  );
  const [isToEdit, setIsToEdit] = useState(false);

  /* Incluir ids de tasks,no caso de edição de projeto, e também incluir as tasks de projetos marcadas no modal, como padrão */
  useEffect(() => {
    if (id !== undefined) {
      getProject(Number(id)).then((response: any) => {
        setTitle(response.title);
        setDescription(response.description);
        setStartDateAux(new Date(response.dateTimeStart));
        setStartHourAux(new Date(response.dateTimeStart));
        setEndDateAux(new Date(response.dateTimeEnd));
        setEndHourAux(new Date(response.dateTimeEnd));
        setIdsTasks([
          ...response.tasks.map((task: Task) => {
            return task.id;
          }),
        ]);
        setAuxSelectedTasks([
          ...response.tasks.map((task: Task) => {
            return task.id;
          }),
        ]);
        // console.log(response.tasks);

        setIsToEdit(true);
      });
    } else {
      setTitle("");
      setDescription("");
      setStartDateAux(new Date());
      setStartHourAux(new Date());
      setEndDateAux(new Date());
      setEndHourAux(new Date(new Date().setHours(23, 59)));
      setIsToEdit(false);
    }
  }, [isToRestartFormAgain, setIsToRestartFormAgain]);

  useEffect(() => {
    setStartDate(filterAndReturnDate(startDateAux));
    setStartHour(filterAndReturnHour(startHourAux));
    setEndDate(filterAndReturnDate(endDateAux));
    setEndHour(filterAndReturnHour(endHourAux));
  }, [startDateAux, startHourAux, endDateAux, endHourAux]);

  const setIdsTasksWithAcumulatedSelected = (selectedIdsTasks: number[]) => {
    setIdsTasks(selectedIdsTasks);
  };

  const isTaskSelected = (idTask: number) => {
    return auxSelectedTasks.includes(idTask);
  };

  const equalizeAuxSelectedTasksToIdsTasks = () => {
    setAuxSelectedTasks([...idsTasks]);
  };

  const onChangeStartHour = (date: Date) => {
    setStartHourAux(date);
    setStartHour(filterAndReturnHour(date));
    return true;
  };

  const onChangeStartDate = (date: Date) => {
    setStartDate(filterAndReturnDate(date));
    setStartDateAux(date);
    return true;
  };

  const onChangeEndDate = (date: Date) => {
    setEndDate(filterAndReturnDate(date));
    setEndDateAux(date);
    return true;
  };

  const onChangeEndHour = (date: Date) => {
    setEndHourAux(date);
    setEndHour(filterAndReturnHour(date));
    return true;
  };

  const filterAndReturnHour = (hour: Date) => {
    return `${String(hour.getHours()).padStart(2, "0")}:${String(
      hour.getMinutes()
    ).padStart(2, "0")}:${String(hour.getSeconds()).padStart(2, "0")}`;
  };

  const filterAndReturnDate = (date: Date) => {
    return `${String(date.getFullYear()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const goToProjects = () => {
    setIsToGoToProjects(true);
  };

  const returnTasksModal = () => {
    return (
      <ChooseTasksModal
        auxSelectedTasks={auxSelectedTasks}
        equalizeAuxSelectedTasksToIdsTasks={equalizeAuxSelectedTasksToIdsTasks}
        setAuxSelectedTasks={setAuxSelectedTasks}
        setIdsTasksWithAcumulatedSelected={setIdsTasksWithAcumulatedSelected}
        projectIdIfItIsToEdit={id}
        isTaskSelected={isTaskSelected}
        isModalOpen={tasksModalIsOpen}
        setModalIsOpen={setTasksModalIsOpen}
      />
    );
  };

  const onSubmit = async (ev: any) => {
    ev.preventDefault();

    const projectToRegisterOrEdit: Project = {
      title: titulo.trim(),
      description: description.trim(),
      dateTimeStart: `${startDate}T${startHour}`,
      dateTimeEnd: `${endDate}T${endHour}`,
      tasksIds: idsTasks,
    };

    try {
      if (isToEdit === false) {
        const responseToOperation = await createProject(
          projectToRegisterOrEdit
        );

        console.log(responseToOperation);
        if (responseToOperation.status === 201) {
          alert("Projeto criado com sucesso !");
        }
      } else if (id !== undefined) {
        const responseToOperation = await editProject(
          projectToRegisterOrEdit,
          Number(id)
        );
        console.log(responseToOperation);
      }
      setTriggerToSearchProjectsAgainAfterRegister(
        !triggerToSearchProjectsAgainAfterRegister
      );
      goToProjects();
    } catch (erro) {
      console.log(erro);
      alert("Houve um erro");
    }
  };
  return !isToGoToProjects ? (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <section style={{ flex: 1 }}>
        <h1 style={{ fontSize: "26px", marginLeft: "18px", marginTop: "10px" }}>
          {isToEdit ? "EDITE O PROJETO:" : "CADASTRE UM PROJETO:"}
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
                          title="Inclua tarefas"
                          style={{
                            color: "#FFFFFF",
                            borderRadius: "5px",
                            backgroundColor: "#463a8b",
                            borderColor: "#463a8b",
                          }}
                          type="button"
                          onClick={() => {
                            setTasksModalIsOpen(true);
                          }}
                        >
                          {`Clique aqui - ${idsTasks.length} tarefas estão vinculadas`}
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
                        {isToEdit ? "Editar" : "Cadastrar"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      {returnTasksModal()}
    </main>
  ) : (
    <Navigate to="/adagio/projetos" />
  );
};
export default FormProjetos;
