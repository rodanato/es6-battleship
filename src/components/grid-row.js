import React from 'react';
import GridColumn from './grid-column';

let GridRow = (props) => {
  const row = props.row;
  let columns = props.columns
    .map((column, i) => <GridColumn column={column}
                                    row={row}
                                    key={i}
                                    shotAction={props.shotAction}
                                    availablePositions={props.availablePositions}
                                    hits={props.hits}
                                    missedShots={props.missedShots} />);

  return (
    <tr>
      {columns}
    </tr>
  );
};

export default GridRow;