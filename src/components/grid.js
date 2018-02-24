import React from 'react';
import '../App.css';
import GridRow from './grid-row';

let Grid = (props) => {
  let rows = props.rows
    .map((row, i) => <GridRow row={row}
                              shotAction={props.shotAction}
                              columns={props.columns}
                              availablePositions={props.availablePositions}
                              hits={props.hits}
                              missedShots={props.missedShots}
                              key={i} />);

  return (
    <div>
      <table className={'grid table'}
             border="1">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;