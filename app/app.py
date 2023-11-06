from flask_cors import CORS
from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource, reqparse
from models import User, Post, Comment, Like, Friend, Topic,db
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)




app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key='qwwerrtyyu123'
db.init_app(app)
api = Api(app)
migrate = Migrate(app, db)



# @app.before_request
# def check_if_logged_in():
#     user_id = session.get("user_id")
#     if user_id is None and request.endpoint != 'login' and request.endpoint != 'checksession':
#         return {"error": "unauthorized"}, 401
    

class Index(Resource):
    def get(self):
        response_body = '<h1>Hello World</h1>'
        status = 200
        headers = {}
        return make_response(response_body,status,headers)
    

    #  resource for users
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username, "email": user.email, "bio": user.bio, "profile_picture": user.profile_picture, "age": user.age, "gender": user.gender,"full_name": user.full_name } for user in users]
        return jsonify(users=user_list)
    
    

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id==session["user_id"]).first()
            return user.to_dict(), 200
        return {"error":"Resource not found"}

# class Signup(Resource):
#     def post(self):
#         data = request.get_json()
#         full_name = data.get('full_name')
#         username = data.get('username')
#         password = data.get('password')
#         email = data.get('email')
#         gender = data.get('gender')

#         if username and email and password:
#             new_user = User(full_name=full_name, username=username, email=email, gender=gender)
#             # new_user.set_password(password)
#             new_user.password_hash = password

#             db.session.add(new_user)
#             db.session.commit()
#             session['user_id'] = new_user.id

#             return new_user.to_dict(), 201
#         return {"error": "user details must be added"}, 422
    
class Signup(Resource):
    def post(self):
        data = request.get_json()
        full_name = data.get('full_name')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        gender = data.get('gender')

        if full_name and username and email and password:
            new_user = User(full_name=full_name, username=username, email=email, gender=gender)
            new_user.password_hash = password
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        return {"error": "user details must be added"}, 422

class Login(Resource):
    def post(self):
        email  = request.get_json().get('email')
        password = request.get_json().get("password")
        user = User.query.filter(User.email == email).first()
        if user and user.authenticate(password):
            session['user_id']=user.id
            return user.to_dict(),201
        else:
            return {"error":"username or password is incorrect"},401
        
class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session['user_id']=None
            return {"success":"you have been logged out successfully"}
        else:
            return {"error":"unauthorized 401"}


    # resource for posts
class PostResource(Resource):
    def get(self):
        posts = Post.query.all()
        post_list = [{"id": post.id, "message": post.message, "user_pic": post.user_pic, "user_id": post.user_id, "image": post.image} for post in posts]
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

    # resource for comments
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
    parser = reqparse.RequestParser()
    parser.add_argument('user_id', type=int, required=True)
    parser.add_argument('post_id', type=int, required=True)
    
    def post(self):
        args = self.parser.parse_args()
        like = Like(user_id=args['user_id'], post_id=args['post_id'])
        db.session.add(like)
        db.session.commit()
        return {'message': 'Like added successfully'}, 201

class LikeDetailResource(Resource):
    def delete(self, like_id):
        like = Like.query.get_or_404(like_id)
        db.session.delete(like)
        db.session.commit()
        return jsonify(message='Like deleted successfully')

class FriendRequestResource(Resource):
    def get(self):
        friend_requests = Friend.query.all()
        friend_request_list = [{"id": friend_request.id, "sender_id": friend_request.sender_id, "receiver_id": friend_request.receiver_id} for friend_request in friend_requests]
        return jsonify(friend_requests=friend_request_list)

    
class TopicResource(Resource):
    def get(self, topic_id=None):
        if topic_id:
            topic = Topic.query.get_or_404(topic_id)
            return {
                'id': topic.id,
                'title': topic.title,
                'topic_text': topic.topic_text,
                'created_at': topic.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
        else:
            topics = Topic.query.all()
            return [{
                'id': topic.id,
                'title': topic.title,
                'topic_text': topic.topic_text,
                'created_at': topic.created_at.strftime('%Y-%m-%d %H:%M:%S')
            } for topic in topics]


api.add_resource(Index,'/', endpoint='landing')
api.add_resource(UserResource, '/users')
api.add_resource(PostResource, '/posts')
api.add_resource(PostDetailResource, '/posts/<int:post_id>')
api.add_resource(Signup,'/signup', endpoint='signup')
api.add_resource(Login,'/login', endpoint='login')
api.add_resource(CheckSession,'/checksession', endpoint='checksession')
api.add_resource(Logout,'/logout', endpoint='logout')
api.add_resource(CommentResource, '/comments')
api.add_resource(CommentDetailResource, '/comments/<int:comment_id>')
api.add_resource(LikeResource, '/likes')
api.add_resource(LikeDetailResource, '/likes/<int:like_id>')
api.add_resource(FriendRequestResource, '/friend_requests')
api.add_resource(TopicResource, '/topics','/topics/<int:topic_id>')
if __name__ == '__main__':
    app.run(port=5555, debug=True)


