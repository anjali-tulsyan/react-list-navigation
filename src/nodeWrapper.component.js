import React, { Component } from 'react';

class NodeWrapper extends Component {
   constructor(props) {
    super();
    this.state = {
         isActive : props.isActive
    }
   }

  componentWillReceiveProps(nextProps) { 
         this.setState({
            isActive : nextProps.isActive
         })
   }


  onClickNextButton() {
    if (this.props.onClickNextButton) {
      this.props.onClickNextButton(this.props.node);
    }
  }

   onChildrenClick(e) {
    e.preventDefault();
    let closest = e.target.closest('.node-container');
    if (closest && closest.dataset.isclick == 'true') {
      this.props.activeNode(closest.dataset.node);
      let that = this;
      setTimeout(function(){ that.setState({isActive : true}) }, 0);
    }
   }

  render() {
    return (
      <div className={'node-wrapper' + (this.state.isActive ? ' active ' : '' )} >
        <div onClick={(e) => this.onChildrenClick(e)}>
           {this.props.children}
        </div>
        { (this.props.node.children && this.props.node.children.length) || this.props.node.childrenCount ?  <div className="navigation-img next" onClick={this.onClickNextButton.bind(this)}>
                                        {this.props.nextImg}
                                      </div> 
                                  : <div className="visibility-hidden navigation-img next"> {this.props.nextImg} </div>
         }
        
      </div>
    );
  }
}

export default NodeWrapper;