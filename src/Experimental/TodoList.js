import React, { useState } from 'react';
import ChildrenFunction from './ChildrenFunction';


function ItemRenderer({ prop1 }){
  // ALLEN : under ChildrenFunction same concept
  // ({ prop1 }) => {
  //   console.log(prop1)
  //   return todos.length + prop1
  // }
  console.log(prop1)
  let bounds = null
  const getBounds = (value) =>{
    if (bounds) return
    bounds = value.getBoundingClientRect()
    console.log(bounds)
  }
  return (
    <>
      <div ref={getBounds}>ascii {prop1}</div>
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
