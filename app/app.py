from flask_cors import CORS
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from models import User, Post, Comment, Like, FriendRequest, db
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
api = Api(app)
migrate = Migrate(app, db)

class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username, "email": user.email, "bio": user.bio} for user in users]
        return jsonify(users=user_list)

class PostResource(Resource):
    def get(self):
        posts = Post.query.all()
        post_list = [{"id": post.id, "message": post.message, "user_id": post.user_id, "image": post.image} for post in posts]
        return jsonify(posts=post_list)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str, required=True)
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('image', type=str, required=True)
        args = parser.parse_args()

        post = Post(message=args['message'], user_id=args['user_id'], image=args['image'])
        db.session.add(post)
        db.session.commit()
        return jsonify(post={"id": post.id, "message": post.message, "user_id": post.user_id, "image": post.image})

class PostDetailResource(Resource):
    def delete(self, post_id):
        post = Post.query.get_or_404(post_id)
        db.session.delete(post)
        db.session.commit()
        return jsonify(message='Post deleted successfully')

class CommentResource(Resource):
    def get(self):
        comments = Comment.query.all()
        comment_list = [{"id": comment.id, "content": comment.content, "user_id": comment.user_id, "post_id": comment.post_id} for comment in comments]
        return jsonify(comments=comment_list)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('content', type=str, required=True)
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('post_id', type=int, required=True)
        args = parser.parse_args()

        comment = Comment(content=args['content'], user_id=args['user_id'], post_id=args['post_id'])
        db.session.add(comment)
        db.session.commit()
        return jsonify(comment={"id": comment.id, "content": comment.content, "user_id": comment.user_id, "post_id": comment.post_id})

class CommentDetailResource(Resource):
    def delete(self, comment_id):
        comment = Comment.query.get_or_404(comment_id)
        db.session.delete(comment)
        db.session.commit()
        return jsonify(message='Comment deleted successfully')

class LikeResource(Resource):
    def get(self):
        likes = Like.query.all()
        like_list = [{"id": like.id, "user_id": like.user_id, "post_id": like.post_id} for like in likes]
        return jsonify(likes=like_list)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('user_id', type=int, required=True)
        parser.add_argument('post_id', type=int, required=True)
        args = parser.parse_args()

        like = Like(user_id=args['user_id'], post_id=args['post_id'])
        db.session.add(like)
        db.session.commit()
        return jsonify(like={"id": like.id, "user_id": like.user_id, "post_id": like.post_id})

class LikeDetailResource(Resource):
    def delete(self, like_id):
        like = Like.query.get_or_404(like_id)
        db.session.delete(like)
        db.session.commit()
        return jsonify(message='Like deleted successfully')

class FriendRequestResource(Resource):
    def get(self):
        friend_requests = FriendRequest.query.all()
        friend_request_list = [{"id": friend_request.id, "sender_id": friend_request.sender_id, "receiver_id": friend_request.receiver_id} for friend_request in friend_requests]
        return jsonify(friend_requests=friend_request_list)

api.add_resource(UserResource, '/users')
api.add_resource(PostResource, '/posts')
api.add_resource(PostDetailResource, '/posts/<int:post_id>')
api.add_resource(CommentResource, '/comments')
api.add_resource(CommentDetailResource, '/comments/<int:comment_id>')
api.add_resource(LikeResource, '/likes')
api.add_resource(LikeDetailResource, '/likes/<int:like_id>')
api.add_resource(FriendRequestResource, '/friend_requests')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
