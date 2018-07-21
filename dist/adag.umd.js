(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.adag = {})));
}(this, (function (exports) { 'use strict';

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


    //# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxDQUFNLE9BQU87Z0JBQ2pDLFNBQXlCO2dCQUNULFlBQUEsQ0FBYSxNQUFiLENBQW9CO1lBQ3BDO1lBQ1ksTUFBQSxDQUFPLE9BQVAsQ0FBZTtRQUMzQjtRQUNRLEtBQUEsQ0FBTSxNQUFNLElBQUksR0FBSjtRQUNaLE9BQU87SUFDZjtBQUNBO0FBakdBIiwiZmlsZSI6ImRhZy5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRWRnZShhLCBiKSB7XG4gICAgcmV0dXJuIFthLmlkLCBiLmlkXTtcbn1cbmV4cG9ydCBjbGFzcyBEQUcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZlcnRpY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmluRWRnZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMub3V0RWRnZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnZlcnRpY2VzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuaW5FZGdlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLm91dEVkZ2VzLmNsZWFyKCk7XG4gICAgfVxuICAgIGFkZFZlcnRleCguLi52ZXJ0aWNlcykge1xuICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdmVydGljZXMpIHtcbiAgICAgICAgICAgIHRoaXMudmVydGljZXMuc2V0KHYuaWQsIHYpO1xuICAgICAgICAgICAgdGhpcy5pbkVkZ2VzLnNldCh2LmlkLCBuZXcgU2V0KCkpO1xuICAgICAgICAgICAgdGhpcy5vdXRFZGdlcy5zZXQodi5pZCwgbmV3IFNldCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRWZXJ0ZXgoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVydGljZXMuZ2V0KGlkKSB8fCBudWxsO1xuICAgIH1cbiAgICBoYXNWZXJ0ZXgoaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmVydGljZXMuaGFzKGlkKTtcbiAgICB9XG4gICAgcmVtb3ZlVmVydGV4KGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmluRWRnZXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgaW5zID0gdGhpcy5pbkVkZ2VzLmdldChpZCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG90aGVyIG9mIGlucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm91dEVkZ2VzLmhhcyhvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdXRFZGdlcy5nZXQob3RoZXIpLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbkVkZ2VzLmRlbGV0ZShpZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3V0RWRnZXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgaW5zID0gdGhpcy5vdXRFZGdlcy5nZXQoaWQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBvdGhlciBvZiBpbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbkVkZ2VzLmhhcyhvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbkVkZ2VzLmdldChvdGhlcikuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm91dEVkZ2VzLmRlbGV0ZShpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy52ZXJ0aWNlcy5kZWxldGUoaWQpO1xuICAgIH1cbiAgICBhZGRFZGdlKC4uLmVkZ2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWRnZSBvZiBlZGdlcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudmVydGljZXMuaGFzKGVkZ2VbMF0pICYmIHRoaXMudmVydGljZXMuaGFzKGVkZ2VbMV0pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbkVkZ2VzLmdldChlZGdlWzFdKS5hZGQoZWRnZVswXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vdXRFZGdlcy5nZXQoZWRnZVswXSkuYWRkKGVkZ2VbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3JyZXNwb25kaW5nIHZlcnRleChzKSBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgICAgIGlmICh0aGlzLmluRWRnZXMuaGFzKGVkZ2VbMV0pKVxuICAgICAgICAgICAgdGhpcy5pbkVkZ2VzLmdldChlZGdlWzFdKS5kZWxldGUoZWRnZVswXSk7XG4gICAgICAgIGlmICh0aGlzLm91dEVkZ2VzLmhhcyhlZGdlWzBdKSlcbiAgICAgICAgICAgIHRoaXMub3V0RWRnZXMuZ2V0KGVkZ2VbMF0pLmRlbGV0ZShlZGdlWzFdKTtcbiAgICB9XG4gICAgdG9wb3NvcnQocm9vdElkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1ZlcnRleChyb290SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb1RvcG9Tb3J0KHJvb3RJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBkb1RvcG9Tb3J0KG5vZGUpIHtcbiAgICAgICAgY29uc3Qgc29ydGVkID0gW107XG4gICAgICAgIGNvbnN0IHZpc2l0ZWQgPSB7fTtcbiAgICAgICAgY29uc3QgdmlzaXQgPSAobm9kZUlkLCBwcmVkZWNlc3NvcnMpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmVkZWNlc3NvcnMuaGFzKG5vZGVJZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N5Y2xpYyBkZXBlbmRlbmN5IGRlbGVjdGVkIGZvciBub2RlICcgKyBub2RlSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZpc2l0ZWRbbm9kZUlkXSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpc2l0ZWRbbm9kZUlkXSA9IHRydWU7XG4gICAgICAgICAgICBjb25zdCBvdXRnb2luZyA9IEFycmF5LmZyb20odGhpcy5vdXRFZGdlcy5nZXQobm9kZUlkKSk7XG4gICAgICAgICAgICBsZXQgaSA9IG91dGdvaW5nLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChpKSB7XG4gICAgICAgICAgICAgICAgcHJlZGVjZXNzb3JzLmFkZChub2RlSWQpO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBvdXRnb2luZ1stLWldO1xuICAgICAgICAgICAgICAgICAgICB2aXNpdChjaGlsZCwgcHJlZGVjZXNzb3JzKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpKTtcbiAgICAgICAgICAgICAgICBwcmVkZWNlc3NvcnMuZGVsZXRlKG5vZGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3J0ZWQudW5zaGlmdChub2RlSWQpO1xuICAgICAgICB9O1xuICAgICAgICB2aXNpdChub2RlLCBuZXcgU2V0KCkpO1xuICAgICAgICByZXR1cm4gc29ydGVkO1xuICAgIH1cbn1cbiJdfQ==

    exports.createEdge = createEdge;
    exports.DAG = DAG;

})));
//# sourceMappingURL=adag.umd.js.map
