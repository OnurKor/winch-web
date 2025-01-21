import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation, useGetAllDeviceQuery } from "../../store/services/mainApi";
import TableButton from "../../components/table/TableButton";
import Table, { StatusPill } from "../../components/table/NewTables";
import PageWrapper from "../../components/PageWrapper";
import AppHeader from "../../components/AppHeader";
import { selectCurrentUser } from "../../store/services/authSlice";

const DevicesList = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [deleteUser] = useDeleteUserMutation();

  const { data } = useGetAllDeviceQuery();
  console.log("useGetAllDeviceQuery",data)

  const deleteFunc = (id) => {
    console.log(id, "plant delete");
    deleteUser({id});
  };
console.log("burası çalısıyor")
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
        Header: "Mac Adresi",
        accessor: "mac_address",
      },

      {
        Header: "Plaka",
        accessor: "plate",
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
        header="Devices Listing"
        subHeader="Home - Devices List"
        buttonName="Add Devices"
        func={() => navigate("/add_users")}
      />

      <div className="w-full">
        {data && <Table columns={columns} data={[...data?.content || []]} />}
      </div>
    </PageWrapper>
  );
};

export default DevicesList;
