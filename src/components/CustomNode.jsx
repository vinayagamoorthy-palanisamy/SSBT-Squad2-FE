import React from "react";
import { Handle, Position } from "reactflow";
import AddIcon from "@mui/icons-material/Add";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const CustomNode = ({ id, data }) => {
  const isStart = id === 'start';
  const isEnd = id === 'end';

  return (
    <div
      style={{
        padding: 10,
        background: data.taskType === "Extract" ? "#4caf50" : "#f44336",
        color: "white",
        borderRadius: 5,
        minWidth: 120,
        textAlign: "center",
        position: "relative",
      }}
    >
      {data.label}
      {/* Action buttons: only dependent on start, both on other tasks, none on end */}
      {!isEnd && (
        <div style={{ position: "absolute", top: 2, right: 2, display: "flex", gap: 4 }}>
          {isStart ? (
            <ArrowRightAltIcon
              fontSize="small"
              onClick={() => data.onAddTask("dependent", id)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <>
              <AddIcon
                fontSize="small"
                onClick={() => data.onAddTask("parallel", id)}
                style={{ cursor: "pointer" }}
              />
              <ArrowRightAltIcon
                fontSize="small"
                onClick={() => data.onAddTask("dependent", id)}
                style={{ cursor: "pointer" }}
              />
            </>
          )}
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
