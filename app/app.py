from flask_cors import CORS
from flask import Flask, jsonify, request, session, make_response
from flask_restful import Api, Resource, reqparse
from models import User, Post, Comment, Like, Friend, Message, db, datetime
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
    
    # home route
class Index(Resource):
    def get(self):
        response_body = '<h1>Hello World</h1>'
        status = 200
        headers = {}
        return make_response(response_body,status,headers)
    

    #  users route
class UserResource(Resource):
    def get(self):
        users = User.query.all()
        user_list = [{"id": user.id, "username": user.username, "email": user.email, "bio": user.bio} for user in users]
        return jsonify(users=user_list)

class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id==session["user_id"]).first()
            return user.to_dict(), 200
        return {"error":"Resource not found"}

    # signup route
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
   
    # login route
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

    # message route
class MessageResource(Resource):
    def get(self):
        messages = Message.query.all()
        message_list = [message.to_dict() for message in messages]
        return jsonify(message_list)

    def post(self):
        data = request.get_json()
        text = data.get('text')
        sender_id = data.get('sender_id')
        receiver_id = data.get('receiver_id')

        if text: # and receiver_id
            created_at = datetime.utcnow()
            new_message = Message(text=text, sender_id=sender_id, receiver_id=receiver_id, created_at=created_at)
            db.session.add(new_message)
            db.session.commit()
            return new_message.to_dict(), 201
        return {"error": "Request is unprocessable", "details": "Ensure that the request data includes 'text', 'sender_id', and 'receiver_id' as required fields."}, 422
        # data = request.get_json()
        # text = data.get('text')
        # created_at = data.get('created_at')
        # sender_id = data.get('sender_id')
        # receiver_id = data.get('receiver_id')

        # if text and created_at and receiver_id and sender_id:
        #     new_message = Message(text=text,  sender_id=sender_id, receiver_id=receiver_id)
        #     db.session.add(new_message)
        #     db.session.commit()
        #     return new_message.to_dict(), 201
        # return {"error": "user details must be added"}, 422
    

class UserMessagesResource(Resource):
    def get(self, user_id):
        # Fetch all messages sent or received by the user with the given user_id
        messages = Message.query.filter(
            (Message.sender_id == user_id) | (Message.receiver_id == user_id)
        ).all()

        # Fetch the user with the given user_id
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"error": "User not found"}), 404  # Return a 404 Not Found response if the user doesn't exist

        # Serialize the user object
        user_dict = user.to_dict()

        # Serialize the messages using a list comprehension
        message_list = [message.to_dict() for message in messages]

        # Return a JSON response containing both the user data and the list of messages
        response_data = {
            # "user": user_dict,
            "messages": message_list
        }

        return jsonify(response_data)


# class UserMessagesResource(Resource):
#     def get(self, user_id):
#         # Fetch all messages sent or received by the user with the given user_id
#         messages = Message.query.filter((Message.sender_id == user_id) | (Message.receiver_id == user_id)
# ).all()
#         message_list = [message.to_dict() for message in messages]

#         # Fetch the user with the given user_id
#         user = User.query.get(user_id)

#         # Serialize the user object
#         user_dict = user.to_dict()

#         # Add the user data to the message list
#         message_list.append(user_dict)
#         # You can use a list comprehension to serialize the messages
#         message_list = [message.to_dict() for message in messages]

#         return jsonify(message_list)





    # logout route
class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session['user_id']=None
            return {"success":"you have been logged out successfully"}
        else:
            return {"error":"unauthorized 401"}


    # posts route
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

    # comments route
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
        friend_requests = Friend.query.all()
        friend_request_list = [{"id": friend_request.id, "sender_id": friend_request.sender_id, "receiver_id": friend_request.receiver_id} for friend_request in friend_requests]
        return jsonify(friend_requests=friend_request_list)

    # Add resources to app
api.add_resource(Index,'/', endpoint='landing')
api.add_resource(UserResource, '/users')
api.add_resource(PostResource, '/posts')
api.add_resource(Signup,'/signup', endpoint='signup')
api.add_resource(Login,'/login', endpoint='login')
api.add_resource(MessageResource,'/messages', endpoint='message')
api.add_resource(UserMessagesResource, '/messages/<int:user_id>')
api.add_resource(CheckSession,'/checksession', endpoint='checksession')
api.add_resource(Logout,'/logout', endpoint='logout')
api.add_resource(PostDetailResource, '/posts/<int:post_id>')
api.add_resource(CommentResource, '/comments')
api.add_resource(CommentDetailResource, '/comments/<int:comment_id>')
api.add_resource(LikeResource, '/likes')
api.add_resource(LikeDetailResource, '/likes/<int:like_id>')
api.add_resource(FriendRequestResource, '/friend_requests')

if __name__ == '__main__':
    app.run(port=5555, debug=True)


