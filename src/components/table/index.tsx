import React, { FC, useState } from 'react';

import { useTable } from 'react-table';

import {
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useAddNewUserMutation,
} from '../../app/service';
import Form from '../form';
import Modal from '../modal';
import { INITIAL_USER } from '../../utils/constants';
import { FormErrors, IUser } from '../../utils/types';
import { StyledSaveButton } from './styles';
import Alert from '../alert';

interface Props {
  columns: any;
  data: IUser[];
  updateMyData?: any;
}

const Table: FC<Props> = ({ columns, data }) => {
  const [newUser, setNewUser] = useState<IUser>(INITIAL_USER);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<null | string>(null);
  const [deleteUserId, setDeleteUserId] = useState<null | string>(null);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserDataMutation();
  const [addUser, { isLoading: isAdding }] = useAddNewUserMutation();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      // updateMyData,
    });

  const handleEditButton = () => {};

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
          {rows.map((row, i) => {
            prepareRow(row);
            const isEditing = row.id === editingRowId;
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
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
                      <button onClick={() => setEditingRowId(null)}>
                        Cancel
                      </button>
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
