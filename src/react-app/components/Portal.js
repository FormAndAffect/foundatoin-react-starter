import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//implimentation
//in the parent...

// onOpenClick(id) {
//   //open the modal
//   this.refs.Portal.openModal();
// }

//pass the portal object to render into.
//use this to render non react components into it (outside new react render tree)
// portalConnect(portal) {
//    scene(portal);
// }

//<Portal ref='modal' portalConnect={this.portalConnect.bind(this)}>
//  <div>new react tree content here...</div>
//</Portal>

//generated output:
//<div id='portal' class='portal transition-opac off'>
//  <div class='in-react'>
//    <div data-reactroot='' class='portal-children'>
//     <div>modal content here...</div>
//    </div>
//  </div>
//  <div class='out-react'>
//    <canvas width='1013' height='674' style='width: 1013px; height: 674px;'></canvas>
//  </div>
//</div>


class Portal extends Component {

  constructor(props) {
    super(props);
    this.portal = null;
    this.inReact = null;
    this.outReact = null;
  }

  //we've stopped the render tree
  render() {
    //open the portal by rendering nothing that will ever change
    return null;
  }

  componentDidMount() {
    //crete portal
    this.portal = document.createElement('div');
    //add classes
    this.portal.id = 'portal';
    this.portal.className = 'portal';
    this.portal.className += ' transition-opac';
    this.portal.className += ' off';
    //create element in portal for elements in the new react render tree
    this.inReact = document.createElement('div');
    this.inReact.className = 'in-react';
    this.portal.appendChild(this.inReact);
    //create element in portal for elements not in react render tree
    this.outReact = document.createElement('div');
    this.outReact.className = 'out-react';
    this.portal.appendChild(this.outReact);

    //pass the out-react container element back to the parent
    this.props.portalConnect(this.outReact);

    //render the dialog content
    this.renderDialogContent(this.props);

    document.body.appendChild(this.portal);
  }

  //when get new props also renderDialogContent
  componentWillReceiveProps(newProps) {
    //render the children
    this.renderDialogContent(newProps);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.portal);
    document.body.removeChild(this.portal);
  }

  openModal() {
    this.portal.style.display = 'block';

    let that = this;
    setTimeout(() => {
      that.portal.className = 'portal';
      that.portal.className += ' transition-opac';
      that.portal.className += ' on';
    }, 100);
  }

  close(e) {
    e.preventDefault();

    this.portal.className = 'portal';
    this.portal.className += ' transition-opac';
    this.portal.className += ' off';

    let that = this;
    setTimeout(() => {
      that.portal.style.display = 'none';
    }, 100);
  }


  renderDialogContent(props) {
    //using ReactDom.render we started a new render tree
    //rendering the children props to the portal we created
    ReactDOM.render(
      <div>
          {this.props.children}
      </div>, 
      this.inReact);
  }

}

export default Portal;