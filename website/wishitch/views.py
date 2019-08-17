from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from wishitch.models import Wishlist, Website
from django.template import loader


website = Website.objects.get(pk=1)
def index(request):
    template = loader.get_template(f'{website.theme}/index.html')
    context = {
        'Title': website.name,
        'wishlist': Wishlist.objects.all(),
    }
    return HttpResponse(template.render(context, request))
