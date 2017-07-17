/*


*/

const ref = { lol: {} }
const rng = Array(100000).fill().map(Math.random)
const total = rng.reduce((a, b) => a + b)

module.exports = ({ describe, test, $, exports }) => [
  describe('BONUS', [
/*

#### bonus `makeGet`
export a function `makeGet` that takes one argument and return a function that
takes no arguments but return the previously given argument
*/
    test.defined('makeGet'),
    test.type('makeGet', Function),
    test('makeGet should take 1 argument')
      .value(exports.makeGet)
      .map('length')
      .equal(1),
    test('makeGet should return a function')
      .value(exports.makeGet)
      .map(fn => typeof fn('5'))
      .equal('function'),
    test('the returned function by makeGet should take no arguments')
      .value(exports.makeGet)
      .map(fn => fn('5').length)
      .equal(0),
    test('the returned function should by makeGet return the given argument')
      .value(exports.makeGet)
      .map(fn => fn(ref)())
      .equal(ref),
/*

#### bonus `hideMe`
export a function `hideMe` that takes one object argument
and return a function that takes a string arguments and return the corresponding
values from the previously given object
*/
    test.defined('hideMe'),
    test.type('hideMe', Function),
    test('hideMe should take 1 argument')
      .value(exports.hideMe)
      .map('length')
      .equal(1),
    test('hideMe should return a function')
      .value(exports.hideMe)
      .map(fn => typeof fn({}))
      .equal('function'),
    test('the returned function by hideMe should take one argument')
      .value(exports.hideMe)
      .map(fn => fn({}).length)
      .equal(1),
    test('the returned function should by hideMe return the value at the given '
        +'key in the previously given object')
      .value(exports.hideMe)
      .map(fn => fn(ref)('lol'))
      .equal(ref.lol),
/*

#### bonus `safe`
export a function `safe` that takes no arguments  
and return an object that contain two functions, `set`, and `get`.  
The function `set` take any value argument, store it and return generated key  
If a second argument is given to set, it will be used as a key
and update the value at the given key  
The function `get` takes one of the generated key returned from `set`
and return the corresponding value  
The generated keys must be empty object references generated by `Math.random()`
*/

    test.defined('safe'),
    test.type('safe', Function),
    test('safe should take no arguments')
      .value(exports.safe)
      .map('length')
      .equal(0),

    test('safe should return an object')
      .value(exports.safe)
      .map(fn => fn() && typeof fn())
      .equal('object'),

    test('the returned object by safe should contain a function set')
      .value(exports.safe)
      .map(fn => typeof fn().set)
      .equal('function'),

    test('the returned object by safe should contain a function get')
      .value(exports.safe)
      .map(fn => typeof fn().get)
      .equal('function'),

    test('safe() should be able to store a few different values')
      .value(exports.safe)
      .map(fn => (({ get, set }) => rng
        .map(n => set(n))
        .map(get)
        .reduce((a, b) => Number(a) + Number(b)))(fn()))
      .equal(total),

    test('safe() should always use a new object')
      .value(exports.safe)
      .map(fn => fn().get(fn().set(ref)))
      .equal(undefined),

    test('safe() same values should return differents key every set')
      .value(exports.safe)
      .map(fn => (({ set }) => set(ref) === set(ref))(fn()))
      .equal(false),

    test('safe() should always return a different key')
      .value(exports.safe)
      .map(fn => fn().set(ref) === fn().set(ref))
      .equal(false),

    test('safe().set should return a key, calling get with this key should'
        +'return the first arguement of set')
      .value(exports.safe)
      .map(fn => {
        const { set, get } = fn()
        const key = set(ref)

        return get(key)
      })
      .equal(ref),

    test('the second argument of safe().set should be use to set a specific key'
        +'instead of creating a new one')
      .value(exports.safe)
      .map(fn => {
        const { set, get } = fn()
        const key = set('lol')
        set(ref, key)

        return get(key)
      })
      .equal(ref),

    test('the type of the key should be \'number\'')
      .value(exports.safe)
      .map(fn => fn().set() && typeof fn().set())
      .equal('number'),
/*

#### bonus `superSafe`
export a function `superSafe` that work's exactly like `safe` but the generated
keys must be empty object references generated by `Object.create(null)`
*/
    test.defined('superSafe'),
    test.type('superSafe', Function),
    test('superSafe should take no arguments')
      .value(exports.superSafe)
      .map('length')
      .equal(0),

    test('superSafe should return an object')
      .value(exports.superSafe)
      .map(fn => fn() && typeof fn())
      .equal('object'),

    test('the returned object by superSafe should contain a function set')
      .value(exports.superSafe)
      .map(fn => typeof fn().set)
      .equal('function'),

    test('the returned object by superSafe should contain a function get')
      .value(exports.superSafe)
      .map(fn => typeof fn().get)
      .equal('function'),

    test('superSafe() should be able to store a few different values')
      .value(exports.superSafe)
      .map(fn => (({ get, set }) => rng
        .map(n => set(n))
        .map(get)
        .reduce((a, b) => Number(a) + Number(b)))(fn()))
      .equal(total),

    test('superSafe() should always use a new object')
      .value(exports.superSafe)
      .map(fn => fn().get(fn().set(ref)))
      .equal(undefined),

    test('superSafe() same values should return differents key every set')
      .value(exports.superSafe)
      .map(fn => (({ set }) => set(ref) === set(ref))(fn()))
      .equal(false),

    test('superSafe() should always return a different key')
      .value(exports.superSafe)
      .map(fn => fn().set(ref) === fn().set(ref))
      .equal(false),

    test('superSafe().set should return a key, calling get with this key should'
        +'return the first arguement of set')
      .value(exports.superSafe)
      .map(fn => {
        const { set, get } = fn()
        const key = set(ref)

        return get(key)
      })
      .equal(ref),

    test('the second argument of superSafe().set should be use to set a specific key'
        +'instead of creating a new one')
      .value(exports.superSafe)
      .map(fn => {
        const { set, get } = fn()
        const key = set('lol')
        set(ref, key)

        return get(key)
      })
      .equal(ref),

    test('the type of the key should be \'object\'')
      .value(exports.superSafe)
      .map(fn => fn().set() && typeof fn().set())
      .equal('object'),

    test('the object key should have no prototype')
      .value(exports.superSafe)
      .map(fn => fn().set().prototype)
      .equal(undefined),

  ].concat($('arrow').map(def =>
    test(`function line ${def.loc.start.line} column ${
      def.loc.start.column} is a single expression`)
      .value(def.body.type)
      .notEqual('BlockStatement')))
  .concat([
    test('no variable declaration')
      .value($('VariableDeclarator').length)
      .equal(0, 'Variables declaration count should be 0'),
    test(`Don't Repeat Yourself`)
      .value($('ExpressionStatement Identifier'))
      .map(nodes => nodes
        .filter(n => !/function/i.test(n.parent.type))
        .map(n => n.name)
        .filter(name => name !== 'get' && Object.keys(exports).includes(name))
        .length)
      .equal(Object.keys(exports).length - 1, 'You have repeated keys'),
  ])),
]
