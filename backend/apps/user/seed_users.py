from apps.user.models import User, UserProfile



def seed_users():
    user_data = [

        {
            "email": "rafi.cse.ahmed@gmail.com",
            "full_name": "Rafi Ahmed",
            "avatar": "avatars/2.png",
            "password": "12345678",
            "is_staff": True,
            "is_superuser": True,
            "term_and_condition_accepted": True,
          
        },
        {
            "email": "ceo@alphanet.com",
            "full_name": "Abu Sufian Haider",
            "avatar": "avatars/1.jpg",
            "password": "12345678",
            "is_staff": True,
            "is_superuser": True,
            "term_and_condition_accepted": True,
          
        },
        {
            "email": "admin@admin.com",
            "full_name": "Admin User",
            "avatar": "avatars/2.jpg",
            "password": "12345678",
            "is_staff": True,
            "is_superuser": True,
            "term_and_condition_accepted": True,
          
        },
        {
            "email": "jobs@alpha.net.bd",
            "full_name": "Alpha Net",
            "avatar": "avatars/3.jpg",
            "password": "12345678",
            "is_staff": False,
            "is_superuser": False,
            "is_customer": True,
            "term_and_condition_accepted": True,
            
        },
       
    ]

    for user in user_data:
         User.objects.create_user(
            email=user["email"],
            full_name=user["full_name"],
            avatar=user["avatar"],
            password=user["password"],
            is_staff=user["is_staff"],
            is_superuser=user["is_superuser"],
            term_and_condition_accepted=user["term_and_condition_accepted"],
        )
         
         UserProfile.objects.create(
            user=User.objects.get(email=user["email"])
            )


    print("✅ User data seeded successfully.")
