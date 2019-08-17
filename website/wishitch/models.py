from django.db import models

# Create your models here.
class Wishlist(models.Model):
    name = models.CharField(max_length=70)
    price = models.FloatField()
    link = models.URLField()
    img_link = models.URLField()
    reserved = models.BooleanField(default=0)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s %s %s' % (self.name, self.price, self.link)

class Website(models.Model):
    name    = models.CharField(max_length=70)
    theme   = models.CharField(max_length=255,default='default')
    private = models.BooleanField(default=0)