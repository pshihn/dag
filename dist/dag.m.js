function createEdge(c,a){return[c.id,a.id]}class DAG{constructor(){this.vertices=new Map,this.inEdges=new Map,this.outEdges=new Map}clear(){this.vertices.clear(),this.inEdges.clear(),this.outEdges.clear()}addVertex(...a){for(const b of a)this.vertices.set(b.id,b),this.inEdges.set(b.id,new Set),this.outEdges.set(b.id,new Set)}getVertex(a){return this.vertices.get(a)||null}hasVertex(a){return this.vertices.has(a)}removeVertex(a){if(this.inEdges.has(a)){const b=this.inEdges.get(a);for(const c of b)this.outEdges.has(c)&&this.outEdges.get(c).delete(a);this.inEdges.delete(a)}if(this.outEdges.has(a)){const b=this.outEdges.get(a);for(const c of b)this.inEdges.has(c)&&this.inEdges.get(c).delete(a);this.outEdges.delete(a)}this.vertices.delete(a)}addEdge(...a){for(const b of a)if(this.vertices.has(b[0])&&this.vertices.has(b[1]))this.inEdges.get(b[1]).add(b[0]),this.outEdges.get(b[0]).add(b[1]);else throw new Error('Corresponding vertex(s) not found.')}removeEdge(a){this.inEdges.has(a[1])&&this.inEdges.get(a[1]).delete(a[0]),this.outEdges.has(a[0])&&this.outEdges.get(a[0]).delete(a[1])}toposort(a){return this.hasVertex(a)?this.doTopoSort(a):[]}doTopoSort(a){const b=[],c={},d=(a,e)=>{if(e.has(a))throw new Error('Cyclic dependency delected for node '+a);if(!c[a]){c[a]=!0;const f=Array.from(this.outEdges.get(a));let g=f.length;if(g){e.add(a);do{const a=f[--g];d(a,e)}while(g);e.delete(a)}b.unshift(a)}};return d(a,new Set),b}}export{createEdge,DAG};