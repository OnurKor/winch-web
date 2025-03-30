import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import AppHeader from "../../components/AppHeader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../store/services/mainApi";
import { useSelector } from "react-redux";
import Table, { StatusPill } from "../../components/table/NewTables";
import TableButton from "../../components/table/TableButton";
import { selectCurrentUser } from "../../store/services/authSlice";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [deleteUser] = useDeleteUserMutation();

  const { data } = useGetAllUsersQuery();
  console.log("useGetAllUsersQuery", data);

  const deleteFunc = (id) => {
    console.log(id, "user delete");
    deleteUser({ id });
  };
  console.log("burası çalısıyor");
  const columns = React.useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <TableButton
            row={row}
            navigateUrl={"/add_users"}
            deleteFunc={deleteFunc}
          />
        ),
      },
      {
        Header: "Id",
        accessor: "id",
      },

      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Surname",
        accessor: "surname",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );
  return (
    <PageWrapper>
      <AppHeader
        header="User Listing"
        subHeader="Home - User List"
        buttonName="Add User"
        func={() => navigate("/add_users")}
      />

      <div className="w-full">
        {data && <Table columns={columns} data={[...(data?.content || [])]} />}
      </div>
    </PageWrapper>
  );
};

export default Users;
