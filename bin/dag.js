export function createEdge(a, b) {
    return [a.id, b.id];
}
export class DAG {
    constructor() {
        this.vertices = new Map();
        this.inEdges = new Map();
        this.outEdges = new Map();
    }
    clear() {
        this.vertices.clear();
        this.inEdges.clear();
        this.outEdges.clear();
    }
    addVertex(...vertices) {
        for (const v of vertices) {
            this.vertices.set(v.id, v);
            this.inEdges.set(v.id, new Set());
            this.outEdges.set(v.id, new Set());
        }
    }
    getVertex(id) {
        return this.vertices.get(id) || null;
    }
    hasVertex(id) {
        return this.vertices.has(id);
    }
    removeVertex(id) {
        if (this.inEdges.has(id)) {
            const ins = this.inEdges.get(id);
            for (const other of ins) {
                if (this.outEdges.has(other)) {
                    this.outEdges.get(other).delete(id);
                }
            }
            this.inEdges.delete(id);
        }
        if (this.outEdges.has(id)) {
            const ins = this.outEdges.get(id);
            for (const other of ins) {
                if (this.inEdges.has(other)) {
                    this.inEdges.get(other).delete(id);
                }
            }
            this.outEdges.delete(id);
        }
        this.vertices.delete(id);
    }
    addEdge(...edges) {
        for (const edge of edges) {
            if (this.vertices.has(edge[0]) && this.vertices.has(edge[1])) {
                this.inEdges.get(edge[1]).add(edge[0]);
                this.outEdges.get(edge[0]).add(edge[1]);
            }
            else {
                throw new Error('Corresponding vertex(s) not found.');
            }
        }
    }
    removeEdge(edge) {
        if (this.inEdges.has(edge[1]))
            this.inEdges.get(edge[1]).delete(edge[0]);
        if (this.outEdges.has(edge[0]))
            this.outEdges.get(edge[0]).delete(edge[1]);
    }
    toposort(rootId) {
        if (this.hasVertex(rootId)) {
            return this.doTopoSort(rootId);
        }
        return [];
    }
    doTopoSort(node) {
        const sorted = [];
        const visited = {};
        const visit = (nodeId, predecessors) => {
            if (predecessors.has(nodeId)) {
                throw new Error('Cyclic dependency delected for node ' + nodeId);
            }
            if (visited[nodeId]) {
                return;
            }
            visited[nodeId] = true;
            const outgoing = Array.from(this.outEdges.get(nodeId));
            let i = outgoing.length;
            if (i) {
                predecessors.add(nodeId);
                do {
                    const child = outgoing[--i];
                    visit(child, predecessors);
                } while (i);
                predecessors.delete(nodeId);
            }
            sorted.unshift(nodeId);
        };
        visit(node, new Set());
        return sorted;
    }
}
