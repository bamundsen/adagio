import { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AdagioSideBar from "../../components/adagio-sidebar/adagio_sidebar.component";
import commonStyles from "../../utils/common_styles.module.scss";
import sideBarData from "../../utils/sideBarData";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";


const FormProjetos = ()=> {
    const windowDimensions = useWindowDimensions();
    const [titulo, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startHour, setStartHour] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endtDate, setEndtDate] = useState("");
    const [endHour, setEndHour] = useState("");
   
    const onSubmit = async (ev: any) => {
        ev.preventDefault();
        console.log(titulo, description,startHour,startDate, endtDate, endHour);
    };
    return <main className={`${commonStyles.main_content}`}>
    <AdagioSideBar itemsNav={sideBarData} />
  <section>     
    <Container className={"mt-5 center"}>
        <Row>
            <Col lg={12} md={12} sm={12}>
                <Form onSubmit={onSubmit}>
                <Form.Group
                  controlId="formBasicUsername"
                  style={{
                    width: `${windowDimensions.width > 580 ? "48%" : "100%"}`,
                  }}
                >
                  Nome de usuário:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="text"
                      value={titulo}
                      onChange={(ev: any) => {
                        setTitle(ev.target.value);
                      }}
                      name="username"
                      placeholder="Escreva o titulo  do projeto"
                    />
                  </InputGroup>
                </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>

  </section>
    
  </main>;
}
export default FormProjetos;