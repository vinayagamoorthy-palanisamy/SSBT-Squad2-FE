import { useMemo, useState } from "react";
import { Box, Grid } from "@mui/material";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import CoreExtractStepper from "./CoreExtractStepper";
const inintialCoreExtract = {
  coreExtract: "",
  reuseExtract: "",
  selectExtract: "",
};
const CreateExtract = () => {
  const navigate = useNavigate();
  const [coreExtract, setCoreExtract] = useState(inintialCoreExtract);
  const [showDefineExtract, setShowDefineExtract] = useState(false);

  const coreExtractOptions = [
    {
      label: "Yes",
      value: "yes",
    },
    {
      label: "No",
      value: "no",
    },
  ];

  const extractList = [
    {
      label: "Extract1",
      value: "extract1",
    },
    {
      label: "Extract2",
      value: "extract2",
    },
    {
      label: "Extract3",
      value: "extract3",
    },
    {
      label: "Extract4",
      value: "extract4",
    },
  ];

  const handleCoreExtract = (event, type) => {
    const { value } = event?.target;
    setCoreExtract((prevExtract) => {
      switch (type) {
        case "coreExtract":
          return { ...inintialCoreExtract, [type]: value };
        case "reuseExtract":
          return {
            ...inintialCoreExtract,
            coreExtract: prevExtract?.coreExtract,
            [type]: value,
          };
        case "selectExtract":
          return { ...prevExtract, [type]: value };
        default:
          return prevExtract;
      }
    });

    setShowDefineExtract(
      (type === "coreExtract" && value === "yes") ||
        (type === "reuseExtract" && value === "no")
    );
  };

  const dropDowns = useMemo(
    () => [
      {
        label: "Core Extract",
        options: coreExtractOptions,
        value: coreExtract.coreExtract,
        onChange: (e) => handleCoreExtract(e, "coreExtract"),
        show: true,
      },
      {
        label: "Reuse Core Extract",
        options: coreExtractOptions,
        value: coreExtract.reuseExtract,
        onChange: (e) => handleCoreExtract(e, "reuseExtract"),
        show: coreExtract.coreExtract === "no",
      },
      {
        label: "Select Core Extract",
        options: extractList,
        value: coreExtract.selectExtract,
        onChange: (e) => handleCoreExtract(e, "selectExtract"),
        show:
          coreExtract.reuseExtract === "yes" &&
          coreExtract.coreExtract === "no",
        selectStyle: { width: "180px" },
      },
    ],
    [
      coreExtract.coreExtract,
      coreExtract.reuseExtract,
      coreExtract.selectExtract,
    ]
  );

  return (
    <>
      <Box sx={{ background: "white", padding: "3px 6px", color: "#101114" }}>
        <p>State Street / Extract Center / Create Extract</p>
      </Box>
      <Box sx={{ p: "3rem" }}>
        <Grid container spacing={2}>
          {dropDowns.map(
            (dropdown, index) =>
              dropdown.show && (
                <Grid item key={index}>
                  <DropDown
                    label={dropdown.label}
                    options={dropdown.options}
                    value={dropdown.value}
                    handleChange={dropdown.onChange}
                  />
                </Grid>
              )
          )}
        </Grid>
        {showDefineExtract && <CoreExtractStepper />}
      </Box>
    </>
  );
};

export default CreateExtract;
