import React, { useState } from "react";
import ChildrenFunction from "./ChildrenFunction";
import axios from "axios";

function ItemRenderer({ prop1 }) {
  // ALLEN : under ChildrenFunction same concept
  // ({ prop1 }) => {
  //   console.log(prop1)
  //   return todos.length + prop1
  // }
  console.log(prop1);
  let bounds = null;
  const getBounds = value => {
    if (bounds) return;
    bounds = value.getBoundingClientRect();
    console.log(bounds);
  };
  return (
    <>
      <div ref={getBounds}>ascii {prop1}</div>
    </>
  );
}

function TodoList(props) {
  const [todos, setTodos] = useState(["allen", "cecille"]);
  const [val, setVal] = useState("wacky");
  const addTodo = () => {};

  React.useEffect(() => {
    console.log("run once");
    let headers = new Headers();
    let username = "allen";
    let password = "welcome1";
    headers.set(
      "Authorization",
      "Basic " + Buffer.from(username + ":" + password).toString("base64")
    );
    console.log(Buffer.from(username + ":" + password).toString("base64"));
    headers.set("Access-Control-Allow-Origin", "*");
    const datas = {
      username: "allen",
      password: "password",
      grant_type: "password"
    };
    var form = new FormData();
    form.append("grant_type", "password");
    form.append("username", "allen");
    form.append("password", "password");
    // fetch("http://localhost:8085/oauth/token", {
    //   method: "POST",
    //   headers: headers,
    //   body: form
    // })
    //   .then(response => response.text())
    //   .then(function(text) {
    //     console.log(text);
    //   });

    axios
      .post("http://localhost:8085/oauth/token", form, {
        auth: {
          username: "allen", // This is the client_id
          password: "welcome1" // This is the client_secret
        }
      })
      .then(response => {
        console.log(response);
      });
  }, []);
  // console.log(todos)
  function handleChange(event) {
    setVal(event.target.value);
  }
  return (
    <div>
      Todo List
      <input type="text" value={val} />
      {todos.map((item, index) => (
        <div className="indent" key={index}>
          ALLEN
        </div>
      ))}
      <button onClick={() => setTodos([...todos, "tet"])}>addRow</button>
      <br />
      <ChildrenFunction>
        {children => {
          console.log(children);
          return <ItemRenderer {...children}>{todos.length + 1}</ItemRenderer>;
        }}
      </ChildrenFunction>
    </div>
  );
}

export default TodoList;
