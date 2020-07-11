const assert = require('assert');
const buildMessage = require('../utils/buildMessage');



describe('utils - buildMessage', () => {
    describe('when receives na entity and action', () => {
        it('should return the respective message', () => {
            const result = buildMessage('movie', 'create');
            const expect = 'movie created'
            assert.strictEqual(result, expect)
        })
    })
    describe('whend receives an entity and acion and is a list', () => {
        it('should return the respective message whit the entity in plural', () => {
            const result = buildMessage('movie', 'list');
            const expect = 'movies listed'
            assert.strictEqual(result, expect);
        })
    })
})





