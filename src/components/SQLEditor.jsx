import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AntSwitch } from "../CustomToggle";
import ToastNotification from "./toastify";

const SQLEditor = () => {
  const [editable, setEditable] = useState(false);
  const [toast, setToast] = useState({
    toastMessage: "",
    toastOpen: false,
    toastType: ""
  });

  const sqlQuery = `SELECT
  SECURITY_ID, SECURITY_ID_TYPE, ZERO_PRICE_ALLOW_INDICATOR, COUNTRY_NAME, EXCHANGE_CODE, EXCHANGE_NAME,
FROM {database}.{schema}.SECURITY_REFERENCE
WHERE COUNTRY_CODE_DOMICILE = 'US'
  AND INTEREST_RATE IS NOT NULL
  AND UNITS_OUTSTANDING > 0
ORDER BY
  AVG_INTEREST_RATE DESC,
  TOTAL_UNITS DESC;`;

  const handleToast = () => {
    setToast(prevState => ({...prevState, toastOpen: false}));
  }

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(sqlQuery);
      setToast({toastMessage: "SQL code copied!", toastOpen: true, toastType: "success"});
    } catch (err) {
      setToast({toastMessage: "Failed to copy", toastOpen: true, toastType: "error"});
    }
  };

  return (
    <>
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 0,
        p: 0,
        backgroundColor: "#F0F2F5",
        marginTop: 2,
        marginLeft: 4
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1
        }}
      >
        <Typography variant="body" fontWeight="bold">SQL Editor</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <AntSwitch
            checked={editable}
            onChange={(e) => setEditable(e.target.checked)}
          />
          <Typography paddingRight={2} sx={{borderRight: "2px solid #C4C8CC"}} variant="body">Edit SQL</Typography>
          <Button
            variant="text"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            sx={{textTransform: 'capitalize', fontWeight: 600}}
          >
            Copy SQL Code
          </Button>
        </Box>
      </Box>
    </Box>
    <Box sx={{marginLeft: 4}}>
        <TextareaAutosize
        value={sqlQuery}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          height: '452px',
          minHeight: '112px',
          background: '#fff',
          boxSizing: 'border-box',
          borderColor: '#C4C8CC',
          padding: '8px 12px',
        }}
      />
    </Box>
    {toast?.toastOpen &&
    <ToastNotification
      open={toast?.toastOpen}
      type={toast?.toastType}
      message={toast?.toastMessage}
      onClose={() => handleToast()}
    />}
    </>
  );
};

export default SQLEditor;
