// import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import PageWrapper from "../../components/PageWrapper";
// import { AiOutlineRight, AiOutlineDown } from "react-icons/ai"; // İkonlar için react-icons'u kullanıyoruz.
// import AnimatedBarChart from "../../components/AnimatedCharts";
// import MainTabs from "../../components/tab/MainTabs";
// import TwoMonths from "../../components/datePicker/TwoMonths"
// import { useSelector } from "react-redux";
// import { selectDay } from "../../store/services/mainSlice";
// import SummaryChart from "../../components/SummaryCharts";
// import DoughnutChart from "../../components/DoughnutChart";
// import { selectCurrentUser } from "../../store/services/authSlice";
// import { useGetAllUserQuery, useGetUsersMutation } from "../../store/services/mainApi";

// const summaryData = [
//   {
//     device_id: 4,
//     mac: "01anchor",
//     name: "bati_anchor1",
//     total_duration_seconds: 16609.0,
//     total_duration: "4 hours, 36 minutes, 49 seconds",
//     density: 10,
//   },
//   {
//     device_id: 5,
//     mac: "02anchor",
//     name: "bati_anchor2",
//     total_duration_seconds: 16589.0,
//     total_duration: "4 hours, 36 minutes, 29 seconds",
//     density: 10,
//   },
//   {
//     device_id: 7,
//     mac: "01Beacon",
//     name: "beacon1",
//     total_duration_seconds: 280.0,
//     total_duration: "0 hours, 4 minutes, 40 seconds",
//     density: 1,
//   },
//   {
//     device_id: 8,
//     mac: "beacon2",
//     name: "beacon2",
//     total_duration_seconds: 4732.0,
//     total_duration: "1 hours, 18 minutes, 52 seconds",
//     density: 5,
//   },
//   {
//     device_id: 12,
//     mac: "B3",
//     name: "beacon3",
//     total_duration_seconds: 362.0,
//     total_duration: "0 hours, 6 minutes, 2 seconds",
//     density: 2,
//   },
// ];

// const TreeItem = ({ item, data }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleOpen = () => setIsOpen(!isOpen);

//   // Alt öğeleri al
//   const children = data.filter((child) => child.parent_id === item.id);

//   return (
//     <div className="ml-5">
//       <div
//         onClick={toggleOpen}
//         className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
//       >
//         {/* Duruma göre ikonu değiştir */}
//         {isOpen ? (
//           <AiOutlineDown className="text-blue-500" size={20} />
//         ) : (
//           <AiOutlineRight className="text-blue-500" size={20} />
//         )}
//         <span className="text-gray-800 font-semibold">{item.name}</span>
//       </div>
//       {/* Alt öğeleri render et */}
//       {isOpen && (
//         <div className="ml-4 border-l-2 border-gray-200 pl-4">
//           {children.map((child) => (
//             <TreeItem key={child.id} item={child} data={data} />
//           ))}
//         </div>
//       )}

//     </div>
//   );
// };

// export default function AddCampus() {
//   const data = [
//     { id: 1, name: "Plant A", type: "plant", parent_id: null },
//     { id: 2, name: "Place A1", type: "place", parent_id: 1 },
//     { id: 3, name: "Room A1-1", type: "room", parent_id: 2 },
//     { id: 4, name: "Node A1-1-1", type: "node", parent_id: 3 },
//     { id: 5, name: "Node A1-1-2", type: "node", parent_id: 3 },
//     { id: 6, name: "Room A1-2", type: "room", parent_id: 2 },
//     { id: 7, name: "Node A1-2-1", type: "node", parent_id: 6 },
//     { id: 8, name: "Place A2", type: "place", parent_id: 1 },
//     { id: 9, name: "Room A2-1", type: "room", parent_id: 8 },
//     { id: 10, name: "Node A2-1-1", type: "node", parent_id: 9 },
//     { id: 11, name: "Plant B", type: "plant", parent_id: null },
//     { id: 12, name: "Place B1", type: "place", parent_id: 11 },
//     { id: 13, name: "Room B1-1", type: "room", parent_id: 12 },
//     { id: 14, name: "Node B1-1-1", type: "node", parent_id: 13 },
//   ];

