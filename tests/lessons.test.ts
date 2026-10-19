import test from 'node:test';
import assert from 'node:assert/strict';
import {lessons,skills,evaluate,normalize} from '../src/lessons.ts';
for(const skill of skills){test(`${skill}: correct and incorrect answers`,()=>{assert.equal(evaluate(skill,lessons[skill].answer),true);assert.equal(evaluate(skill,'wrong'),false);assert.equal(evaluate(skill,''),false)})}
test('normalization handles casing punctuation and whitespace',()=>assert.equal(normalize('  NICE to meet you! '),'nice to meet you'));
