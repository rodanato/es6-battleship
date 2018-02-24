import React from 'react';

let GridColumn = (props) => {
  const row = props.row;
  const column = props.column;
  const position = props.row + ',' + props.column;

  let blockClass = () => {
    if (props.hits.includes(position)) {
      return 'hit';
    }
    if (props.missedShots.includes(position)) {
      return 'missed';
    }

    return '';
  };

  return (
    <td onClick={() => props.shotAction(row, column)}
        className={blockClass()}> </td>
  );
};

export default GridColumn;