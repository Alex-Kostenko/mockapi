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
import { IUser } from '../../utils/types';
import { useTableContext } from '../context/table';
import Form from '../form';
import LoadButton from '../loadButton';
import Modal from '../modal';
import Pagination from '../pagination';
import { SelectLanguage } from '../selectLanguage';
import TableInput from '../tableInput';
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
}) => {
  const [newUser, setNewUser] = useState(INITIAL_USER);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', open: false });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<null | string>(null);
  const { state } = useTableContext();
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
    },
    useSortBy,
    usePagination,
  );

  const handleDeleteDataRowButton = (rowId: string) => {
    setIsDeleteConfirmOpen(true);
    setDeleteUserId(rowId);
  };

  const handleUpdateTableData = (userId: string) => {
    if (Object.keys(state).length) {
      updateUser({ id: userId, ...state[userId] });
    } else {
      setEditingRowId('');
    }
  };

  const handleAddNewUser = () => {
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
    setIsFormOpen(false);
    setNewUser(INITIAL_USER);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteUserId(null);
    setIsDeleteConfirmOpen(false);
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
      setIsFormOpen(false);
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
      setIsFormOpen(false);
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
              <tr className="table-row" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="table-header-cell"
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
                <th className="table-header-cell">
                  <button
                    className="add-new-user-btn"
                    onClick={() => setIsFormOpen(true)}
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
                <tr className="table-row" {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return isEditing && index !== 0 ? (
                      <td
                        className="table-body-cell"
                        {...cell.getCellProps({
                          style: { minWidth: cell.column.minWidth },
                        })}
                      >
                        <TableInput
                          value={cell.value}
                          row={{
                            id: cell.row.original.id!,
                            name: cell.column.id,
                          }}
                        />
                      </td>
                    ) : (
                      <td className="table-body-cell" {...cell.getCellProps()}>
                        <span className="cell-text">{cell.render('Cell')}</span>
                      </td>
                    );
                  })}

                  <td className="table-body-cell">
                    {isEditing ? (
                      <div className="action-btns">
                        <LoadButton
                          title={t('buttons.save')}
                          isLoading={isUpdating}
                          onClick={() =>
                            handleUpdateTableData(row.original.id!)
                          }
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
        open={alert.open}
        onClose={handleAlertClose}
        title={alert.message}
      ></Modal>
      {isDeleteConfirmOpen && (
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
        />
      )}
      {isFormOpen && (
        <Modal
          open={isFormOpen}
          children={
            <Form
              handleSaveUser={handleAddNewUser}
              newUser={newUser}
              setNewUser={setNewUser}
              handleCancelButton={handleCloseAddNewData}
              isLoading={isAdding}
            />
          }
          onClose={handleCloseAddNewData}
          title={t('defaultMenu.modalTitle')}
        />
      )}
    </>
  );
};

export default Table;
