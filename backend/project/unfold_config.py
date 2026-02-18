from django.templatetags.static import static
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _


def get_about_system():
    from apps.system_setting.models import AboutSystem
    return AboutSystem.objects.first()

def get_unfold_settings():
    return {
        "SITE_TITLE": lambda request: get_about_system().title,
        "SITE_HEADER": lambda request: get_about_system().title,
        "SITE_SUBHEADER": lambda request: get_about_system().title,
        "SITE_URL": "/",
        "SITE_ICON": {
            "light": lambda request: get_about_system().logo.url,  
            "dark": lambda request: get_about_system().logo.url,  
        },
        "SITE_SYMBOL": "speed",  
        "SITE_FAVICONS": [
            {
            "rel": "icon",
            "sizes": "32x32",
            "type": "image/svg+xml",
            "href": lambda request: get_about_system().favicon.url,
            },
        ],
        "DASHBOARD_CALLBACK": "apps.dashboard.views.dashboard_callback",

        "SHOW_HISTORY": True,  
        "SHOW_VIEW_ON_SITE": True,  
        "SHOW_BACK_BUTTON": True,  
        "THEME": "dark",
        "LOGIN": {
            "image": lambda request: static("sample/login-bg.jpg"),
            "redirect_after": lambda request: reverse_lazy("admin:APP_MODEL_changelist"),
        },
        "BORDER_RADIUS": "6px",
        "SIDEBAR": {
            "show_search": True, 
            "show_all_applications": True,  
            "navigation": [
                {
                    "items": [
                        {
                            "title": _("Dashboard"),
                            "icon": "dashboard",
                            "link": reverse_lazy("admin:index"),
                            "permission": lambda request: request.user.is_superuser,
                        },
                    ],
                },
                {
                    "title": _("User Management"),
                    "separator": True, 
                    "collapsible": True,  
                    "items": [
                        {
                            "title": _("Users"),
                            "icon": "people",
                            "link": reverse_lazy("admin:user_user_changelist"),
                        },
                    ],
                },
                {
                    "title": _("System Setting"),
                    "separator": True,
                    "collapsible": True,
                    "items": [
                       
                        {
                            "title": _("About System"),
                            "icon": "info",
                            "link": reverse_lazy(
                                "admin:system_setting_aboutsystem_changelist"
                            ),
                        },
                        {
                            "title": _("System Color"),
                            "icon": "palette",
                            "link": reverse_lazy(
                                "admin:system_setting_systemcolor_changelist"
                            ),
                        }
                    ],
                },
               
               
               
            ],
        },
    }
