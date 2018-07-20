const adag = require('../');

test('Basic test', () => {
  const dag = new adag.DAG();
  const names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  for (const n of names) {
    dag.addVertex({ id: n });
  }
  dag.addEdge(
    ['a', 'c'], ['a', 'd'],
    ['b', 'd'], ['b', 'e'],
    ['d', 'f'], ['d', 'g'],
    ['g', 'i'],
    ['h', 'i']
  );
  expect(dag.vertices.size).toBe(9);
  expect(dag.inEdges.size).toBe(9);
  expect(dag.outEdges.size).toBe(9);
  expect(dag.inEdges.get('a').size).toBe(0);
  expect(dag.inEdges.get('d').size).toBe(2);
  expect(dag.inEdges.get('i').size).toBe(2);
  expect(dag.outEdges.get('d').size).toBe(2);
  expect(dag.outEdges.get('h').size).toBe(1);
  expect(dag.outEdges.get('i').size).toBe(0);

  expect(dag.toposort('a').length).toBe(6);
  expect(dag.toposort('d').length).toBe(4);
  expect(dag.toposort('g').length).toBe(2);
  expect(dag.toposort('h').length).toBe(2);
  expect(dag.toposort('i').length).toBe(1);

  expect(dag.toposort('a')).toContain('g');
  expect(dag.toposort('a')).toContain('i');

  dag.removeVertex('g');

  expect(dag.vertices.size).toBe(8);
  expect(dag.inEdges.size).toBe(8);
  expect(dag.outEdges.size).toBe(8);
  expect(dag.inEdges.get('a').size).toBe(0);
  expect(dag.inEdges.get('d').size).toBe(2);
  expect(dag.inEdges.get('i').size).toBe(1);
  expect(dag.outEdges.get('d').size).toBe(1);
  expect(dag.outEdges.get('h').size).toBe(1);
  expect(dag.outEdges.get('i').size).toBe(0);

  expect(dag.toposort('a').length).toBe(4);
  expect(dag.toposort('d').length).toBe(2);
  expect(dag.toposort('g').length).toBe(0);
  expect(dag.toposort('h').length).toBe(2);
  expect(dag.toposort('i').length).toBe(1);

  expect(dag.toposort('a')).not.toContain('g');
  expect(dag.toposort('a')).not.toContain('i');
});