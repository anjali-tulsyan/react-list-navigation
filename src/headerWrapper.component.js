import React, { Component } from 'react';

class HeaderWrapper extends Component {
   constructor(props) {
    super();
    this.state = {
         
    }
   }

    componentWillReceiveProps(nextProps) { 
         
   }


   onClickBackButton() {
    if (this.props.onClickBackButton) {
      this.props.onClickBackButton();
    }
   }




  render() {
    return (
      <div className='header-wrapper'>
        {  this.props.node.level.length > 0 ? 
                                              <div className="navigation-img back" onClick={this.onClickBackButton.bind(this)}>
                                                {this.props.backImg}
                                              </div>
                                             : null
        }
        {this.props.children}
      </div>
    );
  }
}

export default HeaderWrapper;