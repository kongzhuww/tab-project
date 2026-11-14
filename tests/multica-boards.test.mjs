import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTsModule } from './helpers/load-ts.mjs';
const { tasksInBoard, repositoriesInBoard } = await loadTsModule('src/multica/board-filters.ts');

test('Todoist board filters uncompleted tasks by section without treating completed items as open', () => {
  const tasks = [{id:'a',content:'A'}, {id:'b',content:'B',section_id:'s1'}, {id:'c',content:'C',section_id:'s1',checked:true}, {id:'d',content:'D',section_id:'s1',checked:false,is_completed:true}];
  assert.deepEqual(tasksInBoard(tasks, null).map(t => t.id), ['a','b','d']);
  assert.deepEqual(tasksInBoard(tasks, '').map(t => t.id), ['a']);
  assert.deepEqual(tasksInBoard(tasks, 's1').map(t => t.id), ['b','d']);
});

test('GitHub boards respect explicit mappings, groups and unclassified repositories', () => {
  const repos = [{id:1,name:'one',fullName:'U/one',localGroups:['old']}, {id:2,name:'two',fullName:'U/two',localGroups:[]}, {id:3,name:'three',fullName:'U/three',localGroups:['study']}];
  const mapping = {'u/one':['study'], 'U/two':[]};
  assert.deepEqual(repositoriesInBoard(repos,mapping,'all').map(r => r.id), [1,2,3]);
  assert.deepEqual(repositoriesInBoard(repos,mapping,'ungrouped').map(r => r.id), [2]);
  assert.deepEqual(repositoriesInBoard(repos,mapping,'group:study').map(r => r.id), [1,3]);
  assert.deepEqual(repositoriesInBoard(repos,mapping,'invalid'), []);
});
