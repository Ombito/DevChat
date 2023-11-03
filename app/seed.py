from app import app, db
from models import User, Post, Comment, Like, Friend, Inbox
from datetime import datetime

with app.app_context():
    from models import User, Comment, Post, Like, datetime

    # Sample data
    sample_user1 = User(
        full_name="Alvin Ombito",
        username="alvo",
        email="alvin@example.com",
        bio="Software engineer",
        age=30,
        gender="Male",
        profile_picture="profile_picture_url",
        password="123edf", 
    )

    sample_post = Post(
        message="This is a sample post",
        created_at=datetime.utcnow(),
        user=sample_user1,
        image="image_url",
        comments_count=0,
        likes_count=0,
    )

    sample_comment = Comment(
        content="Great post!",
        created_at=datetime.utcnow(),
        user=sample_user1,
        post=sample_post,
    )

    sample_like = Like(
        user=sample_user1,
        post=sample_post,
    )

    # sample_friend_request = FriendRequest(
    #     user=sample_user,
    #     friend=another_user,  # Replace with the actual friend's User instance
    #     status="pending",
# )

    # Add the objects to the session and commit the changes to the database
    db.session.add(sample_user1)
    db.session.add(sample_post)
    db.session.add(sample_comment)
    db.session.add(sample_like)
    # db.session.add(sample_friend_request)
    db.session.commit()


