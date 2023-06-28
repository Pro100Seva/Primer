import React, { useState } from 'react';
import styles from './comm.module.css'
import { useAppDispatch } from '../../../../../store';
import { MyPost } from '../../../../Logic/MyPosts/types/type';
import { addComments } from '../../../../Logic/MyPosts/myPostSlice';
import { useParams } from 'react-router-dom';

function AddComment({ post }: { post: MyPost[] }): JSX.Element {
  const { idPost } = useParams();
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addComments({
        post_id_comment: Number(idPost),
        comment_text: comment,
      })
    );
    setComment('');
  };

  return (
    <>
    <div>
          <form className={styles.commentForm} onSubmit={addComment}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="comment-text">Текст комментария:</label>
              <textarea
              className={styles.input}
                id="comment-text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </div>
            <button className={styles.bn5} type="submit">Добавить комментарий</button>
          </form>
        </div>
        </>
  );
}

export default AddComment;
