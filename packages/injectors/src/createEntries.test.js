import createEntries from './createEntries';

describe('createEntries', () => {
	it('correctly creates an array of entries', () => {
		expect(createEntries({ foo: 'bar', bar: 'baz' }, 'ns', 1)).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', version: 1 },
			{ key: 'bar', value: 'baz', namespace: 'ns', version: 1 },
		]);
	});
});
