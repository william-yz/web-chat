import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import {Row, Col} from 'antd'
import styles from './MainLayout.less';

import Header from '../Header'
import Nav from '../Nav'
import Content from '../../components/Content'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allChats: [{username : 'William', id: '1'},{username : 'Mace', id: '2', isActive:true}]
    }
  }

  isActive(chat) {
    return chat.isActive
  }

  handleStartChat(id) {
    this.state.allChats.forEach(chat => {if (chat.id === id) chat.isActive = !chat.isActive})
    this.setState({allChats : this.state.allChats})
  }

  render() {
    return (
      <div>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col span={6}>
            <Nav allChats={this.state.allChats} handleStartChat={this.handleStartChat.bind(this)}/>
          </Col>
          <Col span={12}>
            <Content activeChats={this.state.allChats.filter(this.isActive)} removeActiveChat={this.handleStartChat.bind(this)}/>
          </Col>
        </Row>
      </div>
    )
  }
}
//
// MainLayout.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default MainLayout;
