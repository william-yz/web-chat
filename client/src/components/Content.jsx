import React, { Component, PropTypes } from 'react';
import Cookies from 'js-cookie'
import {Tabs} from 'antd'

import socketio from '../socketio'

import ChatPanel from './ChatPanel'

require('./Content.css')

const TabPane = Tabs.TabPane;

class Content extends React.Component {
  static defaultProps = {
    activeChats : []
  };

  constructor(props) {
    super(props)
    socketio.emit('login', Cookies.get('user'))
    this.state = {
      activeKey: props.activeChats[0] && props.activeChats[0].id
    }
  }

  onEdit(targetKey, action) {
    this[action](targetKey);
  }

  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.props.activeChats.forEach((pane, i) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1
      }
    });
    const activeChats = this.props.activeChats.filter(pane => pane.id !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = activeChats[lastIndex].id
    }
    this.props.removeActiveChat(targetKey)
    this.setState({activeKey: targetKey})
  }

  render() {
    return (
      <div id="content">
        <div className='card-container'>
          <Tabs
            hideAdd
            defaultActiveKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit.bind(this)}
            onChange={activeKey => this.setState({activeKey})}
          >
            {this.props.activeChats.map(activeChat => {
              return (
                <TabPane
                  tab={activeChat.username}
                  key={activeChat.id}
                >
                  <ChatPanel name={activeChat.name}/>
                </TabPane>)
            })}

          </Tabs>
        </div>
      </div>
  )}
}

export default Content
