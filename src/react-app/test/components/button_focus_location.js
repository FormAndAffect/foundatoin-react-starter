import { renderComponent, expect } from '../test_helper';
import ButtonFocusLocation from '../../components/button_focus_location';

describe('ButtonFocusLocation', () => {
	let component;

	beforeEach(() => {
		component = renderComponent(ButtonFocusLocation);
	});

	it('has the correct class', () => {
		expect(component).to.have.class('location-btn');
	});

});