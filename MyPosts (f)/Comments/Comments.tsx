import React from 'react';
import { MyPost } from '../../../../Logic/MyPosts/types/type';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

function Comments({
  post,
}: {
  post: MyPost[]
}): JSX.Element {
  console.log(post);

  return (
    <div>
      {post.map((el) =>
        el.Comments?.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))
      )}
      <AddComment post={post} />
    </div>
  );
}

export default Comments;
