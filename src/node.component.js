import React, { Component } from 'react';

export class Node extends Component {
   constructor(props) {
    super(props);
   }

   onNodeClick(e) {
    e.preventDefault();
    if (this.props.onNodeClick) {
      this.props.onNodeClick(e);
    }
   }

  render() {
      let children = this.props.children;
      let childrenArray = [];
      if (children.constructor.name == 'Array') {
	      children.forEach((child, index) => {
	      	 childrenArray.push(child);
	      });
	   } else {
  	   	 childrenArray.push(children);
         
	   }
      return (
      		<div data-isClick={this.props.onNodeClick ? 'true' : 'false'} className={'node-container ' + this.props.className} data-node={JSON.stringify(this.props.node)} onClick={(e) => this.onNodeClick(e)}>
              {childrenArray}
      		</div> 
      );
  }
}
