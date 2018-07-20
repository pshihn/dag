export interface Vertex<T> {
    id: string;
    data?: T;
}
export declare type Edge = [string, string];
export declare function createEdge(a: Vertex<any>, b: Vertex<any>): Edge;
export declare class DAG<T> {
    private vertices;
    private inEdges;
    private outEdges;
    clear(): void;
    addVertex(...vertices: Vertex<T>[]): void;
    getVertex(id: string): Vertex<T> | null;
    hasVertex(id: string): boolean;
    removeVertex(id: string): void;
    addEdge(...edges: Edge[]): void;
    removeEdge(edge: Edge): void;
    toposort(rootId: string): string[];
    private doTopoSort;
}
