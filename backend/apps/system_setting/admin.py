from django import forms
from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import AboutSystem, DynamicPages, SocialMedia, SystemColor
@admin.register(AboutSystem)

class AboutSystemAdmin(ModelAdmin):
    list_display = ("id", "name", "title", "email", "copyright", "description",)
    search_fields = ("id", "name", "title", "email", "copyright", "description",)
    list_display_links = ("id", "name", "title", "email", "copyright", "description",)

    def has_add_permission(self, request):
        return False




class SystemColorForm(forms.ModelForm):
    class Meta:
        model = SystemColor
        fields = '__all__'
        widgets = {
            'code': forms.TextInput(attrs={
                'type': 'color',
                'style': 'width: 670px; height: 100px;'
            })
        }


@admin.register(SystemColor)
class SystemColorAdmin(ModelAdmin):
    form = SystemColorForm
    list_display = ("id", "name", "code", "is_active",)
    search_fields = ("id", "name", "code",)
    list_display_links = ("id", "name", "code",)


