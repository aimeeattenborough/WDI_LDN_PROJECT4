import React from 'react';

const CommentInput = ({ id }) => {
  return (
    <div className="card">
      <div className="card-content">
        <form>
          <input className="comment-input-field" id={id} type="text"></input>
        </form>
      </div>
    </div>
  )
}

export default CommentInput
