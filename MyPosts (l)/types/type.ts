export type Comment = {
  id: number;
  comment_text: string;
  user_id_comment?: number;
  post_id_comment: number;
};
export type AddComment = {
  comment_text: string;
  user_id_comment?: number;
  post_id_comment: number;
};
export type IdComment = Comment['id'];
export type AddCommentUser = {
  post_id_comment: number | undefined;
  comment_text: string;
};
export type Like = {
  user_id_like: number;
  post_id_like: number;
};
export type Emotion = {
  id: number;
  emotion_url: string;
  name_emotion: string;
};
export type MyPost = {
  id?: number;
  post_text: string;
  post_url: string;
  post_status: boolean;
  emotion_id_post: number;
  power: number;
  coordinates?: string;
  createdAt: number;
  Emotion: Emotion;
  Comments: Comment[];
  Likes?: Like[];
};
export type IdPost = MyPost['id'];
export type State = {
  myPosts: MyPost[] | [];
  error: string | undefined;
};

export type PostAdd = {
  emotion: string;
  post_text: string;
  // postStatus: string;
  powerEmotion: string;
  coordinates: string;
};
