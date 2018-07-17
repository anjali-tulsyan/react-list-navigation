import React, { Component } from 'react';

export class Header extends Component {
   constructor(props) {
    super();
    this.state = {
         
    }
   }

    componentWillReceiveProps(nextProps) { 
         
   }

  render() {
     
      return (
            <div className={'overflow-hidden ' + this.props.className }>
               {this.props.children}
            </div>
      );
  }
}
