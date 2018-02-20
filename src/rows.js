import React                     from 'react';
import {columns as columnsGroup} from "./columns";

let rows = () => {
  for (let r = 0; r < rows.length; r++) {
    this.gridRows.push(
      <tr data-row={rows[r]}
          key={r}>
        {columnsGroup}
      </tr>
    );
  }
};

export default rows;