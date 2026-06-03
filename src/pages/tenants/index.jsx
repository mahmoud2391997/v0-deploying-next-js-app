import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingUser, faHouseUser, faPlus, faMinus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import CardStats from "../../components/CardStats";

const mockTenants = [
  { id: 1, name: "شركة النور للتجارة", type: "شركة", phone: "+٩٦٦ ٥٠ ١٢٣ ٤٥٦٧", email: "info@alnoor.com", property: "برج النور", status: "نشط" },
  { id: 2, name: "مؤسسة السلام للمقاولات", type: "مؤسسة", phone: "+٩٦٦ ٥٥ ٢٣٤ ٥٦٧٨", email: "info@alsalam.com", property: "مركز التسوق", status: "نشط" },
  { id: 3, name: "شركة التقنية المتطورة", type: "شركة", phone: "+٩٦٦ ٥٣ ٣٤٥ ٦٧٨٩", email: "info@tech.com", property: "برج الأعمال", status: "نشط" },
  { id: 4, name: "أحمد محمد عبدالله", type: "فرد", phone: "+٩٦٦ ٥٤ ٤٥٦ ٧٨٩٠", email: "ahmed@email.com", property: "برج النور", status: "نشط" },
  { id: 5, name: "محل الأزهار للورود", type: "مؤسسة", phone: "+٩٦٦ ٥٦ ٥٦٧ ٨٩٠١", email: "flowers@email.com", property: "مركز التسوق", status: "نشط" },
  { id: 6, name: "شركة البناء الحديث", type: "شركة", phone: "+٩٦٦ ٥٠ ٦٧٨ ٩٠١٢", email: "info@modern.com", property: "حي النخيل", status: "متأخر" },
  { id: 7, name: "خالد عبدالله السلمي", type: "فرد", phone: "+٩٦٦ ٥٥ ٧٨٩ ٠١٢٣", email: "khalid@email.com", property: "برج النور", status: "منتهي" },
];

const mockOwners = [
  { id: 1, name: "شركة النور القابضة", type: "شركة", phone: "+٩٦٦ ٥٠ ١١١ ٢٢٣٣", email: "info@alnoorholding.com", properties: 3, status: "نشط" },
  { id: 2, name: "عبدالله محمد الأحمد", type: "فرد", phone: "+٩٦٦ ٥٥ ٢٢٢ ٣٣٤٤", email: "abdullah@email.com", properties: 2, status: "نشط" },
  { id: 3, name: "مؤسسة السلام العقارية", type: "مؤسسة", phone: "+٩٦٦ ٥٣ ٣٣٣ ٤٤٥٥", email: "info@alsalam.com", properties: 1, status: "نشط" },
];

const tenantFormFields = [
  { name: "tenantName", label: "اسم المستأجر", type: "text", required: true },
  { name: "tenantType", label: "النوع", type: "select", required: true, options: ["فرد", "شركة", "مؤسسة"] },
  { name: "phone", label: "رقم الهاتف", type: "text", required: true },
  { name: "email", label: "البريد الإلكتروني", type: "email" },
  { name: "property", label: "العقار", type: "text" },
  { name: "idNumber", label: "رقم الهوية / السجل", type: "text", required: true },
];

export default function TenantsPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [tenants, setTenants] = useState(mockTenants);

  const activeTab = type === "owners" ? "owners" : "tenants";

  const filteredTenants = useMemo(() => {
    if (activeTab === "owners") return mockOwners;
    if (type === "delinquent") return tenants.filter(t => t.status === "متأخر");
    if (type === "late") return tenants.filter(t => t.status === "متأخر" || t.status === "منتهي");
    return tenants;
  }, [tenants, type, activeTab]);

  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: Date.now(),
      name: formData.get("tenantName"),
      type: formData.get("tenantType"),
      phone: formData.get("phone"),
      email: formData.get("email") || "-",
      property: formData.get("property") || "-",
      status: "نشط",
    };
    setTenants(prev => [...prev, newItem]);
    setFormOpen(false);
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardStats index={0} statSubtitle="المستأجرين" statTitle={tenants.length} statIconName={faBuildingUser} />
        <CardStats index={1} statSubtitle="الملاك" statTitle={mockOwners.length} statIconName={faHouseUser} />
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-2">
        {[
          { label: "جميع المستأجرين", value: undefined },
          { label: "متعسرين", value: "delinquent" },
          { label: "متأخرين", value: "late" },
          { label: "الملاك", value: "owners" },
        ].map(tab => (
          <button key={tab.value || "all"} onClick={() => navigate(tab.value ? `/tenants/${tab.value}` : "/tenants")}
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

      {activeTab === "tenants" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} className="text-purple-600" />
            <span className="text-lg font-bold text-gray-800">إضافة مستأجر جديد</span>
          </button>
          {formOpen && (
            <div className="border-t border-gray-100 p-6 animate-slide-in-right">
              <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tenantFormFields.map(field => (
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
                    حفظ
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">
            {activeTab === "owners" ? "الملاك" : type === "delinquent" ? "المستأجرين المتعسرين" : type === "late" ? "المستأجرين المتأخرين" : "جميع المستأجرين"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-50">
                {activeTab === "owners" ? (
                  <>
                    <th className="p-3 text-sm font-semibold text-gray-600">الاسم</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">النوع</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الهاتف</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">البريد</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">عدد العقارات</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الحالة</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الإجراءات</th>
                  </>
                ) : (
                  <>
                    <th className="p-3 text-sm font-semibold text-gray-600">الاسم</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">النوع</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الهاتف</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">البريد</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">العقار</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الحالة</th>
                    <th className="p-3 text-sm font-semibold text-gray-600">الإجراءات</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((item) => (
                <tr key={item.id} className="border-t border-gray-50 hover:bg-purple-50/50 transition-colors">
                  <td className="p-3 text-gray-800 font-medium">{item.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs">{item.type}</span>
                  </td>
                  <td className="p-3 text-gray-600">{item.phone}</td>
                  <td className="p-3 text-gray-600">{item.email}</td>
                  <td className="p-3 text-gray-600">{item.properties || item.property}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      item.status === "نشط" ? "bg-green-50 text-green-700" :
                      item.status === "متأخر" ? "bg-red-50 text-red-700" : "bg-gray-50 text-gray-600"
                    }`}>{item.status}</span>
                  </td>
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
