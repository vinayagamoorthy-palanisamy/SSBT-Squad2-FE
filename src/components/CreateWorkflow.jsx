import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge as flowAddEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import useWorkflowStore from "../store/workflowStore";
import TaskPopup from "./TaskPopup";
import CustomNode from "./CustomNode";

const nodeTypes = { custom: CustomNode };

const CreateWorkflow = () => {
  // Zustand selectors
  const storeNodes = useWorkflowStore((s) => s.nodes);
  const storeEdges = useWorkflowStore((s) => s.edges);
  const setStoreNodes = useWorkflowStore((s) => s.setNodes);
  const addTask = useWorkflowStore((s) => s.addTask);
  const addEdge = useWorkflowStore((s) => s.addEdge);
  const removeEdge = useWorkflowStore((s) => s.removeEdge);

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

  // Sync store → flow
  useEffect(() => setNodes(storeNodes), [storeNodes, setNodes]);
  useEffect(() => setEdges(storeEdges), [storeEdges, setEdges]);
  // Sync flow → store
  useEffect(() => setStoreNodes(nodes), [nodes, setStoreNodes]);

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState(null);
  const [targetId, setTargetId] = useState(null);

  const handleAddClick = useCallback((mode, id) => {
    setPopupMode(mode);
    setTargetId(id);
    setPopupOpen(true);
  }, []);

  // Submit new task
  const handleSubmit = useCallback(
    (type, name) => {
      // 1) Create/Add new node
      const newNode = addTask(type, name, popupMode, targetId);
      let updatedNodes = [];
      setNodes((nds) => {
        updatedNodes = nds.some((n) => n.id === newNode.id) ? nds : [...nds, newNode];
        return updatedNodes;
      });

      // 2) Connect source → newNode
      const edgeToNew = { id: `${targetId}-${newNode.id}`, source: targetId, target: newNode.id };
      addEdge(edgeToNew);
      setEdges((eds) => flowAddEdge(edgeToNew, eds));

      // 3) Determine bottom-most per column using updatedNodes
      const taskNodes = updatedNodes.filter((n) => !['start', 'end'].includes(n.id));
      const columnsMap = {};
      taskNodes.forEach((n) => {
        const x = n.position.x;
        if (!columnsMap[x]) columnsMap[x] = [];
        columnsMap[x].push(n);
      });
      const bottomNodes = Object.values(columnsMap).map((group) =>
        group.reduce((max, n) => (n.position.y > max.position.y ? n : max), group[0])
      );

      // 4) Remove existing edges to End, then add new bottomNodes → End
      setEdges((eds) => eds.filter((e) => e.target !== 'end'));
      bottomNodes.forEach((node) => {
        const e = { id: `${node.id}-end`, source: node.id, target: 'end' };
        addEdge(e);
        setEdges((eds) => flowAddEdge(e, eds));
      });

      // 5) Reposition End node once
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id !== 'end') return n;
          const maxX = taskNodes.reduce((mx, t) => Math.max(mx, t.position.x), 0);
          return { ...n, position: { x: maxX + 200, y: n.position.y } };
        })
      );

      setPopupOpen(false);
    },
    [addTask, addEdge, removeEdge, popupMode, targetId, setNodes, setEdges]
  );

  // Support manual edge creation
  const onConnect = useCallback(
    (params) => {
      const edge = { id: `${params.source}-${params.target}`, ...params };
      addEdge(edge);
      setEdges((eds) => flowAddEdge(edge, eds));
    },
    [addEdge, setEdges]
  );

    // Display logic: always show start; show tasks; show end only if tasks exist
  const hasTasks = nodes.some((n) => !['start','end'].includes(n.id));
  const displayed = nodes.filter(
    (n) =>
      n.id === 'start' ||
      (n.id === 'end' && hasTasks) ||
      !['start','end'].includes(n.id)
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={displayed.map((n) => ({ ...n, type: 'custom', data: { ...n.data, onAddTask: handleAddClick } }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <TaskPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onSubmit={handleSubmit}
        type={popupMode}
      />
    </div>
  );
};

export default CreateWorkflow;
