import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const OwnerForm = ({ 
  handleAddOwner, 
  editingOwner, 
  onCancel, 
  fields, 
  errors, 
  type,
  OWNER_TYPES 
}) => {
  const [formData, setFormData] = useState({
    ownerType: type || '',
    ownerName: '',
    ownerId: '',
    ownerRepresentative: '',
    property: '',
    companyName: '',
    commerceRegisterNumber: '',
    isRepresentative: false,
    isCompany: false
  });

  // Available owner types for the dropdown
  const availableOwnerTypes = {
    active: "مالك نشط",
    representative: "مالك له ممثل"
  };

  useEffect(() => {
    if (editingOwner) {
      setFormData({
        ...editingOwner,
        ownerType: type || editingOwner.ownerType
      });
    } else {
      resetForm();
    }
  }, [editingOwner, type]);

  const resetForm = () => {
    setFormData({
      ownerType: type || '',
      ownerName: '',
      ownerId: '',
      ownerRepresentative: '',
      property: '',
      companyName: '',
      commerceRegisterNumber: '',
      isRepresentative: false,
      isCompany: false
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name);
    console.log(value);
    console.log(type);
    console.log(checked);
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    handleAddOwner(formData);
    if (!editingOwner) {
      // resetForm();
    }
  };

  const renderField = (field) => {
    if (field.showIf && !field.showIf(formData)) {
      return null;
    }

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="w-full">
            <label className="block mb-1">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </label>
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors?.[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div key={field.name} className="flex gap-4 mb-4">
            {field.options.map(option => (
              <div key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.name}
                  checked={formData[field.name] === option.value}
                  onChange={() => setFormData(prev => ({
                    ...prev,
                    [field.name]: option.value
                  }))}
                  className="h-4 w-4"
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={field.name} className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="font-medium">
              {field.label}
            </label>
          </div>
        );
      
      default:
        return (
          <div key={field.name} className="w-full mb-4">
            <label className="block mb-1">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors?.[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto" dir="rtl">

      <div className="w-[300px] mb-6">
        <label className="block mb-2 font-medium">نوع المالك</label>
        <select
          name="ownerType"
          value={formData.ownerType}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
          disabled={!!editingOwner}
        >
          <option value="" disabled>اختر نوع المالك</option>
          {Object.entries(availableOwnerTypes).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors?.ownerType && <p className="text-red-500 text-sm mt-1">{errors.ownerType}</p>}
      </div>

      {formData.ownerType && (
        <>
          <h2 className="text-lg font-semibold mb-6">
          معلومات  {availableOwnerTypes[formData.ownerType]} 
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {fields[formData.ownerType]?.fields?.map(field => (
              renderField(field)
            ))}
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 mt-6">
        {editingOwner && (
          <button 
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            إلغاء
          </button>
        )}
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          {editingOwner ? "تحديث المالك" : "حفظ المالك"}
        </button>
      </div>
    </form>
  );
};

OwnerForm.propTypes = {
  handleAddOwner: PropTypes.func.isRequired,
  editingOwner: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object,
  type: PropTypes.string,
  OWNER_TYPES: PropTypes.object.isRequired
};

export default OwnerForm;