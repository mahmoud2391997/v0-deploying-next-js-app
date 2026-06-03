import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setPDFFile, 
  updateExtractedData, 
  updatePaymentSchedule,
  uploadPDF,
  updateFormField
} from "../redux/slices/contractSlice";

const PDFUploader = () => {
  const dispatch = useDispatch();
  const {
    file,
    loading,
    error,
    extractedData
  } = useSelector(state => state.contracts.pdfUpload);
  const { formFields } = useSelector(state => state.contracts);

  

  const handleSave = () => {
  

    // Update each form field in Redux
    formFields.forEach((field, index) => {
      let value = '';
      switch(field.name) {
        case 'رقم الوحدة':
          value = extractedData.contract_data.unit_no || "";
          break;
        case 'اسم المستأجر':
          value = extractedData.tenant.name || extractedData.tenant.company;
          break;
        case 'اسم الممثل':
          value = extractedData.representative.name || '';
          break;
        case 'تاريخ بدء الإيجار':
          value = extractedData.contract_data.start_date;
          break;
        case 'تاريخ انتهاء الإيجار':
          value = extractedData.contract_data.end_date;
          break;
        case 'عدد دفعات الايجار':
          value = extractedData.payment_schedule.rows.length;
          break;
        case 'القيمة الاجمالية للدفعة':
          value = extractedData.payment_schedule.rows[0][4];
          break;
        default:
          value = field.value || '';
      }
      dispatch(updateFormField({ index, value }));
    });
    
    alert('تم حفظ بيانات العقد في النموذج');
  };

  const handleFileChange = (e) => {
    dispatch(setPDFFile(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('الرجاء اختيار ملف PDF');
      return;
    }
    dispatch(uploadPDF(file));
  };

  const handleInputChange = (section, field, value) => {
    dispatch(updateExtractedData({ section, field, value }));
  };

  const handlePaymentScheduleChange = (rowIndex, colIndex, value) => {
    dispatch(updatePaymentSchedule({ rowIndex, colIndex, value }));
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg" dir="rtl">
      <h2 className="text-xl font-semibold text-right mb-4">رفع ملف العقد</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-end gap-4">
          <div className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="file"
              id="pdf-upload"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <label
              htmlFor="pdf-upload"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 cursor-pointer"
            >
              اختر ملف
            </label>
            <span className="px-4 py-2 text-gray-600">
              {file ? file.name : "لم يتم اختيار ملف"}
            </span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? 'جاري المعالجة...' : 'استخراج البيانات'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-2 text-right text-red-500">
          {error}
        </div>
      )}

      {extractedData.tenant.company && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            حفظ البيانات في النموذج
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;