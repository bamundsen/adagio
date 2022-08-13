import { SetStateAction, useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AdagioSpinner from "../../../components/adagio-spinner/adagio_spinner.component";
import ModalHeader from "../../../components/modal-header/modal_header.component";
import { ProjectContext } from "../../../contexts/project.context";
import { Project } from "../../../types/ProjectType";
import { SpinnerState } from "../../../utils/spinner_type";
import commonStyles from "../../../utils/common_styles.module.scss";
import style from "./chooseProjectModal.module.scss";
import RegionPaginationButtons from "../../../components/region-pagination-buttons/region_pagination_buttons.component";
import NegativeButtonModal from "../../../components/negative-button-modal/negative_button_modal.component";

interface ChooseProjectModalProps{
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen:boolean;
    setIdsProjectWithAcumulatedSelected: (ids: number[]) => void;
    isProjectSelected: (id: number) => boolean;
    projectIdIfItIsToEdit: string | undefined;
    auxSelectedProject: number[];
    setAuxSelectedProject: React.Dispatch<React.SetStateAction<number[]>>;
    equalizeAuxSelectedProjectToIdsProject: () => void;
    setIdPRojectToChoose: React.Dispatch<SetStateAction<number | null>>;
    setNameOfProjectToShow: React.Dispatch<SetStateAction<string | null>>;
}
const ChooseProjectModal = ({
    setIsModalOpen,
    isOpen,
    setIdsProjectWithAcumulatedSelected,
    isProjectSelected,
    projectIdIfItIsToEdit,
    auxSelectedProject,
    setAuxSelectedProject,
    equalizeAuxSelectedProjectToIdsProject,
    setNameOfProjectToShow,
    setIdPRojectToChoose,
  }:ChooseProjectModalProps) =>{
    const {getProjectsByTitle } = useContext(ProjectContext);
    const [projectToShow, setProjectToShow] = useState<Project[]>([]);
    const [isLoaded, setIsLoaded] = useState(SpinnerState.Pending);
    const [searchString, setSearchString] = useState("");
    const [searchStringAux, setSearchStringAux] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [isLast, setIsLast] = useState(false);
    const [isFirst, setIsFirst] = useState(false);
    const [requestWasDone, setRequestWasDone] = useState(false);
    const [auxIdProjectChoose, setAuxIdProjectChoose] = useState<number|null>(Number);

    useEffect(() => {
      if (isOpen) {
        getProjectsByTitle(
          searchString,
          page,
          size
        ).then((response: any) => {
          if (response?.last) {
            setIsLast(true);
          } else {
            setIsLast(false);
          }
  
          if (response?.first) {
            setIsFirst(true);
          } else {
            setIsFirst(false);
          }
  
          setRequestWasDone(true);
          if (response?.content) {
            setProjectToShow(response.content);
            console.log(response);
          }
        });
      }
    }, [isOpen, page, size, searchString]);

    useEffect(() => {
      if (projectToShow.length > 0) {
        setIsLoaded(SpinnerState.Finished);
      } else if (requestWasDone) {
        setIsLoaded(SpinnerState.There_is_no_content);
      }
    }, [projectToShow]);
  
    const addOrRemoveSelectedOrUnselected = (id: number, marked: boolean) => {
      if (!auxSelectedProject.includes(id) && marked) {
        setAuxSelectedProject([...auxSelectedProject, id]);
      } else if (auxSelectedProject.includes(id) && !marked) {
        setAuxSelectedProject([
          ...auxSelectedProject.filter((s: number) => s !== id),
        ]);
      }
    };

    const decrementPage = () => {
      if (page > 0) {
        setPage(page - 1);
      }
    };
  
    const incrementPage = () => {
      setPage(page + 1);
    };
  
    const returnSpinner = () => {
      return <AdagioSpinner loadingState={isLoaded} />;
    };

    return (
      <Modal show={isOpen}>
        <ModalHeader
          message={"Escolha um Projeto"}
          resetStateOfAuxState={equalizeAuxSelectedProjectToIdsProject}
          setModalIsOpen={setIsModalOpen}
        />
  
        <Modal.Body className={`${commonStyles.body_modal}`}>
          <section>
            <Form.Control
              type="search"
              onInput={(e: any) => {
                setSearchStringAux(e.target.value);
                console.log(e.code);
                console.log("teste INPUT", searchStringAux);
  
                if (e.target.value.trim() === "") {
                  setSearchString(e.target.value);
                }
              }}
              onKeyDown={(e: any) => {
                if (e.code.toLowerCase().trim() === "enter") {
                  setSearchString(searchStringAux);
                }
              }}
              title={"Pesquise por um Projeto, teclando ENTER "}
              placeholder="Pesquise por uma Projeto, teclando ENTER "
            ></Form.Control>
          </section>
          {isLoaded === SpinnerState.Finished && (
            <>
              <section>
              <Form.Group
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0",
                }}
                  className="mb-1"
                >
              <Form.Control
                type="radio"
                name="choose"
                id= "inputforNullProject"
                style={{
                  width: "22px",
                  height: "18px",
                }}
                onClick={(e: any) => {
                  setAuxIdProjectChoose(null);
                }}
                />
                <Form.Label
                   htmlFor={`inputforNullProject`}
                   style={{
                      display: "flex",
                      marginTop: "8px",
                      marginLeft: "8px",
                      alignItems: "center",
                  }}
                >Nenhum</Form.Label>
              </Form.Group>
                {projectToShow.map((project: Project) => {
                  return (
                    <div key={project.id + project.title}>
                      <Form.Group
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "0",
                        }}
                        className="mb-1"
                      >
                        <Form.Control
                          value={project.id}
                          id={`project-${project.id}`}
                          type="radio"
                          name="choose"
                          defaultChecked={
                            project.id !== undefined
                              ? isProjectSelected(project.id)
                              : false
                          }
                          style={{
                            width: "22px",
                            height: "18px",
                          }}
                          onClick={(e: any) => {
                            if(project.id !== undefined)
                              setAuxIdProjectChoose(project.id);
                              setNameOfProjectToShow(project.title);
                          }}
                        />
                        <Form.Label
                          htmlFor={`project-${project.id}`}
                          style={{
                            display: "flex",
                            marginTop: "8px",
                            marginLeft: "8px",
                            alignItems: "center",
                          }}
                        >
                          {project.title}
                        </Form.Label>
                      </Form.Group>
                    </div>
                  );
                })}
              </section>
            </>
          )}
  
          <RegionPaginationButtons
            isFirst={isFirst}
            isLast={isLast}
            decrementFunction={decrementPage}
            incrementFunction={incrementPage}
          />
          {returnSpinner()}
        </Modal.Body>
  
        <Modal.Footer>
          <div className={commonStyles.confirmation_modal_buttons_container}>
            <NegativeButtonModal
              setModalIsOpen={setIsModalOpen}
              resetStateOfAuxState={equalizeAuxSelectedProjectToIdsProject}
              text={"Cancelar"}
            />
            <Button
              tabIndex={1}
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setIsModalOpen(false);
                setIdPRojectToChoose(auxIdProjectChoose);
              }}
              variant="success"
            >
              {"Salvar"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    );

}

export default ChooseProjectModal;