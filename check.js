// node check.js — sanity check for the poker evaluator / CPU draw logic in index.html
const s = require('fs').readFileSync(__dirname + '/index.html', 'utf8');
(0, eval)(s.slice(s.indexOf('const NAME'), s.indexOf('function newDeck')) + s.slice(s.indexOf('const HN'), s.indexOf('const PK')) + ';globalThis.T={evalHand,cmp,cpuDiscard}');
const { evalHand: ev, cmp: cp, cpuDiscard: cd } = T, assert = require('assert');
const h = str => str.split(' ').map(x => ({ r: '23456789TJQKA'.indexOf(x[0]) + 2, s: x[1] }));
const cat = x => ev(h(x)).cat;
assert.equal(cat('A♠ K♠ Q♠ J♠ T♠'), 8); assert.equal(cat('9♠ 9♥ 9♦ 9♣ 2♠'), 7); assert.equal(cat('3♠ 3♥ 3♦ 7♣ 7♠'), 6);
assert.equal(cat('2♥ 8♥ J♥ 4♥ K♥'), 5); assert.equal(cat('A♠ 2♥ 3♦ 4♣ 5♠'), 4); assert.equal(cat('5♠ 5♥ 5♦ K♣ 2♠'), 3);
assert.equal(cat('5♠ 5♥ K♦ K♣ 2♠'), 2); assert.equal(cat('5♠ 5♥ 8♦ K♣ 2♠'), 1); assert.equal(cat('5♠ 9♥ 8♦ K♣ 2♠'), 0);
assert(cp(ev(h('A♠ 2♥ 3♦ 4♣ 5♠')).score, ev(h('2♠ 3♥ 4♦ 5♣ 6♠')).score) < 0, 'wheel < 6-high straight');
assert(cp(ev(h('K♠ K♥ 3♦ 4♣ 9♠')).score, ev(h('K♦ K♣ 3♠ 4♥ 8♠')).score) > 0, 'kicker');
assert.deepEqual(cd(h('5♠ 5♥ 8♦ K♣ 2♠')), [2, 3, 4]);
assert.deepEqual(cd(h('2♥ 8♥ J♥ 4♥ K♠')), [4]);
console.log('ok');
