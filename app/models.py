from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'  

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(255))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(255), nullable=False) 
    profile_picture = db.Column(db.String(255))
    _password_hash = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    friends = db.relationship('Friend', foreign_keys='Friend.user_id', back_populates='user')
    # inboxes = db.relationship('Inbox', back_populates='user')
    sent_messages = db.relationship('Message', foreign_keys='Message.sender_id', back_populates='sender')
    received_messages = db.relationship('Message', foreign_keys='Message.receiver_id', back_populates='receiver')

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'email': self.email,
            'gender': self.gender
        }
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('password hash may not be viewed')

    @password_hash.setter
    def password_hash(self,password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"


class Post(db.Model):
    __tablename__ = 'posts'  

    id = db.Column(db.Integer, primary_key=True)
    user_pic = db.Column(db.String(255))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image = db.Column(db.String(255))
    comments_count = db.Column(db.Integer)
    likes_count = db.Column(db.Integer)
    
    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')
    likes = db.relationship('Like', back_populates='post')

    def __repr__(self):
        return f"<Post(id={self.id}, author='{self.user.username}')>"


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    
    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def __repr__(self):
        return f"<Comment(id={self.id}, author='{self.user.username}')>"


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
        
    user = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')

    def __repr__(self):
        return f"<Like(id={self.id}, user='{self.user.username}', post='{self.post.id}')>"


class Friend(db.Model):
    __tablename__ = 'friends'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    image = db.Column(db.String(255))
    
    user = db.relationship('User', foreign_keys=[user_id], back_populates='friends')
    friend = db.relationship('User', foreign_keys=[friend_id])

    def __repr__(self):
        return f"<Friend(user='{self.user.username}', friend='{self.friend.username}')>"


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    sender = db.relationship('User', foreign_keys=[sender_id], back_populates='sent_messages')
    receiver = db.relationship('User', foreign_keys=[receiver_id], back_populates='received_messages')
    def __repr__(self):
        return f"Inbox(id={self.id}, user='{self.user.username}', message='{self.message}')"
    
class Topic(db.Model):
    __tablename__ = 'topic'
    id = db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(255), nullable=False)
    topic_text = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"Topic(id={self.id}, user='{self.user.username}', topic='{self.topic}')"


    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at, #.isoformat()
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            'sender_username': self.sender.full_name if self.sender else None,
            'receiver_username': self.receiver.full_name if self.receiver else None,
        }