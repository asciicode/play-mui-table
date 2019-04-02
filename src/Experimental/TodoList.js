import React, { useState } from 'react';
import ChildrenFunction from './ChildrenFunction';


function ItemRenderer({ prop1 }){
  // ALLEN : under ChildrenFunction same concept
  // ({ prop1 }) => {
  //   console.log(prop1)
  //   return todos.length + prop1
  // }

  console.log(prop1)
  return (
    <>
      <div>ascii {prop1}</div>
    </>
  )
}

function TodoList(props) {
  const [todos, setTodos] = useState(['allen', 'cecille']);

  const addTodo = () => {

  }
  // console.log(todos)
  return (
    <div>Todo List

    {todos.map((item, index) => (
       <div className='indent' key={index} >ALLEN</div>
    ))}

    <button onClick={() => setTodos([...todos, 'tet']) }>addRow</button>
    <br />
    <ChildrenFunction>
      {
        (children) => {
          console.log(children)
          return <ItemRenderer {...children}>{todos.length + 1}</ItemRenderer>
        }

      }


    </ChildrenFunction>
   </div>
  );
}

export default TodoList;
