import React from 'react';
import { MyPost } from '../../../Logic/MyPosts/types/type';
import styles from './post.module.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../../store';
// import like from './like.svg';
import Like from '../Like';
import { Link } from 'react-router-dom';
import { myPostDel } from '../../../Logic/MyPosts/myPostSlice';

function MyPostItem({ post }: { post: MyPost }): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useSelector((store: RootState) => store.user);
  const emotion = post.Emotion?.emotion_url;

  const delPost = (): void => {
    dispatch(myPostDel(post.id));
  };
  const postLikes = post.Likes?.filter((el) => el.post_id_like === post.id).map(
    (el) => el.user_id_like
  );
  const likeStatus = postLikes?.includes(Number(user?.id));
  // const likeStatusFetch=():void=>{
  //   dispa
  //likeFunc
  const isoDate = post.createdAt;
  const date = new Date(isoDate);

  const year = date.getFullYear(); // получаем год
  const month = date.getMonth() + 1; // получаем месяц (от 0 до 11, поэтому добавляем 1)
  const day = date.getDate(); // получаем день
  const hours = date.getHours(); // получаем часы
  const minutes = date.getMinutes(); // получаем минуты
  const numericDate = `${day}.${
    month < 10 ? '0' : ''
  }${month}.${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return (
    <div className={styles.layout}>
      {/* <img src={post?.post_url} alt="NO" /> */}
      <div className={styles.header}>
        <div className={styles.user_pics}>
          <img className={styles.photo} src={user?.photo} alt="userpic" />
          <img className={styles.emotion} src={emotion} alt="No" />
          <div className={styles.header_text}>
            <p className={styles.user_name}>@{user?.name}</p>
            <p className={styles.emotion_power}>
              &nbsp;
              <img
                className={styles.flash}
                src="https://em-content.zobj.net/thumbs/240/apple/354/high-voltage_26a1.png"
                alt="power"
              />
              &nbsp;
              {post.power}
            </p>
          </div>
        </div>
        <div className={styles.date}>{numericDate}</div>
      </div>
      <div className={styles.del_div}>
        <button className={styles.del_btn} type="button" onClick={delPost}>
          X
        </button>
      </div>
        <div className={styles.left_side}></div>
        <div className={styles.body}>
          <p>{post.post_text}</p>
        </div>
      <div className={styles.right_side}></div>
      <div className={styles.footer}>
        <Like likeStatus={likeStatus} postId={post.id} />
        <p className={styles.like_count}>{post.Likes?.length}</p>
        <Link className={styles.comments} to={`/myPage/${post.id}`}>
          Комментарии: {post.Comments.length}
        </Link>
      </div>
    </div>
  );
}

export default MyPostItem;
