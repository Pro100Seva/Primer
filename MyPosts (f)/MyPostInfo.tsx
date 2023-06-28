import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import store, { RootState } from '../../../../store';
import { MyPost } from '../../../Logic/MyPosts/types/type';
import Comments from './Comments/Comments';
import styles from '../../Lenta/lenta.module.css';

function MyPostInfo(): JSX.Element {
  const { idPost } = useParams();
  const { myPosts } = useSelector((store: RootState) => store.myPosts);
  const post = myPosts.filter((el: MyPost) => el.id === Number(idPost));
  const { user } = useSelector((store: RootState) => store.user);

  const isoDate = myPosts[0].createdAt;
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
    <div style={{ marginTop: '130px' }}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.user_pics}>
            <img className={styles.photo} src={user?.photo} alt="userpic" />
            <img className={styles.emotion} src={myPosts[0].Emotion.emotion_url} alt="No" />
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
                {myPosts[0].power}
              </p>
            </div>
          </div>
          <div className={styles.date}>{numericDate}</div>
        </div>
        <div className={styles.left_side}></div>
        <div className={styles.body}>
          <p>{myPosts[0].post_text}</p>
        </div>
        <div className={styles.right_side}></div>
        <div className={styles.footer}></div>
      </div>
      <Comments post={post} />
    </div>
  );
}

export default MyPostInfo;
