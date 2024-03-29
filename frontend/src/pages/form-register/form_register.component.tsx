import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./form_register.module.scss";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import {} from "react-router-dom";
import { useContext } from "react";
import { BsFileEaselFill } from "react-icons/bs";
import { AuthContext } from "../../contexts/auth.context";
import useWindowDimensions from "../../utils/useWindowDimensions.utils";

const FormRegister: FC = () => {
  const windowDimensions = useWindowDimensions();
  const { setUser, setIsAuthenticated, register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [isToShowCpfWarning, setIsToShowCpfWarning] = useState(false);
  const [isToShowPasswordWarning, setIsToShowPasswordWarning] = useState(false);
  const [isToShowConfirmPasswordWarning, setIsToShowConfirmPasswordWarning] =
    useState(false);
  const [isToShowCellphoneWarning, setIsToShowCellphoneWarning] =
    useState(false);
  const [isToShowEmailWarning, setIsToShowEmailWarning] = useState(false);
  const [isToShowLoginWarning, setIsToShowLoginWarning] = useState(false);

  const [warningMessageCPF, setWarningMessageCPF] = useState(
    "Campo CPF com valor inválido. Esse campo deve conter apenas números."
  );
  const [warningMessagePassword, setWarningMessagePassword] = useState(
    "Senha deve conter de 8 a 30 caracteres ,incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 numérico e 1 especial."
  );
  const [warningMessageConfirmPassword, setWarningMessageConfirmPassword] =
    useState(" Confirmação de senha deve corresponder à senha");
  const [warningMessagePhone, setWarningMessagePhone] = useState(
    "Número de celular: somente 10 ou 11 números, incluindo DDD"
  );

  const [warningMessageEmail, setWarningMessageEmail] =
    useState("Email inválido.");
  const [warningMessageLogin, setWarningMessageLogin] = useState("");

  const cleanFields = () => {
    setName("");
    setUsername("");
    setEmail("");
    setCpf("");
    setPhone("");
    setPassword("");
    setConfirmedPassword("");
  };

  function cpfIsValid(inputCPF: string) {
    let soma = 0;
    let resto;

    if (inputCPF === "00000000000") return false;
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(inputCPF.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(inputCPF.substring(10, 11))) {
      return false;
    }
    return true;
  }

  const passwordIsValid = (passwordValue: string) => {
    const regPassword = new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,30}$/
    );

    if (passwordValue.match(regPassword)) {
      return true;
    }

    return false;
  };

  const onChangeCellphone = (ev: any) => {
    const regCellphone = new RegExp(/^[0-9]{10,11}$/);
    const value = ev.target.value.trim();

    if (value.match(regCellphone)) {
      setIsToShowCellphoneWarning(false);
    } else {
      setIsToShowCellphoneWarning(true);
      setWarningMessagePhone(
        "Número de celular: somente 10 ou 11 números, incluindo DDD"
      );
    }

    setPhone(value);
  };

  const onChangeEmail = (ev: any) => {
    const regEmail = new RegExp(/\S+@\S+\.\S+/);
    const value = ev.target.value.trim();
    if (value.match(regEmail)) {
      setIsToShowEmailWarning(false);
    } else {
      setIsToShowEmailWarning(true);
      setWarningMessageEmail("Email inválido.");
    }

    setEmail(value);
  };

  const onChangeCpf = (ev: any) => {
    const regReplaceChar = new RegExp("-", "g");
    const regReplaceChar2 = new RegExp(".", "g");

    const regCpf = new RegExp("^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$");

    const value = ev.target.value
      .trim()
      .split(".")
      .join("")
      .split("-")
      .join("");

    console.log(value);
    if (cpfIsValid(value) && value.match(regCpf)) {
      setIsToShowCpfWarning(false);
    } else {
      setIsToShowCpfWarning(true);
      setWarningMessageCPF(
        "Campo CPF com valor inválido. Esse campo deve conter apenas números."
      );
    }

    if (cpfIsValid(value) && value.match(regCpf)) {
      setCpf(value);
    } else {
      setCpf(ev.target.value.trim());
    }
  };

  const onChangeConfirmPassword = (ev: any) => {
    const value = ev.target.value.trim();
    if (value === password) {
      setIsToShowConfirmPasswordWarning(false);
    } else {
      setIsToShowConfirmPasswordWarning(true);
    }

    setConfirmedPassword(value);
  };

  const onChangePassword = (ev: any) => {
    const value = ev.target.value.trim();
    if (passwordIsValid(value)) {
      setIsToShowPasswordWarning(false);
    } else {
      setIsToShowPasswordWarning(true);
      setWarningMessagePassword(
        "Senha deve conter de 8 a 30 caracteres ,incluindo pelo menos 1 letra maiúscula, 1 letra minúscula, 1 numérico e 1 especial."
      );
    }
    setPassword(value);
  };

  const onChangeLogin = (ev: any) => {
    const value = ev.target.value.trim();

    if (value.length < 8) {
      setIsToShowLoginWarning(true);
      setWarningMessageLogin("Login deve conter de 8 a 30 caracteres.");
    } else {
      setIsToShowLoginWarning(false);
    }

    setUsername(value);
  };

  const onSubmit = async (ev: any) => {
    ev.preventDefault();
    console.log(name, username, cpf, email, phone, password, confirmedPassword);

    if (password !== confirmedPassword) {
      alert("Os valores de senha e confirmação de senha estão diferentes !");
    } else {
      const login = username;
      const responseStatus = await register(
        login,
        name,
        phone,
        email,
        cpf,
        password
      );

      if (responseStatus?.status === 201) {
        alert("Usuário cadastrado com sucesso !");
      } else {
        let loginWarningAcumulator = "";
        let cpfWarningAcumulator = "";
        let passwordWarningAcumulator = "";
        let emailWarningAcumulator = "";
        let phoneWarningAcumulator = "";

        for (let i = 0; i < responseStatus?.response?.data.length; i++) {
          const errorFromBackend = responseStatus?.response?.data[i];
          if (errorFromBackend.campo === "login") {
            loginWarningAcumulator += ` ${responseStatus?.response?.data[i].mensagem}`;
          } else if (errorFromBackend.campo === "cpf") {
            cpfWarningAcumulator += ` ${responseStatus?.response?.data[i].mensagem}`;
          } else if (errorFromBackend.campo === "password") {
            passwordWarningAcumulator += ` ${responseStatus?.response?.data[i].mensagem}`;
          } else if (errorFromBackend.campo === "email") {
            emailWarningAcumulator += ` ${responseStatus?.response?.data[i].mensagem}`;
          } else if (errorFromBackend.campo === "phone") {
            phoneWarningAcumulator += ` ${responseStatus?.response?.data[i].mensagem}`;
          }
        }

        if (loginWarningAcumulator.trim() !== "") {
          setIsToShowLoginWarning(true);
          setWarningMessageLogin(loginWarningAcumulator);
        }

        if (cpfWarningAcumulator.trim() !== "") {
          setIsToShowCpfWarning(true);
          setWarningMessageCPF(cpfWarningAcumulator);
        }

        if (passwordWarningAcumulator.trim() !== "") {
          setIsToShowPasswordWarning(true);
          setWarningMessagePassword(passwordWarningAcumulator);
        }

        if (emailWarningAcumulator.trim() !== "") {
          setIsToShowEmailWarning(true);
          setWarningMessageEmail(emailWarningAcumulator);
        }

        if (phoneWarningAcumulator.trim() !== "") {
          setIsToShowCellphoneWarning(true);
          setWarningMessagePhone(phoneWarningAcumulator);
        }
      }
    }
  };

  const returnWarningStyles = () => {
    return {
      color: "red",
      fontSize: "14px",
      marginTop: "4px",
    };
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
                style={{
                  width: `${windowDimensions.width > 730 ? "80%" : "100%"}`,
                }}
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

              <div
                className={`${styles.set_register_form}`}
                style={{
                  flexDirection: `${
                    windowDimensions.width >= 580 ? "row" : "column"
                  }`,
                  width: `${windowDimensions.width >= 580 ? "95%" : "100%"}`,
                }}
              >
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicUsername"
                  style={{
                    width: `${windowDimensions.width > 580 ? "48%" : "100%"}`,
                  }}
                >
                  Nome de usuário (login):
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={onChangeLogin}
                      name="username"
                      placeholder="Escolha um nome de usuário"
                    />
                  </InputGroup>
                  {isToShowLoginWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessageLogin}`}
                    >
                      {warningMessageLogin}
                    </span>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicCpf"
                  style={{
                    width: `${windowDimensions.width > 580 ? "48%" : "100%"}`,
                  }}
                >
                  CPF:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="text"
                      value={cpf}
                      onChange={onChangeCpf}
                      name="cpf"
                      placeholder="Seu CPF"
                    />
                  </InputGroup>
                  {isToShowCpfWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessageCPF}`}
                    >
                      {warningMessageCPF}
                    </span>
                  ) : null}
                </Form.Group>
              </div>

              <div
                className={`${styles.set_register_form}`}
                style={{
                  flexDirection: `${
                    windowDimensions.width > 730 ? "row" : "column"
                  }`,
                  width: `${windowDimensions.width >= 580 ? "95%" : "100%"}`,
                }}
              >
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicEmail"
                  style={{
                    width: `${windowDimensions.width > 730 ? "48%" : "100%"}`,
                  }}
                >
                  Email:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={onChangeEmail}
                      name="email"
                      placeholder="Um email que seja seu e que você possa acessar"
                    />
                  </InputGroup>
                  {isToShowEmailWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessageEmail}`}
                    >
                      {warningMessageEmail}
                    </span>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicTelefone"
                  style={{
                    width: `${windowDimensions.width > 730 ? "48%" : "100%"}`,
                  }}
                >
                  Telefone:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="phone_number"
                      value={phone}
                      onChange={onChangeCellphone}
                      type="tel"
                      placeholder="10 ou 11 números, incluindo DDD."
                    />
                  </InputGroup>
                  {isToShowCellphoneWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessagePhone}`}
                    >
                      {warningMessagePhone}
                    </span>
                  ) : null}
                </Form.Group>
              </div>

              <div
                className={`${styles.set_register_form}`}
                style={{
                  flexDirection: `${
                    windowDimensions.width > 730 ? "row" : "column"
                  }`,
                  width: `${windowDimensions.width >= 580 ? "95%" : "100%"}`,
                }}
              >
                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicPassword"
                  style={{
                    width: `${windowDimensions.width > 730 ? "48%" : "100%"}`,
                  }}
                >
                  Senha:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      type="password"
                      placeholder="Crie uma senha para acessar o sistema"
                    />
                  </InputGroup>
                  {isToShowPasswordWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessagePassword}`}
                    >
                      {warningMessagePassword}
                    </span>
                  ) : null}
                </Form.Group>

                <Form.Group
                  className={`mb-3 ${styles.member_register_form}`}
                  controlId="formBasicConfirmPassword"
                  style={{
                    width: `${windowDimensions.width > 730 ? "48%" : "100%"}`,
                  }}
                >
                  Confirmação de senha:
                  <InputGroup className={"mt-2"}>
                    <Form.Control
                      name="confirm_password"
                      value={confirmedPassword}
                      onChange={onChangeConfirmPassword}
                      type="password"
                      placeholder="Confirme a senha informada"
                    />
                  </InputGroup>
                  {isToShowConfirmPasswordWarning ? (
                    <span
                      style={returnWarningStyles()}
                      title={`${warningMessageConfirmPassword}`}
                    >
                      {warningMessageConfirmPassword}
                    </span>
                  ) : null}
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
