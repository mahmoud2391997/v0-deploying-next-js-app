import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faCog,
  faBuilding,
  faBuildingUser,
  faFileContract,
  faCity,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideBar() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navs = [
    {
      name: "الصفحة الرئيسية",
      icon: faHouse,
      options: [
        { name: "عرض الصفحة", link: "/view-home" },
        { name: "تعديل الصفحة", link: "/edit-home" }
      ],
      link: "/"
    },
    {
      name: "الملاك",
      icon: faHouseUser,
      options: [
        { name: "إضافة مالك", link: "/owners" },
        { name: "ملاك لهم ممثلين", link: "/owners/representative" },
        { name: "ملاك نشطين ", link: "/owners/active" },
      ],
      link: "/owners"
    },
    {
      name: "العقارات",
      icon: faCity,
      options: [
        { name: "إضافة عقار", link: "/properties/add" },
        { name: "عرض العقارات", link: "/properties/view" }
      ],
      link: "/properties"
    },
    {
      name: "الوحدات",
      icon: faBuilding,
      options: [
        { name: "الوحدات الشاغرة", link: "/units/vacant" },
        { name: "الوحدات المؤجرة", link: "/units/rented" },
        { name: "إضافة وحدة", link: "/units/add" },
        { name: "عرض الوحدات", link: "/units/view" }
      ],
      link: "/units"
    },
    {
      name: "المستآجرين",
      icon: faBuildingUser,
      options: [
        { name: "مستأجرين متعسرين", link: "/tenants/delinquent" },
        { name: "مستأجرين متأخرين", link: "/tenants/late" },
        { name: "إضافة مستأجر", link: "/tenants/add" },
        { name: "عرض المستأجرين", link: "/tenants/view" }
      ],
      link: "/tenants"
    },
    {
      name: "العقود",
      icon: faFileContract,
      options: [
        { name: "عقودايجار تنتهي خلال ٣ شهور", link: "/contracts/ending-in-3-months" },
        { name: "عقودايجار تنتهي خلال شهر", link: "/contracts/ending-in-1-month" },
        { name: "عقود ايجار منتهية", link: "/contracts/expired" },
        { name: "إضافة عقد", link: "/contracts/add" },
        { name: "عرض العقود", link: "/contracts/view" }
      ],
      link: "/contracts"
    },
  ];

  const isActive = (navLink) => {
    if (navLink === "/") return location.pathname === "/";
    return location.pathname.startsWith(navLink);
  };

  return (
    <div
      className="fixed z-[55] right-0 element p-3 text-white md:w-28 w-16 shadow-xl"
      style={{ height: "calc(100vh - 94px)" }}
    >
      <ul className="flex flex-col justify-start gap-1" style={{ height: "calc(100vh - 94px)" }}>
        {navs.map((nav, index) => {
          const active = isActive(nav.link);
          return (
            <li
              key={index}
              className={`flex flex-col justify-center items-center p-2.5 rounded-xl cursor-pointer relative transition-all duration-200 ${
                active
                  ? "bg-white/20 shadow-lg"
                  : "hover:bg-white/15"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(nav.link)}
            >
              <FontAwesomeIcon
                icon={nav.icon}
                size="lg"
                className={`transition-transform duration-200 ${
                  hoveredIndex === index || active ? "scale-110" : ""
                }`}
              />
              <span className="hidden md:block text-xs md:text-sm mt-1 font-medium">
                {nav.name}
              </span>
              {hoveredIndex === index && (
                <div className="absolute top-0 right-full mr-2 w-52 bg-white text-gray-800 shadow-2xl rounded-xl overflow-hidden border border-gray-100">
                  <div className="py-2">
                    {nav.options.map((option, idx) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(option.link);
                        }}
                        key={idx}
                        className="px-4 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 cursor-pointer transition-all duration-150 text-right text-sm font-medium border-b border-gray-50 last:border-b-0"
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
