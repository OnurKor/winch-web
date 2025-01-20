import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineOnDeviceTraining,
} from "react-icons/md";
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
    ],
  },

  {
    id: 4,
    poKey: "PERSONEL",
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
    ],
  },
];
