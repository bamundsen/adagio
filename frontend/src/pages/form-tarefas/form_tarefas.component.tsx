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
import styles from "./form_tarefas.module.scss";
import DatePicker from "react-datepicker";
import { Task } from "../../types/TaskType";
import { TaskContext } from "../../contexts/task.context";
import { findAllInRenderedTree } from "react-dom/test-utils";
import { RelatoryContext } from "../../contexts/relatory.context";
import ChooseProjectModal from "./chooseProjectModal/chooseProjectModal.component";
import { useParams } from "react-router-dom";

const FormTarefas = () => {
  const windowDimensions = useWindowDimensions();
  const { setExportCalendarType } = useContext(RelatoryContext);
  const { createTask } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [auxSelectedProject, setAuxSelectedProject] = useState<number[]>([]);
  const [idsProject, setIdsProject] = useState<number[]>([]);
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [DateT, setDateT] = useState("");
  const [DateTAux, setDateTAux] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [startHourAux, setAuxStartHour] = useState<Date>(new Date());
  const [idProjectToChoose, setIdPRojectToChoose] = useState<number|null>(null);
  const [nameOfProjectToShow, setNameOfProjectToShow] = useState<string|null>("");
  const [endHour, setEndHour] = useState("");
  const [endHourAux, setAuxEndHour] = useState(
    new Date(new Date().setHours(23, 59))
  );
  const [finishedOrNot, setFinishedOrNot] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<number[]>([]);

  const setIdsProjectWithAcumulatedSelected = (selectedIdsProject: number[]) => {
    setIdsProject(selectedIdsProject);
  };

  const isProjectSelected = (idProject: number) => {
    return auxSelectedProject.includes(idProject);
  };

  const equalizeAuxSelectedProjectToIdsProject = () => {
    setAuxSelectedProject([...idsProject]);
  };

  useEffect(()=>{
    console.log(idProjectToChoose);
    console.log("mudei");
  },[idProjectToChoose]);

  const filterAndReturnDate = (date: Date) => {
    return `${String(date.getFullYear()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const filterAndReturnHour = (hour: Date) => {
    return `${String(hour.getHours()).padStart(2, "0")}:${String(
      hour.getMinutes()
    ).padStart(2, "0")}:${String(hour.getSeconds()).padStart(2, "0")}`;
  };

  useEffect(() => {
    setDateT(filterAndReturnDate(DateTAux));
    setStartHour(filterAndReturnHour(startHourAux));
    setEndHour(filterAndReturnHour(endHourAux));
  }, [DateTAux, startHourAux, endHourAux]);

  useEffect(() => {
    setExportCalendarType(null);
  }, []);

  const onChangeDateT = (date: Date) => {
    setDateT(filterAndReturnDate(date));
    setDateTAux(date);
    return true;
  };

  const onChangeStartHour = (date: Date) => {
    if(date.getHours() <= endHourAux.getHours() && date.getMinutes() <= endHourAux.getMinutes()){
      setAuxStartHour(date);
      setStartHour(filterAndReturnHour(date));
      return true;
    }else{
      alert("Hora inicial não pode ser maior que a final");
      return false;
    }
  };

  const onChangeEndHour = (date: Date) => {
    if(date.getHours() >= startHourAux.getHours() && date.getMinutes() >= startHourAux.getMinutes()){
      setAuxEndHour(date);
      setEndHour(filterAndReturnHour(date));
      return true;
    }else{
      alert("Hora final não pode ser menor que a inicial");
      return false;
    }
  };


  const onChangeFinishedOrNot = (ev: any) => {
    if (ev.target.value === "true") {
      setFinishedOrNot(false);
    } else if (ev.target.value === "false") {
      setFinishedOrNot(true);
    }
  };

  const onSubmit = async (ev: any) => {
    ev.preventDefault();

    const taskToRegisterOrEdit: Task = {
      title: titulo.trim(),
      description: description.trim(),
      dateTimeStart: `${returnCurrentDate()}T${startHour}`,
      dateTimeEnd: `${returnCurrentDate()}T${endHour}`,
      priority: priority,
      finishedStatus: finishedOrNot,
      notifications: [],
    };

    try {
      const responseToOperation = await createTask(taskToRegisterOrEdit);
            console.log(responseToOperation);
      if (responseToOperation.status === 201) {
        alert("Tarefa criada com sucesso !");
      }
    } catch (err) {
      console.log(err);
    }
  };


  const returnCurrentDate = () => {
    return `${String(DateTAux.getFullYear()).padStart(2, "0")}-${String(
      DateTAux.getMonth() + 1
    ).padStart(2, "0")}-${String(DateTAux.getDate()).padStart(2, "0")}`;
  };

  const returnProjectModal = () => {
    return (
      <ChooseProjectModal
        auxSelectedProject={auxSelectedProject}
        equalizeAuxSelectedProjectToIdsProject={ equalizeAuxSelectedProjectToIdsProject}
        setAuxSelectedProject={ setAuxSelectedProject}
        setIdsProjectWithAcumulatedSelected={ setIdsProjectWithAcumulatedSelected}
        projectIdIfItIsToEdit={id}
        isProjectSelected={isProjectSelected}
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIdPRojectToChoose={setIdPRojectToChoose}
        setNameOfProjectToShow={setNameOfProjectToShow}
      />
    );
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
                      Titulo da Tarefa:
                      <InputGroup className={"mt-2"}>
                        <Form.Control
                          type="text"
                          value={titulo}
                          onChange={(ev: any) => {
                            setTitle(ev.target.value);
                          }}
                          name="title"
                          placeholder="Defina um titulo para o Tarefa"
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      Prioridade da Tarefa:
                      <select
                        className={`mt-2 ${styles.member_tarefas_form}`}
                        value={priority}
                        onChange={(ev: any) => {
                          setPriority(ev.target.value);
                        }}
                      >
                        <option value="LOW">Baixa</option>
                        <option value="REGULAR">Média</option>
                        <option value="HIGH">Alta</option>
                        <option value="CRITICAL">Crítica</option>
                      </select>
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
                      Data:
                      <DatePicker
                        className={`mt-2 ${styles.member_tarefas_form}`}
                        selected={DateTAux}
                        onChange={onChangeDateT}
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
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
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      Projetos:
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
                          onClick={()=>{setIsModalOpen(true)}}
                        >
                          {`Clique aqui - ${idProjectToChoose === null ? "Nenhum projeto escolhido ":
                           `Projeto: ${nameOfProjectToShow} foi escolhido`}`}
                        </button>


                      </div>
                      <Form.Group
                        style={{
                          width: `${
                            windowDimensions.width > 580 ? "95%" : "100%"
                          }`,
                          marginTop: "20px",
                        }}
                      >
                        <input
                          type="radio"
                          name="escolha"
                          value={"true"}
                          checked={!finishedOrNot}
                          onChange={onChangeFinishedOrNot}
                        />{" "}
                        vou iniciar uma tarefa
                        <br></br>
                        <input
                          type="radio"
                          name="escolha"
                          value={"false"}
                          checked={finishedOrNot}
                          onChange={onChangeFinishedOrNot}
                        />{" "}
                        tarefa concluida
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
      {returnProjectModal()}
    </main>
  );
}

export default FormTarefas;
