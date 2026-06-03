import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faBuildingCircleCheck, faBuildingCircleExclamation, faPlus, faMinus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CardStats from "../../components/CardStats";

const mockUnits = [
  { id: 1, name: "شقة ١٠١", property: "برج النور", floor: 1, type: "سكني", area: "١٥٠م²", status: "مؤجرة", tenant: "شركة النور", rent: "٥٠,٠٠٠ ر.س" },
  { id: 2, name: "شقة ١٠٢", property: "برج النور", floor: 1, type: "سكني", area: "١٣٠م²", status: "شاغرة", tenant: "-", rent: "٤٥,٠٠٠ ر.س" },
  { id: 3, name: "متجر ١", property: "مركز التسوق", floor: 0, type: "تجاري", area: "٢٠٠م²", status: "مؤجرة", tenant: "مؤسسة السلام", rent: "٧٥,٠٠٠ ر.س" },
  { id: 4, name: "مكتب ٢٠١", property: "برج الأعمال", floor: 2, type: "مكتبي", area: "١٠٠م²", status: "مؤجرة", tenant: "شركة التقنية", rent: "٣٥,٠٠٠ ر.س" },
  { id: 5, name: "فيلا ١", property: "حي النخيل", floor: 0, type: "سكني", area: "٤٠٠م²", status: "شاغرة", tenant: "-", rent: "١٢٠,٠٠٠ ر.س" },
  { id: 6, name: "شقة ٢٠١", property: "برج النور", floor: 2, type: "سكني", area: "١٦٠م²", status: "مؤجرة", tenant: "أحمد محمد", rent: "٥٥,٠٠٠ ر.س" },
  { id: 7, name: "متجر ٢", property: "مركز التسوق", floor: 0, type: "تجاري", area: "١٨٠م²", status: "مؤجرة", tenant: "محل الأزهار", rent: "٦٥,٠٠٠ ر.س" },
  { id: 8, name: "بنتهاوس", property: "برج النور", floor: 10, type: "سكني", area: "٣٠٠م²", status: "شاغرة", tenant: "-", rent: "١٥٠,٠٠٠ ر.س" },
];

const unitFormFields = [
  { name: "unitName", label: "اسم الوحدة", type: "text", required: true },
  { name: "property", label: "العقار", type: "text", required: true },
  { name: "floor", label: "الطابق", type: "number", required: true },
  { name: "type", label: "النوع", type: "select", required: true, options: ["سكني", "تجاري", "مكتبي"] },
  { name: "area", label: "المساحة", type: "text", required: true },
  { name: "rent", label: "قيمة الإيجار", type: "text", required: true },
];

const navs = [
  { name: "الوحدات", statTitle: mockUnits.length, statIconName: faBuilding },
  { name: "الوحدات المؤجرة", statTitle: mockUnits.filter(u => u.status === "مؤجرة").length, statIconName: faBuildingCircleCheck },
  { name: "الوحدات الشاغرة", statTitle: mockUnits.filter(u => u.status === "شاغرة").length, statIconName: faBuildingCircleExclamation },
];

export default function UnitsPage() {
  const { type } = useParams();
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [units, setUnits] = useState(mockUnits);

  const filteredUnits = useMemo(() => {
    if (type === "rented") return units.filter(u => u.status === "مؤجرة");
    if (type === "vacant") return units.filter(u => u.status === "شاغرة");
    if (type === "add") return units;
    return units;
  }, [units, type]);

  const totalUnits = units.length;
  const rentedUnits = units.filter(u => u.status === "مؤجرة").length;
  const vacantUnits = units.filter(u => u.status === "شاغرة").length;

  const handleAddUnit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUnit = {
      id: Date.now(),
      name: formData.get("unitName"),
      property: formData.get("property"),
      floor: Number(formData.get("floor")),
      type: formData.get("type"),
      area: formData.get("area"),
      status: "شاغرة",
      tenant: "-",
      rent: formData.get("rent"),
    };
    setUnits(prev => [...prev, newUnit]);
    setFormOpen(false);
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {navs.map((nav, i) => (
          <CardStats key={i} index={i} statSubtitle={nav.name} statTitle={nav.statTitle} statIconName={nav.statIconName} />
        ))}
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-2">
        {[
          { label: "عرض الكل", value: undefined },
          { label: "الوحدات المؤجرة", value: "rented" },
          { label: "الوحدات الشاغرة", value: "vacant" },
          { label: "إضافة وحدة", value: "add" },
        ].map(tab => (
          <button key={tab.value || "all"} onClick={() => router.push(tab.value ? `/units/${tab.value}` : "/units")}
            className={`pb-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              (type === tab.value || (!type && !tab.value))
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} className="text-purple-600" />
          <span className="text-lg font-bold text-gray-800">إضافة وحدة جديدة</span>
        </button>
        {formOpen && (
          <div className="border-t border-gray-100 p-6 animate-slide-in-right">
            <form onSubmit={handleAddUnit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitFormFields.map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "select" ? (
                    <select name={field.name} required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent text-right">
                      <option value="">اختر</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={field.type} name={field.name} required={field.required}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent text-right" />
                  )}
                </div>
              ))}
              <div className="lg:col-span-3 flex justify-left">
                <button type="submit"
                  className="px-6 py-2.5 gradient-btn text-white font-medium rounded-xl shadow-lg shadow-purple-500/20">
                  حفظ الوحدة
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            {type === "rented" ? "الوحدات المؤجرة" : type === "vacant" ? "الوحدات الشاغرة" : "جميع الوحدات"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-sm font-semibold text-gray-600">اسم الوحدة</th>
                <th className="p-3 text-sm font-semibold text-gray-600">العقار</th>
                <th className="p-3 text-sm font-semibold text-gray-600">الطابق</th>
                <th className="p-3 text-sm font-semibold text-gray-600">النوع</th>
                <th className="p-3 text-sm font-semibold text-gray-600">المساحة</th>
                <th className="p-3 text-sm font-semibold text-gray-600">الحالة</th>
                <th className="p-3 text-sm font-semibold text-gray-600">المستأجر</th>
                <th className="p-3 text-sm font-semibold text-gray-600">الإيجار</th>
                <th className="p-3 text-sm font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredUnits.map((unit) => (
                <tr key={unit.id} className="border-t border-gray-50 hover:bg-purple-50/50 transition-colors">
                  <td className="p-3 text-gray-800 font-medium">{unit.name}</td>
                  <td className="p-3 text-gray-600">{unit.property}</td>
                  <td className="p-3 text-gray-600">{unit.floor}</td>
                  <td className="p-3"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs">{unit.type}</span></td>
                  <td className="p-3 text-gray-600">{unit.area}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      unit.status === "مؤجرة" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }`}>{unit.status}</span>
                  </td>
                  <td className="p-3 text-gray-600">{unit.tenant}</td>
                  <td className="p-3 text-gray-800 font-medium">{unit.rent}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"><FontAwesomeIcon icon={faEdit} /></button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
