import React, { FC, useRef } from 'react';

import { IRow } from '../../utils/types';
import { useTableContext } from '../context/table';

interface TableInputprops {
  value: string;
  row: IRow;
}

const TableInput: FC<TableInputprops> = ({ value, row }) => {
  const { state, setState } = useTableContext();

  const ref = useRef(null);
  return (
    <input
      ref={ref}
      size={1}
      className="edit-input"
      type="text"
      defaultValue={value}
      onChange={(e) =>
        setState({
          ...state,
          [row.id]: {
            ...state[row.id],
            [row.name]: e.target.value,
          },
        })
      }
    />
  );
};

export default TableInput;
