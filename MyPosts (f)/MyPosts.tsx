import React from 'react';
import MyPostItem from './MyPostItem';
import { MyPost } from '../../../Logic/MyPosts/types/type';
import styles from './post.module.css';

function MyPosts({ myPosts }: { myPosts: MyPost[] }): JSX.Element {
  return (
    <>
      {myPosts.length < 1 && (
        <h1 className={styles.header1}>У Вас нет постов</h1>
      )}
      <div className={styles.list}>
        {myPosts.map((post: MyPost) => (
          <MyPostItem key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

export default MyPosts;
