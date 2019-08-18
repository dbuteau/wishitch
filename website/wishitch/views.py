from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.template import loader
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from .serializers import WishlistSerializer
from wishitch.models import Wishlist, Website



# The main Website
def index(request):
    website = Website.objects.get(pk=1)
    template = loader.get_template(f'{website.theme}/index.html')
    context = {
        'Title': website.name,
        'wishlist': Wishlist.objects.all(),
    }
    return HttpResponse(template.render(context, request))

# the REST  api
class CreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    """This class defines the create behavior of our rest api."""
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new Wishlist."""
        serializer.save()