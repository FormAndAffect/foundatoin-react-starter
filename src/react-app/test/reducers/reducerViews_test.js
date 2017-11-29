import { expect } from '../test_helper';
import reducerViews from '../../reducers/reducerViews';
import { VIEWS_TOGGLE } from '../../actions/types'

describe('reducerViews', () => {
	it('handles action with unknown type', () => {
		//feed the reducer undefined as state and an empty action
		expect(reducerViews(undefined, {})).to.eql({ view: 'initial' });
	});

	it('handles action of type VIEWS_TOGGLE', () => {
		const action = { type: VIEWS_TOGGLE, payload: 'open' }
		expect(reducerViews({}, action)).to.eql({ view: 'open' });
	});
});