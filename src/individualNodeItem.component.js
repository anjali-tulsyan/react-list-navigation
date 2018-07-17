import React, { Component } from 'react';

export class IndividualNodeItem extends Component {
   constructor(props) {
    super();
    this.state = {
         
    }
   }

    componentWillReceiveProps(nextProps) { 
         
   }

   onClick () {
    if (this.props.onItemClick) {
      this.props.onItemClick();
    }
   }



  render() {
     
      return (
          <div data-isClick={this.props.onItemClick ? 'true' : 'false'} className={'individualNodeItem ' + this.props.className} onClick={this.onClick.bind(this)}> { this.props.children} </div>
      );
  }
}