import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import api from "../utils/api";
import { Alert, Container } from "react-bootstrap";

import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (password !== ConfirmPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      createUser();
    } catch (err) {
      setError(err.message);
    }
  };

  const createUser = async () => {
    try {
      const res = await api.post("/user", {
        name,
        email,
        password,
      });
      if (res.status === 200) {
        console.log("성공");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/login");
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error("에러: ", err.error);
      setError(err.error);
    }
  };

  return (
    <Container className="mt-5">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="string"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호 확인"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {error && (
          <Alert variant="danger">
            <AiFillWarning size={20} />
            <span>{error}</span>
          </Alert>
        )}

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
