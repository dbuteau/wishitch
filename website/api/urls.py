from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from .views import CreateView

urlpatterns = {
    url(r'^wish/$', CreateView.as_view(), name="create"),
    url(r'^token/$', obtain_auth_token, name='api_token_auth'),
}

urlpatterns = format_suffix_patterns(urlpatterns)