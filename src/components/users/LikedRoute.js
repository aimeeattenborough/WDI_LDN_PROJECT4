// import React from 'react';
// import axios from 'axios';
// import Auth from '../../lib/Auth';
// import User from '../../lib/User';
// import _ from 'lodash';
// // link specific to react router dom. We use this so we don't have to use an <a> tag (which would reload the page), to link our banger to the show page.
// import { Link } from 'react-router-dom';
//
//
// import css from '../../assets/scss/components/liked.scss';
//
//
// class LikedRoute extends React.Component {
//
//
//   componentDidMount() {
//     const user = User.getUser();
//     console.log('user liked route', user);
//   }
//
//
//
//   render() {
//     const user = User.getUser();
//     console.log(this.state.posts);
//     return (
//       <main>
//       <div className="posts">
//         <ul className="columns is-multiline">
//           {this.state.posts.map(post =>
//             <li key={post._id} className="column">
//               <Link to={`/images/${post._id}`}>
//               <div className="card post-image">
//                 <div className="card-image" style={{backgroundImage: `url(${post.image})`}}>
//                 </div>
//               </div>
//               </Link>
//                 <div className="card">
//                   <div className="card-content">
//                     {user.likes.includes(post._id) ? (
//                       <button className="icon" onClick={() => this.unlikeImage(post)}>
//                         <img src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/heart-icon.png" />
//                       </button>
//                     ) : (
//                       <button className="icon" onClick={() => this.likeImage(post)}>
//                         <img src="https://png.icons8.com/metro/1600/like.png" />
//                       </button>
//                     )}
//                       <button className="icon" onClick={() => this.toggleEditing(post)}>
//                         <img src="http://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Speech-Bubble-icon.png" />
//                       </button>
//
//                       <h4 className="subtitle">{post.caption}</h4>
//                     </div>
//                   </div>
//                   <CommentInput
//                     post={post}
//                     handleChangeComment={this.handleChangeComment}
//                     handleSubmitComment={this.handleSubmitComment}
//                     data={this.state}
//                    />
//                 </li>
//               )}
//             </ul>
//           </div>
//       </main>
//     )
//   }
// }
//
// export default LikedRoute;
