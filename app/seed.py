from app import app, db  


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
        profile_picture="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
        password="123edf", 
    )
    sample_user2 = User(
        full_name="Nicolas Esemere",
        username="Exere",
        email="nic@example.com",
        bio="Software engineer",
        age=23,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/33/f9/e9/33f9e9f8a6bf841dfcdd2833478fbe12.jpg",
        password="123edf", 
    )
    sample_user3 = User(
        full_name="Michael Owen",
        username="Mike",
        email="Mike@example.com",
        bio="Software engineer",
        age=30,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/4f/c8/94/4fc894641d0df1e0597014c3e9f69366.jpg",
        password="123edf", 
    )
    sample_user4 = User(
        full_name="Jones Munene",
        username="Exere",
        email="nic@example.com",
        bio="Software engineer",
        age=23,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/c7/0b/77/c70b7780ea00e0ab46aee8dfae5174cf.jpg",
        password="123edf", 
    )

    sample_post1 = Post(
        message="This is a sample post",
        created_at=datetime.utcnow(),
        user=sample_user1,
        image="image_url",
        comments_count=0,
        likes_count=0,
    )
    sample_post2 = Post(
        message="This is a sample post",
        created_at=datetime.utcnow(),
        user=sample_user1,
        image="image_url",
        comments_count=0,
        likes_count=0,
    )
    sample_post3 = Post(
        message="This is a sample post",
        created_at=datetime.utcnow(),
        user=sample_user1,
        image="image_url",
        comments_count=0,
        likes_count=0,
    )
    sample_post4 = Post(
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
        post=sample_post1,
    )

    sample_like = Like(
        user=sample_user1,
        post=sample_post1,
    )

    # sample_friend_request = FriendRequest(
    #     user=sample_user,
    #     friend=another_user,  # Replace with the actual friend's User instance
    #     status="pending",
# )

    # Add the objects to the session and commit the changes to the database
    db.session.add(sample_user1,sample_user2,sample_user3,sample_user4)
    db.session.add(sample_post1,sample_user2,sample_user3,sample_user4)
    db.session.add(sample_comment)
    db.session.add(sample_like)
    # db.session.add(sample_friend_request)
    db.session.commit()
