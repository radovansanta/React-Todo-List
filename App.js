import React from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const ButtonDelete = styled.button`
  background-color: white;
  border: 0;
  color: #002b45;
  border-radius: 10px;
  float: left;
  margin: 5px;
  &:hover {
    background-color: #f98373;
    color: white;
  }
`;

const Task = styled.div`
  background-color: #004f80;
  border: 0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  margin: 5px;
  width: 400px;
  align-items: center;
  &:hover {
    background-color: #002b45;
  }
`;

const Header = styled.div`
  color: #002b45;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  background-color: #002b45;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  border: 0;
  height: 20px;
  padding: 5px;
`;

const AddButton = styled.input`
  background-color: white;
  color: #002b45;
  border-color: #002b45;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 10px;
  height: 30px;
  &:hover {
    color: white;
    border: 0;
    background-color: #002b45;
  }
`;

function Todos() {
  const [todos, setTodos] = React.useState([
    {
      id: uuidv4(),
      text: "Complete assignment",
      completed: true,
      completedby: " "
    },
    {
      id: uuidv4(),
      text: "Enjoy the day",
      completed: false,
      completedby: " "
    },
    {
      id: uuidv4(),
      text: "Do sport",
      completed: false,
      completedby: "11:00 2021-10-01"
    }
  ]);

  const onCreate = (id, text, completed, completedby) => {
    const newTodos = [...todos, { id, text, completed, completedby }];
    setTodos(newTodos);
  };

  const onToggleComplete = (todo) => {
    if (todo.completed) {
      todo.completed = false;
    } else todo.completed = true;
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const onRemove = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  };

  return (
    <main>
      <Header>Todos List</Header>
      <p
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: "bold"
        }}
      >
        Create or manage your todos
      </p>
      <CreateTodo onCreate={onCreate} />
      <Header>Upcoming:</Header>
      <ul>
        {todos
          .slice(0)
          .reverse()
          .filter((todo) => todo.completedby !== " ")
          .map(function (todo) {
            return Todo(
              todo,
              todo.id,
              todo.text,
              todo.completed,
              todo.completedby,
              { onToggleComplete },
              { onRemove }
            );
          })}
      </ul>
      <Header>Others:</Header>
      <ul>
        {todos
          .slice(0)
          .reverse()
          .filter((todo) => todo.completedby === " ")
          .map(function (todo) {
            return Todo(
              todo,
              todo.id,
              todo.text,
              todo.completed,
              todo.completedby,
              { onToggleComplete },
              { onRemove }
            );
          })}
      </ul>
    </main>
  );
}

function Todo(
  object,
  id,
  text,
  completed,
  completedby,
  { onToggleComplete },
  { onRemove }
) {
  return (
    <Task
      key={id}
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr 1fr 1fr"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20px"
        }}
      >
        <p>{text}</p>
      </div>
      <div>
        <p style={{ fontSize: "7px" }}>{completedby}</p>
      </div>
      <div style={{ width: "20px" }}>
        <ButtonDelete onClick={() => onRemove(id)}>Delete</ButtonDelete>
      </div>
      <div style={{ width: "20px" }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleComplete(object)}
        ></input>
      </div>
    </Task>
  );
}

function CreateTodo({ onCreate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    var datetime = this.timeValue.value + " " + this.dateValue.value;
    if (!this.textValue.value) return;
    onCreate(uuidv4(), this.textValue.value, false, datetime);
    this.textValue.value = "";
    this.dateValue.value = "";
    this.timeValue.value = "";
  };

  return (
    <form style={{ paddingBottom: "20px" }} onSubmit={handleSubmit}>
      <Input
        placeholder="Enter TODO"
        ref={(choreDesc) => (this.textValue = choreDesc)}
      />
      <Input type="date" ref={(dateValue) => (this.dateValue = dateValue)} />
      <Input type="time" ref={(timeValue) => (this.timeValue = timeValue)} />
      <AddButton type="submit" value="Add TODO" />
    </form>
  );
}

export default function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}
