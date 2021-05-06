import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconDemo from './lib/icon/icon.demo';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import {Layout, Header,  Aside, Content, Footer} from './lib/layout/layout';
import FormExample from './lib/form/form.example';
import './example.scss';
const logo = require('./logo.png')

ReactDOM.render((
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo} width="48" height="48" alt=""/>
          <span>
            xcUI
          </span>
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li>
              <NavLink to="/icon">
                Icon
              </NavLink>
            </li>
            <li>
              <NavLink to="/button">
                Button
              </NavLink>
            </li>
            <li>
              <NavLink to="/dialog">
                对话框
              </NavLink>
            </li>
            <li>
              <NavLink to="/layout">
                布局
              </NavLink>
            </li>
            <li>
              <NavLink to="/form">
                表单
              </NavLink>
            </li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/icon" component={IconDemo} />
          <Route path="/button" component={ButtonExample} />
          <Route path="/dialog" component={DialogExample} />
          <Route path="/layout" component={LayoutExample} />
          <Route path="/form" component={FormExample} />
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; xinchi-H
      </Footer>
    </Layout>
  </Router>
), document.querySelector('#root'));