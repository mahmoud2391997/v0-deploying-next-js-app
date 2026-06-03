

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
// import LoginPage from './pages/login';
import MainPage from './pages/main';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import FileUploadComponent from "./components/test";
import OwnersPage from "./pages/owners/index"

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
import ContractPage from './pages/contracts';
import EditContract from './pages/contracts/editSingleContract';
import SingleContract from './pages/contracts/singleContract';
import PropertiesList from './pages/properties/page';
import SingleProperty from './pages/properties/singleProperty';
import UnitsPage from './pages/units';
import TenantsPage from './pages/tenants';
const Layout = ({ children }) => {
  const location = useLocation();

  const showLayout = true;

  return (
    <div className="relative bg-gray-50 min-h-screen pt-[94px]">
      {showLayout && <TopBar />}
      <div className="relative flex">
        {showLayout && <SideBar />}
        <main className="flex-1 p-6 mr-28 min-h-[calc(100vh-94px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {

  const fields = [
    { name: 'اسم العقار', dataType: 'text', value: 'برج النور' },
    { name: 'اسم المستأجر', dataType: 'text', value: 'أحمد حسن' },
    { name: 'اسم الممثل', dataType: 'text', value: 'محمد علي' },

    { name: 'تاريخ بدء الإيجار', dataType: 'date', value: '2025-01-01' },
    { name: 'تاريخ انتهاء الإيجار', dataType: 'date', value: '2026-01-01' },
    { name: 'عدد دفعات الايجار', dataType: 'number', value: 50000 },
    { name: 'القيمة الاجمالية للدفعة', dataType: 'number', value: 50000 },

  ];
  const navs = {
    units: [
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
        name: "الوحدات المؤجرة",
        icon: faBuildingCircleCheck,
        statSubtitle: "System Health",
        statTitle: "98%",
        statArrow: "up",
        statPercent: 0.5,
        statDescripiron: "Since last month",
        statIconName: faBuildingCircleCheck,
      },
      {
        name: "الوحدات الشاغرة",
        icon: faBuildingCircleExclamation,
        statSubtitle: "System Health",
        statTitle: "98%",
        statArrow: "up",
        statPercent: 0.5,
        statDescripiron: "Since last month",
        statIconName: faBuildingCircleExclamation,
      },
    ],
    renters: [
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
        name: "المستآجرين",
        icon: faBuildingUser,
        statSubtitle: "Customers",
        statTitle: "1,234",
        statArrow: "down",
        statPercent: 2.5,
        statDescripiron: "Since last week",
        statIconName: faBuildingUser,
      },
    ],
    contracts: [
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
        icon: faFileCircleQuestion,
        statSubtitle: "System Health",
        statTitle: "98%",
        statArrow: "up",
        statPercent: 0.5,
        statDescripiron: "Since last month",
        statIconName: faFileCircleQuestion,
      },
      {
        name: "عقود اﻹيجار التي تنتهي خلال ٣ شهور",
        icon: faHourglassEnd,
        statSubtitle: "System Health",
        statTitle: "98%",
        statArrow: "up",
        statPercent: 0.5,
        statDescripiron: "Since last month",
        statIconName: faHourglassEnd,
      },
      {
        name: "عقود اﻹيجار التي تنتهي خلال شهر",
        icon: faHourglassHalf,
        statSubtitle: "System Health",
        statTitle: "98%",
        statArrow: "up",
        statPercent: 0.5,
        statDescripiron: "Since last month",
        statIconName: faHourglassHalf,
      },
    ]
  };
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={<LoginPage />}
        /> */}
        <Route
          path="/"
          element={
            <Layout>
              < MainPage/>
            </Layout>
          }
        />
        <Route
          path="/contracts"
          element={
            <Layout>
              < ContractPage fields={fields} navs={navs.contracts} pageTitle={"العقود"}/>
            </Layout>
          }
        />
       <Route
          path="/properties"
          element={
<Layout>
<PropertiesList/>

</Layout>
          }
        />
          <Route
          path="/properties/single"
          element={
<Layout>
<SingleProperty/>

</Layout>
          }
        />
        {/* <Route
          path="/renters"
          element={
            <Layout>
              <Renter fields={fields}  navs={navs.renters} pageTitle={"المستأجرين"}/>
            </Layout>
          }
        /> */}

      <Route path="/contracts/:id" element={
                    <Layout>

                      <SingleContract />
                    </Layout>

        } />
         <Route
        path="/owners/:type"
        element={
        <Layout>
          <OwnersPage />
        </Layout>
        }
      />
       <Route
        path="/owners"
        element={
        <Layout>
          <OwnersPage />
        </Layout>
        }
      />
         <Route path="/editContract/:id" element={
                    <Layout>
                      <EditContract />
                    </Layout>
        } />
        <Route path="/units/:type" element={<Layout><UnitsPage /></Layout>} />
        <Route path="/units" element={<Layout><UnitsPage /></Layout>} />
        <Route path="/tenants/:type" element={<Layout><TenantsPage /></Layout>} />
        <Route path="/tenants" element={<Layout><TenantsPage /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
