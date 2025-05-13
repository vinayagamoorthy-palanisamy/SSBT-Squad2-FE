import React, { useEffect, useState } from "react";
import DynamicButtonGroup from "./DynamicButtonGroup";
import useExtractCenterDataStore from "../store/useExtractCenterTable";
import { ExtractFormat, ExtractStatus, ExtractType } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const ExtractOverflowButtons = (tab) => {
  const navigate = useNavigate();
  const { selectedTableData } = useExtractCenterDataStore((state) => state);
  const [extractButtons, setExtractButtons] = useState([
    {
      seq: 50,
      type: "createExtract",
      label: "Create Extract",
      color: "dark",
      disabled: false,
      onClick: () => onClickExtractHandler("createExtract"),
    },
    {
      seq: 51,
      type: "cloneExtract",
      label: "Clone Extract",
      color: "dark",
      disabled: true,
      onClick: () => onClickExtractHandler("cloneExtract"),
    },
    {
      seq: 52,
      type: "runExtract",
      label: "Run Extract",
      color: "dark",
      disabled: true,
      onClick: () => onClickExtractHandler("runExtract"),
    },
  ]);

  const workflowButtons = [
    {
      seq: 53,
      label: "Create Workflow",
      color: "dark",
      onClick: () => onClickExtractHandler("createWorkflow"),
    },
    {
      seq: 54,
      label: "Run Workflow",
      color: "dark",
      onClick: () => onClickExtractHandler("cloneWorkflow"),
    },
    {
      seq: 55,
      label: "Run State Monitor",
      color: "dark",
      onClick: () => onClickExtractHandler("runStateWorkflow"),
    },
  ];

  const onClickExtractHandler = (key) => {
    switch (key) {
      case "createExtract":
        navigate("/create-extract");
        break;
      case "cloneExtract":
        alert("handle clone Extract");
        break;
      case "runExtract":
        alert("run extract");
        break;
      case "createWorkflow":
        alert("create Workflow");
        break;
      case "cloneWorkflow":
        alert("clone workflow");
        break;
      default:
        alert("run extract workflow");
    }
  };

  //   useEffect(() => {
  //     let updatedButtons = extractButtons;
  //     if (selectedTableData.length > 0) {
  //       const isExtractDisabled = selectedTableData.every(
  //         (row) =>
  //           row.status?.toLowerCase() === ExtractStatus &&
  //           row.type?.toLowerCase() === ExtractType
  //       );
  //       updatedButtons = extractButtons?.map((button) => {
  //         if (button?.type === "createExtract") {
  //           button.disabled = selectedTableData?.length > 0;
  //         }
  //         if (button?.type === "cloneExtract") {
  //           button.disabled =
  //             selectedTableData.length === 0 || selectedTableData.length > 1;
  //         }
  //         if (button?.type === "runExtract") {
  //           button.disabled = !isExtractDisabled;
  //         }
  //         return button;
  //       });
  //     } else {
  //         updatedButtons = extractButtons?.map((button) => {
  //         if (button?.type === "createExtract") {
  //           button.disabled = false;
  //         }
  //         if (button?.type === "cloneExtract") {
  //           button.disabled = true;
  //         }
  //         if (button?.type === "runExtract") {
  //           button.disabled = true;
  //         }
  //         return button;
  //       });
  //     }
  //     setExtractButtons(updatedButtons);
  //   }, [selectedTableData]);

  useEffect(() => {
    const isExtractDisabled =
      selectedTableData.length > 0 &&
      selectedTableData.every(
        (row) =>
          row.status?.toLowerCase() === ExtractStatus &&
          row.type?.toLowerCase() === ExtractType
      );

    const updatedButtons = extractButtons.map((button) => {
      switch (button.type) {
        case "createExtract":
          button.disabled = selectedTableData.length > 0;
          break;
        case "cloneExtract":
          button.disabled = selectedTableData.length !== 1;
          break;
        case "runExtract":
          button.disabled = !isExtractDisabled;
          break;
        default:
          break;
      }
      return button;
    });

    setExtractButtons(updatedButtons);
  }, [selectedTableData]);

  const switchButtonGroups = (tab) => {
    if (tab === "workflow") {
      return workflowButtons;
    }
    return extractButtons;
  };

  return <DynamicButtonGroup buttons={switchButtonGroups(tab)} />;
};

export default ExtractOverflowButtons;
