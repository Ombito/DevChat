from app import app, db
from models import User, Post, Comment, Like, Friend, Inbox
from datetime import datetime

with app.app_context():
    User.query.delete()
#     # Create sample users
#     Post.query.delete()
#     user1 = User(
#         full_name="Alvin Ombito",
#         username="alvo",
#         email="alvin@example.com",
#         bio="Blockchain developer",
#         age=30,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
#         _password_hash="your_password_hash_here", 
#     )

#     user2 = User(
#         full_name="Nicolas Esemere",
#         username="exemere",
#         email="exemere@example.com",
#         bio="Software engineer",
#         age=28,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
#         _password_hash="your_password_hash_here",
#     )
#     user3 = User(
#         full_name="Michael Owen",
#         username="mike",
#         email="mike@example.com",
#         bio="Web developer",
#         age=30,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/d7/35/18/d7351825ea872367f647b74b8b18b169.jpg",
#         _password_hash="your_password_hash_here", 
#     )

#     user4 = User(
#         full_name="Jones Munene",
#         username="jones",
#         email="jones@example.com",
#         bio="Software engineer",
#         age=28,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
#         _password_hash="your_password_hash_here",
#     )
#     user5 = User(
#         full_name="Jan Kimutai",
#         username="jan",
#         email="jan@example.com",
#         bio="Web developer",
#         age=30,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/36/49/ac/3649acad55b330bdf7532d50d9932f9b.jpg",
#         _password_hash="your_password_hash_here",  
#     )

#     user6 = User(
#         full_name="Mark Kibocha",
#         username="mark",
#         email="mark@example.com",
#         bio="Software engineer",
#         age=28,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/72/99/14/729914ee5f05da86c8660d7c785e79a6.jpg",
#         _password_hash="your_password_hash_here",
#     )
#     user7 = User(
#         full_name="Mary Njoki",
#         username="mpoa",
#         email="mpoa@example.com",
#         bio="Blockchain developer",
#         age=30,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
#         _password_hash="your_password_hash_here",  
#     )

#     user8 = User(
#         full_name="Danwycliffe Ndiga",
#         username="mzee",
#         email="mzee@example.com",
#         bio="Software engineer",
#         age=28,
#         gender="Male",
#         profile_picture="https://i.pinimg.com/564x/8a/2d/16/8a2d16c40f897a392833c6ef9d5d2e43.jpg",
#         _password_hash="your_password_hash_here",
#     )

#         # sample posts
#     post1 = Post(
#         message="Python is the simplest language of all, do you know why? Share your comments",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
#         image="https://i.pinimg.com/564x/ba/68/c2/ba68c219198d1b7a7e706939a50219a8.jpg",
#         comments_count=0,
#         likes_count=0,
#     )

#     post2 = Post(
#         message="Thank you JavaScript",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
#         image="https://i.pinimg.com/564x/17/c8/c9/17c8c9e1957764691b58603ebf1fd756.jpg",
#         comments_count=0,
#         likes_count=0,
#     )
#     post3 = Post(
#         message="I am learning react right now and I am enjoying the journey. ",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
#         image="https://i.pinimg.com/564x/74/b5/09/74b509287789ebdaa86e16b3fb6c5100.jpg",
#         comments_count=0,
#         likes_count=0,
#     )

#     post4 = Post(
#         message="What are functions in JavaScript",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/d7/35/18/d7351825ea872367f647b74b8b18b169.jpg",
#         image="https://i.pinimg.com/564x/a8/f8/93/a8f893a5f40158f54eaf4ddb1b2feb2b.jpg",
#         comments_count=0,
#     )
#     post5 = Post(
#         message="Thank you Ruby",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
#         image="https://i.pinimg.com/564x/90/6c/04/906c04cb852f20fad832f1bcdf0730d8.jpg",
#         comments_count=0,
#         likes_count=0,
#     )

#     post6 = Post(
#         message="Python tutorials for beginners",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/36/49/ac/3649acad55b330bdf7532d50d9932f9b.jpg",
#         image="https://i.pinimg.com/564x/52/af/43/52af4345c2d2ca42a803a853ff02dbe6.jpg",
#         comments_count=0,
#     )
#     post7 = Post(
#         message="Flutter developpers needed, send your cv to info@devchat.com",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/72/99/14/729914ee5f05da86c8660d7c785e79a6.jpg",
#         image="https://i.pinimg.com/564x/36/3f/52/363f5274703970d3afa542ea9e8bf573.jpg",
#         comments_count=0,
#         likes_count=0,
#     )

#     post8 = Post(
#         message="PHP tutorials for beginners",
#         created_at=datetime.utcnow(),
#         user=user1,
#         user_pic="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
#         image="https://i.pinimg.com/564x/1d/6a/8e/1d6a8e4cc3d721761b6e4dde5c714852.jpg",
#         comments_count=0,
#     )

#     # sample comments
#     comment1 = Comment(
#         content="Great post!",
#         created_at=datetime.utcnow(),
#         user=user2,
#         post=post1,
#     )

#     comment2 = Comment(
#         content="Nice one!",
#         created_at=datetime.utcnow(),
#         user=user3,
#         post=post2,
#     )
#     comment3 = Comment(
#         content="Great post!",
#         created_at=datetime.utcnow(),
#         user=user4,
#         post=post3,
#     )

#     comment4 = Comment(
#         content="Nice one!",
#         created_at=datetime.utcnow(),
#         user=user5,
#         post=post4,
#     )
#     comment5 = Comment(
#         content="Great post!",
#         created_at=datetime.utcnow(),
#         user=user6,
#         post=post5,
#     )

#     comment6 = Comment(
#         content="Nice one!",
#         created_at=datetime.utcnow(),
#         user=user7,
#         post=post6,
#     )
#     comment7 = Comment(
#         content="Great post!",
#         created_at=datetime.utcnow(),
#         user=user8,
#         post=post7,
#     )

#     comment8 = Comment(
#         content="Nice one!",
#         created_at=datetime.utcnow(),
#         user=user2,
#         post=post8,
#     )

#     # sample likes
#     like1 = Like(
#         user=user2,
#         post=post1,
#     )

#     like2 = Like(
#         user=user1,
#         post=post2,
#     )

#     # Create sample friend connections
#     friend1 = Friend(user=user1, friend=user2, status="accepted")

#     # Create sample inbox messages
#     inbox1 = Inbox(
#         name="Nicolas's Inbox",
#         message="Hello, Nic! How are you?",
#         created_at=datetime.utcnow(),
#         user=user1,
#     )

#     inbox2 = Inbox(
#         name="Alvin's Inbox",
#         message="Hi Alvin! I'm doing great, thanks!",
#         created_at=datetime.utcnow(),
#         user=user2,
#     )

#     print('Seeding data...')
#     users = [user1, user2, user3, user4, user5, user6, user7, user8]
#     posts = [post1, post2, post3, post4, post5, post6, post7, post8]
#     comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8]
#     likes = [like1, like2]
#     inboxes = [inbox1, inbox2]

#     db.session.add_all(users)
#     db.session.add_all(posts)
#     db.session.add_all(comments)
#     db.session.add_all(likes)
#     db.session.add_all(inboxes)

    db.session.commit()


