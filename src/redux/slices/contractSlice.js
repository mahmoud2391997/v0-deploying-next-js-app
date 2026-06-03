import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const mockContracts = [
  {
    id: 1,
    "رقم الوحدة": { value: "UNIT-001" },
    "اسم المستأجر": { value: "شركة النور للتجارة" },
    "اسم الممثل": { value: "أحمد محمد حسن" },
    "تاريخ بدء الإيجار": { value: "2025-01-01" },
    "تاريخ انتهاء الإيجار": { value: "2026-01-01" },
    "عدد دفعات الايجار": { value: 12 },
    "القيمة الاجمالية للدفعة": { value: 50000 },
    tenant: {
      company: "شركة النور للتجارة",
      organization: "شركة ذات مسؤولية محدودة",
      unified: "1234567890",
      cr_no: "CR-2024-001",
      date: "2024-01-15",
      issued: "الرياض"
    },
    representative: {
      name: "أحمد محمد حسن",
      nationality: "سعودي",
      type: "هوية وطنية",
      id: "1045789632",
      mobile: "+966501234567",
      email: "ahmed@example.com"
    },
    payment_schedule: {
      headers: ["رقم الدفعة", "تاريخ الاستحقاق", "المبلغ", "الحالة"],
      rows: [
        ["1", "2025-01-01", "50000", "مدفوع"],
        ["2", "2025-02-01", "50000", "مدفوع"],
        ["3", "2025-03-01", "50000", "قادم"],
      ]
    },
    contract_data: {
      contract_no: "CONT-2025-001",
      contract_date: "2025-01-01",
      contract_type: "إيجار تجاري",
      start_date: "2025-01-01",
      end_date: "2026-01-01",
      unit_no: "UNIT-001",
      unit_type: "تجاري"
    },
    pdfFileName: "contract_2025_001.pdf",
    status: "نشط",
    createdAt: "2025-01-01T10:00:00.000Z"
  },
  {
    id: 2,
    "رقم الوحدة": { value: "UNIT-002" },
    "اسم المستأجر": { value: "مؤسسة السلام للمقاولات" },
    "اسم الممثل": { value: "خالد عبدالله السلمي" },
    "تاريخ بدء الإيجار": { value: "2024-06-01" },
    "تاريخ انتهاء الإيجار": { value: "2025-06-01" },
    "عدد دفعات الايجار": { value: 6 },
    "القيمة الاجمالية للدفعة": { value: 75000 },
    tenant: {
      company: "مؤسسة السلام للمقاولات",
      organization: "مؤسسة فردية",
      unified: "9876543210",
      cr_no: "CR-2023-045",
      date: "2023-03-20",
      issued: "جدة"
    },
    representative: {
      name: "خالد عبدالله السلمي",
      nationality: "سعودي",
      type: "هوية وطنية",
      id: "1056789123",
      mobile: "+966551234567",
      email: "khalid@example.com"
    },
    payment_schedule: {
      headers: ["رقم الدفعة", "تاريخ الاستحقاق", "المبلغ", "الحالة"],
      rows: [
        ["1", "2024-06-01", "75000", "مدفوع"],
        ["2", "2024-08-01", "75000", "مدفوع"],
        ["3", "2024-10-01", "75000", "مدفوع"],
        ["4", "2024-12-01", "75000", "مدفوع"],
        ["5", "2025-02-01", "75000", "متأخر"],
        ["6", "2025-04-01", "75000", "قادم"],
      ]
    },
    contract_data: {
      contract_no: "CONT-2024-015",
      contract_date: "2024-05-30",
      contract_type: "إيجار تجاري",
      start_date: "2024-06-01",
      end_date: "2025-06-01",
      unit_no: "UNIT-002",
      unit_type: "مكتب"
    },
    pdfFileName: "contract_2024_015.pdf",
    status: "نشط",
    createdAt: "2024-05-30T09:00:00.000Z"
  },
  {
    id: 3,
    "رقم الوحدة": { value: "UNIT-003" },
    "اسم المستأجر": { value: "محمد عبدالله الأحمد" },
    "اسم الممثل": { value: "فهد محمد الأحمد" },
    "تاريخ بدء الإيجار": { value: "2024-01-01" },
    "تاريخ انتهاء الإيجار": { value: "2024-12-31" },
    "عدد دفعات الايجار": { value: 4 },
    "القيمة الاجمالية للدفعة": { value: 25000 },
    tenant: {
      company: "محمد عبدالله الأحمد",
      organization: "فرد",
      unified: "1122334455",
      cr_no: "",
      date: "",
      issued: ""
    },
    representative: {
      name: "فهد محمد الأحمد",
      nationality: "سعودي",
      type: "هوية وطنية",
      id: "1067890123",
      mobile: "+966541234567",
      email: "fahad@example.com"
    },
    payment_schedule: {
      headers: ["رقم الدفعة", "تاريخ الاستحقاق", "المبلغ", "الحالة"],
      rows: [
        ["1", "2024-01-01", "25000", "مدفوع"],
        ["2", "2024-04-01", "25000", "مدفوع"],
        ["3", "2024-07-01", "25000", "مدفوع"],
        ["4", "2024-10-01", "25000", "منتهي"],
      ]
    },
    contract_data: {
      contract_no: "CONT-2024-001",
      contract_date: "2024-01-01",
      contract_type: "إيجار سكني",
      start_date: "2024-01-01",
      end_date: "2024-12-31",
      unit_no: "UNIT-003",
      unit_type: "سكني"
    },
    pdfFileName: "contract_2024_001.pdf",
    status: "منتهي",
    createdAt: "2024-01-01T08:00:00.000Z"
  },
];

