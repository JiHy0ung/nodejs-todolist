import api from "../utils/api";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, updateTask, deleteTask }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete && "todo-item-finished"}`}>
          <div
            className={`todo-content ${item.isComplete && "todo-content-finished"}`}
          >
            {item.task}
          </div>

          <div>
            <button
              className="button-delete"
              onClick={() => deleteTask(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => updateTask(item._id)}
            >
              {item.isComplete ? `안끝남` : `끝남`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
