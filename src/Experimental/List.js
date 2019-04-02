import React from 'react';

// var MyLabel = React.createClass({
//   render: function() {
//     return React.createElement("label", {className: "label"},
//       React.createElement("span", {className: "label"}, this.props.label),
//       this.props.children
//     );
//   }
// });

const List = ({ children }) => {
  console.log(children)

  const items = [];
  for (var i = 0; i < 5; i++) {
    items.push(React.createElement('input', {type: "text", value: "And here is a child", key: i, index: i}));
  }
  console.log(items)
  return React.createElement(
    "div",
    null,
    items
  );
}

export default List;
