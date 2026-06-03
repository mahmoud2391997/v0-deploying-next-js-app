import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OwnerForm from "./form";
import TabbedDataTable from "./table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUserTie, faUserCheck, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import CardStats from "../../components/CardStats";

const OWNER_TYPES = {
  company:"مالك شركة",
  representative: "مالك له ممثل",
  active: "مالك نشط"
};

const ownerFormFields = {
  company: {
    fields: [
      { name: "companyName", label: "اسم الشركة", type: "text", required: true },
      { name: "commerceRegisterNumber", label: "رقم السجل التجاري", type: "text", required: true },
      { name: "unionNumber", label: "الرقم الموحد", type: "text" },
      { name: "releaseDate", label: "جهة الإصدار", type: "text" },
      { name: "commerceRegisterDate", label: "تاريخ السجل التجاري", type: "date" },
      { name: "organizationType", label: "نوع المنظمة", type: "text" },
      { name: "property", label: "العقار", type: "text" },
      { name: "ownerRepresentative", label: "ممثل المالك", type: "text" },
    ],
    title: "إضافة شركة مالكة",
    type: "company"
  },
  representative: {
    fields: [
      { 
        name: "isCompany", 
        label: "نوع المالك", 
        type: "radio", 
        options: [
          { value: true, label: "شركة" },
          { value: false, label: "فرد" }
        ],
        required: true
      },
      { 
        name: "companyName", 
        label: "اسم الشركة", 
        type: "text", 
        required: true,
        showIf: (data) => data.isCompany
      },
      { 
        name: "commerceRegisterNumber", 
        label: "رقم السجل التجاري", 
        type: "text", 
        required: true,
        showIf: (data) => data.isCompany
      },
      { 
        name: "unionNumber", 
        label: "الرقم الموحد", 
        type: "text",
        showIf: (data) => data.isCompany
      },
      { 
        name: "releaseDate", 
        label: "جهة الإصدار", 
        type: "text",
        showIf: (data) => data.isCompany
      },
      { 
        name: "commerceRegisterDate", 
        label: "تاريخ السجل التجاري", 
        type: "date",
        showIf: (data) => data.isCompany
      },
      { 
        name: "organizationType", 
        label: "نوع المنظمة", 
        type: "text",
        showIf: (data) => data.isCompany
      },
      { 
        name: "ownerName", 
        label: "اسم المالك", 
        type: "text", 
        required: true,
        showIf: (data) => !data.isCompany
      },
      { 
        name: "ownerIdType", 
        label: "نوع الهوية", 
        type: "text", 
        required: true,
        showIf: (data) => !data.isCompany
      },
      { 
        name: "ownerId", 
        label: "رقم الهوية", 
        type: "text", 
        required: true,
        showIf: (data) => !data.isCompany
      },
      { 
        name: "ownerNationality", 
        label: "الجنسية", 
        type: "text",
        showIf: (data) => !data.isCompany
      },
      { 
        name: "ownerPhoneNumber", 
        label: "رقم الهاتف", 
        type: "tel" ,
        showIf: (data) => !data.isCompany
      },
      { 
        name: "ownerEmail", 
        label: "البريد الإلكتروني", 
        type: "email" ,
        showIf: (data) => !data.isCompany
      },
      { 
        name: "property", 
        label: "العقار", 
        type: "text" 
      },
      { 
        name: "ownerRepresentative", 
        label: "ممثل المالك", 
        type: "text", 
        required: true 
      }
    ],
    title: "إضافة مالك مع ممثل",
    type: "representative"
  },
  active: {
    fields: [
      { name: "ownerName", label: "اسم المالك", type: "text", required: true },
      { name: "ownerIdType", label: "نوع الهوية", type: "text", required: true },
      { name: "ownerId", label: "رقم الهوية", type: "text", required: true },
      { name: "ownerNationality", label: "الجنسية", type: "text" },
      { name: "ownerPhoneNumber", label: "رقم الهاتف", type: "tel" },
      { name: "ownerEmail", label: "البريد الإلكتروني", type: "email" },
      { 
        name: "isRepresentative", 
        label: "ممثل عن الغير", 
        type: "checkbox",
        width: 100,
      },
      { 
        name: "property", 
        label: "العقار", 
        type: "text" 
      }
    ],
    title: "إضافة مالك نشط",
    type: "active"
  }
};

