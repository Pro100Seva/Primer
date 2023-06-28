const express = require('express');
const { Post, Comment, Like, Emotion } = require('../../db/models');
const router = express.Router();
//тут получаем мои посты
router.get('/', async (req, res) => {
  try {
    const getMyPosts = await Post.findAll({
      order: [['id', 'DESC']],
      where: { user_id_post: req.session.user },
      include: [{ model: Comment }, { model: Like }, { model: Emotion }],
    });
    res.status(300).json(getMyPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//добавление или удаление лайков
router.post("/", async (req, res) => {
  try {
    const { postId } = req.body;
    const likeFind = await Like.findOne({
      where: { user_id_like: req.session.user, post_id_like: postId },
    });
    console.log(likeFind);

    if (likeFind) {
      Like.destroy({ where: { id: likeFind.id } });
      res.status(200).json({
        postId: postId,
        likeStatus: false,
        userId: req.session.user,
      });
    } else {
      Like.create({
        user_id_like: req.session.user,
        post_id_like: postId,
      });
      res.status(201).json({
        postId: postId,
        likeStatus: true,
        userId: req.session.user,
      });
    }
  } catch (error) {
    res.status(500).json(console.log(error.message));
  }
});

module.exports = router;
