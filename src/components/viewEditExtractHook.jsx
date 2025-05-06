//import React from 'react'
import { useNavigate } from "react-router-dom";
import useViewEditExtract from "../store/useViewEditExtract";
import useCustomModal from "../store/useCustomModal";
import ApprovePopup from "./ApprovePopup";

export const ViewEditExtractHook = () => {
  const navigate = useNavigate();
  const { setIsEditableTrue, setIsEditableFalse } = useViewEditExtract(
    (state) => state
  );
  const { handleOpenModal, handleCloseModal } = useCustomModal(
    (state) => state
  );

  const viewExtractButtons = [
    { seq: 5, label: "Edit", color: "dark", onClick: () => handleOnEdit() },
    {
      seq: 6,
      label: "Clone Extract",
      color: "dark",
      onClick: () => console.log("Clone Extract clicked"),
    },
    {
      seq: 7,
      label: "Approve",
      color: "dark",
      onClick: () => handleApprove(true),
    },
    {
      seq: 8,
      label: "Reject",
      color: "dark",
      onClick: () => handleApprove(false),
    },
  ];

  const editExtractButtons = [
    { seq: 5, label: "Cancel", color: "dark", onClick: () => handleOnCancel() },
    { seq: 6, label: "Save", color: "dark", onClick: () => handleOnCancel() },
    {
      seq: 7,
      label: "Approve",
      color: "dark",
      onClick: () => console.log("Approve clicked"),
    },
    {
      seq: 8,
      label: "Reject",
      color: "dark",
      onClick: () => console.log("Reject clicked"),
    },
  ];

  const aprvRjctModalButtons = [
    {
      seq: 9,
      label: "No",
      color: "dark",
      variant: "outlined",
      onClick: () => handleOnApproveMdal(),
    },
    {
      seq: 9,
      label: "Yes",
      color: "dark",
      onClick: () => handleOnApproveMdal(),
    },
  ];

  const viewExtractDetails = [
    {
      label: "Name",
      type: "dataValue",
      defaultValue: "SSDD_EXTRACT_CORE_SDO_SECURITY",
    },
    { label: "Extract Format", type: "dataValue", defaultValue: "Delimited" },
    { label: "Extract Tolerance", type: "dataValue", defaultValue: "Space ()" },
    { label: "Extract Group", type: "dataValue", defaultValue: "Group_001" },
    { label: "Data Delimiter", type: "dataValue", defaultValue: "Space ()" },
    { label: "Header Delimiter", type: "dataValue", defaultValue: "Space ()" },
    { label: "Footer Delimiter", type: "dataValue", defaultValue: "Space ()" },
    {
      label: "Warehouse Name",
      type: "dataValue",
      defaultValue: "Warehouse Name1",
    },
    {
      label: "Description",
      type: "dataValue",
      defaultValue: "Extract Configuration for RKS Security",
    },
  ];

  const editExtractDetails = [
    {
      label: "Name",
      type: "text",
      defaultValue: "SSDD_EXTRACT_CORE_SDO_SECURITY",
    },
    { label: "Extract Format", type: "text", defaultValue: "Delimited" },
    { label: "Extract Tolerance", type: "text", defaultValue: "Space ()" },
    { label: "Extract Group", type: "text", defaultValue: "Group_001" },
    { label: "Data Delimiter", type: "text", defaultValue: "Space ()" },
    { label: "Header Delimiter", type: "text", defaultValue: "Space ()" },
    { label: "Footer Delimiter", type: "text", defaultValue: "Space ()" },
    {
      label: "Warehouse Name",
      type: "text",
      defaultValue: "Warehouse Name1",
    },
    {
      label: "Description",
      type: "text",
      defaultValue: "Extract Configuration for RKS Security",
      customWidth: { "& .MuiTextField-root": { m: 1, width: "25ch" } },
    },
  ];

  const handleOnEdit = () => {
    setIsEditableTrue();
    navigate("/edit-extract");
  };

  const handleOnCancel = () => {
    setIsEditableFalse();
    navigate("/view-extract");
  };

  const handleApprove = (isApproval) => {
    handleOpenModal({
      isOpen: true,
      showClose: true,
      content: (
        <ApprovePopup isApproval={isApproval} buttons={aprvRjctModalButtons} />
      ),
    });
  };

  const handleOnApproveMdal = () => {
    handleCloseModal();
  };

  return {
    viewExtractButtons,
    editExtractButtons,
    viewExtractDetails,
    editExtractDetails,
  };
};
