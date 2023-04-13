import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

import { setError } from '../../app/errorSlice';
import {
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useAddNewUserMutation,
} from '../../app/service';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import { useTableContext } from '../../context/table';
import { INITIAL_USER } from '../../utils/constants';
import { IUser } from '../../utils/types';
import CancelButton from '../buttons/cancel';
import SubmitButton from '../buttons/submit';
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [editingRowId, setEditingRowId] = useState<null | string>('');
  const [deleteUserId, setDeleteUserId] = useState<null | string>(null);

  const { state } = useTableContext();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    open: isAlertOpen,
    message: errorMessage,
    status,
  } = useAppSelector((state: RootState) => state.error);

  const [addUser, { isLoading: isAdding }] = useAddNewUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserDataMutation();

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

  const handleUpdateTableData = async (userId: string) => {
    if (Object.keys(state).length) {
      await updateUser({ id: userId, ...state[userId] });
    }
    setEditingRowId('');
  };

  const handleEditActionCancel = () => {
    setEditingRowId('');
    setData(users);
  };

  const handleSubmitAlert = async () => {
    deleteUserId && (await deleteUser(deleteUserId));
    setIsDeleteConfirmOpen(false);
    setDeleteUserId(null);
  };

  const handleCloseAddNewData = () => {
    setIsFormOpen(false);
    setNewUser(INITIAL_USER);
  };

  const handleCloseDeleteConfirm = () => {
    setDeleteUserId(null);
    setIsDeleteConfirmOpen(false);
  };

  const handleAddData = async () => {
    await addUser(newUser);
    setNewUser(INITIAL_USER);
    setIsFormOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setEditingRowId('');
  }, [pageIndex]);

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
                        <CancelButton
                          title={t('buttons.cancel')}
                          onClick={handleEditActionCancel}
                        />
                      </div>
                    ) : (
                      <div className="action-btns">
                        <SubmitButton
                          title={t('buttons.edit')}
                          onClick={() => {
                            setEditingRowId(row.id);
                          }}
                        />
                        <CancelButton
                          title={t('buttons.delete')}
                          onClick={() =>
                            handleDeleteDataRowButton(row.values.id)
                          }
                        />
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
      {isAlertOpen && (
        <Modal
          open={isAlertOpen}
          onClose={() =>
            dispatch(setError({ open: false, message: null, status: null }))
          }
          children={<span>{errorMessage}</span>}
          title={status}
        />
      )}
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
                <CancelButton
                  title={t('buttons.cancel')}
                  onClick={handleCloseDeleteConfirm}
                />
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
              handleSaveUser={handleAddData}
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
