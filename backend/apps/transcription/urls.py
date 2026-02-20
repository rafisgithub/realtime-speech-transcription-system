from django.urls import path
from .views import StartSessionAPIView, AllSessionAPIView, SessionHistoryAPIView

urlpatterns = [
    path("start-session/", StartSessionAPIView.as_view(), name="session"),
    path("all-session/", AllSessionAPIView.as_view(), name="session-detail"),
    path("session-history/<uuid:session_id>/", SessionHistoryAPIView.as_view(), name="session-history"),
]
