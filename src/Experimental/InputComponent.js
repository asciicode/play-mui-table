import React from 'react';

// ALLEN <InputComponent inputComponent={'input'}/>
export default (props) => {
  const { inputComponent } = props
  let InputComponent = inputComponent
  return (
    <div><InputComponent /></div>
  )
}
