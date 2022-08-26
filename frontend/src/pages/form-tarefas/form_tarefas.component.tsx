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
import { ProjectContext } from "../../contexts/project.context";
import ConfirmationModal from "../../components/confirmation-modal/confirmation_modal.component";

const FormTarefas = () => {
  const windowDimensions = useWindowDimensions();
  const { setExportCalendarType } = useContext(RelatoryContext);
  const { createTask, getTask, editTask } = useContext(TaskContext);
  const { isToRestartFormAgain, setIsToRestartFormAgain } =
    useContext(ProjectContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, date } = useParams();
  const [auxSelectedProject, setAuxSelectedProject] = useState<number | null>(
    Number
  );
  const [idProject, setIdProject] = useState<number | null>(Number);
  const [titulo, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [arrayPriority, setArrayPriority] = useState([
    ["LOW", "Baixa"],
    ["REGULAR", "Media"],
    ["HIGH", "Alto"],
    ["CRITICAL", "Critico"],
  ]);
  const [DateT, setDateT] = useState("");
  const [DateTAux, setDateTAux] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [startHourAux, setAuxStartHour] = useState<Date>(new Date());
  const [idProjectToChoose, setIdPRojectToChoose] = useState<number | null>(
    null
  );
  const [isToEdit, setIsToEdit] = useState(false);
  const [nameOfProjectToShow, setNameOfProjectToShow] = useState<string | null>(
    ""
  );
  const [endHour, setEndHour] = useState("");
  const [endHourAux, setAuxEndHour] = useState(
    new Date(new Date().setHours(23, 59))
  );
  const [finishedOrNot, setFinishedOrNot] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [arrayNotifications, setArrayNotifications] = useState([
    ["POPUP", "Popup"],
    ["SOUND", "Sonoro"],
    ["EMAIL", "Email"],
  ]);

  const equalizeAuxSelectedProjectToIdsProject = () => {
    setAuxSelectedProject(idProject);
  };

  const [isToShowStartHourWarning, setIsToShowStartHourWarning] =
    useState(false);
  const [isToShowEndHourWarning, setIsToShowEndHourWarning] = useState(false);
  const [isToShowTitleWarning, setIsToShowTitleWarning] = useState(false);
  const [isToShowDescriptionWarning, setIsToShowDescriptionWarning] =
    useState(false);
  const [modalRegisterWasSaveOpen, setModalRegisterWasSaveOpen] =
    useState(false);
  const [modalRegisterWasEditedOpen, setModalRegisterWasEditedOpen] =
    useState(false);
  const [isWarningToVerifyOpen, setIsWarningToVerifiyOpen] = useState(false);

  const [menssagerErro, setMenssagerErro] = useState(
    "Alguns campos estão com valores incorretos. É preciso revisar os campos"
  );

  useEffect(() => {
    if (id !== undefined) {
      getTask(Number(id)).then((response: any) => {
        setTitle(response.title);
        setDescription(response.description);
        setDateTAux(new Date(response.dateTimeStart));
        setAuxStartHour(new Date(response.dateTimeStart));
        setAuxEndHour(new Date(response.dateTimeEnd));
        setPriority(response.priority);
        setFinishedOrNot(response.finishedStatus);
        setIdProject(response.idProject);
        setIsToEdit(true);
        setNameOfProjectToShow(response.nameProject);

        setNotifications(response.notifications);
      });
    } else {
      onClearState(false, true);
    }
  }, [isToRestartFormAgain, setIsToRestartFormAgain, id]);

  useEffect(() => {
    setDateT(filterAndReturnDate(DateTAux));
    setStartHour(filterAndReturnHour(startHourAux));
    setEndHour(filterAndReturnHour(endHourAux));
  }, [DateTAux, startHourAux, endHourAux]);

  useEffect(() => {
    setExportCalendarType(null);
  }, []);

  const onClearState = (isToEdit: boolean, isToResetAllStates?: boolean) => {
    setTitle("");
    setDescription("");

    const dateToValid = new Date(`${date}T00:00:00`);

    if (dateToValid.getDate()) {
      setDateTAux(new Date(`${date}T00:00:00`));
    } else {
      setDateTAux(new Date());
    }

    setAuxStartHour(new Date());
    setAuxEndHour(new Date(new Date().setHours(23, 59)));
    setFinishedOrNot(false);

    if (isToResetAllStates) {
      setIsToEdit(false);
      setIdProject(null);
      setNameOfProjectToShow("");
    }

    setPriority("LOW");
    setNotifications([]);
  };

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

  const onChangeDateT = (date: Date) => {
    setDateT(filterAndReturnDate(date));
    setDateTAux(date);
    return true;
  };

  const onChangeStartHour = (date: Date) => {
    if (
      (date.getHours() === endHourAux.getHours() &&
        date.getMinutes() <= endHourAux.getMinutes()) ||
      date.getHours() < endHourAux.getHours()
    ) {
      setIsToShowStartHourWarning(false);
      setIsToShowEndHourWarning(false);
    } else {
      setIsToShowStartHourWarning(true);
      setIsToShowEndHourWarning(true);
    }

    setAuxStartHour(date);
    setStartHour(filterAndReturnHour(date));
  };

  const onChangeEndHour = (date: Date) => {
    if (
      (date.getHours() === startHourAux.getHours() &&
        date.getMinutes() >= startHourAux.getMinutes()) ||
      date.getHours() > startHourAux.getHours()
    ) {
      setIsToShowEndHourWarning(false);
      setIsToShowStartHourWarning(false);
    } else {
      setIsToShowEndHourWarning(true);
      setIsToShowStartHourWarning(true);
    }
    setAuxEndHour(date);
    setEndHour(filterAndReturnHour(date));
  };

  const onChangeFinishedOrNot = (ev: any) => {
    if (ev.target.value === "true") {
      setFinishedOrNot(false);
    } else if (ev.target.value === "false") {
      setFinishedOrNot(true);
    }
  };

  const returnModalWarning = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="primary"
        explanationMessage={menssagerErro}
        setModalIsOpen={setIsWarningToVerifiyOpen}
        isModalOpen={isWarningToVerifyOpen}
        isBasicConfirmation={true}
        titleConfirmationMessage="Não é possível submeter o formulário."
      />
    );
  };

  const returnModalRegisterWasSave = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="primary"
        titleConfirmationMessage="A tarefa foi salva"
        setModalIsOpen={setModalRegisterWasSaveOpen}
        isModalOpen={modalRegisterWasSaveOpen}
        isBasicConfirmation={true}
        explanationMessage="Você pode gerenciá-la na área de tarefas."
      />
    );
  };

  const returnModalRegisterWasEdited = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="primary"
        explanationMessage="Você pode gerenciá-la na área de tarefas."
        setModalIsOpen={setModalRegisterWasEditedOpen}
        isModalOpen={modalRegisterWasEditedOpen}
        isBasicConfirmation={true}
        titleConfirmationMessage="A tarefa foi editada"
      />
    );
  };

  const verifyNotification = (category: string) => {
    return notifications.find(
      (notification) => notification.category === category
    );
  };
  const onChangeDescription = (e: any) => {
    if (e.target.value.trim() === "") {
      setIsToShowDescriptionWarning(true);
    } else {
      setIsToShowDescriptionWarning(false);
    }
    setDescription(e.target.value);
  };

  const onChangeTitle = (e: any) => {
    if (e.target.value.trim() === "") {
      setIsToShowTitleWarning(true);
    } else {
      setIsToShowTitleWarning(false);
    }
    setTitle(e.target.value);
  };

  const onChangeListNotification = (ev: any) => {
    if (
      ev.target.checked === true &&
      !notifications.find((obj: any) => obj.category === ev.target.value)
    ) {
      setNotifications([...notifications, { category: ev.target.value }]);
    } else {
      setNotifications([
        ...notifications.filter(
          (item: any) => item.category !== ev.target.value
        ),
      ]);
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
      projectId: idProject,
      finishedStatus: finishedOrNot,
      notifications: [
        ...notifications.map((notification) => {
          return {
            category: notification.category,
            dateTime: `${returnCurrentDate()}T${startHour}`,
          };
        }),
      ],
    };

    if (
      !isToShowEndHourWarning &&
      !isToShowStartHourWarning &&
      !isToShowDescriptionWarning &&
      !isToShowTitleWarning
    ) {
      try {
        if (isToEdit === false) {
          const responseToOperation = await createTask(taskToRegisterOrEdit);

          if (responseToOperation?.status === 201) {
            setModalRegisterWasSaveOpen(true);
          } else {
            if (
              responseToOperation?.response?.data?.excetpionMessage !==
              undefined
            ) {
              setMenssagerErro(
                responseToOperation?.response?.data?.excetpionMessage
              );
              setIsWarningToVerifiyOpen(true);
            } else {
              for (
                let i = 0;
                i < responseToOperation?.response?.data?.length;
                i++
              ) {
                const error = responseToOperation?.response?.data[i];
                console.log(error);
                if (error.campo === "title") {
                  setIsToShowTitleWarning(true);
                }
              }
            }
          }
        } else if (id !== undefined) {
          const responseToOperation = await editTask(
            taskToRegisterOrEdit,
            Number(id)
          );

          if (responseToOperation?.status === 200) {
            setModalRegisterWasEditedOpen(true);
          } else {
            if (
              responseToOperation?.response?.data?.excetpionMessage !==
              undefined
            ) {
              setMenssagerErro(
                responseToOperation?.response?.data?.excetpionMessage
              );
              setIsWarningToVerifiyOpen(true);
            } else {
              for (
                let i = 0;
                i < responseToOperation?.response?.data?.length;
                i++
              ) {
                const error = responseToOperation?.response?.data[i];

                if (error.campo === "title") {
                  setIsToShowTitleWarning(true);
                }
              }
            }
          }
        }
      } catch (erro) {
        setIsWarningToVerifiyOpen(true);
      }
    } else {
      setMenssagerErro(
        "Alguns campos estão com valores incorretos. É preciso revisar os campos"
      );
      setIsWarningToVerifiyOpen(true);
    }
  };

  const returnWarningStyles = () => {
    return {
      color: "red",
      fontSize: "14px",
      marginTop: "4px",
    };
  };

  const returnCurrentDate = () => {
    return `${String(DateTAux.getFullYear()).padStart(2, "0")}-${String(
      DateTAux.getMonth() + 1
    ).padStart(2, "0")}-${String(DateTAux.getDate()).padStart(2, "0")}`;
  };

  const returnProjectModal = () => {
    return (
      <ChooseProjectModal
        equalizeAuxSelectedProjectToIdsProject={
          equalizeAuxSelectedProjectToIdsProject
        }
        projectIdIfItIsToEdit={idProject}
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setIdPRojectToChoose={setIdProject}
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
          {isToEdit ? "EDITAR TAREFA:" : "CADASTRE UMA TAREFA:"}
        </h1>
        <Container className={"mt-5 center"}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Form onSubmit={onSubmit}>
                <div
                  className={`${styles.set_tarefas_form}`}
                  style={{
                    marginBottom: "50px",
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
                          onChange={onChangeTitle}
                          name="title"
                          placeholder="Defina um titulo para o Tarefa"
                        />
                      </InputGroup>
                      {isToShowTitleWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={"Campo título não pode estar vazio."}
                        >
                          Campo título não pode estar vazio.
                        </span>
                      ) : null}
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
                          onChange={onChangeDescription}
                          name="descripiton"
                        />
                      </InputGroup>
                      {isToShowDescriptionWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={"Campo descrição não pode estar vazio."}
                        >
                          Campo descrição não pode estar vazio.
                        </span>
                      ) : null}
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
                          console.log(ev.target.value);
                          setPriority(ev.target.value);
                        }}
                      >
                        {arrayPriority.map((priority: any[]) => {
                          return (
                            <option
                              key={priority[0]}
                              defaultChecked={priority[0] === priority}
                              value={priority[0]}
                            >
                              {priority[1]}
                            </option>
                          );
                        })}
                      </select>
                    </Form.Group>
                    <p></p>
                    Escolha o tipo de notificação:
                    <div
                      style={{
                        display: "flex",
                        width: `${
                          windowDimensions.width > 580 ? "95%" : "100%"
                        }`,
                        marginTop: "20px",
                      }}
                    >
                      {arrayNotifications.map((notifications: any[]) => {
                        return (
                          <FormGroup
                            key={notifications[0]}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "0",
                            }}
                            className="mb-1"
                          >
                            <Form.Control
                              id={notifications[0]}
                              type="checkbox"
                              checked={
                                notifications.length > 0
                                  ? verifyNotification(notifications[0])
                                  : false
                              }
                              value={notifications[0]}
                              style={{
                                width: "22px",
                                height: "18px",
                                marginLeft: "18px",
                              }}
                              onChange={onChangeListNotification}
                            />
                            <Form.Label
                              htmlFor={notifications[0]}
                              style={{
                                display: "flex",
                                marginTop: "8px",
                                marginLeft: "8px",
                                alignItems: "center",
                              }}
                            >
                              {notifications[1]}
                            </Form.Label>
                          </FormGroup>
                        );
                      })}
                    </div>
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
                      {isToShowStartHourWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={
                            " Hora inicial não pode ser maior que a final. Verifique os valores antes de submeter o formulário."
                          }
                        >
                          Hora inicial não pode ser maior que a final. Verifique
                          os valores antes de submeter o formulário.
                        </span>
                      ) : null}
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
                      {isToShowEndHourWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={
                            "   Hora final não pode ser menor que a inicial. Verifique os campos antes de submter o formulário."
                          }
                        >
                          Hora final não pode ser menor que a inicial. Verifique
                          os campos antes de submter o formulário.
                        </span>
                      ) : null}
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
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                        >
                          {`Clique aqui - ${
                            idProject === null
                              ? "Nenhum projeto escolhido "
                              : `Projeto: ${nameOfProjectToShow} foi escolhido`
                          }`}
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
                      {!isToEdit ? (
                        <Button
                          onClick={() => {
                            onClearState(isToEdit ? true : false, false);
                          }}
                          style={{
                            backgroundColor: "#f02",
                            borderRadius: "5px",
                            border: "1px solid",
                            marginRight: "15px",
                            borderColor: "#d3d3d3",
                            width: "150px",
                          }}
                          type="button"
                        >
                          Limpar campos
                        </Button>
                      ) : null}

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
                        {isToEdit ? "Salvar" : "Cadastrar"}
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
      {returnModalWarning()}
      {returnModalRegisterWasSave()}
      {returnModalRegisterWasEdited()}
    </main>
  );
};

export default FormTarefas;
