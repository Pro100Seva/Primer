import React from 'react';
import { Comment } from '../../../../Logic/MyPosts/types/type';
import styles from './comm.module.css'
import { RootState, useAppDispatch } from '../../../../../store';
import { delComments } from '../../../../Logic/MyPosts/myPostSlice';
import { useSelector } from 'react-redux';

function CommentItem({ comment }: { comment: Comment }): JSX.Element {
  const { user } = useSelector((store: RootState) => store.user);

  const dispatch = useAppDispatch();
  const delComment = (): void => {
    dispatch(delComments(comment.id));
  };
  return (
    <>
    <div className={styles.card}>
        <div className={styles.author}>
          <img className={styles.photo} src={user?.photo} alt="photo" />
          {user?.name}
        <button className={styles.del_btn} onClick={delComment}>
          X
        </button>
        </div>
        <div className={styles.infos}>
          <p className={styles.description}>{comment.comment_text}</p>
        </div>
      </div>
      </>
  );
}

export default CommentItem;
