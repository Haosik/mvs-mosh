import React from 'react';

// Input: liked : boolean
// Output: onClick

const Like = ({ liked, onLike }) => (
  <button onClick={onLike} className="btn btn-light bg-">
    <i className={`fa fa-heart${liked ? '' : '-o'}`} aria-hidden="true" />
  </button>
);

export default Like;
