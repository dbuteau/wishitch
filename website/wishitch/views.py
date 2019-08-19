from django.http import HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views.generic import TemplateView
from django.template import loader
from rest_framework import generics, viewsets, mixins
from rest_framework.permissions import IsAuthenticated 
import logging, json
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

    def list(self, request, pk=None):
        #return self.order_by(price)
        if self.queryset.exists():
            return Wishlist.objects.all().order_by(['price'])
        else:
            return HttpResponse(status=204)
        


    def create(self, request, pk=None):
        try:
            serializer = WishlistSerializer(data=request.data)
            permission_classes = (IsAuthenticated,)
            if (serializer.is_valid()):
                result = serializer.save()
                if (result):
                    jsonMsg = json.dumps({'message':'wish saved'})
                    response = HttpResponse(jsonMsg, content_type='application/json', status='200')
                    logging.getLogger("error_logger").error(response.content)
                    return response
                else:
                    return HttpResponse('Save Failed for unknown reason', content_type='application/json', status='500')
            else:
                jsonErr = json.dumps(serializer.errors)
                logging.getLogger("error_logger").error(jsonErr)
                return HttpResponse(jsonErr, content_type='application/json', status="500")
        except Exception as err:
            logging.getLogger("error_logger").error(repr(err))
            return HttpResponse(err, content_type='application/json', status="500")
