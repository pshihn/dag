'use strict';

function createEdge(a, b) {
    return [a.id,b.id];
}

var DAG = function DAG() {
    this.vertices = new Map();
    this.inEdges = new Map();
    this.outEdges = new Map();
};
DAG.prototype.clear = function clear () {
    this.vertices.clear();
    this.inEdges.clear();
    this.outEdges.clear();
};
DAG.prototype.addVertex = function addVertex () {
        var this$1 = this;
        var vertices = [], len = arguments.length;
        while ( len-- ) vertices[ len ] = arguments[ len ];

    for (var i = 0, list = vertices; i < list.length; i += 1) {
        var v = list[i];

            this$1.vertices.set(v.id, v);
        this$1.inEdges.set(v.id, new Set());
        this$1.outEdges.set(v.id, new Set());
    }
};
DAG.prototype.getVertex = function getVertex (id) {
    return this.vertices.get(id) || null;
};
DAG.prototype.hasVertex = function hasVertex (id) {
    return this.vertices.has(id);
};
DAG.prototype.removeVertex = function removeVertex (id) {
        var this$1 = this;

    if (this.inEdges.has(id)) {
        var ins = this.inEdges.get(id);
        for (var i = 0, list = ins; i < list.length; i += 1) {
            var other = list[i];

                if (this$1.outEdges.has(other)) {
                this$1.outEdges.get(other).delete(id);
            }
        }
        this.inEdges.delete(id);
    }
    if (this.outEdges.has(id)) {
        var ins$1 = this.outEdges.get(id);
        for (var i$1 = 0, list$1 = ins$1; i$1 < list$1.length; i$1 += 1) {
            var other$1 = list$1[i$1];

                if (this$1.inEdges.has(other$1)) {
                this$1.inEdges.get(other$1).delete(id);
            }
        }
        this.outEdges.delete(id);
    }
    this.vertices.delete(id);
};
DAG.prototype.addEdge = function addEdge () {
        var this$1 = this;
        var edges = [], len = arguments.length;
        while ( len-- ) edges[ len ] = arguments[ len ];

    for (var i = 0, list = edges; i < list.length; i += 1) {
        var edge = list[i];

            if (this$1.vertices.has(edge[0]) && this$1.vertices.has(edge[1])) {
            this$1.inEdges.get(edge[1]).add(edge[0]);
            this$1.outEdges.get(edge[0]).add(edge[1]);
        } else {
            throw new Error('Corresponding vertex(s) not found.');
        }
    }
};
DAG.prototype.removeEdge = function removeEdge (edge) {
    if (this.inEdges.has(edge[1])) 
        { this.inEdges.get(edge[1]).delete(edge[0]); }
    if (this.outEdges.has(edge[0])) 
        { this.outEdges.get(edge[0]).delete(edge[1]); }
};
DAG.prototype.toposort = function toposort (rootId) {
    if (this.hasVertex(rootId)) {
        return this.doTopoSort(rootId);
    }
    return [];
};
DAG.prototype.doTopoSort = function doTopoSort (node) {
        var this$1 = this;

    var sorted = [];
    var visited = {};
    var visit = function (nodeId, predecessors) {
        if (predecessors.has(nodeId)) {
            throw new Error('Cyclic dependency delected for node ' + nodeId);
        }
        if (visited[nodeId]) {
            return;
        }
        visited[nodeId] = true;
        var outgoing = Array.from(this$1.outEdges.get(nodeId));
        var i = outgoing.length;
        if (i) {
            predecessors.add(nodeId);
            do {
                var child = outgoing[--i];
                visit(child, predecessors);
            } while (i);
            predecessors.delete(nodeId);
        }
        sorted.unshift(nodeId);
    };
    visit(node, new Set());
    return sorted;
};

exports.createEdge = createEdge;
exports.DAG = DAG;
//# sourceMappingURL=adag.js.map
