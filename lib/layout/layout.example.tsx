import React from 'react';
import Content from './content';
import Footer from './footer';
import Header from './header';
import Layout from './layout';

export default function () {
  return (
    <div>
      <div>
        <h1>第一个例子</h1>
        <Layout className={ 'xc666' }>
          <Header>header</Header>
          <Content>content</Content>
          <Footer>footer</Footer>
        </Layout>
      </div>
    </div>
  )
}