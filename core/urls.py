from django.urls import path
from . import views

urlpatterns = [
    path('', views.templateView_inicial, name="Tela_login"),
    
]