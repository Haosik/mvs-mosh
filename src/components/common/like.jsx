import React from 'react';
import PropTypes from 'prop-types';

const Like = ({ liked, onLike }) => (
  <button onClick={onLike} className="btn btn-light bg-">
    <i className={`fa fa-heart${liked ? '' : '-o'}`} aria-hidden="true" />
  </button>
);

Like.propTypes = {
  liked: PropTypes.bool,
  onLike: PropTypes.func
}

export default Like;
