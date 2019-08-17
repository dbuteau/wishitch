from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated 
from .serializers import WishlistSerializer
from wishitch.models import Wishlist

class CreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    """This class defines the create behavior of our rest api."""
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new Wishlist."""
        serializer.save()