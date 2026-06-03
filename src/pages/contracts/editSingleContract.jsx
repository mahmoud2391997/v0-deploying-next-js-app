import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { 
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Divider,
  Chip,
  Avatar,
  useTheme,
  Button,
  useMediaQuery,
  IconButton,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  Payments as PaymentsIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  Language as LanguageIcon,
  Home as PropertyIcon,
  Description as ContractIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { fetchContractById, updateContract } from '../../redux/slices/contractSlice';

// Helper functions for payment schedule cells
const getPaymentCellType = (value, cellIndex, headers) => {
  const header = headers[headers.length - 1 - cellIndex]?.toLowerCase();
  
  if (header?.includes('date')) return 'date';
  if (header?.includes('amount') || header?.includes('price') || header?.includes('value')) {
    return 'number';
  }
  if (!isNaN(parseFloat(value)) && isFinite(value)) return 'number';
  
  // Try to detect date format (YYYY-MM-DD or similar)
  if (typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}/)) return 'date';
  
  return 'text';
};

const getPaymentCellInputProps = (value, cellIndex, headers) => {
  const type = getPaymentCellType(value, cellIndex, headers);
  
  const props = {};
  
  if (type === 'number') {
    props.min = 0;
    props.step = 'any';
  }
  
  if (type === 'date') {
    props.max = '9999-12-31';
  }
  
  return props;
};

const getPaymentCellAdornment = (value, cellIndex, headers) => {
  const header = headers[headers.length - 1 - cellIndex]?.toLowerCase();
  
  if (header?.includes('amount') || header?.includes('price') || header?.includes('value')) {
    return {
      endAdornment: <InputAdornment position="end">ر.س</InputAdornment>
    };
  }
  
  return {};
};

const formatPaymentCellDisplay = (value, cellIndex, headers) => {
  const type = getPaymentCellType(value, cellIndex, headers);
  
  if (!value) return 'N/A';
  
  switch(type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'number':
      // Check if it's likely a price/amount
      const header = headers[headers.length - 1 - cellIndex]?.toLowerCase();
      if (header?.includes('amount') || header?.includes('price') || header?.includes('value')) {
        return `${parseFloat(value).toLocaleString('ar-SA')} ر.س`;
      }
      return parseFloat(value).toLocaleString('ar-SA');
    default:
      return value;
  }
};

const parseDate = (dateString) => {
  if (!dateString) return null;
  if (typeof dateString === 'string' && dateString.includes('T')) {
    return new Date(dateString);
  }
  return new Date(dateString);
};

const formatDateForDisplay = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString( {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

  const renderInfoItem = (icon, label, value, secondary) => (
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar sx={{ 
        
        bgcolor: 'primary.main',
        color: 'white',
        mr: 2,
        width: 40,
        height: 40
      }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="500">
          {value || 'N/A'}
        </Typography>
        {secondary && (
          <Typography variant="caption" color="textSecondary">
            {secondary}
          </Typography>
        )}
      </Box>
    </Box>
  );

const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = parseDate(dateString);
  return date.toISOString().split('T')[0];
};

const validateInput = (value, type) => {
  if (type === 'email' && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'البريد الإلكتروني غير صالح';
  }
  if (type === 'date' && isNaN(new Date(value).getTime())) {
    return 'تاريخ غير صالح';
  }
  return null;
};

const getFieldType = (fieldPath, value) => {
  const path = fieldPath.toLowerCase();
  
  // Date fields
  if (path.includes('date') || path.includes('تاريخ')) {
    return 'date';
  }
  
  // Numeric fields
  if (path.includes('no') || path.includes('number') || path.includes('رقم') || 
      path.includes('mobile') || path.includes('جوال') || path.includes('id')) {
    return 'number';
  }
  
  // Price fields
  if (path.includes('amount') || path.includes('price') || path.includes('value') || 
      path.includes('مبلغ') || path.includes('قيمة')) {
    return 'price';
  }
  
  // Email fields
  if (path.includes('email') || path.includes('بريد')) {
    return 'email';
  }
  
  // Default to text
  return 'text';
};

const ContractNumberDisplay = ({ value, icon, label }) => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      mb={2}
      dir="rtl"
      sx={{ 
        unicodeBidi: 'plaintext',
        textAlign: 'right'
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          mr: 2,
          width: 40,
          height: 40
        }}
      >
        {icon}
      </Avatar>
      
      <Box flexGrow={1}>
        <Typography variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <Typography 
          variant="body1" 
          fontWeight="500"
          sx={{
            fontFamily: "'Tahoma', 'Arial', sans-serif",
            letterSpacing: 'normal'
          }}
        >
          {value ? (
            <span style={{ direction: 'ltr', display: 'inline-block' }}>
              {value.replace(/\s*\/\s*/, ' / ')}
            </span>
          ) : (
            'غير محدد'
          )}
        </Typography>
      </Box>
    </Box>
  );
};

