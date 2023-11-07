from app import app, db
from models import User, Post, Comment, Like, Friend, Message ,Topic
from datetime import datetime

with app.app_context():
    User.query.delete()
    # Create sample users
    Post.query.delete()
    user1 = User(
        full_name="Alvin Ombito",
        username="alvo",
        email="alvin@example.com",
        bio="Blockchain developer",
        age=30,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
        _password_hash="your_password_hash_here", 
    )

    user2 = User(
        full_name="Nicolas Esemere",
        username="exemere",
        email="exemere@example.com",
        bio="Software engineer",
        age=28,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
        _password_hash="your_password_hash_here",
    )
    user3 = User(
        full_name="Michael Owen",
        username="mike",
        email="mike@example.com",
        bio="Web developer",
        age=30,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/d7/35/18/d7351825ea872367f647b74b8b18b169.jpg",
        _password_hash="your_password_hash_here", 
    )

    user4 = User(
        full_name="Jones Munene",
        username="jones",
        email="jones@example.com",
        bio="Software engineer",
        age=28,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
        _password_hash="your_password_hash_here",
    )
    user5 = User(
        full_name="Jan Kimutai",
        username="jan",
        email="jan@example.com",
        bio="Web developer",
        age=30,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/36/49/ac/3649acad55b330bdf7532d50d9932f9b.jpg",
        _password_hash="your_password_hash_here",  
    )

    user6 = User(
        full_name="Mark Kibocha",
        username="mark",
        email="mark@example.com",
        bio="Software engineer",
        age=28,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/72/99/14/729914ee5f05da86c8660d7c785e79a6.jpg",
        _password_hash="your_password_hash_here",
    )
    user7 = User(
        full_name="Mary Njoki",
        username="mpoa",
        email="mpoa@example.com",
        bio="Blockchain developer",
        age=30,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
        _password_hash="your_password_hash_here",  
    )

    user8 = User(
        full_name="Danwycliffe Ndiga",
        username="mzee",
        email="mzee@example.com",
        bio="Software engineer",
        age=28,
        gender="Male",
        profile_picture="https://i.pinimg.com/564x/8a/2d/16/8a2d16c40f897a392833c6ef9d5d2e43.jpg",
        _password_hash="your_password_hash_here",
    )

        # sample posts
    post1 = Post(
        message="Python is the simplest language of all, do you know why? Share your comments",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
        image="https://i.pinimg.com/564x/ba/68/c2/ba68c219198d1b7a7e706939a50219a8.jpg",
        comments_count=0,
        likes_count=0,
    )

    post2 = Post(
        message="Thank you JavaScript",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
        image="https://i.pinimg.com/564x/17/c8/c9/17c8c9e1957764691b58603ebf1fd756.jpg",
        comments_count=0,
        likes_count=0,
    )
    post3 = Post(
        message="I am learning react right now and I am enjoying the journey. ",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
        image="https://i.pinimg.com/564x/74/b5/09/74b509287789ebdaa86e16b3fb6c5100.jpg",
        comments_count=0,
        likes_count=0,
    )

    post4 = Post(
        message="What are functions in JavaScript",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/d7/35/18/d7351825ea872367f647b74b8b18b169.jpg",
        image="https://i.pinimg.com/564x/a8/f8/93/a8f893a5f40158f54eaf4ddb1b2feb2b.jpg",
        comments_count=0,
    )
    post5 = Post(
        message="Thank you Ruby",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
        image="https://i.pinimg.com/564x/90/6c/04/906c04cb852f20fad832f1bcdf0730d8.jpg",
        comments_count=0,
        likes_count=0,
    )

    post6 = Post(
        message="Python tutorials for beginners",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/36/49/ac/3649acad55b330bdf7532d50d9932f9b.jpg",
        image="https://i.pinimg.com/564x/52/af/43/52af4345c2d2ca42a803a853ff02dbe6.jpg",
        comments_count=0,
    )
    post7 = Post(
        message="Code refactoring today. It's like cleaning your room - feels much better afterward! 🧹🧽 #CodeRefactoring #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/72/99/14/729914ee5f05da86c8660d7c785e79a6.jpg",
        image="https://i.pinimg.com/564x/36/3f/52/363f5274703970d3afa542ea9e8bf573.jpg",
        comments_count=0,
        likes_count=0,
    )

    post8 = Post(
        message="Software architecture and design patterns - the building blocks of robust applications. 🏗️📐 #SoftwareDesign #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
        image="https://i.pinimg.com/564x/71/20/45/712045f5a1893c7272397d808f14b480.jpg",
        comments_count=0,
    )
    post9 = Post(
        message="Automating repetitive tasks with scripts is my favorite way to be efficient. ⚙️💡 #Automation #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/1e/9b/62/1e9b62eabbe03711ae0d18eb4889a921.jpg",
        image="https://i.pinimg.com/564x/32/09/7b/32097be52aea3db46a4356d59e2329b1.jpg",
        comments_count=0,
    )
    post10 = Post(
        message="Pair programming is a fantastic way to collaborate and learn from each other. 👥💻 #PairProgramming #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/d2/35/67/d23567321a16f5bb685c628e471bd24f.jpg",
        image="https://i.pinimg.com/564x/82/53/f4/8253f46af6e9eaa5699b8bf1387653e9.jpg",
        comments_count=0,
    )
    post11 = Post(
        message="Learning a new programming language - the joy of exploring new horizons. 🌐📚 #ProgrammingLanguages #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/3b/72/5d/3b725d1da312f94db6daf04e73e9939e.jpg",
        image="https://i.pinimg.com/564x/08/5d/db/085ddbaddc503f0a44ef56ed0f0268d3.jpg",
        comments_count=0,
    )
    post12 = Post(
        message="Discussing best practices for code reviews with the team. Code quality matters! 👩‍💻👨‍💻 #CodeReview #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/d7/35/18/d7351825ea872367f647b74b8b18b169.jpg",
        image="https://i.pinimg.com/564x/30/d1/e9/30d1e9b3d6e658e4c3a84d0ce77daa31.jpg",
        comments_count=0,
    )
    post13 = Post(
        message="Continuous integration and continuous deployment (CI/CD) pipelines are saving my life right now. 🛠️🚀 #CI/CD #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
        image="https://i.pinimg.com/564x/5f/7c/08/5f7c08b0ac597d7c114c4f35fafc6d99.jpg",
        comments_count=0,
    )
    post14 = Post(
        message="PHP tutorials for beginners",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/73/f3/5a/73f35ab18a1e7cc588bc8d793a0d6860.jpg",
        image="https://i.pinimg.com/564x/03/53/46/035346a563872cd1e8c6ba4a49d0cf57.jpg",
        comments_count=0,
    )
    post15 = Post(
        message="Learning about data structures and algorithms - essential for any software engineer. 📚🤓 #DataStructures #Algorithms #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
        image="https://i.pinimg.com/564x/57/4f/4b/574f4b8f88c124944da931e90f1d3d9a.jpg",
        comments_count=0,
    )
    post16 = Post(
        message="Just deployed my first web app! Feels like a huge achievement. 💪🚀 #WebDevelopment #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/ae/24/87/ae24874dd301843548c034a3d2973658.jpg",
        image="https://i.pinimg.com/564x/e2/2d/70/e22d70c1714c9619ab0a9df480b11d8a.jpg",
        comments_count=0,
    )
    post17 = Post(
        message="The satisfaction of seeing your code work perfectly after hours of coding is unmatched. 😄💻 #CodingJoys #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
        image="https://i.pinimg.com/564x/3b/15/c4/3b15c41521709c746b5db60f1461751e.jpg",
        comments_count=0,
    )
    post18 = Post(
        message="Attending a coding bootcamp has been a game-changer for me. Learning so much and loving it! 💡📚 #CodingBootcamp #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/fc/e8/c1/fce8c1b7270388528d4b939fc3619357.jpg",
        image="https://i.pinimg.com/564x/b6/13/8f/b6138f62c61d2b7d5fbf8efe8aad2210.jpg",
        comments_count=0,
    )
    post19 = Post(
        message="Just landed my dream job as a software engineer! Excited to start my career journey. 💼🚀 #NewBeginnings #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/2b/32/64/2b3264519ac88cb4e89216d41ca8ce4c.jpg",
        image="https://i.pinimg.com/564x/5f/34/32/5f3432db4937954c542dd834a8e07c37.jpg",
        comments_count=0,
    )
    post20 = Post(
        message="Spent the day debugging a tricky issue, but finally cracked it! 🐞💻 #DebuggingAdventures #SoftwareEngineering",
        created_at=datetime.utcnow(),
        user=user1,
        user_pic="https://i.pinimg.com/564x/8a/2d/16/8a2d16c40f897a392833c6ef9d5d2e43.jpg",
        image="https://i.pinimg.com/564x/d1/ea/26/d1ea267e7c18013ff957834761bd2d27.jpg",
        comments_count=0,
    )

    # sample comments
    comment1 = Comment(
        content="Great post!",
        created_at=datetime.utcnow(),
        user=user2,
        post=post1,
    )

    comment2 = Comment(
        content="Nice one!",
        created_at=datetime.utcnow(),
        user=user3,
        post=post2,
    )
    comment3 = Comment(
        content="Great post!",
        created_at=datetime.utcnow(),
        user=user4,
        post=post3,
    )

    comment4 = Comment(
        content="Nice one!",
        created_at=datetime.utcnow(),
        user=user5,
        post=post4,
    )
    comment5 = Comment(
        content="Great post!",
        created_at=datetime.utcnow(),
        user=user6,
        post=post5,
    )

    comment6 = Comment(
        content="Nice one!",
        created_at=datetime.utcnow(),
        user=user7,
        post=post6,
    )
    comment7 = Comment(
        content="Great post!",
        created_at=datetime.utcnow(),
        user=user8,
        post=post7,
    )

    comment8 = Comment(
        content="Nice one!",
        created_at=datetime.utcnow(),
        user=user2,
        post=post8,
    )

    # sample likes
    like1 = Like(
        user=user2,
        post=post1,
    )

    like2 = Like(
        user=user1,
        post=post2,
    )

    # Create sample friend connections
    friend1 = Friend(user=user1, friend=user2, status="accepted")


    topic1=Topic (
        title="Babel",
        topic_text = "Is Babel new version here?",
        created_at = datetime.utcnow()
    )
    topic2=Topic (
        title="Python ,Django",
        topic_text = "Python Django Developers expo",
        created_at = datetime.utcnow()
    )
    topic3=Topic (
        title="Reaxt JS",
        topic_text = "The new package is here",
        created_at = datetime.utcnow()
    )
    topic4=Topic (
        title="Ruby",
        topic_text = "The Rails question???",
        created_at = datetime.utcnow()
    )

    print('Seeding data...')
    users = [user1, user2, user3, user4, user5, user6, user7, user8]
    posts = [post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15, post16, post17, post18, post19, post20]
    topics = [post1, post2, post3, post4, post5, post6, post7, post8]
    comments = [topic1, topic2, topic3, topic4, ]
    likes = [like1, like2]
  

    