const ownerTableColumns = {
  company: [
    { name: "companyName", label: "اسم الشركة", type: "text", width: 180 },
    { name: "commerceRegisterNumber", label: "رقم السجل التجاري", type: "text", width: 150 },
    { name: "unionNumber", label: "الرقم الموحد", type: "text", width: 120 },
    { name: "releaseDate", label: "جهة الإصدار", type: "text", width: 120 },
    { name: "commerceRegisterDate", label: "تاريخ السجل التجاري", type: "date", width: 140 },
    { name: "organizationType", label: "نوع المنظمة", type: "text", width: 120 },
    { name: "property", label: "العقار", type: "text", width: 120 },
    { name: "ownerRepresentative", label: "ممثل المالك", type: "text", width: 150 }
  ],
  representative: [
    { name: "ownerName", label: "اسم المالك", type: "text", width: 180 },
    { name: "ownerIdType", label: "نوع الهوية", type: "text", width: 120 },
    { name: "ownerId", label: "رقم الهوية", type: "text", width: 140 },
    { name: "ownerNationality", label: "الجنسية", type: "text", width: 100 },
    { name: "ownerPhoneNumber", label: "رقم الهاتف", type: "tel", width: 120 },
    { name: "ownerEmail", label: "البريد الإلكتروني", type: "email", width: 180 },
    { name: "property", label: "العقار", type: "text", width: 120 },
    { name: "ownerRepresentative", label: "ممثل المالك", type: "text", width: 150 }
  ],
  active: [
    { name: "ownerName", label: "اسم المالك", type: "text", width: 180 },
    { name: "ownerIdType", label: "نوع الهوية", type: "text", width: 120 },
    { name: "ownerId", label: "رقم الهوية", type: "text", width: 140 },
    { name: "ownerNationality", label: "الجنسية", type: "text", width: 100 },
    { name: "ownerPhoneNumber", label: "رقم الهاتف", type: "tel", width: 120 },
    { name: "ownerEmail", label: "البريد الإلكتروني", type: "email", width: 180 },
    { 
      name: "isRepresentative", 
      label: "ممثل عن الغير", 
      type: "text",
      width: 100,
      format: value => value ? "نعم" : "لا",
      cellStyle: { textAlign: 'center' }
    },
    { name: "property", label: "العقار", type: "text", width: 120 }
  ]
};

const OwnerManagementPage = () => {
  const { type } = useParams();
  const [activeTab, setActiveTab] = useState(type || "active");
  const [owners, setOwners] = useState({
    company: [],
    representative: [],
    active: [],
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (type && OWNER_TYPES[type]) {
      setActiveTab(type);
    } else {
      setActiveTab("active");
    }
  }, [type]);

  const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.ownerType) {
      errors.ownerType = "نوع المالك مطلوب";
    }

    if (formData.ownerType === 'company') {
      if (!formData.companyName?.trim()) errors.companyName = "اسم الشركة مطلوب";
      if (!formData.commerceRegisterNumber?.trim()) errors.commerceRegisterNumber = "رقم السجل التجاري مطلوب";
    } 
    else if (formData.ownerType === 'representative') {
      if (formData.isCompany) {
        if (!formData.companyName?.trim()) errors.companyName = "اسم الشركة مطلوب";
        if (!formData.commerceRegisterNumber?.trim()) errors.commerceRegisterNumber = "رقم السجل التجاري مطلوب";
      } else {
        if (!formData.ownerName?.trim()) errors.ownerName = "اسم المالك مطلوب";
        if (!formData.ownerId?.trim()) errors.ownerId = "رقم الهوية مطلوب";
      }
      if (!formData.ownerRepresentative?.trim()) errors.ownerRepresentative = "ممثل المالك مطلوب";
    }
    else if (formData.ownerType === 'active') {
      if (!formData.ownerName?.trim()) errors.ownerName = "اسم المالك مطلوب";
      if (!formData.ownerId?.trim()) errors.ownerId = "رقم الهوية مطلوب";
     
    }

    if (formData.ownerEmail && !/^\S+@\S+\.\S+$/.test(formData.ownerEmail)) {
      errors.ownerEmail = "بريد إلكتروني غير صالح";
    }

    if (formData.ownerPhoneNumber && !/^[0-9]{10,15}$/.test(formData.ownerPhoneNumber)) {
      errors.ownerPhoneNumber = "رقم هاتف غير صالح";
    }

    return errors;
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    
    const errors = validateForm(formData);
    console.log(errors);
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setOwners(prev => {
      const updated = {...prev};
      if (editingIndex !== null) {
        updated[activeTab][editingIndex] = formData;
      } else {
        updated[activeTab] = [...updated[activeTab], formData];
      }
      return updated;
    });

    resetFormState();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormErrors({});
  };

  const handleDelete = (index) => {
    setOwners(prev => {
      const updated = {...prev};
      updated[activeTab] = updated[activeTab].filter((_, i) => i !== index);
      return updated;
    });
  };

  const resetFormState = () => {
    setEditingIndex(null);
    setFormErrors({});
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    resetFormState();
  };

  const navs = [
    { id: 1, name: "مالك نشط", statIconName: faUserCheck, link: "/owners/active" },
    { id: 2, name: "مالك له ممثل", statIconName: faUserTie, link: "/owners/representative" },
  ];

  return (
    <div className="p-6 space-y-10 mx-auto">
      <Entities navs={navs} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} className="text-purple-600" />
          <span className="text-lg font-bold text-gray-800">إضافة مالك جديد</span>
        </button>
        {formOpen && (
          <div className="border-t border-gray-100 p-6 animate-slide-in-right">
            <OwnerForm
              fields={ownerFormFields}
              type={activeTab}
              handleAddOwner={handleSubmit}
              initialData={editingIndex !== null ? owners[activeTab][editingIndex] : null}
              errors={formErrors}
              onCancel={resetFormState}
              OWNER_TYPES={OWNER_TYPES}
            />
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">قائمة {OWNER_TYPES[activeTab]}</h2>
        <TabbedDataTable
          data={owners[activeTab]}
          columns={ownerTableColumns[activeTab]} // Pass only columns for active tab
          onEdit={handleEdit}
          onDelete={handleDelete}
          ownerTypes={OWNER_TYPES}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

function Entities({ navs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" dir="rtl">
      {navs.map((nav, i) => (
        <a key={nav.id} href={nav.link} className="block">
          <CardStats
            index={i}
            statSubtitle={nav.name}
            statIconName={nav.statIconName}
          />
        </a>
      ))}
    </div>
  );
}

export default OwnerManagementPage;