const mockFormFields = [
  { name: "رقم الوحدة", dataType: "text", value: "", required: true, label: "رقم الوحدة" },
  { name: "اسم المستأجر", dataType: "text", value: "", required: true, label: "اسم المستأجر" },
  { name: "اسم الممثل", dataType: "text", value: "", required: true, label: "اسم الممثل" },
  { name: "تاريخ بدء الإيجار", dataType: "date", value: "", required: true, label: "تاريخ بدء الإيجار" },
  { name: "تاريخ انتهاء الإيجار", dataType: "date", value: "", required: true, label: "تاريخ انتهاء الإيجار" },
  { name: "عدد دفعات الايجار", dataType: "number", value: "", required: true, label: "عدد دفعات الايجار" },
  { name: "القيمة الاجمالية للدفعة", dataType: "number", value: "", required: true, label: "القيمة الاجمالية للدفعة" },
];

const mockExtractedPDFData = {
  tenant: {
    company: "شركة التقنية المتطورة",
    cr_no: "CR-2025-100",
    date: "2025-02-10",
    issued: "الرياض",
    organization: "شركة مساهمة",
    unified: "5566778899"
  },
  representative: {
    nationality: "سعودي",
    email: "saad@techcorp.sa",
    id: "1078901234",
    mobile: "+966531234567",
    name: "سعد بن فهد القحطاني",
    type: "هوية وطنية"
  },
  payment_schedule: {
    headers: ["رقم الدفعة", "تاريخ الاستحقاق", "المبلغ", "الحالة"],
    rows: [
      ["1", "2025-03-01", "100000", "قادم"],
      ["2", "2025-06-01", "100000", "قادم"],
      ["3", "2025-09-01", "100000", "قادم"],
      ["4", "2025-12-01", "100000", "قادم"],
    ]
  },
  contract_data: {
    Contract_No: "CONT-2025-050",
    Contract_Date: "2025-02-15",
    Contract_Type: "إيجار تجاري",
    Start_Date: "2025-03-01",
    End_Date: "2026-02-28",
    Unit_No: "UNIT-050",
    Unit_Type: "متجر"
  },
  Unit_Data_Value: {
    Unit_No: "UNIT-050",
    Unit_Type: "متجر"
  },
  Contract_Data_Value: {
    Contract_No: "CONT-2025-050",
    Contract_Date: "2025-02-15",
    Contract_Type: "إيجار تجاري",
    Start_Date: "2025-03-01",
    End_Date: "2026-02-28"
  },
  Tenant_Data_Value: {
    company: "شركة التقنية المتطورة",
    cr_no: "CR-2025-100",
    date: "2025-02-10",
    issued: "الرياض",
    organization: "شركة مساهمة",
    unified: "5566778899"
  },
  Tenant_Representative_Data_Value: {
    nationality: "سعودي",
    email: "saad@techcorp.sa",
    id: "1078901234",
    mobile: "+966531234567",
    name: "سعد بن فهد القحطاني",
    type: "هوية وطنية"
  },
  Rent_Payments_Schedule_Title: ["رقم الدفعة", "تاريخ الاستحقاق", "المبلغ", "الحالة"],
  Rent_Payments_Schedule_Value: [
    ["1", "2025-03-01", "100000", "قادم"],
    ["2", "2025-06-01", "100000", "قادم"],
    ["3", "2025-09-01", "100000", "قادم"],
    ["4", "2025-12-01", "100000", "قادم"],
  ]
};

