import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import './App.css';
import { useGetAllUsersQuery } from './app/service';
import Loader from './components/loader';
import Table from './components/table';
import { IUser } from './utils/types';

function App() {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [data, setData] = useState(users ? users : []);
  const [skipPageReset, setSkipPageReset] = useState(false);
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      {
        Header: t('defaultMenu.id'),
        accessor: 'id',
        minWidth: 20,
      },
      {
        Header: t('defaultMenu.name'),
        accessor: 'name',
        minWidth: 200,
      },
      {
        Header: t('defaultMenu.age'),
        accessor: 'age',
        minWidth: 30,
      },
      {
        Header: t('defaultMenu.about'),
        accessor: 'about',
        minWidth: 250,
      },
    ],
    [t],
  );

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  useEffect(() => {
    setData(users || []);
  }, [users]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Table
        columns={columns as Column<IUser>[]}
        data={data}
        setData={setData}
        users={users || []}
        skipPageReset={skipPageReset}
        setSkipPageReset={setSkipPageReset}
      />
    </div>
  );
}

export default App;
