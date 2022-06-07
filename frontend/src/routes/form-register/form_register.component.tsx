import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./form_register.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import {} from "react-router-dom";
import { useContext } from "react";
import { BsFileEaselFill } from "react-icons/bs";
import { AuthContext } from "../../contexts/auth.context";


const FormRegister = () => {
  const {setUser, setIsAuthenticated} = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const cleanFields = () => {
    setName("");
    setUsername("");
    setEmail("");
    setCpf("");
    setPhone("");
    setPassword("");
    setConfirmedPassword("");
  };

  const onSubmit = (ev: any) => {
    ev.preventDefault();
    console.log(name, username, cpf, email, phone, password, confirmedPassword);

    if (password !== confirmedPassword) {
      alert("Os valoress de senha e confirmação de senha estão diferentes !");
    } else {
      const data = { name, login: username, cpf, email, phone, password };
      axios.post("http://localhost:8092/auth/register", data).then((ret) => {
        if (ret.status === 200) {
          alert(
            "Cadastrado com sucesso ! Você pode ir para a tela de login e se autenticar"
          );
        }
      });
    }
  };

  return (
    <section>
      <Container className={"mt-5 center"}>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Form onSubmit={onSubmit}>
              <Form.Group
                className={`mb-3 ${styles.name_register_form}`}
                controlId="formBasicName"
              >
                Nome:
                <InputGroup className={"mt-2"}>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(ev: any) => {
                      setName(ev.target.value);
                    }}
                    placeholder="Seu nome completo"
                    name="name"
                  />
                </InputGroup>
              </Form.Group>

              <div className={`${styles.set_register_form}`}>
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicUsername"
                >
                  Nome de usuário:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(ev: any) => {
                        setUsername(ev.target.value);
                      }}
                      name="username"
                      placeholder="Escolha um nome de usuário"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicCpf"
                >
                  CPF:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="text"
                      value={cpf}
                      onChange={(ev: any) => {
                        setCpf(ev.target.value);
                      }}
                      name="cpf"
                      placeholder="Seu CPF"
                    />
                  </InputGroup>
                </Form.Group>
              </div>

              <div className={`${styles.set_register_form}`}>
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicEmail"
                >
                  Email:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(ev: any) => {
                        setEmail(ev.target.value);
                      }}
                      name="email"
                      placeholder="Um email que seja seu e que você possa acessar"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicTelefone"
                >
                  Telefone:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="phone_number"
                      value={phone}
                      onChange={(ev: any) => {
                        setPhone(ev.target.value);
                      }}
                      type="tel"
                      placeholder="Número de telefone fixo ou celular"
                    />
                  </InputGroup>
                </Form.Group>
              </div>

              <div className={`${styles.set_register_form}`}>
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicPassword"
                >
                  Senha:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="password"
                      value={password}
                      onChange={(ev: any) => {
                        setPassword(ev.target.value);
                      }}
                      type="password"
                      placeholder="Crie uma senha para acessar o sistema"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicConfirmPassword"
                >
                  Confirmação de senha:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="confirm_password"
                      value={confirmedPassword}
                      onChange={(ev: any) => {
                        setConfirmedPassword(ev.target.value);
                      }}
                      type="password"
                      placeholder="Confirme a senha informada"
                    />
                  </InputGroup>
                </Form.Group>
              </div>

              <div className={`${styles.set_register_form}`}>
                <div className={`${styles.buttons_area_register}`}>
                  <Button
                    style={{
                      backgroundColor: "#991f00",
                      borderColor: "#991f00",
                    }}
                    onClick={cleanFields}
                    variant="primary"
                    type="button"
                  >
                    Limpar campos
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "#004d00",
                      borderColor: "#463a8b",
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FormRegister;
