import { useEffect, useMemo, useState } from "react";
import { IUser } from "../../shared/interfaces";
import ReusableTable from "../table/table";
import { Cell } from "react-table";
import { KTIcon } from "../../../_metronic/helpers";
import DeleteConfirmationModal from "../../../_metronic/layout/components/delete-confirmation/delete-confirmation";
import { useUsersContext } from "../../contexts";

export const UserTable = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { params, setParams, getUsers, users, isLoading } = useUsersContext();
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, [params]);

  const handleCloseModal = () => setShowDeleteModal(false);
  const openDeleteModal = (user: IUser) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleNextButtonClick = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  const handlePrevButtonClick = () => {
    setParams({ ...params, page: params.page - 1 });
  };

  const deleteUser = async (id: string) => {
    console.log("l");
  };

  useEffect(() => {
    if (users?.previous) {
      setIsPrevDisabled(false);
    } else {
      setIsPrevDisabled(true);
    }

    if (users?.next) {
      setIsNextDisabled(false);
    } else {
      setIsNextDisabled(true);
    }
  }, [users?.previous, users?.next]);

  const columns = useMemo(
    () => [
      {
        Header: "Ismi",
        accessor: "first_name",
      },
      {
        Header: "Familiya",
        accessor: "last_name",
      },
      {
        Header: "Telfon raqami",
        accessor: "phone_number",
      },
      {
        Header: "Status",
        accessor: "auth_status",
      },
      {
        Header: "Amalllar",
        Cell: ({ row }: Cell<IUser>) => {
          return (
            <td className="text-end p-0 m-0 border-none">
              <button
                onClick={openDeleteModal.bind(null, row.original)}
                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm "
              >
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </td>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div>
        <ReusableTable
          columns={columns}
          data={users?.results || []}
          isLoading={isLoading}
        />
        {users?.next || users?.previous ? (
          <nav aria-label="navigation example d-flex align-items-center">
            <ul className="pagination justify-content-end p-6 pt-0 pb-8">
              <li className="page-item">
                <button
                  className="btn btn-primary"
                  disabled={isPrevDisabled}
                  onClick={handlePrevButtonClick}
                >
                  Oldingi
                </button>
              </li>
              <li className="page-item">
                <button
                  className="btn btn-primary"
                  disabled={isNextDisabled}
                  onClick={handleNextButtonClick}
                >
                  Keyingi
                </button>
              </li>
            </ul>
          </nav>
        ) : null}

        {currentUser && showDeleteModal && (
          <DeleteConfirmationModal
            show
            onClose={handleCloseModal}
            onConfirm={deleteUser}
            id={currentUser.id}
          />
        )}
      </div>
    </>
  );
};

export default UserTable;
