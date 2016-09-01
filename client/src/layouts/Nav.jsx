import React from 'react'

import {Select, Button, Row, Col} from 'antd'

const Option = Select.Option
class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
  }

  handleChange(value) {
    let options;
    if (!value || value.indexOf('@') >= 0) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map((domain) => {
        const email = `${value}@${domain}`;
        return <Option key={email}>{email}</Option>;
      });
    }
    this.setState({ options });
  }



  add(value) {
    console.log(value)
  }
  render() {

    return (
      <div>
        <Row>
          <Col offset="2" span="20">
            <Select
              style={{width: '100%'}}
              combobox
              onChange={this.props.handleChange}
              onSelect={this.add.bind(this)}
              filterOption={false}
              placeholder="Find someone"
            >
              {this.state.options}
            </Select>
          </Col>
        </Row>
        {this.props.allChats.map(chat => (
          <Row key={chat.id} style={{margin: 10}}>
            <Col offset="2" span="20">
              <Button
                style={{width: '100%'}}
                onClick={() => this.props.handleStartChat(chat.id)}
                type={chat.isActive ? 'primary' : 'default'}
              >
                {chat.username}
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    )
  }

}

export default Nav