const SingleContract = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { 
    currentContract: originalContract, 
    status, 
    error 
  } = useSelector(state => state.contracts);

  const [contract, setContract] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchContractById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (originalContract) {
      setContract(JSON.parse(JSON.stringify(originalContract)));
    }
  }, [originalContract]);

  const handleEditClick = (fieldPath) => {
    setEditMode(true);
    setEditingField(fieldPath);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const updates = Object.keys(contract).reduce((acc, key) => {
        if (key !== 'reactInternalProps') {
          acc[key] = contract[key];
        }
        return acc;
      }, {});

      await dispatch(updateContract({
        contractId: contract.id,
        updates
      })).unwrap();
      
      enqueueSnackbar('تم تحديث العقد بنجاح', { variant: 'success' });
      setEditMode(false);
      setEditingField(null);
    } catch (err) {
      enqueueSnackbar(err.message || 'فشل في تحديث العقد', { variant: 'error' });
      console.error('Update error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setContract(JSON.parse(JSON.stringify(originalContract)));
    setEditMode(false);
    setEditingField(null);
  };

  const handleChange = (fieldPath, value) => {
    const pathParts = fieldPath.split('.');
    setContract(prev => {
      const newContract = JSON.parse(JSON.stringify(prev));
      let current = newContract;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
      return newContract;
    });
  };

  const renderEditableField = (fieldPath, value, icon, label) => {
    const isEditing = editMode && editingField === fieldPath;
    const fieldType = getFieldType(fieldPath, value);
    const error = validateInput(value, fieldType);
    
    const formatDisplayValue = (val, type) => {
      if (!val) return 'N/A';
      
      switch(type) {
        case 'date':
          return formatDateForDisplay(val);
        case 'price':
          return `${parseFloat(val).toLocaleString('ar-SA')} ر.س`;
        default:
          return val;
      }
    };
  
    return (
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ 
          bgcolor: theme.palette.primary.light, 
          color: theme.palette.primary.main,
          mr: 2,
          width: 40,
          height: 40
        }}>
          {icon}
        </Avatar>
        <Box flexGrow={1}>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={fieldType === 'date' && value ? formatDateForInput(value) : value || ''}
              onChange={(e) => handleChange(fieldPath, e.target.value)}
              type={fieldType === 'price' ? 'number' : fieldType}
              sx={{ mt: 0.5 }}
              error={!!error}
              helperText={error}
              inputProps={{
                ...(fieldType === 'number' && { min: 0 }),
                ...(fieldType === 'date' && { max: '9999-12-31' }),
                ...(fieldType === 'email' && { pattern: '[^@\\s]+@[^@\\s]+\\.[^@\\s]+' }),
              }}
              InputProps={{
                ...(fieldType === 'price' && { 
                  endAdornment: <InputAdornment position="end">ر.س</InputAdornment> 
                }),
              }}
            />
          ) : (
            <Typography variant="body1" fontWeight="500">
              {formatDisplayValue(value, fieldType)}
            </Typography>
          )}
        </Box>
        {!isEditing ? (
          <IconButton 
            onClick={() => handleEditClick(fieldPath)}
            color="primary"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        ) : (
          <>
            <IconButton 
              onClick={handleSaveClick}
              color="primary"
              size="small"
              sx={{ ml: 1 }}
              disabled={isSaving}
            >
              {isSaving ? <CircularProgress size={20} /> : <SaveIcon fontSize="small" />}
            </IconButton>
            <IconButton 
              onClick={handleCancelClick}
              color="error"
              size="small"
              disabled={isSaving}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
    );
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error" variant="filled">
          {error}
          <Button 
            color="inherit" 
            size="small" 
            onClick={() => dispatch(fetchContractById(id))}
            sx={{ ml: 2 }}
          >
            حاول مرة أخرى
          </Button>
        </Alert>
      </Box>
    );
  }

  if (!contract) {
    return (
      <Box mt={4}>
        <Alert severity="info" variant="filled">
          لا تتوفر بيانات العقد
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }} dir="rtl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          تفاصيل العقد
        </Typography>
        <Box>
          <Chip 
            label={`حالة العقد: ${contract.status || 'نشط'}`} 
            color="primary" 
            variant="outlined"
            size="medium"
            sx={{ mr: 2 }}
          />
        </Box>
      </Box>

      {/* Contract Information Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <ContractIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            معلومات العقد
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ContractNumberDisplay 
              value={contract.contract_data?.contract_no} 
              icon={<ContractIcon />}
              label="رقم العقد"
            />
            {renderEditableField(
              'contract_data.contract_date',
              contract.contract_data?.contract_date,
              <CalendarIcon />,
              'تاريخ العقد',
              'date'
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderEditableField(
              'contract_data.contract_type',
              contract.contract_data?.contract_type,
              <ContractIcon />,
              'نوع العقد'
            )}
            {renderEditableField(
              'status',
              contract.status,
              <CalendarIcon />,
              'حالة العقد'
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderEditableField(
              'pdfFileName',
              contract.pdfFileName,
              <PropertyIcon />,
              'ملف PDF'
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Basic Information Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PropertyIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            المعلومات الأساسية
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {renderInfoItem(
              <PropertyIcon />,
              'رقم الوحدة',

              contract['رقم الوحدة']?.value,

            )}
            {renderEditableField(
              'tenant.company',
              contract.tenant?.company,
              <PersonIcon />,
              'اسم المستأجر'
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderEditableField(
              'contract_data.start_date',
              contract.contract_data?.start_date,
              <CalendarIcon />,
              'تاريخ بدء الإيجار',
              'date'
            )}
            {renderEditableField(
              'contract_data.end_date',
              contract.contract_data?.end_date,
              <CalendarIcon />,
              'تاريخ انتهاء الإيجار',
              'date'
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderEditableField(
              'payment_schedule.rows.length',
              contract.payment_schedule?.rows?.length,
              <PaymentsIcon />,
              'عدد دفعات الإيجار',
              'number'
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Tenant Information Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <BusinessIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            معلومات المستأجر
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderEditableField(
              'tenant.company',
              contract.tenant?.company,
              <BusinessIcon />,
              'الشركة'
            )}
            {renderEditableField(
              'tenant.organization',
              contract.tenant?.organization,
              <BusinessIcon />,
              'نوع المنظمة'
            )}
            {renderEditableField(
              'tenant.unified',
              contract.tenant?.unified,
              <BadgeIcon />,
              'الرقم الموحد'
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderEditableField(
              'tenant.cr_no',
              contract.tenant?.cr_no,
              <BadgeIcon />,
              'السجل التجاري'
            )}
            {renderEditableField(
              'tenant.date',
              contract.tenant?.date,
              <CalendarIcon />,
              'تاريخ السجل التجاري',
              'date'
            )}
            {renderEditableField(
              'tenant.issued',
              contract.tenant?.issued,
              <BadgeIcon />,
              'جهة الإصدار'
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Representative Information Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PersonIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            معلومات الممثل
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderEditableField(
              'representative.name',
              contract.representative?.name,
              <PersonIcon />,
              'الاسم'
            )}
            {renderEditableField(
              'representative.nationality',
              contract.representative?.nationality || contract.representative?.ationality,
              <LanguageIcon />,
              'الجنسية'
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderEditableField(
              'representative.type',
              contract.representative?.type,
              <BadgeIcon />,
              'نوع الهوية'
            )}
            {renderEditableField(
              'representative.id',
              contract.representative?.id,
              <BadgeIcon />,
              'رقم الهوية'
            )}
            {renderEditableField(
              'representative.mobile',
              contract.representative?.mobile,
              <PhoneIcon />,
              'الجوال'
            )}
            {renderEditableField(
              'representative.email',
              contract.representative?.email,
              <EmailIcon />,
              'البريد الإلكتروني',
              'email'
            )}
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        startIcon={editMode ? (isSaving ? <CircularProgress size={20} /> : <SaveIcon />) : <EditIcon />}
        onClick={editMode ? handleSaveClick : () => setEditMode(true)}
        disabled={isSaving}
        sx={{ mb: 3 }}
      >
        {editMode ? (isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات') : 'تعديل بيانات الدفعات'}
      </Button>
      {editMode && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelIcon />}
          onClick={handleCancelClick}
          sx={{ ml: 2, mb: 3 }}
          disabled={isSaving}
        >
          إلغاء
        </Button>
      )}

      {/* Payment Schedule Section */}
      {contract.payment_schedule?.rows?.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <PaymentsIcon color="primary" sx={{ fontSize: 30, ml: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              جدول الدفعات
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: theme.palette.grey[100] }}>
                  {contract.payment_schedule.headers?.slice().reverse().map((header, index) => {
                    if ([1, 6, 3, 2, 8].includes(index)) return null;
                    return (
                      <TableCell 
                        key={index} 
                        align="center"
                        sx={{ 
                          fontWeight: 'bold',
                          color: theme.palette.primary.dark
                        }}
                      >
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {contract.payment_schedule.rows?.map((row, rowIndex) => (
                  <TableRow 
                    key={rowIndex}
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        bgcolor: theme.palette.action.hover 
                      },
                      '&:hover': {
                        bgcolor: theme.palette.action.selected
                      }
                    }}
                  >
                    {row.slice().reverse().map((cell, cellIndex) => {
                      if ([1, 6, 3, 2, 8].includes(cellIndex)) return null;
                      return (
                        <TableCell key={cellIndex} align="center">
                          {editMode ? (
                            <TextField
                              value={cell}
                              onChange={(e) => {
                                const newRows = [...contract.payment_schedule.rows];
                                const reversedIndex = row.length - 1 - cellIndex;
                                newRows[rowIndex][reversedIndex] = e.target.value;
                                handleChange('payment_schedule.rows', newRows);
                              }}
                              size="small"
                              fullWidth
                              type={getPaymentCellType(cell, cellIndex, contract.payment_schedule.headers)}
                              inputProps={getPaymentCellInputProps(cell, cellIndex, contract.payment_schedule.headers)}
                              InputProps={getPaymentCellAdornment(cell, cellIndex, contract.payment_schedule.headers)}
                            />
                          ) : (
                            formatPaymentCellDisplay(cell, cellIndex, contract.payment_schedule.headers)
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default SingleContract;