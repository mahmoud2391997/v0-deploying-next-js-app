import Map from "../../components/MapComponent"
import ProgressBar from "../../components/Dashboards"
import CardStats from "../../components/CardStats"
import {
    faHouse,
    faUser,
    faCog,
    faBuilding,
    faBuildingUser,
    faFileContract,
    faCity,
    faHouseUser,
    faBuildingCircleArrowRight,
    faBuildingCircleCheck,
    faBuildingCircleExclamation,
    faFile,
    faFileArchive,
    faFileClipboard,
    faFileAlt,
    faFileCircleCheck,
    faFileHalfDashed,
    faFileInvoiceDollar,
    faFolderClosed,
    faHourglassEnd,
    faHourglassHalf,
    faFileCircleXmark,
    faFileCircleExclamation,
    faCashRegister,
    faMoneyBill,
    faMoneyBills,
    faMoneyCheck,
    faMoneyBill1Wave,
    faCalendarCheck,
    faCalendarPlus,
    faBan,
    faMoneyBillTransfer,
    faMoneyBillTrendUp,
    faExclamation,
    faTools,
    faUsers,
    faFileCircleQuestion,
  } from "@fortawesome/free-solid-svg-icons";
import Dashboards from "../../components/tab1";
export default function MainPage(){

const navs = [

    {
      name: "الملاك",
      icon: faHouseUser,
      statSubtitle: "New Users",
      statTitle: "2,356",
      statArrow: "down",
      statPercent: 1.1,
      statDescripiron: "Since last week",
      statIconName: faHouseUser,
    },
    {
      name: "العقارات",
      icon: faCity,
      statSubtitle: "Sales",
      statTitle: "924",
      statArrow: "up",
      statPercent: 12,
      statDescripiron: "Since last month",
      statIconName: faCity,
    },
    {
      name: "الوحدات",
      icon: faBuilding,
      statSubtitle: "Performance",
      statTitle: "49,65%",
      statArrow: "up",
      statPercent: 12,
      statDescripiron: "Since last month",
      statIconName: faBuilding,
    },
    {
      name: "المستآجرين",
      icon: faBuildingUser,
      statSubtitle: "Customers",
      statTitle: "1,234",
      statArrow: "down",
      statPercent: 2.5,
      statDescripiron: "Since last week",
      statIconName: faBuildingUser,
    },
  
    {
      name: "الوحدات المؤجرة",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faBuildingCircleCheck,
    },
    {
      name: "الوحدات الشاغرة",      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faBuildingCircleExclamation,
    },
    {
      name: "العقود",
      icon: faFileContract,
      statSubtitle: "Contracts",
      statTitle: "45",
      statArrow: "up",
      statPercent: 8.2,
      statDescripiron: "Since last month",
      statIconName: faFileContract,
    },
    {
      name: "عقود الايجار المنتهية",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faFileCircleQuestion,
    },
    {
      name: "عقود اﻹيجار التي تنتهي خلال ٣ شهور",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faHourglassEnd,
    },
    {
      name: "عقود اﻹيجار التي تنتهي خلال شهر",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faHourglassHalf,
    },
    {
      name: "المبالغ المستحقة للشهر الحالي",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faMoneyBills,
    },
    {
      name: "المبالغ المستحقة للشهر القادم",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faCalendarPlus,
    },
    {
      name: "المبالغ الغير مسددة",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faExclamation,
    },
    {
      name: "مشرفين العقارات",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faUsers,
    },
    {
      name: "الصيانة",
      icon: faCog,
      statSubtitle: "System Health",
      statTitle: "98%",
      statArrow: "up",
      statPercent: 0.5,
      statDescripiron: "Since last month",
      statIconName: faTools,
    },
  ];


    return <>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 " style={{direction:"rtl"}}>
        {navs.map((nav, index) => (
          <CardStats
            key={index}
            index={index}
            statSubtitle={nav.name}
            statTitle={nav.statTitle}
            statArrow={nav.statArrow}
            statPercent={nav.statPercent}
            statDescripiron={nav.statDescripiron}
            statIconName={nav.statIconName}
          />
        ))}
      </div>
  
 <Dashboards/>
 <Map/>
    </>
}