import { useEffect, useState } from "react";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import TodoBoard from "../components/TodoBoard";

const TodoListPage = ({ user }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState();

  const getTasks = async () => {
    const res = await api.get("/tasks");
    setTodoList(res.data.data);
  };

  const addTask = async () => {
    try {
      const res = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (res.status === 200) {
        console.log("성공");
        getTasks();
        setTodoValue("");
      } else {
        throw new Error("할 일을 추가할 수 없음.");
      }
    } catch (err) {
      console.error("에러: ", err);
    }
  };

  const updateTask = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const res = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (res.status === 200) {
        console.log("성공");
        getTasks();
      } else {
        throw new Error("할 일을 수정할 수 없음.");
      }
    } catch (err) {
      console.error("에러: ", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await api.delete(`/tasks/${id}`);
      if (res.status === 200) {
        console.log("성공");
        getTasks();
      } else {
        throw new Error("할 일을 삭제할 수 없음.");
      }
    } catch (err) {
      console.error("에러: ", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <div className="greeting-text">어서오세요! {user.name}님!</div>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTask} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </Container>
  );
};

export default TodoListPage;
