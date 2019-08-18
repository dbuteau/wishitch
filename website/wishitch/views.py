from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.generic import TemplateView
from django.template import loader
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated 
from .serializers import WishlistSerializer
from wishitch.models import Wishlist, Website



# The main Website
class WebViews(TemplateView):
    __name__ = ''

    def _get_template_names(self):
        try:
            return f"{Website.objects.get(pk=1).theme}/{self.__name__}.html"
        except Website.DoesNotExist:
            return f"default/{self.__name__}.html"

    def get(self, request):
        self.__name__ = 'index'
        template = self._get_template_names()
        context = {
            'Title': Website.objects.get(pk=1).name,
            'wishlist': Wishlist.objects.all().order_by('price'),
        }
        return render(request, template, context=context)

# the REST  api
class ApiViews(viewsets.GenericViewSet):

    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

    def list(self, request, pk=None):
        #return self.order_by(price)
        if self.queryset.exists():
            return Wishlist.objects.all().order_by(['price'])
        else:
            return HttpResponse(status=204)


    def create(self, request, pk=None):
        permission_classes = (IsAuthenticated,)
        serializer.save()