#     db.session.commit()



# from app import db, User, Post, Comment, Like, Friend, Message

    # Create sample users
    user1 = User(full_name="Nicolas Esemere", username="Esemere", email="esemere@example.com", gender="Male")
    user1.password_hash = "your_password_here"
    user2 = User(full_name="Jude Odhiambo", username="judesmith", email="judesmith@example.com", gender="Male")
    user2.password_hash = "your_password_here"
    # Add more users as needed

    # Create sample posts
    post1 = Post(user=user1, message="This is a sample post by John Doe")
    post2 = Post(user=user2, message="Hello from Jane Smith!")
    # Add more posts as needed

    # Create sample comments
    comment1 = Comment(user=user1, post=post2, content="Nice post, Jane!")
    comment2 = Comment(user=user2, post=post1, content="Thanks, John!")
    # Add more comments as needed

    # Create sample likes
    like1 = Like(user=user1, post=post2)
    like2 = Like(user=user2, post=post1)
    # Add more likes as needed

    # Create sample friends
    friend1 = Friend(user=user1, friend=user2, status="accepted")
    friend2 = Friend(user=user2, friend=user1, status="accepted")
    # Add more friends as needed

    # Create sample messages
    message1 = Message(sender=user1, receiver=user2, text="Hello, Jane!")
    message2 = Message(sender=user2, receiver=user1, text="Hi, John!")
    message3 = Message(sender=user1, receiver=user2, text="Hello, Jane!")
    message4 = Message(sender=user2, receiver=user1, text="Hi, John!")
    # Add more messages as needed
    print('Seeding data...')
# Add data to the session and commit it to the database
    db.session.add_all([message1, message2, message3, message4])
    db.session.add_all(topics)
    db.session.add_all(comments)
    db.session.add_all(likes)
    db.session.commit()

