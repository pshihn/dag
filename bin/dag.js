export class DAG {
    constructor() {
        this.vertices = new Map();
        this.edges = new Map();
        this.inEdges = new Map();
        this.outEdges = new Map();
    }
    clear() {
        this.vertices.clear();
        this.edges.clear();
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
            const edges = this.inEdges.get(id);
            for (const oid of edges.values()) {
                this.edges.delete(`${oid}-${id}`);
            }
            this.inEdges.delete(id);
        }
        if (this.outEdges.has(id)) {
            const edges = this.outEdges.get(id);
            for (const oid of edges.values()) {
                this.edges.delete(`${id}-${oid}`);
            }
            this.outEdges.delete(id);
        }
        this.vertices.delete(id);
    }
    addEdge(...edges) {
        for (const edge of edges) {
            const eid = `${edge[0].id}-${edge[1].id}`;
            if (this.edges.has(eid)) {
                return;
            }
            if (this.vertices.has(edge[0].id) && this.vertices.has(edge[1].id)) {
                this.edges.set(eid, edge);
                this.inEdges.get(edge[1].id).add(edge[0].id);
                this.outEdges.get(edge[0].id).add(edge[0].id);
            }
            else {
                throw new Error('Corresponding vertex(s) not found.');
            }
        }
    }
    removeEdge(edge) {
        const eid = `${edge[0].id}-${edge[1].id}`;
        this.edges.delete(eid);
        if (this.inEdges.has(edge[1].id))
            this.inEdges.get(edge[1].id).delete(edge[0].id);
        if (this.inEdges.has(edge[0].id))
            this.outEdges.get(edge[0].id).delete(edge[0].id);
    }
}
