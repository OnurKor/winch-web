import React from "react";
import PageWrapper from "../../components/PageWrapper";
import DoughnutChartActive from "../../components/charts/DoughnutChartActive";
import {
  useGetAllDeviceQuery,
  useGetAllUsersQuery,
} from "../../store/services/mainApi";

const Dashboard = () => {
  const { data: devices } = useGetAllDeviceQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: users } = useGetAllUsersQuery();
  console.log("devices", devices);
  console.log("users", users);
  const devicesCount = devices?.content?.length;
  const usersCount = users?.content?.length;

  return (
    <PageWrapper>
      <h1>Dashboard</h1>
      <div className="flex items-center justify-center h-full ">
        <DoughnutChartActive
          activeCards={devicesCount}
          totalCards={usersCount}
          title={"daily_visitor_status"}
          colors={["#F1416C", "#60A5FA"]}
          labels={["Cihaz Sayısı", "Kullanıcı Sayısı"]}
        />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
