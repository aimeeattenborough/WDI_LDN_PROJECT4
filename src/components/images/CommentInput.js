import React from 'react';

const CommentInput = ({ post, handleChangeComment, handleSubmitComment, data }) => {
  return (
    <div className="">
      <div className="card">
        {post.comments.map(comment =>
          <h4 key={comment._id}>{comment.content}{comment.user.username}
          </h4>
        )}
        {data.currentlyEditing && data.currentlyEditing === post && <div className="card-content">
          {/* if currently editing, and the post currently being edited is the same as the current post then show input field to add comment */}
          <form onSubmit={(e) => handleSubmitComment(e, post)}>
            <input className="input is-primary"
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
  );
};


export default CommentInput;
