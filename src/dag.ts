export interface Vertex<T> {
  id: string;
  data?: T;
}

export declare type Edge = [string, string];

export function createEdge(a: Vertex<any>, b: Vertex<any>): Edge {
  return [a.id, b.id];
}

export class DAG<T> {
  private vertices: Map<string, Vertex<T>> = new Map();
  private inEdges: Map<string, Set<string>> = new Map();
  private outEdges: Map<string, Set<string>> = new Map();

  clear() {
    this.vertices.clear();
    this.inEdges.clear();
    this.outEdges.clear();
  }

  addVertex(...vertices: Vertex<T>[]): void {
    for (const v of vertices) {
      this.vertices.set(v.id, v);
      this.inEdges.set(v.id, new Set());
      this.outEdges.set(v.id, new Set());
    }
  }

  getVertex(id: string): Vertex<T> | null {
    return this.vertices.get(id) || null;
  }

  hasVertex(id: string): boolean {
    return this.vertices.has(id);
  }

  removeVertex(id: string) {
    this.inEdges.delete(id);
    this.outEdges.delete(id);
    this.vertices.delete(id);
  }

  addEdge(...edges: Edge[]): void {
    for (const edge of edges) {
      if (this.vertices.has(edge[0]) && this.vertices.has(edge[1])) {
        this.inEdges.get(edge[1])!.add(edge[0]);
        this.outEdges.get(edge[0])!.add(edge[1]);
      } else {
        throw new Error('Corresponding vertex(s) not found.');
      }
    }
  }

  removeEdge(edge: Edge) {
    if (this.inEdges.has(edge[1]))
      this.inEdges.get(edge[1])!.delete(edge[0]);
    if (this.inEdges.has(edge[0]))
      this.outEdges.get(edge[0])!.delete(edge[0]);
  }

  toposort(rootId: string): string[] {
    if (this.hasVertex(rootId)) {
      return this.doTopoSort(rootId);
    }
    return [];
  }

  private doTopoSort(node: string): string[] {
    const sorted: string[] = [];
    const visited: { [id: string]: boolean } = {};
    const visit = (nodeId: string, predecessors: Set<string>) => {
      if (predecessors.has(nodeId)) {
        throw new Error('Cyclic dependency delected for node ' + nodeId);
      }
      if (visited[nodeId]) {
        return;
      }
      visited[nodeId] = true;
      const outgoing = Array.from(this.outEdges.get(nodeId)!);
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
    visit(node, new Set<string>());
    return sorted;
  }
}