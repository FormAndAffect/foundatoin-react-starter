import { expect } from '../test_helper';
import { VIEWS_TOGGLE } from '../../actions/types';
import { viewsToggle } from '../../actions/views';

describe('actions', () => {
	describe('viewsToggle', () => {
		it('has the correct type', () => {
			const action = viewsToggle();
			expect(action.type).to.equal(VIEWS_TOGGLE);
		});

		it('has the correct payload', () => {
			const action = viewsToggle('open');
			expect(action.payload).to.equal('open');
		})
	});
});