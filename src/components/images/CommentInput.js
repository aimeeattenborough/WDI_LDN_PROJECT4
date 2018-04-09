import React from 'react';

const CommentInput = ({ ref, id, handleChangeComment, handleSubmitComment, data }) => {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <form onSubmit={(e) => handleSubmitComment(e, id)}>
            <input className="comment-input-field"
              id={id}
              ref={ref}
              type="text"
              name="comments"
              onChange={(e) => handleChangeComment(e, id)}>
              </input>
          </form>
        </div>
      </div>
  </div>
  )
}

export default CommentInput;
