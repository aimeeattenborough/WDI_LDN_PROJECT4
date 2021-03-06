import React from 'react';

import css from '../../assets/scss/components/index-page.scss';


const CommentInput = ({ post, handleChangeComment, handleSubmitComment, data }) => {
  return (
    <div className="">
      <div className="card com-post">
        {post.comments.map(comment =>
          <article key={comment._id} className="media">
            <figure className="media-left com-pics">
              <p className="image is-64x64">
                <img className="profile-pic-image" src={comment.user.profilePicture} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content com-pics">
                <p>
                  <strong>{comment.user.username}</strong>
                  <br/>
                  {comment.content}
                </p>
              </div>
            </div>
          </article>
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
