// @flow
import React, { Component } from 'react';
import styles from './styles.css';

type Props = {
  history: Object;
};

export default class Main extends Component<Props> {
  componentDidMount() {
    const { history } = this.props;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // {check(token: localStorage.getItem('token')){error,message}}
      // body: JSON.stringify({ token: localStorage.getItem('token') }),
      body: JSON.stringify({query: `{check(token: "${localStorage.getItem('token')}"){error,message}}`}),
    })
      .then((res) => {
        if (res && res.status !== 200) {
          history.push('/login');
        }
        return res.json();
      })
      .then((resp) => {
        console.log('data', resp.data)
        if (resp.data.check.error !== 0) {
          history.push('/login');
        }
      });
  }

  logout = () => {
    const { history } = this.props;
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      // {check(token: localStorage.getItem('token')){error,message}}
      // body: JSON.stringify({ token: localStorage.getItem('token') }),
      body: JSON.stringify({query: '{logout{error,message}}'}),
    })
      .then((res) => {
        localStorage.clear();
        if (res && res.status === 401) {
          history.push('/login');
        }
        return res.json();
      })
      .then(() => history.push('/login'));
  }

  render() {
    return (
      <div>
        <div className={styles.name}>hi, you are inside</div>
        <div
          onClick={this.logout}
          onKeyUp={this.logout}
          className={styles.btn}
          role="button"
          tabIndex={0}
        >
          logout
        </div>
      </div>
    );
  }
}
