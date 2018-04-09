import React from 'react';

const CommentInput = ({ ref, post, handleChangeComment, handleSubmitComment, data }) => {
  return (
    <div>
      <div className="card">
        {post.comments.map(comment =>
          // <h4>{comment._id}</h4>
          <h4 key={comment._id}>{comment.content}</h4>
        )}
        {data.currentlyEditing && data.currentlyEditing === post && <div className="card-content">
          <form onSubmit={(e) => handleSubmitComment(e, post)}>
            <input className="comment-input-field"
              type="text"
              name="comments"
              onChange={handleChangeComment}
              value={data.newComment}
              autoFocus
            />
          </form>
        </div>}
      </div>
  </div>
  )
}

export default CommentInput;
