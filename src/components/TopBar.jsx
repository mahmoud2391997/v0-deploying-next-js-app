import { useState } from "react";
import { Bell, Search, X } from "lucide-react";

export default function TopBar() {
  return (
    <nav className="flex flex-row-reverse h-24 fixed top-0 z-50 w-full justify-between items-center p-4 bg-white shadow-md border-b border-gray-100">
      <div className="h-[85%]">
        <img src="/logo2.png" className="h-full" />
      </div>
      <SearchBar />
      <div className="flex items-center space-x-6 space-x-reverse">
        <UserComponent />
        <LanguageSelector />
        <div className="divider-gradient w-[2px] h-8 mx-2"></div>
        <NotificationIcon />
      </div>
    </nav>
  );
}

const UserComponent = () => {
  return (
    <div className="flex min-w-[200px] justify-between items-center bg-white">
      <div className="relative w-14 h-14 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full flex justify-center items-center border-2 border-purple-200">
        <span className="text-lg font-medium gradient-text">ما</span>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
      </div>
      <div className="flex flex-col justify-center ml-4 mr-3">
        <p className="text-[#2490ef] text-xl font-semibold">محمود السيد</p>
        <p className="text-gray-500 text-lg">مستعمل</p>
      </div>
      <div className="divider-gradient w-[2px] h-8 mx-2"></div>
    </div>
  );
};

const NotificationIcon = () => {
  const [unread, setUnread] = useState(3);

  return (
    <div className="relative cursor-pointer mr-5 group">
      <div className="p-2 rounded-full transition-colors duration-200 group-hover:bg-purple-50">
        <Bell className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" />
      </div>
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-400 to-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
          {unread}
        </span>
      )}
    </div>
  );
};

const languages = [
  { code: "en", name: "English", flag: "https://altharwa.erpnextksa.com/assets/datavalue_theme_15/images/us.svg" },
  { code: "ar", name: "Arabic", flag: "https://altharwa.erpnextksa.com/assets/datavalue_theme_15/images/sa.svg" },
];

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState(languages[1]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={selectedLang.flag} alt={selectedLang.name} className="w-5 h-5 rounded-full" />
        <span className="text-gray-700">{selectedLang.name}</span>
        <span className={`text-xs text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>▼</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl w-40 z-50 overflow-hidden">
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-150 ${
                selectedLang.code === lang.code
                  ? "bg-purple-50 text-purple-700"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedLang(lang);
                setIsOpen(false);
              }}
            >
              <img src={lang.flag} alt={lang.name} className="w-5 h-5 rounded-full ml-2" />
              <span className="text-sm">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative flex w-[25%] items-center">
      <Search className="absolute left-4 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-purple-300 focus:border-transparent focus:bg-white transition-all duration-200"
      />
      {query && (
        <X
          className="absolute left-12 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          size={18}
          onClick={() => setQuery("")}
        />
      )}
    </div>
  );
};
