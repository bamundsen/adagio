import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  ProgressBar,
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
import { RelatoryContext } from "../../contexts/relatory.context";
import ConfirmationModal from "../../components/confirmation-modal/confirmation_modal.component";

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
  const { setExportCalendarType } = useContext(RelatoryContext);
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
  const [progressIndicator, setProgressIndicator] = useState<number | null>(
    null
  );

  const [isToShowStartHourWarning, setIsToShowStartHourWarning] =
    useState(false);
  const [isToShowEndHourWarning, setIsToShowEndHourWarning] = useState(false);
  const [isToShowStartDateWarning, setIsToShowStartDateWarning] =
    useState(false);
  const [isToShowEndDateWarning, setIsToShowEndDateWarning] = useState(false);
  const [isToShowTitleWarning, setIsToShowTitleWarning] = useState(false);
  const [isToShowDescriptionWarning, setIsToShowDescriptionWarning] =
    useState(false);
  const [modalRegisterWasSaveOpen, setModalRegisterWasSaveOpen] =
    useState(false);
  const [modalRegisterWasEditedOpen, setModalRegisterWasEditedOpen] =
    useState(false);
  const [isWarningToVerifyOpen, setIsWarningToVerifiyOpen] = useState(false);

  const [errorMessageWarningModal, setErrorMessageWarningModal] = useState(
    "Alguns campos estão com valores incorretos. É preciso revisar os campos."
  );

  useEffect(() => {
    if (id !== undefined) {
      getProject(Number(id)).then((response: any) => {
        setProgressIndicator(response.progress);
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

        setIsToEdit(true);
      });
    } else {
      resetOrCleanFields();
    }
  }, [isToRestartFormAgain, setIsToRestartFormAgain]);

  useEffect(() => {
    setStartDate(filterAndReturnDate(startDateAux));
    setStartHour(filterAndReturnHour(startHourAux));
    setEndDate(filterAndReturnDate(endDateAux));
    setEndHour(filterAndReturnHour(endHourAux));
  }, [startDateAux, startHourAux, endDateAux, endHourAux]);

  useEffect(() => {
    setExportCalendarType(null);
  }, []);

  const resetOrCleanFields = () => {
    setTitle("");
    setDescription("");
    setStartDateAux(new Date());
    setStartHourAux(new Date());
    setEndDateAux(new Date());
    setEndHourAux(new Date(new Date().setHours(23, 59)));
    setIsToEdit(false);
    setProgressIndicator(null);
    setAuxSelectedTasks([]);
    setIdsTasks([]);
  };
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

    setStartHourAux(date);
    setStartHour(filterAndReturnHour(date));
  };

  const onChangeStartDate = (date: Date) => {
    console.log(date, endDateAux);
    if (
      (date.getDate() <= endDateAux.getDate() &&
        date.getMonth() <= endDateAux.getMonth() &&
        date.getFullYear() <= endDateAux.getFullYear()) ||
      (date.getDate() >= endDateAux.getDate() &&
        date.getMonth() < endDateAux.getMonth() &&
        date.getFullYear() <= endDateAux.getFullYear()) ||
      date.getFullYear() < endDateAux.getFullYear()
    ) {
      setIsToShowStartDateWarning(false);
      setIsToShowEndDateWarning(false);
    } else {
      setIsToShowStartDateWarning(true);
      setIsToShowEndDateWarning(true);
    }
    setStartDate(filterAndReturnDate(date));
    setStartDateAux(date);
  };

  const onChangeEndDate = (date: Date) => {
    if (
      (date.getDate() >= startDateAux.getDate() &&
        date.getMonth() >= startDateAux.getMonth() &&
        date.getFullYear() >= startDateAux.getFullYear()) ||
      (date.getDate() <= startDateAux.getDate() &&
        date.getMonth() > startDateAux.getMonth() &&
        date.getFullYear() >= startDateAux.getFullYear()) ||
      date.getFullYear() > startDateAux.getFullYear()
    ) {
      setIsToShowEndDateWarning(false);
      setIsToShowStartDateWarning(false);
    } else {
      setIsToShowEndDateWarning(true);
      setIsToShowStartDateWarning(true);
    }
    setEndDate(filterAndReturnDate(date));
    setEndDateAux(date);
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
    setEndHourAux(date);
    setEndHour(filterAndReturnHour(date));
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

  const goToProjects = (): any => {
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

  const returnModalWarning = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="primary"
        explanationMessage={errorMessageWarningModal}
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
        titleConfirmationMessage="O projeto foi salvo"
        setModalIsOpen={setModalRegisterWasSaveOpen}
        isModalOpen={modalRegisterWasSaveOpen}
        isBasicConfirmation={true}
        explanationMessage="Você pode gerenciá-lo na área de projetos."
      />
    );
  };

  const returnModalRegisterWasEdited = () => {
    return (
      <ConfirmationModal
        colorFlagNegativeButton="primary"
        explanationMessage="Você pode gerenciá-lo na área de projetos."
        setModalIsOpen={setModalRegisterWasEditedOpen}
        isModalOpen={modalRegisterWasEditedOpen}
        isBasicConfirmation={true}
        titleConfirmationMessage="O projeto foi editado"
      />
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
  const onSubmit = async (ev: any) => {
    ev.preventDefault();

    const projectToRegisterOrEdit: Project = {
      title: titulo.trim(),
      description: description.trim(),
      dateTimeStart: `${startDate}T${startHour}`,
      dateTimeEnd: `${endDate}T${endHour}`,
      tasksIds: idsTasks,
    };

    if (
      !isToShowEndHourWarning &&
      !isToShowStartHourWarning &&
      !isToShowEndDateWarning &&
      !isToShowStartDateWarning &&
      !isToShowDescriptionWarning &&
      !isToShowTitleWarning
    ) {
      console.log(!isToShowEndHourWarning, !isToShowStartHourWarning);
      try {
        if (isToEdit === false) {
          const responseToOperation = await createProject(
            projectToRegisterOrEdit
          );
          console.log(responseToOperation);
          if (
            responseToOperation?.response?.data &&
            responseToOperation.response.data.thereIsError.trim() !== "" &&
            responseToOperation &&
            responseToOperation.status !== 201
          ) {
            setErrorMessageWarningModal(
              responseToOperation.response.data.thereIsError
            );
            setIsWarningToVerifiyOpen(true);
          } else if (
            responseToOperation &&
            responseToOperation.status === 201
          ) {
            setModalRegisterWasSaveOpen(true);
            setIsToRestartFormAgain(!isToRestartFormAgain);
          }
        } else if (id !== undefined) {
          const responseToOperation = await editProject(
            projectToRegisterOrEdit,
            Number(id)
          );
          if (
            responseToOperation?.response?.data &&
            responseToOperation.response.data.thereIsError.trim() !== "" &&
            responseToOperation &&
            responseToOperation.status !== 201
          ) {
            setErrorMessageWarningModal(
              responseToOperation.response.data.thereIsError
            );
            setIsWarningToVerifiyOpen(true);
          } else if (responseToOperation.status === 200) {
            setModalRegisterWasEditedOpen(true);
            setIsToRestartFormAgain(!isToRestartFormAgain);
          }
          console.log(responseToOperation);
        }
        setTriggerToSearchProjectsAgainAfterRegister(
          !triggerToSearchProjectsAgainAfterRegister
        );
      } catch (error: any) {
        setIsWarningToVerifiyOpen(true);
      }
    } else {
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
  return !isToGoToProjects ? (
    <main className={`${commonStyles.main_content}`}>
      <AdagioSideBar itemsNav={sideBarData} />
      <section style={{ flex: 1 }}>
        {progressIndicator !== null ? (
          <div
            style={{ width: "95%", textAlign: "center", paddingTop: "15px" }}
          >
            <ProgressBar
              now={progressIndicator}
              label={`${progressIndicator}% do projeto foi concluído`}
            />
          </div>
        ) : null}
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
                          onChange={onChangeTitle}
                          name="title"
                          placeholder="Defina um titulo para o projeto"
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
                      Descrição do Projeto:
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
                      Data Inicial:
                      <DatePicker
                        className={`mt-2 ${styles.member_projeto_form}`}
                        selected={startDateAux}
                        onChange={onChangeStartDate}
                        dateFormat="dd/MM/yyyy"
                      />
                      {isToShowStartDateWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={
                            " Data inicial não pode ser maior que data inicial. Verifique os valores antes de submeter o formulário."
                          }
                        >
                          Data inicial não pode ser maior que data inicial.
                          Verifique os valores antes de submeter o formulário.
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
                      Data final:
                      <DatePicker
                        className={`mt-2 ${styles.member_projeto_form}`}
                        selected={endDateAux}
                        onChange={onChangeEndDate}
                        dateFormat="dd/MM/yyyy"
                      />
                      {isToShowEndDateWarning ? (
                        <span
                          style={returnWarningStyles()}
                          title={
                            " Data final não pode ser menor que data inicial. Verifique os valores antes de submeter o formulário."
                          }
                        >
                          Data final não pode ser menor que data inicial.
                          Verifique os valores antes de submeter o formulário.
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
                        className={`mt-2 ${styles.member_projeto_form}`}
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
      {returnTasksModal()}
      {returnModalWarning()}
      {returnModalRegisterWasSave()}
      {returnModalRegisterWasEdited()}
    </main>
  ) : (
    <Navigate to="/adagio/projetos" />
  );
};
export default FormProjetos;
