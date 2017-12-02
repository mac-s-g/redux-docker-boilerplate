import React from 'react'
import Layout from './../components/layout/Main'
import {
  Provider,
  connect
} from 'react-redux'
import {
  ConnectedRouter,
  push
} from 'react-router-redux'

import history from './../store/history'

import '../../style/scss/global.scss'


const mapDispatchToProps = dispatch => ({
  navigateTo: (location) => {
    dispatch(push(location))
  }
})

const mapStateToProps = state => ({
  ...state.router
})

const index = (props) => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <Layout {...props} />
    </ConnectedRouter>
  </Provider>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index)