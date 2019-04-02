import React from 'react';



const ChildrenFunction = ({ children }) => {
  console.log(children)
  return (
    children({prop1: Math.random(10),prop2: Math.random(100)})
  )
}

export default ChildrenFunction;
