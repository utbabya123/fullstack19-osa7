import React from 'react'
import { connect } from 'react-redux';

const Notification = (props) => {
  const { notification } = props

  if (!notification) {
    return null
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

