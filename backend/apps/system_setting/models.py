from django.db import models

# Create your models here.

class AboutSystem(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    email = models.EmailField()
    copyright = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='about_system/logo/', blank=True, null=True)
    favicon = models.ImageField(upload_to='about_system/favicon/', blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        return self.title

class DynamicPages(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class SocialMedia(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    icon = models.ImageField(upload_to='about_system/social_media/', blank=True, null=True)


class SystemColor(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=7)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name