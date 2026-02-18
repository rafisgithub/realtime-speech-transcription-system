from apps.system_setting.models import AboutSystem, SocialMedia, SystemColor

def seed_system_setting():

    system_setting = {
        "name": "Realtime Speech Transcription System",
        "title": "Realtime Speech Transcription System",
        "email": "[EMAIL_ADDRESS]",
        "copyright": "© 2026 Realtime Speech Transcription System",
        "logo": "system_setting/logo/1.png",
        "favicon": "system_setting/favicon/1.png",
        "description": "Realtime Speech Transcription System is a web application that allows users to transcribe speech to text in real-time.",
    }

    AboutSystem.objects.get_or_create(defaults=system_setting)
    print("✅ About System seeded successfully.")



def seed_system_color():
    SystemColor.objects.get_or_create({
        "name" : "orange",
        "code" : "#FFA500"
    })
    print("✅ System Color seeded successfully.")