import React, { FC } from 'react';

import { useTableContext } from '../../context/table';
import { IRow } from '../../utils/types';

interface TableInputprops {
  value: string;
  row: IRow;
}

const TableInput: FC<TableInputprops> = ({ value, row }) => {
  const { state, setState } = useTableContext();

  return (
    <input
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
