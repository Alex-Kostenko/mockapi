import React, { useEffect, useMemo, useState } from 'react';
import { Column } from 'react-table';

import './App.css';
import { useGetAllUsersQuery } from './app/service';
import Loader from './components/loader';
import Table from './components/table';
import { Styles } from './components/table/styles';
import { IUser } from './utils/types';

function App() {
  const { data: users, isFetching } = useGetAllUsersQuery();
  const [data, setData] = useState(users ? users : []);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const columns = useMemo(
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

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  useEffect(() => {
    setData(users || []);
  }, [users]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Styles>
          <Table
            columns={columns as Column<IUser>[]}
            data={data}
            setData={setData}
            users={users || []}
            skipPageReset={skipPageReset}
            setSkipPageReset={setSkipPageReset}
          />
        </Styles>
      </header>
    </div>
  );
}

export default App;
