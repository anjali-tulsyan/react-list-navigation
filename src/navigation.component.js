import React, { Component } from 'react';
import HeaderWrapper from './headerWrapper.component.js';
import NodeWrapper from './nodeWrapper.component.js';
import '../index.css';
export class Navigation extends Component {
   constructor(props) {
    super();
    
    let modifiedNavigationData = this.addingLevelInformation(props.navigationData,[]);
    this.state = {
        isLoading: props.isLoading,
        modifiedNavigationData : modifiedNavigationData,
        nodeToBeRendered : this.nodeToBeRenderd(modifiedNavigationData)
     }
    }

    componentWillReceiveProps(nextProps) { 
      let modifiedNavigationData = this.addingLevelInformation(nextProps.navigationData,[]);
        this.setState({
            isLoading : nextProps.isLoading,
            modifiedNavigationData : modifiedNavigationData,
            nodeToBeRendered : this.nodeToBeRenderd(modifiedNavigationData)
        })
   }

   addingLevelInformation(data,level) {
    data.level = level;
     if (data.children && data.children.length) {
        data.children.forEach((child, index) => {
            let newLevel = JSON.parse(JSON.stringify(level));
            newLevel.push(index);
            let newDataObj = this.addingLevelInformation(child,newLevel);
            data.children[index] = newDataObj;
        });
    }

     return data;
   }

   recursiveNodeFound(data) {
    if (data.isExpanded) {
        return data;
    } else {
        if (data.children) {
            for (var i = 0;i<data.children.length; i++) {
                let child = data.children[i];
                let dataReturned = this.recursiveNodeFound(child);
                if (dataReturned) {
                    return dataReturned;
                    break;
                }
            }
        }
    }
   }

   nodeToBeRenderd(modifiedNavigationData) {
        let data = modifiedNavigationData || this.state.modifiedNavigationData;
        let nodeToBeRendered = this.recursiveNodeFound(data); 

        if (!nodeToBeRendered) {
            nodeToBeRendered = data;
        }

        return nodeToBeRendered;
   }

   
    onClickBackButton () {
        let level = Object.assign([],this.state.nodeToBeRendered.level);
        this.setNodeToBeRendered(level,'BACK');
    }

    recursiveFindingParentNode(level,data) {
        if (level.length == 1 || level.length == 0) {
            return data;
        } else {
            let index = level.shift();
            return this.recursiveFindingParentNode(level,data.children[index]);
        }

    }

    setNodeToBeRendered(level, dir) {
        let parentNode = this.recursiveFindingParentNode(level,this.state.modifiedNavigationData);
        if (dir == 'BACK') {
            this.setState({
                nodeToBeRendered : parentNode
            })
            this.currentExpandedNode(parentNode.info, 'BACK');
        }
    }

    onClickNextButton(node) {
        this.setState({
            nodeToBeRendered : node
        })
        this.currentExpandedNode(node.info,'NEXT');
    }

    currentExpandedNode(info,dir) {
        if (this.props.currentExpandedNode) {
            this.props.currentExpandedNode(info,dir);
        }
    }

    activeNode(node) {
      if (this.props.activeNode) {
        this.props.activeNode(node);
      }
      this.deHighlightSelectedNode();
    }

    deHighlightSelectedNode() {
      let children = this.state.nodeToBeRendered.children || [];
      children.forEach(child => {
        child.isActive = false;
      });
    }

  render() {
     let nodeToBeRendered = this.state.nodeToBeRendered;
     let headerDom = nodeToBeRendered.headerComponent;
     let children = nodeToBeRendered.children || [];
     let childrenDom = [];
     children.forEach(child => {
        childrenDom.push(<NodeWrapper isActive={child.isActive} activeNode={this.activeNode.bind(this)} nextImg={this.props.options.nextImg} onClickNextButton={this.onClickNextButton.bind(this)} node={child} > {child.nodeComponent} </NodeWrapper>);
     })
      return (
         <div className="navigation-wrapper" style={this.props.style}>
            <HeaderWrapper backImg={this.props.options.backImg} node= {nodeToBeRendered} onClickBackButton = {this.onClickBackButton.bind(this)}>
                {headerDom}
            </HeaderWrapper>
            {childrenDom}
         </div>
      );
  }
}

