import React, { useEffect, useState } from "react";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [updateTodo, setUpdateTodo] = useState("");
  var getData = JSON.parse(localStorage.getItem("todo"));

  useEffect(() => {
    if (getData !== null) {
      setTodoList(getData);
    }
  }, []);
  // Add Todo
  const AddTodo = () => {
    var ary = [];
    if (getData === null) {
      ary.push({
        todo: todo,
        edit: false,
      });
      localStorage.setItem("todo", JSON.stringify(ary));
      setTodoList([...ary]);
    } else {
      ary = getData;
      ary.push({
        todo: todo,
        edit: false,
      });
      localStorage.setItem("todo", JSON.stringify(ary));
      setTodoList([...ary]);
    }
  };

  // Delete Data
  const DeleteData = (i) => {
    console.log(i);
    todoList.splice(i, 1);
    localStorage.setItem("todo", JSON.stringify(todoList));
    setTodoList([...todoList]);
  };

  // Edit Data
  const EidtData = (i) => {
    todoList[i].edit = true;
    setTodoList([...todoList]);
  };

  // Update Data
  const UpdateData = (i) => {
    todoList[i].todo = updateTodo;
    todoList[i].edit = false;
    setTodoList([...todoList]);
    localStorage.setItem("todo", JSON.stringify(todoList));
  };
  return (
    <div>
      <h1>Home Page</h1>
      <input
        type={"text"}
        value={todo}
        onChange={(todo) => setTodo(todo.target.value)}
      />
      <button onClick={AddTodo}>Add</button>
      {todoList.map((v, i) => {
        return (
          <div key={i}>
            {v.edit ? (
              <div>
                <input
                  type={"text"}
                  value={updateTodo}
                  onChange={(updateTodo) =>
                    setUpdateTodo(updateTodo.target.value)
                  }
                />
                <button onClick={() => UpdateData(i)}>Update</button>
              </div>
            ) : (
              <div>
                <p>{v.todo}</p>
                <button onClick={() => DeleteData(i)}>Delete</button>
                <button onClick={() => EidtData(i)}>Edit</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default App;
