import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
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
  useMediaQuery
} from '@mui/material';
import { fetchContractById } from '../../redux/slices/contractSlice';
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
  Description as ContractIcon
} from '@mui/icons-material';

const SingleContract = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { 
    currentContract, 
    status, 
    error 
  } = useSelector(state => state.contracts);

  useEffect(() => {
    if (id) {
      dispatch(fetchContractById(id));
    }
  }, [id, dispatch]);

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
        </Alert>
      </Box>
    );
  }

  if (!currentContract) {
    return (
      <Box mt={4}>
        <Alert severity="info" variant="filled">
          No contract data available
        </Alert>
      </Box>
    );
  }

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

  const renderInfoItem = (icon, label, value, secondary) => (
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

  // Format date if needed
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }} dir="rtl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          تفاصيل العقد
        </Typography>
        <Chip 
          label={`حالة العقد: ${currentContract.status || 'نشط'}`} 
          color="primary" 
          variant="outlined"
          size="medium"
        />
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
                          value={currentContract.contract_data?.contract_no} 
                          icon={<ContractIcon />}
                          label="رقم العقد"
                        />
            {renderInfoItem(
              <CalendarIcon />,
              'تاريخ العقد',
        currentContract.contract_data?.contract_date
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderInfoItem(
              <ContractIcon />,
              'نوع العقد',
              currentContract.contract_data?.contract_type
            )}
            {renderInfoItem(
              <CalendarIcon />,
              'تاريخ الإنشاء',
              new Date(currentContract.createdAt).toISOString().split("T")[1].substring(0, 8)  + " " +     new Date(currentContract.createdAt).toISOString().split("T")[0]      )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderInfoItem(
              <PropertyIcon />,
              'ملف PDF',
              currentContract.pdfFileName
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
              currentContract['رقم الوحدة']?.value
            )}
            {renderInfoItem(
              <PersonIcon />,
              'اسم المستأجر',
              currentContract['اسم المستأجر']?.value || currentContract.tenant?.company
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderInfoItem(
              <CalendarIcon />,
              'تاريخ بدء الإيجار',
              currentContract['تاريخ بدء الإيجار']?.value || currentContract.contract_data?.start_date
            )}
            {renderInfoItem(
              <CalendarIcon />,
              'تاريخ انتهاء الإيجار',
          currentContract['تاريخ انتهاء الإيجار']?.value || currentContract.contract_data?.end_date
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderInfoItem(
              <PaymentsIcon />,
              'عدد دفعات الإيجار',
              currentContract['عدد دفعات الايجار']?.value
            )}
            {renderInfoItem(
              <PaymentsIcon />,
              'القيمة الإجمالية',
              currentContract['القيمة الاجمالية للدفعة']?.value
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
            {renderInfoItem(
              <BusinessIcon />,
              'الشركة',
              currentContract.tenant?.company
            )}
            {renderInfoItem(
              <BusinessIcon />,
              'نوع المنظمة',
              currentContract.tenant?.organization
            )}
            {renderInfoItem(
              <BadgeIcon />,
              'الرقم الموحد',
              currentContract.tenant?.unified
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderInfoItem(
              <BadgeIcon />,
              'السجل التجاري',
              currentContract.tenant?.cr_no
            )}
            {renderInfoItem(
              <CalendarIcon />,
              'تاريخ السجل التجاري',
              formatDate(currentContract.tenant?.date)
            )}
            {renderInfoItem(
              <BadgeIcon />,
              'جهة الإصدار',
              currentContract.tenant?.issued
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
            {renderInfoItem(
              <PersonIcon />,
              'الاسم',
              currentContract.representative?.name || currentContract['اسم الممثل']?.value
            )}
            {renderInfoItem(
              <LanguageIcon />,
              'الجنسية',
              currentContract.representative?.nationality || currentContract.representative?.ationality
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderInfoItem(
              <BadgeIcon />,
              'نوع الهوية',
              currentContract.representative?.type
            )}
            {renderInfoItem(
              <BadgeIcon />,
              'رقم الهوية',
              currentContract.representative?.id
            )}
            {renderInfoItem(
              <PhoneIcon />,
              'الجوال',
              currentContract.representative?.mobile
            )}
            {renderInfoItem(
              <EmailIcon />,
              'البريد الإلكتروني',
              currentContract.representative?.email
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Payment Schedule Section */}
      {currentContract.payment_schedule?.rows?.length > 0 && (
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
                  {[...currentContract.payment_schedule.headers].reverse()?.map((header, index) => (
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
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentContract.payment_schedule.rows?.map((row, rowIndex) => (
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
                    {[...row].reverse().map((cell, cellIndex) => (
                      <TableCell key={cellIndex} align="center">
                        {cell}
                      </TableCell>
                    ))}
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