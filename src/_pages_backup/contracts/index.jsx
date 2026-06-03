import { useState, useEffect } from "react";
import { 
  TextField, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, 
  FormControl, FormLabel, IconButton, 
  CircularProgress,
  Alert
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import CardStats from "../../components/CardStats";
import PDFUploader from "../../components/test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { 
  updateFormField, 
  resetForm, 
  submitContract
} from '../../redux/slices/contractSlice';

function Form() {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const {
    formFields,
    fileData,
    status,
    error
  } = useSelector(state => state.contracts);

  const handleChange = (e, index) => {
    dispatch(updateFormField({
      index,
      value: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = formFields.every(field => 
      !field.required || (field.value && field.value.toString().trim())
    );
    
    if (!isValid) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      await dispatch(submitContract()).unwrap();
      dispatch(resetForm());
      dispatch(fetchInitialData());
      setFormOpen(false);
    } catch (error) {
      console.error('Error saving contract:', error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button
        onClick={() => setFormOpen(!formOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <FontAwesomeIcon icon={formOpen ? faMinus : faPlus} className="text-purple-600" />
        <span className="text-lg font-bold text-gray-800">إضافة عقد جديد</span>
      </button>
      {formOpen && (
        <div className="border-t border-gray-100 p-6 animate-slide-in-right">
          <PDFUploader />
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3" dir="rtl">
            {formFields.map((field, index) => (
              <FormControl key={field.name} fullWidth>
                <FormLabel className="min-w-[150px] text-right">
                  {field.label || field.name}
                  {field.required && <span className="text-red-500"> *</span>}
                </FormLabel>
                <TextField
                  type={field.dataType || 'text'}
                  value={field.value || ''}
                  onChange={(e) => handleChange(e, index)}
                  variant="outlined"
                  required={field.required}
                  fullWidth
                  inputProps={{ dir: 'rtl' }}
                />
              </FormControl>
            ))}
            <div className="flex justify-end md:col-span-3">
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
                size="large"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'جاري الحفظ...' : 'إضافة'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}




// Entities Component
function Entities({ navs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8" dir="rtl">
      {navs.map((nav, i) => (
        <CardStats
          key={nav.id}
          index={i}
          statSubtitle={nav.name}
          statTitle={nav.statTitle}
          statArrow={nav.statArrow}
          statPercent={nav.statPercent}
          statDescripiron={nav.statDescripiron}
          statIconName={nav.statIconName}
        />
      ))}
    </div>
  );
}

Entities.propTypes = {
  navs: PropTypes.array.isRequired
};
// Main Page Component


// ... (keep your existing imports)

// Improved DataTable Component
function DataTable({  onDelete, onView }) {
  const { contracts, formFields } = useSelector(state => state.contracts);
console.log("Contracts:", contracts);
const navigate = useNavigate();
  // Transform contract data for table display
  const tableData = contracts.map(contract => {
    const rowData = { id: contract.id };
    formFields.forEach(field => {
      rowData[field.name] = contract[field.name]?.value || '-';
    });
    return rowData;
  });

  return (
    <div className="mt-8">
      <TableContainer component={Paper} dir="rtl">
        <Table>
          <TableHead>
            <TableRow>
              {formFields.map((field) => (
                <TableCell key={field.name} style={{ fontWeight: 'bold' ,textAlign: 'right'}}>
                  {field.label || field.name}
                </TableCell>
              ))}
              <TableCell align="center" style={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex} hover>
                  {formFields.map((field) => (
                    <TableCell key={`${rowIndex}-${field.name}`} style={{ textAlign: 'right' }}>
                      {row[field.name] || '-'}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => {navigate(`/contracts/${row.id}`); onView(row);}}
                      aria-label="عرض"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton 
                      color="secondry" 
                      onClick={() => {navigate(`/editContract/${row.id}`); }}
                      aria-label="حذف"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => onDelete(row.id)}
                      aria-label="حذف"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={formFields.length + 1} align="center">
                  لا توجد بيانات متاحة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

// Main Page Component with improvements

import { 
  fetchInitialData, 
  deleteContract,
  clearStatus
} from '../../redux/slices/contractSlice';
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

export default function ContractPage({ pageTitle, navs }) {
  const dispatch = useDispatch();
  const {
    contracts,
    formFields,
    status,
    error,
    success
  } = useSelector(state => state.contracts);

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContract(id));
  };

  const handleView = (contract) => {
    console.log("Viewing contract details:", contract);
    // Implement modal view here
  };

  // Transform contract data for table display
  const tableData = contracts.map(contract => {
    const rowData = { id: contract.id };
    formFields.forEach(field => {
      rowData[field.name] = contract[field.name]?.value || '-';
    });
    return rowData;
  });

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-right text-gray-800 mb-6">
        {pageTitle}
      </h1>
      
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      {success && <Alert severity="success" className="mb-4">{success}</Alert>}
      
      <Entities navs={navs} />
      
      <Form />
      
      <DataTable 
        onDelete={handleDelete} 
        onView={handleView} 
      />
    </div>
  );
}

ContractPage.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  navs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      statTitle: PropTypes.string,
      statArrow: PropTypes.string,
      statPercent: PropTypes.string,
      statDescripiron: PropTypes.string,
      statIconName: PropTypes.string
    })
  ).isRequired
};