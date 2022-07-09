import { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "./form_login.module.scss";
import loginIcon from "../../assets/user.svg";
import { BsFillPersonFill } from "react-icons/bs";
import { BsLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const FormLogin = () => {
  const { user, signin, setUser, setIsAuthenticated, isAuthenticated } =
    useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rememberMe") === "true") {
      setRememberMe(true);

      const usernameStorage: string | null = localStorage.getItem("username");
      if (usernameStorage !== null) {
        setLogin(usernameStorage);
      } else {
        setLogin("");
      }
    }
  }, []);

  const onSubmit = async (ev: any) => {
    ev.preventDefault();
    console.log(login, password, rememberMe);

    if (rememberMe) {
      localStorage.setItem("username", login);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.setItem("username", "");
      localStorage.setItem("rememberMe", "false");
    }

    const wasSigned = await signin(login, password);

    console.log(wasSigned);

    if (wasSigned) {
      console.log(user);
    }
  };

  const returnPropertiesIcons = () => {
    return {
      color: "#463a8b",
      marginRight: "-20px",
      marginTop: "10px",
      zIndex: "10000",
    };
  };

  return !isAuthenticated ? (
    <section className={`${styles["container-login-area"]}`}>
      <section className={`${styles["login-area"]}`}>
        <img
          src={loginIcon}
          className={`${styles["login-icon"]}`}
          alt="login icon"
        />
        <Container className={"mt-5 center"}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Form onSubmit={onSubmit}>
                <Form.Group className={"mb-3"} controlId="formBasicEmail">
                  <InputGroup>
                    <BsFillPersonFill style={returnPropertiesIcons()} />

                    <Form.Control
                      style={{ paddingLeft: "25px", borderRadius: "10px" }}
                      type="text"
                      value={`${login}`}
                      onChange={(ev) => {
                        setLogin(ev.target.value);
                      }}
                      name="username"
                      placeholder="Nome de usuário ou email"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId="formBasicPassword">
                  <InputGroup>
                    <BsLockFill style={returnPropertiesIcons()} />
                    <Form.Control
                      style={{ paddingLeft: "25px", borderRadius: "10px" }}
                      type="password"
                      value={`${password}`}
                      onChange={(ev) => {
                        setPassword(ev.target.value);
                      }}
                      name="password"
                      placeholder="Senha"
                    />
                  </InputGroup>
                </Form.Group>

                <div className={`${styles["confirm-login"]}`}>
                  <div className={`${styles["confirm-remember"]}`}>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Lembrar-me o usuário"
                        checked={rememberMe}
                        onChange={() => {
                          setRememberMe(!rememberMe);
                        }}
                        name="remembered_me"
                      />
                    </Form.Group>
                  </div>

                  <Button
                    style={{
                      backgroundColor: "#463a8b",
                      borderColor: "#463a8b",
                    }}
                    variant="primary"
                    type="submit"
                  >
                    Fazer Login
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>

        <Link to="*" style={{ color: "#463a8b", marginTop: "18px" }}>
          Esqueci minha senha
        </Link>
      </section>
    </section>
  ) : (
    <Navigate to="/home" />
  );
};

export default FormLogin;
