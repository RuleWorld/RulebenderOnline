from django.conf.urls import url, include

from . import views

app_name = 'polls'
urlpatterns = [
    url(r'^$',             views.IndexView.as_view(), name='index'),
    url(r'^zero_no_key/$', views.zero_no_key, name='zero_no_key'),
    url(r'^cmap/$',        views.cmap,       name='cmap'),
    url(r'^cone/$',        views.cone,       name='cone'),
    url(r'^pmap/$',        views.pmap,       name='pmap'),
    url(r'^parse/$',       views.parse,      name='parse'),
    url(r'^cmap_key/$',    views.cmap_key,   name='cmap_key'),
    url(r'^comp_key/$',    views.comp_key,   name='comp_key'),
    url(r'^cone_key/$',    views.cone_key,   name='cone_key'),
    url(r'^pmap_key/$',    views.pmap_key,   name='pmap_key'),
    url(r'^pone_key/$',    views.pone_key,   name='pone_key'),
    url(r'^oone_key/$',    views.oone_key,   name='oone_key'),
    url(r'^omap_key/$',    views.omap_key,   name='omap_key'),
    url(r'^parse_key/$',   views.parse_key,  name='parse_key'),
    url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]
