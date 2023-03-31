import React, { useState } from 'react';

import './App.css';
import Table from './components/table';
import { useGetAllUsersQuery } from './app/service';
import { Styles } from './components/table/styles';

function App() {
  const { data: users } = useGetAllUsersQuery();
  const [tableData, setTableData] = useState(users);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'About',
        accessor: 'about',
      },
    ],
    []
  );

  // const updateMyData = (
  //   rowIndex: string | number,
  //   columnId: number,
  //   value: string | number
  // ) => {
  //   // We also turn on the flag to not reset the page
  //   setSkipPageReset(true);
  //   setData((old) =>
  //     old.map((row, index) => {
  //       if (index === rowIndex) {
  //         return {
  //           ...old[rowIndex],
  //           [columnId]: value,
  //         };
  //       }
  //       return row;
  //     })
  //   );
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Styles>
          <Table
            columns={columns}
            data={users ? users : []}
            // updateMyData={updateMyData}
            // skipPageReset={skipPageReset}
          />
        </Styles>
      </header>
    </div>
  );
}

export default App;