//   const rootItems = data.filter((item) => item.parent_id === null);
//   const connections = [
//     {
//         "device_id": 1,
//         "location_id": null,
//         "connection_status": "added",
//         "total_duration_seconds": 163259.0,
//         "total_duration": "45 hours, 20 minutes, 59 seconds",
//         "density": 14,
//         "location_info": {}
//     },
//     {
//         "device_id": 1,
//         "location_id": 1,
//         "connection_status": "added",
//         "total_duration_seconds": 23265.0,
//         "total_duration": "6 hours, 27 minutes, 45 seconds",
//         "density": 13,
//         "location_info": {
//             "id": 1,
//             "institution_id": 1,
//             "type": "plant",
//             "name": "main plant",
//             "description": "main plant",
//             "parent_id": null,
//             "plant": "main plant",
//             "plant_id": 1,
//             "place": null,
//             "place_id": null,
//             "place_sketch_id": null,
//             "place_sketch_image_url": null,
//             "room": null,
//             "room_id": null,
//             "node": null,
//             "node_id": null,
//             "level": 1,
//             "sketch_id": 78,
//             "sketch_image_url": "static/image/sketch/a2d8211f-2716-4001-aa7c-e296659bbdfc.png",
//             "lat": 39.926,
//             "lng": 33.2319,
//             "status": 1,
//             "created_time": "2024-09-26 14:18:00",
//             "updated_time": "2024-11-08 12:08:48",
//             "deleted_time": null,
//             "is_delete": 1
//         }
//     },
//     {
//         "device_id": 1,
//         "location_id": 1,
//         "connection_status": "heartbeat",
//         "total_duration_seconds": 2981.0,
//         "total_duration": "0 hours, 49 minutes, 41 seconds",
//         "density": 5,
//         "location_info": {
//             "id": 1,
//             "institution_id": 1,
//             "type": "plant",
//             "name": "main plant",
//             "description": "main plant",
//             "parent_id": null,
//             "plant": "main plant",
//             "plant_id": 1,
//             "place": null,
//             "place_id": null,
//             "place_sketch_id": null,
//             "place_sketch_image_url": null,
//             "room": null,
//             "room_id": null,
//             "node": null,
//             "node_id": null,
//             "level": 1,
//             "sketch_id": 78,
//             "sketch_image_url": "static/image/sketch/a2d8211f-2716-4001-aa7c-e296659bbdfc.png",
//             "lat": 39.926,
//             "lng": 33.2319,
//             "status": 1,
//             "created_time": "2024-09-26 14:18:00",
//             "updated_time": "2024-11-08 12:08:48",
//             "deleted_time": null,
//             "is_delete": 1
//         }
//     },
//     {
//         "device_id": 1,
//         "location_id": null,
//         "connection_status": "disconnect",
//         "total_duration_seconds": 1416.0,
//         "total_duration": "0 hours, 23 minutes, 36 seconds",
//         "density": 4,
//         "location_info": {}
//     }
// ]
// const tabs = [
//   {
//     label: 'Tab 1',
//     content: <div>Tab 1 İçeriği</div>,
//   },
//   {
//     label: 'Tab 2',
//     content: <div>Tab 2 İçeriği</div>,
//   },
//   {
//     label: 'Tab 3',
//     content: <div>Tab 3 İçeriği</div>,
//   },
// ];
// const [openDatePicker, setOpenDatePicker] = useState(false);
// const {firstDay, secondDay}=useSelector(selectDay)
// const user = useSelector(selectCurrentUser);

// const {
//   data:isUser,
//   error,
//   isLoading: isUserLoading,
// } = useGetAllUserQuery(user.institution_id);
//   return (
//     <PageWrapper>
//       szdf

//       <div className="p-4">
//         {rootItems.map((item) => (
//           <TreeItem key={item.id} item={item} data={data} />
//         ))}
//       </div> <AnimatedBarChart data={connections} />
//       <SummaryChart summary={summaryData} />

//       <MainTabs tabs={tabs} />
//       <TwoMonths
//                   setOpenModal={setOpenDatePicker}

//                 />
// SADIK
//     </PageWrapper>
//   );
// }

import React from "react";

const AddCampus = () => {
  return <div>AddCampus</div>;
};

export default AddCampus;
