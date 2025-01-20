import React, { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import AppHeader from "../components/AppHeader";
import { useDeleteUserMutation, useGetAllUserQuery } from "../store/services/mainApi";
import { useSelector } from "react-redux";
import Table, { StatusPill } from "../components/table/NewTables";
import TableButton from "../components/table/TableButton";
import { selectCurrentUser } from "../store/services/authSlice";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const Users = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [deleteUser] = useDeleteUserMutation();

  const {
    data,
    error,
    isLoading: isUserLoading,
  } = useGetAllUserQuery(user.institution_id);
  const deleteFunc = (id) => {
    console.log(id, "plant delete");
    deleteUser({id});
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => <TableButton row={row} navigateUrl={"/add_users"} deleteFunc={deleteFunc}/>,
      },
      {
        Header: "Id",
        accessor: "id",
      },

      {
        Header: "Username",
        accessor: "username",
      },

      {
        Header: "Role",
        accessor: "role",
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
        {data && <Table columns={columns} data={[...data.ret]} />}
      </div>
    </PageWrapper>
  );
};

export default Users;
