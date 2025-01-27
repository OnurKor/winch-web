import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import AnimatedImage from "../components/LogoAnimation";
import Toast from "../components/toastMessage/Toast";
// import Home from "../pages/admin/Home";
import { useAuth } from "../hooks/useAuth";
import DeviceList from "../pages/admin/DevicesList";
import AddDevice from "../pages/AddDevice";

const Login = lazy(() => import("../pages/Login"));

const AddCampus = lazy(() => import("../pages/admin/AddCampus"));
const Home = lazy(() => import("../pages/admin/Home"));
// const SecurityHome = lazy(() => import("../pages/security/SecurityHome"));
// const VisitorHistory = lazy(() => import("../pages/security/VisitorHistory"));
// const ListInstutions = lazy(() => import("../pages/superAdmin/ListInstutions"));
// const AddDevices = lazy(() => import("../pages/superAdmin/AddDevices"));
// const DeviceHistory = lazy(() => import("../pages/admin/DeviceHistory"));
// const ViewPlace = lazy(() => import("../pages/admin/ViewPlace"));
// const LocationHistory = lazy(() => import("../pages/admin/LocationHistory"));
// const RoomHistory = lazy(() => import("../pages/admin/RoomHistory"));
// const PlantList = lazy(() => import("../pages/admin/PlantList"));
// const PlaceList = lazy(() => import("../pages/admin/PlaceList"));
// const Zones = lazy(() => import("../pages/admin/Zones"));
// const Zone = lazy(() => import("../pages/admin/Zone"));
// const ZoneHistory = lazy(() => import("../pages/admin/ZoneHistory"));
// const RoomList = lazy(() => import("../pages/admin/RoomList"));
const Devices = lazy(() => import("../pages/admin/DevicesList"));
// const Beacon = lazy(() => import("../pages/admin/BeaconList"));
// const Personel = lazy(() => import("../pages/Personel"));
const Users = lazy(() => import("../pages/admin/Users"));
const AddUsers = lazy(() => import("../pages/AddUsers"));
// const SmartLocations = lazy(() => import("../pages/SmartLocations"));
// const Assets = lazy(() => import("../pages/Assets"));
// const CarManage = lazy(() => import("../pages/CarManage"));
// const Room = lazy(() => import("../pages/Room"));
// const Templates = lazy(() => import("../pages/Templates"));
// const RoomLive = lazy(() => import("../pages/admin/RoomLive"));
const Module = lazy(() => import("../pages/Module"));
// const HomeClient = lazy(() => import("../pages/HomeClient"));
// const Locations = lazy(() => import("../pages/admin/Locations"));
// const DeleteLocations = lazy(() => import("../pages/admin/DeleteLocations"));

const routesConfig = {

  admin: [
    { path: "/", element: <AddCampus />, index: true },
    { path: "/devices_list", element: <Devices />},
    { path: "/users", element: <Users /> },
    { path: "/add_users", element: < AddUsers/> },
    { path: "/add_device", element: < AddDevice/> },
  ],

};
const AppRouter = () => {
   const user = useAuth();
   console.log("user", user);
   const userRoutes = user?.role ? routesConfig[user.role] : [];
  return (
    <Suspense fallback={<AnimatedImage />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRouter allowedRoles={[user?.role]} />}>
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <Home />
              ) : null
            }
          >
            {userRoutes &&
              userRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                  index={route.index}
                />
              ))}
            <Route path="*" element={<Module />} />
          </Route>
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  );
};

export default AppRouter;
