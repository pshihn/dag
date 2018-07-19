export interface Vertex<T> {
    id: string;
    data?: T;
}
export declare type Edge<T> = [Vertex<T>, Vertex<T>];
export declare class DAG<T> {
    private vertices;
    private edges;
    private inEdges;
    private outEdges;
    clear(): void;
    addVertex(...vertices: Vertex<T>[]): void;
    getVertex(id: string): Vertex<T> | null;
    hasVertex(id: string): boolean;
    removeVertex(id: string): void;
    addEdge(...edges: Edge<T>[]): void;
    removeEdge(edge: Edge<T>): void;
}
