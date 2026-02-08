import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import api from "../utils/api";

import { Link, useNavigate } from "react-router";

import { Alert, Container } from "react-bootstrap";

import { AiFillWarning } from "react-icons/ai";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Login();
    } catch (err) {
      setError(err.message);
    }
  };

  const Login = async () => {
    try {
      const res = await api.post("/user/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setUser(res.data.user);
        sessionStorage.setItem("token", res.data.token);
        api.defaults.headers["authorization"] = "Bearer " + res.data.token;

        console.log("성공");
        setEmail("");
        setPassword("");
        setError("");

        navigate("/");
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error("에러: ", err);
      setError(err.error);
    }
  };

  return (
    <Container className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && (
          <Alert variant="danger">
            <AiFillWarning size={20} />
            <span>{error}</span>
          </Alert>
        )}

        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
