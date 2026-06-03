import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import MapPicker from "./mapComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const PropertyForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [formOpen, setFormOpen] = useState(false);
  const [facilityStates, setFacilityStates] = useState({});
  const mapRef = useRef();
  const addressFormRef = useRef();

  const onSubmit = (data) => {
    console.log("Property Data:", data);
    // Send data to backend or handle it as needed
  };


  const handleFacilityToggle = (facilityName, isChecked) => {
    setFacilityStates(prev => ({
      ...prev,
      [facilityName]: {
        checked: isChecked,
        count: isChecked ? (prev[facilityName]?.count || 1) : 0
      }
    }));
  };

  const handleCountChange = (facilityName, value) => {
    setFacilityStates(prev => ({
      ...prev,
      [facilityName]: {
        ...prev[facilityName],
        count: Math.max(1, parseInt(value) || 1)
      }
    }));
  };

  // Facility options grouped by category
  const facilityCategories = [
    {
      name: "البنية التحتية",
      facilities: [
        { name: "parking", label: "مواقف سيارات", hasCount: true },
        { name: "elevators", label: "مصاعد", hasCount: true },
        { name: "secureEntrances", label: "مداخل آمنة", hasCount: true },
      ]
    },
    {
      name: "الخدمات",
      facilities: [
        { name: "securityService", label: "خدمة الحراسة", hasCount: false },
        { name: "transportationService", label: "خدمة النقل", hasCount: true },
        { name: "laundryService", label: "مغسلة ملابس", hasCount: false },
      ]
    },
    {
      name: "المرافق التجارية",
      facilities: [
        { name: "snackRestaurant", label: "مطعم وجبات خفيفة", hasCount: false },
        { name: "groceryStore", label: "دكان بقالة", hasCount: false },
      ]
    },
    {
      name: "مرافق الأسرة",
      facilities: [
        { name: "daycare", label: "حضانة أطفال", hasCount: false },
        { name: "kidsPlayground", label: "ملعب أطفال", hasCount: false },
      ]
    },
    {
      name: "المرافق الترفيهية",
      facilities: [
        { name: "gameRoom", label: "صالة ألعاب", hasCount: false },
        { name: "swimmingPool", label: "حوض سباحة", hasCount: true },
        { name: "footballField", label: "ملعب كرة قدم", hasCount: false },
        { name: "basketballCourt", label: "ملعب كرة سلة", hasCount: false },
        { name: "volleyballCourt", label: "ملعب كرة طائرة", hasCount: false },
        { name: "tennisCourt", label: "ملعب كرة مضرب", hasCount: false },
        { name: "eventHall", label: "قاعة مناسبات", hasCount: false },
      ]
    },
    {
      name: "أخرى",
      facilities: [
        { name: "insideCompound", label: "داخل مجمع", hasCount: false },
      ]
    }
  ];
 const handleAddressSearch = (e) => {
    if (e) e.preventDefault();
    
    const addressParts = [
      watchStreetNo,
      watchDistrict,
      watchCity,
      watchGovernment
    ].filter(Boolean);
    
    const searchString = addressParts.join(', ');
    
    if (mapRef.current?.searchAddress) {
      mapRef.current.searchAddress(searchString);
    }
  };

  // Trigger search when any address field loses focus
  const handleAddressBlur = () => {
    // Only search if at least one field has value
    if (watchCity || watchGovernment || watchDistrict || watchStreetNo) {
      handleAddressSearch();
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} className="text-purple-600" />
        <span className="text-lg font-bold text-gray-800">إضافة عقار جديد</span>
      </button>
      {formOpen && (
        <div className="border-t border-gray-100 p-6 animate-slide-in-right">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Address Search Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2 text-right">بحث عن العنوان</h2>
          <form 
            ref={addressFormRef}
            onSubmit={handleAddressSearch} 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المدينة</label>
              <input 
                {...register("city")}
                onBlur={handleAddressBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المحافظة</label>
              <input 
                {...register("government")}
                onBlur={handleAddressBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الحي</label>
              <input 
                {...register("district")}
                onBlur={handleAddressBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم الشارع</label>
              <input 
                {...register("streetNo")}
                onBlur={handleAddressBlur}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                بحث على الخريطة
              </button>
            </div>
          </form>
          
          <div className="md:col-span-2 mt-10">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الموقع على الخريطة</label>
            <MapPicker 
              ref={mapRef}
              register={register}
              setFormValue={setValue}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1 text-right">{errors.location.message}</p>}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2 text-right">معلومات أساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المدينة</label>
              <input 
                {...register("city", { required: "هذا الحقل مطلوب" })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1 text-right">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">المحافظة</label>
              <input 
                {...register("government", { required: "هذا الحقل مطلوب" })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
              {errors.government && <p className="text-red-500 text-xs mt-1 text-right">{errors.government.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الحي</label>
              <input 
                {...register("district")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم الشارع</label>
              <input 
                {...register("streetNo")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>
        </div>

        {/* Owner Documents */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2 text-right">مستندات المالك</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">نوع المستند</label>
              <select 
                {...register("propertyOwnerDocs.type", { required: "هذا الحقل مطلوب" })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
                <option value="">اختر نوع المستند</option>
                <option value="عقد بيع">عقد بيع</option>
                <option value="صك عقار">صك عقار</option>
                <option value="ع">ع</option>
              </select>
              {errors.propertyOwnerDocs?.type && <p className="text-red-500 text-xs mt-1 text-right">{errors.propertyOwnerDocs.type.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ الإصدار</label>
              <input 
                type="date"
                {...register("propertyOwnerDocs.releaseDate")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم الوثيقة</label>
              <input 
                {...register("propertyOwnerDocs.documentNum")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">نسبة العمولة</label>
              <input 
                type="number"
                step="0.01"
                {...register("propertyOwnerDocs.commissionRate")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">خاضع للضريبة؟</label>
              <select 
                {...register("propertyOwnerDocs.isTaxable")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
                <option value="">اختر</option>
                <option value="نعم">نعم</option>
                <option value="لا">لا</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم السجل التجاري</label>
              <input 
                {...register("propertyOwnerDocs.commercialRecordNum")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2 text-right">تفاصيل العقار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">نوع العقار</label>
              <select 
                {...register("propertyDetails.propertyType", { required: "هذا الحقل مطلوب" })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
                <option value="">اختر نوع العقار</option>
                <option value="شقة">شقة</option>
                <option value="فيلا">فيلا</option>
                <option value="برج">برج</option>
              </select>
              {errors.propertyDetails?.propertyType && <p className="text-red-500 text-xs mt-1 text-right">{errors.propertyDetails.propertyType.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">الغرض</label>
              <select 
                {...register("propertyDetails.purpose", { required: "هذا الحقل مطلوب" })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
                <option value="">اختر الغرض</option>
                <option value="تجاري">تجاري</option>
                <option value="سكني">سكني</option>
                <option value="عائلي">عائلي</option>
              </select>
              {errors.propertyDetails?.purpose && <p className="text-red-500 text-xs mt-1 text-right">{errors.propertyDetails.purpose.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">رقم العقار</label>
              <input 
                {...register("propertyDetails.propertyNumber")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">تاريخ البناء</label>
              <input 
                type="date"
                {...register("propertyDetails.buildDate")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عدد الطوابق</label>
              <input 
                type="number"
                {...register("propertyDetails.totalFloors")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-right">عدد الوحدات</label>
              <input 
                type="number"
                {...register("propertyDetails.totalUnits")} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              />
            </div>
          </div>
        </div>

        {/* Shared Facilities */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2 text-right">مرافق العقار المشتركة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilityCategories.map((category) => (
              <div key={category.name} className="bg-white p-3 rounded shadow">
                <h3 className="font-medium text-gray-700 mb-2 text-right">{category.name}</h3>
                <div className="space-y-2">
                  {category.facilities.map((facility) => (
                    <div key={facility.name} className="flex flex-col items-end gap-1">
                      <label className="flex items-center justify-end gap-2 text-right w-full">
                        <span className="text-sm text-gray-600">{facility.label}</span>
                        <input 
                          type="checkbox" 
                          {...register(`sharedFacilities.${facility.name}`)}
                          onChange={(e) => handleFacilityToggle(facility.name, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </label>
                      {facility.hasCount && facilityStates[facility.name]?.checked && (
                        <div className="flex items-center gap-2 w-full justify-end">
                          <span className="text-xs text-gray-500">العدد:</span>
                          <input
                            type="number"
                            min="1"
                            value={facilityStates[facility.name]?.count || 1}
                            onChange={(e) => handleCountChange(facility.name, e.target.value)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-sm text-right"
                          />
                          <input
                            type="hidden"
                            {...register(`sharedFacilities.${facility.name}Count`)}
                            value={facilityStates[facility.name]?.count || 1}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">اسم المجمع (إن وُجد)</label>
            <input 
              {...register("sharedFacilities.compoundName")} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            حفظ العقار
          </button>
        </div>
      </form>
        </div>
      )}
    </div>
  );
};

export default PropertyForm;