import { expect } from '../test_helper';
import reducerIsOnline from '../../reducers/reducerIsOnline';
import { IS_ONLINE } from '../../actions/types'

describe('reducers', () => {
	describe('reducerIsOnline', () => {
		it('handles action with unknown type', () => {
			//feed the reducer undefined as state and an empty action
			expect(reducerIsOnline(undefined, {})).to.eql({ online: true });
		});

		it('handles action of type IS_ONLINE', () => {
			const action = { type: IS_ONLINE, payload: false }
			expect(reducerIsOnline({}, action)).to.eql({ online: false });
		});
	});
});