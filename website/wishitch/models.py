from django.db import models

class Wishlist(models.Model):
    name = models.CharField(max_length=70)
    price = models.FloatField()
    link = models.URLField(max_length=2000)
    img_link = models.URLField(max_length=2000)
    reserved = models.BooleanField(default=False)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name} {self.price} {self.link} {self.img_link} {self.reserved}'

class Website(models.Model):
    name    = models.CharField(max_length=70)
    theme   = models.CharField(max_length=255, default='default')
    private = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name} {self.theme} {self.private}'
