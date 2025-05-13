import { create } from 'zustand';
import { nanoid } from 'nanoid';

// Initial start and end nodes
const initialNodes = [
  {
    id: 'start',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: { label: 'Start Task', taskType: 'Extract' },
    style: { backgroundColor: '#4caf50', color: 'white' },
  },
  {
    id: 'end',
    type: 'custom',
    position: { x: 800, y: 200 },
    data: { label: 'End Task', taskType: 'DQ' },
    style: { backgroundColor: '#f44336', color: 'white' },
  },
];

// No initial edges
const initialEdges = [];

/**
 * Workflow store manages nodes and edges of the flow
 */
const useWorkflowStore = create((set, get) => ({
  // State
  nodes: initialNodes,
  edges: initialEdges,

  // Actions
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  /**
   * Add or return existing task node.
   * relationType: 'dependent' (x + 100) or 'parallel' (y + 100)
   * fromNodeId: id of the source node
   * Returns the new or existing node.
   */
  addTask: (taskType, taskName, relationType, fromNodeId) => {
    const store = get();
    const existing = store.nodes.find((n) => n.data.label === taskName);
    if (existing) {
      return existing;
    }

    const fromNode = store.nodes.find((n) => n.id === fromNodeId) || { position: { x: 0, y: 0 } };
    const baseX = fromNode.position.x;
    const baseY = fromNode.position.y;
    const x = relationType === 'dependent' ? baseX + 200 : baseX;
    const y = relationType === 'parallel' ? baseY + 100 : baseY;

    const newNode = {
      id: nanoid(),
      type: 'custom',
      position: { x, y },
      data: { label: taskName, taskType },
      style: {
        backgroundColor: taskType === 'Extract' ? '#e3f2fd' : '#fce4ec',
        border: '1px solid #888',
        borderRadius: 6,
        padding: 10,
      },
    };

    set((state) => ({ nodes: [...state.nodes, newNode] }));
    return newNode;
  },

  /**
   * Add a new directed edge with arrow
   */
  addEdge: (edge) => {
    const exists = get().edges.some((e) => e.id === edge.id);
    if (exists) return;
    set((state) => ({ edges: [...state.edges, edge] }));
  },

  /**
   * Remove an edge by id
   */
  removeEdge: (edgeId) => {
    set((state) => ({ edges: state.edges.filter((e) => e.id !== edgeId) }));
  },

  /**
   * Reset workflow to initial state
   */
  reset: () => set({ nodes: initialNodes, edges: initialEdges }),
}));

export default useWorkflowStore;
