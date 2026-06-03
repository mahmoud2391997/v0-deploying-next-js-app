import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, LinearProgress, Box, Select, MenuItem, FormControl, InputLabel,
  Typography, Alert, TablePagination
} from '@mui/material';
import { Delete, Edit, Inbox as InboxIcon } from '@mui/icons-material';
import PropTypes from "prop-types";
import { useState, useMemo } from 'react';

function TabbedDataTable({ 
  data, 
  columns, 
  onDelete, 
  onEdit, 
  ownerTypes, 
  activeTab, 
  onTabChange,
  isLoading = false 
}) {
  const [ownerType, setOwnerType] = useState(activeTab);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
console.log(data);

  const filteredData = useMemo(() => {
    try {
      return data.filter(item => {
        if (ownerType === "active") return item.ownerType === "active";
        if (ownerType === 'company') return item.isCompany;
        if (ownerType === 'representative') return item.isRepresentative;
        return true;
      });
    } catch (err) {
      setError(err);
      return [];
    }
  }, [data, ownerType]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const handleOwnerTypeChange = (event) => {
    setOwnerType(event.target.value);

    onTabChange(event.target.value);
    setPage(0); // Reset to first page when filter changes
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCellValue = (column, value) => {
    if (column.format && typeof column.format === 'function') {
      return column.format(value);
    }
    return value || "-";
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }} dir="rtl">
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>نوع المالك</InputLabel>
          <Select
            value={ownerType}
            onChange={handleOwnerTypeChange}
            label="نوع المالك"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="company">شركة</MenuItem>
            <MenuItem value="representative">مالك له ممثل</MenuItem>
            <MenuItem value="active">مالك نشط</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer 
        component={Paper}
        sx={{
          mt: 2,
          boxShadow: 'none',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '4px',
          overflowX: 'auto'
        }}
      >
        <Table aria-label="owners table" size="medium">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              {columns.map(column => (
                <TableCell 
                  key={column.name}
                  align="right"
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap',
                    minWidth: column.width || 'auto'
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onDelete || onEdit) && (
                <TableCell 
                  align="center"
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    width: '120px'
                  }}
                >
                  الإجراءات
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={columns.length + ((onDelete || onEdit) ? 1 : 0)} align="center">
                  <Alert severity="error">حدث خطأ في تحميل البيانات</Alert>
                </TableCell>
              </TableRow>
            )}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length + ((onDelete || onEdit) ? 1 : 0)}>
                  <LinearProgress />
                  <Box sx={{ py: 2, textAlign: 'center' }}>
                    <Typography variant="body2">جاري تحميل البيانات...</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!error && !isLoading && filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + ((onDelete || onEdit) ? 1 : 0)} align="center">
                  <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InboxIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      لا توجد بيانات متاحة
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {!error && !isLoading && paginatedData.map((row, index) => (
              <TableRow 
                key={index} 
                hover
                sx={{ '&:last-child td': { borderBottom: 0 } }}
              >
                {columns.map(column => (
                  <TableCell 
                    key={`${index}-${column.name}`}
                    align="right"
                    sx={{ 
                      fontSize: '0.9rem',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      ...column.cellStyle
                    }}
                  >
                    {getCellValue(column, row[column.name])}
                  </TableCell>
                ))}
                {(onDelete || onEdit) && (
                  <TableCell align="center" sx={{ minWidth: '120px' }}>
                    {/* {onEdit && (
                      <IconButton 
                        onClick={() => onEdit(row.id || index)}
                        color="primary"
                        size="small"
                        aria-label="edit"
                        sx={{ mx: 0.5 }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    )} */}
                    {onDelete && (
                      <IconButton 
                        onClick={() => onDelete(row.id || index)}
                        color="error"
                        size="small"
                        aria-label="delete"
                        sx={{ mx: 0.5 }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredData.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="صفوف لكل صفحة:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`}
          />
        )}
      </TableContainer>
    </Box>
  );
}

// ... keep the existing propTypes and defaultProps ...
export default TabbedDataTable