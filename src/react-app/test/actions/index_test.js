import { expect } from '../test_helper';
import { IS_ONLINE } from '../../actions/types';
import { isOnline } from '../../actions/isOnline';

describe('actions', () => {
	describe('isOnline', () => {
		it('has the correct type', () => {
			const action = isOnline();
			expect(action.type).to.equal(IS_ONLINE);
		});

		it('has the correct payload', () => {
			const action = isOnline(false);
			expect(action.payload).to.equal(false);
		})
	});
});