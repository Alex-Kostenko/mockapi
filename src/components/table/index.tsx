import React, { Dispatch, FC, SetStateAction, useState } from 'react';

import { Column, usePagination, useTable } from 'react-table';

import {
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useAddNewUserMutation,
} from '../../app/service';
import Alert from '../alert';
import Form from '../form';
import Modal from '../modal';
import { INITIAL_USER } from '../../utils/constants';
import { IColumn, IFormErrors, IUser } from '../../utils/types';
import { StyledSaveButton } from './styles';
import Pagination from '../pagination';

interface Props {
  columns: Column<IUser>[];
  data: IUser[];
  setData: Dispatch<SetStateAction<IUser[]>>;
  users: IUser[];
  skipPageReset: boolean;
  setSkipPageReset: Dispatch<SetStateAction<boolean>>;
}

const Table: FC<Props> = ({
  columns,
  data,
  setData,
  users,
  skipPageReset,
  setSkipPageReset,
}) => {
  const [newUser, setNewUser] = useState<IUser>(INITIAL_USER);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<string>('');
  const [deleteUserId, setDeleteUserId] = useState<null | string>(null);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserDataMutation();
  const [addUser, { isLoading: isAdding }] = useAddNewUserMutation();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    getTableBodyProps,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      autoResetPage: !skipPageReset,
    },
    usePagination
  );

  const handleDeleteButton = (id: string) => {
    setIsAlertOpen(true);
    setDeleteUserId(id);
  };

  const handleSaveButton = (user: IUser) => {
    updateUser(user);
  };

  const handleSaveUser = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addUser(newUser);
    if (!isAdding) {
      setNewUser(INITIAL_USER);
      setErrors({});
      setIsOpenForm(false);
    }
  };

  const handleSubmitAlert = () => {
    deleteUserId && deleteUser(deleteUserId);
    setIsAlertOpen(false);
    setDeleteUserId(null);
  };

  const handleModalClose = () => {
    setIsOpenForm(false);
    setErrors({});
    setNewUser(INITIAL_USER);
  };

  const handleCloseAlert = () => {
    setDeleteUserId(null);
    setIsAlertOpen(false);
  };

  const handleCancelButton = () => {
    setEditingRowId('');
    setData(users);
  };

  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    setSkipPageReset(true);
    const rowNumber = Number(rowIndex);
    setData((old) =>
      old?.map((row, index) => {
        if (index === rowNumber) {
          return {
            ...old[rowNumber],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const handleDefaultParams = () => {
    window.scrollTo(0, 0);
    setEditingRowId('');
  };

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th>
                <button
                  className="add-new-user-btn"
                  onClick={() => setIsOpenForm(!isOpenForm)}
                >
                  +
                </button>
              </th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            const isEditing = row.id === editingRowId;
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return isEditing && index !== 0 ? (
                    <td {...cell.getCellProps()}>
                      <input
                        type="text"
                        value={cell.value}
                        onChange={(e) =>
                          updateMyData(
                            cell.row.index,
                            cell.column.id,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ) : (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}

                <td>
                  {isEditing ? (
                    <>
                      <StyledSaveButton
                        onClick={() => handleSaveButton(row.original)}
                      >
                        Save
                      </StyledSaveButton>
                      <button onClick={handleCancelButton}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <StyledSaveButton
                        onClick={() => {
                          setEditingRowId(row.id);
                        }}
                      >
                        Edit
                      </StyledSaveButton>
                      <button onClick={() => handleDeleteButton(row.values.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        gotoPage={gotoPage}
        handleDefaultParams={handleDefaultParams}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
      <Modal
        open={isOpenForm}
        children={
          <Form
            handleSaveUser={handleSaveUser}
            newUser={newUser}
            setNewUser={setNewUser}
            errors={errors}
            setErrors={setErrors}
          />
        }
        onClose={handleModalClose}
        title="Add new user"
      ></Modal>
      <Alert
        open={isAlertOpen}
        message="Are you sure?"
        onSubmit={handleSubmitAlert}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default Table;