export const fetchInitialData = createAsyncThunk(
  'contracts/fetchInitialData',
  async () => {
    await new Promise(r => setTimeout(r, 500));
    return { formFields: mockFormFields, contracts: mockContracts };
  }
);

export const fetchContractById = createAsyncThunk(
  'contracts/fetchContractById',
  async (contractId) => {
    await new Promise(r => setTimeout(r, 400));
    const contract = mockContracts.find(c => c.id === Number(contractId));
    if (!contract) throw new Error('العقد غير موجود');
    return contract;
  }
);

export const addContract = createAsyncThunk(
  'contracts/addContract',
  async (contractData) => {
    await new Promise(r => setTimeout(r, 300));
    return { id: Date.now(), ...contractData, createdAt: new Date().toISOString() };
  }
);

export const deleteContract = createAsyncThunk(
  'contracts/deleteContract',
  async (contractId) => {
    await new Promise(r => setTimeout(r, 300));
    return contractId;
  }
);

export const submitContract = createAsyncThunk(
  'contracts/submitContract',
  async (_, { getState }) => {
    await new Promise(r => setTimeout(r, 500));
    const state = getState().contracts;
    const { formFields, pdfUpload } = state;
    return {
      id: Date.now(),
      ...formFields.reduce((acc, field) => {
        acc[field.name] = { value: field.value };
        return acc;
      }, {}),
      tenant: pdfUpload.extractedData.tenant || {},
      representative: pdfUpload.extractedData.representative || {},
      payment_schedule: pdfUpload.extractedData.payment_schedule || { headers: [], rows: [] },
      contract_data: pdfUpload.extractedData.contract_data || {},
      pdfFileName: `contract_${Date.now()}.pdf`,
      createdAt: new Date().toISOString()
    };
  }
);

export const uploadPDF = createAsyncThunk(
  'contracts/uploadPDF',
  async () => {
    await new Promise(r => setTimeout(r, 1000));
    return mockExtractedPDFData;
  }
);

export const updateContract = createAsyncThunk(
  'contracts/updateContract',
  async ({ contractId, updates }) => {
    await new Promise(r => setTimeout(r, 400));
    return { id: contractId, ...updates };
  }
);

