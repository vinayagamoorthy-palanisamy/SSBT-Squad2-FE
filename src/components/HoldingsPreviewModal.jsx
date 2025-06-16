import React, { useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import * as XLSX from 'xlsx';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Mock data for development preview (12 rows)
const mockHoldingsData = Array.from({ length: 12 }, () => ({
  fund: 'AN1L',
  fundName: 'SSCS1L ANIMA ZEP...',
  assetClass: 'Expenses',
  securityLongName: 'Corespondent Bank Fee',
  baseMarketValue: '-',
  investmentTypeName: 'Mutual Fund',
  baseNetProfit12mo: '9.5% avg',
}));

// Mock SQL for Query tab demonstration
const mockSql = `SELECT
  SECURITY_ID,
  SECURITY_ID_TYPE,
  ZERO_PRICE_ALLOW_INDICATOR,
  SECURITY_TYPE_CODE,
  SECURITY_TYPE,
  BBG_TICKER_EXTENDED,
  BBG_TICKER,
  SECURITY_ID_CLIENT,
  CONTRACT_SIZE,
  TO_CHAR(CONVERSION_END_DATE, 'yyyy-MM-dd HH:mm:ss') AS CONVERSION_END_DATE,
  TO_CHAR(CONVERSION_START_DATE, 'yyyy-MM-dd HH:mm:ss') AS CONVERSION_START_DATE,
  CONVERSION_RATIO,
  COUNTERPARTY_ID,
  COUNTERPARTY_NAME,
  COUNTRY_CODE_DOMICILE,
  COUNTRY_NAME,
  DAY_COUNT_CONVENTION_CODE,
  DAY_COUNT_CONVENTION_NAME,
  EX_DIVIDEND_DAYS,
  INTEREST_RATE_FREQUENCY_DESCRIPTION,
  INTEREST_RATE,
  TO_CHAR(INTEREST_START_DATE, 'yyyy-MM-dd HH:mm:ss') AS INTEREST_START_DATE,
  INTEREST_RATE_TYPE,
  TO_CHAR(INCOME_DEFAULT_DATE, 'yyyy-MM-dd HH:mm:ss') AS INCOME_DEFAULT_DATE,
  INCOME_DEFAULT_INDICATOR,
  PRINCIPAL_DEFAULT_INDICATOR,
  TO_CHAR(PRINCIPAL_DEFAULT_DATE, 'yyyy-MM-dd HH:mm:ss') AS PRINCIPAL_DEFAULT_DATE,
  CURRENCY_CODE_INCOME,
  CURRENCY_CODE_LOCAL,
  CONVERSION_RATIO
FROM HOLDINGS_TABLE;`;

export default function HoldingsPreviewModal({ open, onClose, sql = '' }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [previewData, setPreviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Editable parameters state
  const [showParams, setShowParams] = useState(false);
  // const [editableParams, setEditableParams] = useState(
  //   Array.from({ length: 4 }, () => '2018-12-22')
  // );
  const [editableParams, setEditableParams] = useState(
    [{ fieldName: 'E_Date1', fieldVal: "'2018-12-22'", fieldType: 'date' }, { fieldName: 'E_Date2', fieldVal: "2018-12-22", fieldType: 'date' }, { fieldName: 'E_Txt', fieldVal: "text 2", fieldType: 'text' },{ fieldName: 'E_Txt', fieldVal: "text 3", fieldType: 'text' }]
  );
  // always show mock data in development
  useEffect(() => {
    if (open) {
      setPreviewData(mockHoldingsData);
      setError(null);
      setLoading(false);
    }
  }, [open]);

  const displayData = useMemo(
    () => (previewData.length > 0 ? previewData : mockHoldingsData),
    [previewData]
  );

  const columns = useMemo(() => {
    if (!displayData.length) return [];
    return Object.keys(displayData[0]).map(key => ({ accessorKey: key, header: key }));
  }, [displayData]);

  const code = sql && sql.trim() ? sql : mockSql;

  const handleDownloadXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(displayData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Preview');
    XLSX.writeFile(wb, 'preview.xlsx');
  };

  const handleCopySql = () => navigator.clipboard.writeText(code);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>  <Box display="flex" alignItems="center" justifyContent="space-between">
        Holdings Preview
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box></DialogTitle>
      <DialogContent>


        <Tabs
          value={tabIndex}
          onChange={(_, v) => setTabIndex(v)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#0033cc',   // active tab underline color
            },
          }}
        >
          <Tab
            label="Dataset"
            sx={{
              color: '#0033cc',              // inactive tab label color
              '&.Mui-selected': {
                color: '#0033cc',            // active tab label color
                fontWeight: 'bold',
              },
            }}
          />
          <Tab
            label="Query"
            sx={{
              color: '#0033cc',
              '&.Mui-selected': {
                color: '#0033cc',
                fontWeight: 'bold',
              },
            }}
          />
        </Tabs>


        {tabIndex === 0 && (
          <Box mt={2}>
            {/* Editable Parameters Section */}
            <Box mb={2}>

              {showParams && (
                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                  {editableParams.map((val, idx) => (
                    <Box key={idx} sx={{ width: 270 }}>
                      <label>{val?.fieldName}</label>

                      <TextField
                        fullWidth
                        size="small"
                        type={val?.fieldType === 'date' ? 'date' : 'text'}
                        value={val?.fieldVal}
                        onChange={e => {
                          const arr = [...editableParams];
                          arr[idx] = { ...arr[idx], fieldVal: e.target.value };
                          setEditableParams(arr);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  const arr = editableParams.filter((_, i) => i !== idx);
                                  setEditableParams(arr);
                                }}
                                edge="end"
                                aria-label="clear"
                                sx={{
                                  borderRadius: '50%',      // ensure round shape
                                  border: '1px solid',      // optional: add border
                                  borderColor: 'grey.400',  // optional: border color
                                  padding: 0.5,             // adjust padding for smaller size
                                  width: 24,
                                  height: 24,
                                  '&:hover': {
                                    backgroundColor: 'grey.200',
                                    borderColor: 'grey.600',
                                  },
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          marginTop: '10px',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
              {showParams && (
                <Box mt={1}>
                  <Button variant="contained" size="small" onClick={() => setLoading(true)} sx={{
                    color: '#fff',
                    backgroundColor: '#0033cc',
                    '&:hover': { backgroundColor: '#002bb8' },
                  }}>
                    Apply & Update
                  </Button>
                </Box>
              )}
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              {/* Left horizontal line */}
              <Box sx={{ flex: 1, height: '1px', bgcolor: '#0033cc' }} />

              {/* Button with text and icon, styled */}
              <Button
                size="small"
                onClick={() => setShowParams(p => !p)}
                endIcon={showParams ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                sx={{
                  textTransform: 'none',
                  color: '#0033cc',
                  backgroundColor: '#fff',
                  px: 2,
                  minWidth: 150,
                  '&:hover': {
                    backgroundColor: '#fff',
                  },
                  // ensure icon inherits color
                  '& .MuiButton-endIcon': {
                    color: '#0033cc',
                  },
                }}
              >
                {showParams ? 'Hide Parameters' : 'Show Parameters'}
              </Button>

              {/* Right horizontal line */}
              <Box sx={{ flex: 1, height: '1px', bgcolor: '#0033cc' }} />
            </Box>
            {loading ? (
              <Box display="flex" justifyContent="center" py={5}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                <MaterialReactTable
                  columns={columns}
                  data={displayData}
                  enablePagination={false}
                  enableSorting={false}
                  enableTopToolbar={false}
                  enableBottomToolbar={false}
                  muiTableContainerProps={{ sx: { height: '450px', overflowY: 'auto' } }}
                />
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button variant="contained" onClick={handleDownloadXLSX} sx={{
                    color: '#fff',
                    backgroundColor: '#0033cc',
                    '&:hover': { backgroundColor: '#002bb8' },
                  }}>
                    Download .XLSX
                  </Button>
                </Box>
              </>
            )}
          </Box>
        )}

        {tabIndex === 1 && (
       <Box mt={2}>
  <Box
    sx={{
      minHeight: '150px',           // ensures minimum height for small code
      maxHeight: '400px',           // cap height to avoid overflow beyond this
      overflowY: 'auto',            // auto-scroll when content exceeds maxHeight
      p: 2,
      backgroundColor: '#f9f9f9',
      border: '1px solid #e0e0e0',
      borderRadius: 1,
    }}
  >
    <Typography
      component="pre"
      sx={{
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace',
        color: '#000',
        m: 0,
      }}
    >
      {code}
    </Typography>
  </Box>

  <Box display="flex" justifyContent="flex-end" mt={1}>
    <Button
      variant="contained"
      onClick={handleCopySql}
      sx={{
        color: '#fff',
        backgroundColor: '#0033cc',
        '&:hover': { backgroundColor: '#002bb8' },
      }}
    >
      Copy SQL Code
    </Button>
  </Box>
</Box>

        )}
      </DialogContent>
    </Dialog>
  );
}

