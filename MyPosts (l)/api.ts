import {
  AddCommentUser,
  Comment,
  IdComment,
  IdPost,
  MyPost,
  PostAdd,
} from './types/type';

//Фетч для получения моих постов
export const getMyPostsFetch = async (): Promise<MyPost[]> => {
  const cacheBuster = new Date().getTime(); // or generate a random string
  const url = `/api/getMyPosts?cb=${cacheBuster}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};
//   if (!res.ok) {
//     const { message } = await res.json();
//     throw message;
//   }

//тут добавление поста
export const postAdd = async (obj: PostAdd): Promise<MyPost> => {
  const res = await fetch('/api/emote', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(obj),
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw message;
  }

  const data = await res.json();

  return data;
};
export const postDel = async (id: IdPost): Promise<IdPost> => {
  const res = await fetch(`/api/postDel/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await res.json();
  return data;
};

export const addComment = async (obj: AddCommentUser): Promise<Comment> => {
  const res = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(obj),
  });
  return res.json();
};

export const delComment = async (id: IdComment): Promise<IdComment> => {
  const res = await fetch(`/api/comments/`, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

//добавление лайков
export const likeFetch = async (
  postId: number
): Promise<{ postId: number; likeStatus: boolean; userId: number }> => {
  const res = await fetch('/api/getMyPosts', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ postId }),
  });
  return res.json();
};
