import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import {
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useAddNewUserMutation,
} from '../../app/service';
import { INITIAL_USER } from '../../utils/constants';
import { IFormErrors, IUser } from '../../utils/types';
import Form from '../form';
import LoadButton from '../loadButton';
import Modal from '../modal';
import Pagination from '../pagination';
import { SelectLanguage } from '../selectLanguage';
import { StyledTable, StyledTableWrapper } from './styles';

interface TableProps {
  columns: Column<IUser>[];
  data: IUser[];
  setData: Dispatch<SetStateAction<IUser[]>>;
  users: IUser[];
  skipPageReset: boolean;
  setSkipPageReset: Dispatch<SetStateAction<boolean>>;
}

const Table: FC<TableProps> = ({
  columns,
  data,
  setData,
  users,
  skipPageReset,
  setSkipPageReset,
}) => {
  const [newUser, setNewUser] = useState(INITIAL_USER);
  const [errors, setErrors] = useState<IFormErrors>(INITIAL_USER);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [alert, setAlert] = useState({ message: '', open: false });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<null | string>(null);
  const initialData = users;
  const { t } = useTranslation();

  const [
    deleteUser,
    { isLoading: isDeleting, error: deletingError, isError: isDeletingError },
  ] = useDeleteUserMutation();
  const [
    updateUser,
    { isLoading: isUpdating, error: updatingError, isError: isUpdatingError },
  ] = useUpdateUserDataMutation();
  const [
    addUser,
    { isLoading: isAdding, error: addingError, isError: isAddingError },
  ] = useAddNewUserMutation();

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
      autoResetExpanded: !skipPageReset,
      autoResetGroupBy: !skipPageReset,
      autoResetSelectedRows: !skipPageReset,
      autoResetSortBy: !skipPageReset,
      autoResetFilters: !skipPageReset,
      autoResetRowState: !skipPageReset,
    },
    useSortBy,
    usePagination,
  );

  const handleDeleteDataRowButton = (id: string) => {
    setIsDeleteConfirmOpen(true);
    setDeleteUserId(id);
  };

  const handleUpdateTableData = (user: IUser) => {
    const originalRow = initialData.find((el) => el.id === user.id);
    const isDataChanged = JSON.stringify(originalRow) === JSON.stringify(user);

    if (!isDataChanged) {
      updateUser(user);
    } else {
      setEditingRowId('');
    }
  };

  const handleAddNewUser = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addUser(newUser);
  };

  const handleEditActionCancel = () => {
    setEditingRowId('');
    setData(users);
  };

  const handleSubmitAlert = () => {
    deleteUserId && deleteUser(deleteUserId);
  };

  const handleCloseAddNewData = () => {
    setIsOpenForm(false);
    setErrors({});
    setNewUser(INITIAL_USER);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteUserId(null);
    setIsDeleteConfirmOpen(false);
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
      }),
    );
  };

  const handleDefaultParams = () => {
    window.scrollTo(0, 0);
    setEditingRowId('');
  };

  const handleAlertClose = () => setAlert((prev) => ({ ...prev, open: false }));
  const handleAlertMessage = (
    message: FetchBaseQueryError | SerializedError,
  ) => {
    const alertErrorMessage = JSON.stringify(message);
    setAlert((prev) => ({ ...prev, message: alertErrorMessage, open: true }));
  };

  useEffect(() => {
    if (!isDeleting) {
      setIsDeleteConfirmOpen(false);
      setDeleteUserId(null);
    }
  }, [isDeleting]);

  useEffect(() => {
    if (!isAdding) {
      setNewUser(INITIAL_USER);
      setErrors({});
      setIsOpenForm(false);
    }
  }, [isAdding]);

  useEffect(() => {
    if (!isUpdating) {
      setEditingRowId('');
    }
  }, [isUpdating]);

  useEffect(() => {
    if (isAddingError) {
      addingError && handleAlertMessage(addingError);
      setNewUser(INITIAL_USER);
      setErrors({});
      setIsOpenForm(false);
    }
    if (isUpdatingError) {
      updatingError && handleAlertMessage(updatingError);
      setEditingRowId('');
    }
    if (isDeletingError) {
      deletingError && handleAlertMessage(deletingError);
      setDeleteUserId(null);
      setIsDeleteConfirmOpen(false);
    }
  }, [
    isAddingError,
    isUpdatingError,
    isDeletingError,
    addingError,
    deletingError,
    updatingError,
  ]);

  return (
    <>
      <StyledTableWrapper>
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ⬇'
                          : ' ⬆'
                        : ''}
                    </span>
                  </th>
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
                      <td
                        {...cell.getCellProps({
                          style: { minWidth: cell.column.minWidth },
                        })}
                      >
                        <input
                          size={1}
                          className="edit-input"
                          type="text"
                          value={cell.value}
                          onChange={(e) =>
                            updateMyData(
                              cell.row.index,
                              cell.column.id,
                              e.target.value,
                            )
                          }
                        />
                      </td>
                    ) : (
                      <td {...cell.getCellProps()}>
                        <span className="cell-text">{cell.render('Cell')}</span>
                      </td>
                    );
                  })}

                  <td>
                    {isEditing ? (
                      <div className="action-btns">
                        <LoadButton
                          title={t('buttons.save')}
                          isLoading={isUpdating}
                          onClick={() => handleUpdateTableData(row.original)}
                        />
                        <button
                          className="btn cancel-btn"
                          onClick={handleEditActionCancel}
                        >
                          {t('buttons.cancel')}
                        </button>
                      </div>
                    ) : (
                      <div className="action-btns">
                        <button
                          className="btn submit-btn"
                          onClick={() => {
                            setEditingRowId(row.id);
                          }}
                        >
                          {t('buttons.edit')}
                        </button>
                        <button
                          className="btn cancel-btn"
                          onClick={() =>
                            handleDeleteDataRowButton(row.values.id)
                          }
                        >
                          {t('buttons.delete')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledTableWrapper>
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
      <SelectLanguage />
      <Modal
        open={isOpenForm}
        children={
          <Form
            handleSaveUser={handleAddNewUser}
            newUser={newUser}
            setNewUser={setNewUser}
            errors={errors}
            setErrors={setErrors}
            handleCancelButton={handleCloseAddNewData}
            isLoading={isAdding}
          />
        }
        onClose={handleCloseAddNewData}
        title={t('defaultMenu.modalTitle')}
      ></Modal>
      <Modal
        open={alert.open}
        onClose={handleAlertClose}
        title={alert.message}
      ></Modal>
      <Modal
        open={isDeleteConfirmOpen}
        children={
          <>
            <div className="footer">
              <LoadButton
                title={t('buttons.delete')}
                isLoading={isDeleting}
                onClick={handleSubmitAlert}
              />
              <button
                className="modal-btn cancel-btn"
                onClick={handleCloseDeleteConfirm}
              >
                {t('buttons.cancel')}
              </button>
            </div>
          </>
        }
        onClose={handleCloseDeleteConfirm}
        title={t('defaultMenu.alertTitle')}
      ></Modal>
    </>
  );
};

export default Table;
