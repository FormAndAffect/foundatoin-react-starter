import { renderComponent, expect } from '../test_helper';
import ButtonsViews from '../../components/buttons_views';

describe('ButtonsViews', () => {
	let component;
	let leftButton;
	let rightButton;

	beforeEach(() => {
		//renderComponent(component, props, state)
		component = renderComponent(ButtonsViews);
		leftButton = component.find('.menu-item-half:first-child');
		rightButton = component.find('.menu-item-half:last-child');
	});

	it('has the correct class', () => {
		expect(component).to.have.class('view-toggle');
	});

	it('has a left button', () => {
		expect(leftButton).to.exist;
	});

	it('has a right button', () => {
		expect(rightButton).to.exist;
	}); 

	describe('list panel open', () => {
		let component2;
		let leftButton2;
		let props;

		beforeEach(() => {
			//simulate a change in props by creatine a mock redux store
			props = { views: { view: 'open' } }
			component2 = renderComponent(ButtonsViews, null, props);
			leftButton2 = component2.find('.menu-item-half:first-child');
		});
		
		it('has the open class', () => {
			expect(leftButton2).to.have.class('open'); 
		});
	});

	describe('list panel closed', () => {
		let component3;
		let leftButton3;
		let props;

		beforeEach(() => {
			//simulate a change in props by creatine a mock redux store
			props = { views: { view: 'close' } }
			component3 = renderComponent(ButtonsViews, null, props);
			leftButton3 = component3.find('.menu-item-half:first-child');
		});
		
		it('has the closed class', () => {
			expect(leftButton3).to.have.class('close'); 
		});
	});
});