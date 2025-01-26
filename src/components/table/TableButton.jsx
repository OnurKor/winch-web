import React, { useState } from "react";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import matchIcon from "../../assets/icons/match.svg";
import liveIcon from "../../assets/logo/live.svg";
import navigateIcon from "../../assets/icons/navigate.svg";
import add from "../../assets/icons/add.svg";
import viewNav from "../../assets/icons/view.svg";
import { useNavigate } from "react-router-dom";
import { TbExchange } from "react-icons/tb";
import { IoIdCardOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { ImExit } from "react-icons/im";
const TableButton = ({
  edit = true,
  row,
  navigateUrl,
  setEditData = () => {},
  setEditModal = () => {},
  exit=false,
  deleteFunc,
  changeStatus,
  changeCard,
  goDevices,
  matchDevices,
  matchVisitors=false,
  setMatchModal,
  navigateHistory,
  view,
  viewOnMap,
  live,
  liveType,
  liveFunc,
  setAddLocationModal,
  addLocation,
  viewPlace,
  setMatchData = () => {},
  viewFunc,
  viewZone,
}) => {
  const navigate = useNavigate();
  const [match, setMatch] = useState(false);
  const [lives, setLives] = useState(false);
  const [type, setType] = useState();
  const [editItem, setEditItem] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [changeItem, setChangeItem] = useState(false);
  const [navigateItem, setNavigateItem] = useState(false);
  const [historyItem, setHistoryItem] = useState(false);
  const [viewItem, setViewItem] = useState(false);

  const handleEdit = () => {
    console.log(row.original);
    setEditModal(true);
    navigateUrl && navigate(`${navigateUrl}/${row.original.id}`);
    setEditData(row.original);
  };
  const handleExit = () => {
    console.log(row.original);
    changeStatus(row.original);
  };

  const handleDelete = () => {
    deleteFunc(row.original.id);
  };
  const handleChangeStatus = () => {
    
    changeStatus(row.original);
  };
  const handleChangeVisitor = () => {
    
    changeCard(row.original);
  };

  const GoNavigate = () => {
    console.log(row.original.id);
    navigate(`/add_devices/${row.original.id}`);
  };

  const matchDevicesFunc = () => {
    setMatchModal(true);
    setMatchData(row.original);
  };
  const navigateHistoryFunc = () => {
    if (navigateHistory === "devices") {
      navigate(`/device_history/${row.original.id}`);
    } else if (navigateHistory === "location") {
      navigate(`/location_history/${row.original.id}`);
    }
    else if (navigateHistory === "visitor") {
      navigate(`/visitor_history/${row.original.id}`);
    }
    else if (navigateHistory === "zoneHistory") {
      navigate(`/zone_history/${row.original.id}`);
    }
  };

  return (
    <div className="flex gap-1">
      {edit && (
        <div className="relative">
          <button
            onClick={handleEdit}
            onMouseOver={() => setEditItem(true)}
            onMouseLeave={() => setEditItem(false)}
            className="bg-blue-500 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={editIcon} alt="edit" className="w-6 h-4" />
          </button>
          {editItem && (
            <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
              Edit
            </span>
          )}
        </div>
      )}
      {exit && (
        <div className="relative">
          <button
            onClick={handleExit}
            onMouseOver={() => setEditItem(true)}
            onMouseLeave={() => setEditItem(false)}
            className="bg-red-500 text-white px-2 py-1 rounded-md w-8 flex justify-center items-center"
          >
            <ImExit/>
          </button>
          {editItem && (
            <span className="absolute -top-7 left-0 bg-red-500 text-white px-1 rounded-md">
              Visitor Log Out
            </span>
          )}
        </div>
      )}
      {changeCard && (
        <div className="relative">
          <button
            onClick={()=>handleChangeVisitor(row.original)}
            onMouseOver={() => setChangeItem(true)}
            onMouseLeave={() => setChangeItem(false)}
            className={`${row.original.is_visitor_card === 0 ? "bg-emerald-500" : "bg-red-400"} text-white px-2 py-1 rounded-md w-8`}
          >
           {row.original.is_visitor_card === 0 ?  <IoIdCardOutline /> : <MdOutlineSecurity />} 
          </button>
          {changeItem && (
            <span className="absolute -top-7 left-0 bg-emerald-500 text-white px-1 rounded-md">
             {row.original.is_visitor_card === 1 ? "Make Employee Card" : "Make Visitor Card"}
            </span>
          )}
        </div>
      )}
      {deleteFunc && (
        <div className="relative">
          <button
            onClick={handleDelete}
            onMouseOver={() => setDeleteItem(true)}
            onMouseLeave={() => setDeleteItem(false)}
            className="bg-red-400 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={deleteIcon} alt="delete" className="w-6 h-4" />
          </button>
          {deleteItem && (
            <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
              Delete
            </span>
          )}
        </div>
      )}
      {changeStatus &&
        row.original.status !==
          "assigned" &&(
            <div className="relative">
              <button
                onClick={handleChangeStatus}
                onMouseOver={() => setChangeItem(true)}
                onMouseLeave={() => setChangeItem(false)}
                className="bg-emerald-400 text-white px-2 py-1 rounded-md w-8"
              >
               <TbExchange />
              </button>
              {changeItem && (
                <span className="absolute -top-7 left-0 bg-emerald-300 text-white px-1 rounded-md">
                  Change Status
                </span>
              )}
            </div>
          )}

      {goDevices && (
        <div className="relative">
          <button
            onClick={GoNavigate}
            onMouseOver={() => setNavigateItem(true)}
            onMouseLeave={() => setNavigateItem(false)}
            className="bg-green-400 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={navigateIcon} alt="navigate" className="w-6 h-4" />
            {navigateItem && (
              <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
                View
              </span>
            )}
          </button>
        </div>
      )}

      {addLocation && row.original.type !== "node" && (
        <div className="relative">
          <button
            onClick={() => {
              setAddLocationModal(true);
              setEditData(row.original);
            }}
            onMouseOver={() => {
              setNavigateItem(true);
              setType(row.original.type);
            }}
            onMouseLeave={() => {
              setNavigateItem(false);
              setType("");
            }}
            className="bg-lightkozy text-white px-2 py-1 rounded-md w-8"
          >
            <img src={add} alt="navigate" className="w-6 h-4" />
            {navigateItem && (
              <span className="absolute -top-7 left-0 bg-lightkozy text-white px-2 rounded-md">
                {type == "plant"
                  ? "Add Place"
                  : type == "place"
                  ? "Add Room"
                  : " Add Node"}
              </span>
            )}
          </button>
        </div>
      )}
      {viewPlace && row.original.type == "place" && (
        <div className="relative">
          <button
            onClick={() => {
              viewFunc();
            }}
            onMouseOver={() => {
              setViewItem(true);
              setType(row.original.type);
            }}
            onMouseLeave={() => {
              setViewItem(false);
              setType("");
            }}
            className="bg-emerald-400 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={viewNav} alt="view" className="w-6 h-4" />
            {viewItem && (
              <span className="absolute -top-7 left-0 bg-emerald-400 text-white px-1 rounded-md">
                View Place
              </span>
            )}
          </button>
        </div>
      )}
      {viewZone && (
        <div className="relative">
          <button
            onClick={() => {
              viewFunc();
            }}
            onMouseOver={() => {
              setViewItem(true);
              setType(row.original.type);
            }}
            onMouseLeave={() => {
              setViewItem(false);
              setType("");
            }}
            className="bg-emerald-400 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={viewNav} alt="view" className="w-6 h-4" />
            {viewItem && (
              <span className="absolute -top-7 left-0 bg-emerald-400 text-white px-1 rounded-md">
                View Zone
              </span>
            )}
          </button>
        </div>
      )}

      {matchDevices && row.original.type === "node" && (
        <div className="relative">
          <button
            onClick={matchDevicesFunc}
            onMouseOver={() => setMatch(true)}
            onMouseLeave={() => setMatch(false)}
            className="bg-slate-500 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={matchIcon} alt="match" className="w-6 h-4" />
          </button>
          {match && (
            <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
              Match
            </span>
          )}
        </div>
      )}
      {matchVisitors && (
        <div className="relative">
          <button
            onClick={()=>{setMatchModal(true);setMatchData(row.original)}}
            onMouseOver={() => setMatch(true)}
            onMouseLeave={() => setMatch(false)}
            className="bg-slate-500 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={matchIcon} alt="match" className="w-6 h-4" />
          </button>
          {match && (
            <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
              Match
            </span>
          )}
        </div>
      )}
      {view && <div onClick={() => viewOnMap(row.original)}>View on Map</div>}
      {live && liveType === "room" && (
        <div className="relative border border-red-500">
          {" "}
          <button
            onClick={() => liveFunc(row.original)}
            onMouseOver={() => setLives(true)}
            onMouseLeave={() => setLives(false)}
            className="w-16 h-6"
          >
            <img
              src={liveIcon}
              alt="match"
              className="w-full h-full border border-red-500"
            />
          </button>
          {lives && (
            <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
              Live
            </span>
          )}
        </div>
      )}

      {navigateHistory && (
        <div className="relative">
          <button
            onClick={navigateHistoryFunc}
            onMouseOver={() => setHistoryItem(true)}
            onMouseLeave={() => setHistoryItem(false)}
            className="bg-slate-400 text-white px-2 py-1 rounded-md w-8"
          >
            <img src={navigateIcon} alt="navigate" className="w-6 h-4" />
            {historyItem && (
              <span className="absolute -top-7 left-0 bg-slate-500 text-white px-1 rounded-md">
                View History
              </span>
            )}
          </button>
        </div>
      )}
      {live &&
        liveType === "device" &&
        row.original.device_type === "beacon" && (
          <div className="relative">
            <button
              onClick={() => liveFunc(row.original)}
              onMouseOver={() => setLives(true)}
              onMouseLeave={() => setLives(false)}
              className="w-16 h-6  "
            >
              <img src={liveIcon} alt="match" className="w-full h-full " />
            </button>
            {lives && (
              <span className="absolute -top-7 left-0 bg-gray-300 text-white px-1 rounded-md">
                Live
              </span>
            )}
          </div>
        )}
    </div>
  );
};

export default TableButton;
