import { AiOutlineHome } from "react-icons/ai";
import { SiAmazonecs } from "react-icons/si";
import {
  BsCalendar2Week,
  BsFillDeviceSsdFill,
  BsPersonBadgeFill,
} from "react-icons/bs";
import {
  MdOutlineOnDeviceTraining,
  MdOutlineLocationCity,
} from "react-icons/md";
import { PiFolderLockBold } from "react-icons/pi";
import { CgTemplate } from "react-icons/cg";

import { FaUsersBetweenLines } from "react-icons/fa6";

export const leftMenuTabs = [
  {
    id: 1,
    poKey: "Home",
    subTitle: [
      {
        id: 11,
        name: " DashBoard",
        icon: AiOutlineHome,
        route: "/",
      },
    ],
  },
  {
    id: 2,
    poKey: "LOCATİONS",
    subTitle: [
      {
        id: 21,
        name: "Locations",
        icon: MdOutlineLocationCity,
        route: "locations",
      },
      {
        id: 22,
        name: "Zones",
        icon: SiAmazonecs,
        route: "zones",
      },
      // {
      //   id: 21,
      //   name: "Plant List",
      //   icon: FiMonitor,
      //   route: "plant_list",
      // },
      // {
      //   id: 32,
      //   name: "Place List",
      //   icon: TbMapCog,
      //   route: "place_list",
      // },
      // {
      //   id: 31,
      //   name: "Room List",
      //   icon: TbMapCog,
      //   route: "room_list",
      // },
    ],
  },
  {
    id: 3,
    poKey: "DEVİCES",
    icon: CgTemplate,
    subTitle: [
      {
        id: 41,
        name: "Devices List",
        poKey: "Devices",
        icon: MdOutlineOnDeviceTraining,
        subTitle: [],
        route: "devices_list",
      },
      {
        id: 41,
        name: "Beacon List",
        poKey: "Beacon",
        icon: BsFillDeviceSsdFill,
        subTitle: [],
        route: "beacon_list",
      },
    ],
  },

  {
    id: 4,
    poKey: "PERSONEL & ASSETS",
    icon: CgTemplate,
    subTitle: [
      {
        id: 41,
        name: "Users",
        poKey: "Users",
        icon: FaUsersBetweenLines,
        subTitle: [],
        route: "users",
      },
      {
        id: 42,
        name: "Personnel",
        poKey: "Personnel",
        icon: BsPersonBadgeFill,
        subTitle: [],
        route: "personel",
      },
      {
        id: 43,
        name: "Assets",
        poKey: "assets",
        icon: PiFolderLockBold,
        subTitle: [],
        route: "assets",
      },
      // {
      //   id: 44,
      //   name: "Car Manage",
      //   poKey: "Car manage",
      //   icon: AiFillCar,
      //   subTitle: [],
      //   route: "module",
      // },
      // {
      //   id: 45,
      //   name: "Room",
      //   poKey: "Room",
      //   icon: FaList,
      //   subTitle: [],
      //   route: "room",
      // },
      // {
      //   id: 46,
      //   name: "Templates",
      //   poKey: "Templates",
      //   icon: CgTemplate,
      //   route: "templates",
      // },
    ],
  },
  {
    id: 4,
    poKey: "TimeSheets",
    icon: CgTemplate,
    subTitle: [
      {
        id: 41,
        name: "TimeSheets",
        poKey: " TimeSheets",
        icon: BsCalendar2Week,

        subTitle: [
          {
            id: 111,
            name: "Dashboard",
            icon: AiOutlineHome,
            route: "/dashboard",
          },
          {
            id: 112,
            name: "Settings",
            icon: AiOutlineHome,
            route: "/settings",
          },
        ],
      },

      // {
      //   id: 44,
      //   name: "Car Manage",
      //   poKey: "Car manage",
      //   icon: AiFillCar,
      //   subTitle: [],
      //   route: "module",
      // },
      // {
      //   id: 45,
      //   name: "Room",
      //   poKey: "Room",
      //   icon: FaList,
      //   subTitle: [],
      //   route: "room",
      // },
      // {
      //   id: 46,
      //   name: "Templates",
      //   poKey: "Templates",
      //   icon: CgTemplate,
      //   route: "templates",
      // },
    ],
  },
];