const initialState = {
  contracts: [],
  currentContract: null,
  formFields: mockFormFields.map(f => ({ ...f, value: "" })),
  pdfUpload: {
    file: null,
    loading: false,
    error: null,
    extractedData: {
      tenant: {},
      representative: {},
      payment_schedule: { headers: [], rows: [] },
      contract_data: {}
    }
  },
  status: 'idle',
  error: null,
  success: null
};

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { index, value } = action.payload;
      state.formFields[index].value = value;
    },
    setFileData: (state, action) => {
      state.fileData = action.payload;
    },
    resetForm: (state) => {
      state.formFields = state.formFields.map(field => ({ ...field, value: '' }));
      state.fileData = initialState.fileData;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
    },
    setPDFFile: (state, action) => {
      state.pdfUpload.file = action.payload;
      state.pdfUpload.error = null;
    },
    updateExtractedData: (state, action) => {
      const { section, field, value } = action.payload;
      state.pdfUpload.extractedData[section][field] = value;
    },
    updatePaymentSchedule: (state, action) => {
      const { rowIndex, colIndex, value } = action.payload;
      if (state.pdfUpload.extractedData.payment_schedule.rows[rowIndex]) {
        state.pdfUpload.extractedData.payment_schedule.rows[rowIndex][colIndex] = value;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.formFields = action.payload.formFields;
        state.contracts = action.payload.contracts;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContract.fulfilled, (state, action) => {
        state.contracts.push(action.payload);
        state.success = 'تم إضافة العقد بنجاح';
      })
      .addCase(addContract.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteContract.fulfilled, (state, action) => {
        state.contracts = state.contracts.filter(
          contract => contract.id !== action.payload
        );
        state.success = 'تم حذف العقد بنجاح';
      })
      .addCase(deleteContract.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(uploadPDF.pending, (state) => {
        state.pdfUpload.loading = true;
        state.pdfUpload.error = null;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.pdfUpload.loading = false;
        state.pdfUpload.extractedData = {
          tenant: {
            company: action.payload.Tenant_Data_Value?.company || '',
            cr_no: action.payload.Tenant_Data_Value?.cr_no || '',
            date: action.payload.Tenant_Data_Value?.date || '',
            issued: action.payload.Tenant_Data_Value?.issued || '',
            organization: action.payload.Tenant_Data_Value?.organization || '',
            unified: action.payload.Tenant_Data_Value?.unified || ''
          },
          representative: {
            ationality: action.payload.Tenant_Representative_Data_Value?.nationality || '',
            email: action.payload.Tenant_Representative_Data_Value?.email || '',
            id: action.payload.Tenant_Representative_Data_Value?.id || '',
            mobile: action.payload.Tenant_Representative_Data_Value?.mobile || '',
            name: action.payload.Tenant_Representative_Data_Value?.name || '',
            type: action.payload.Tenant_Representative_Data_Value?.type || ''
          },
          payment_schedule: {
            headers: action.payload.Rent_Payments_Schedule_Title || [],
            rows: action.payload.Rent_Payments_Schedule_Value || []
          },
          contract_data: {
            contract_no: action.payload.Contract_Data_Value?.Contract_No || '',
            contract_date: action.payload.Contract_Data_Value?.Contract_Date || '',
            contract_type: action.payload.Contract_Data_Value?.Contract_Type || '',
            start_date: action.payload.Contract_Data_Value?.Start_Date || '',
            end_date: action.payload.Contract_Data_Value?.End_Date || '',
            unit_no: action.payload.Unit_Data_Value?.Unit_No || '',
            unit_type: action.payload.Unit_Data_Value?.Unit_Type || ''
          }
        };
      })
      .addCase(uploadPDF.rejected, (state, action) => {
        state.pdfUpload.loading = false;
        state.pdfUpload.error = action.payload;
      })
      .addCase(submitContract.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitContract.fulfilled, (state) => {
        state.status = 'succeeded';
        state.success = 'تم إضافة العقد بنجاح';
      })
      .addCase(submitContract.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'حدث خطأ أثناء حفظ العقد';
      })
      .addCase(fetchContractById.pending, (state) => {
        state.status = 'loading';
        state.currentContract = null;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentContract = action.payload;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateContract.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.contracts.findIndex(
          contract => contract.id === action.payload.id
        );
        if (index !== -1) {
          state.contracts[index] = { ...state.contracts[index], ...action.payload };
        }
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'فشل تحديث العقد';
      });
  }
});

export const {
  updateFormField,
  setFileData,
  resetForm,
  setSuccess,
  clearStatus,
  setPDFFile,
  updateExtractedData,
  updatePaymentSchedule
} = contractsSlice.actions;

export default contractsSlice.reducer;
