from django.urls import path
from . import views

app_name = 'pacientes'

urlpatterns = [
    path('criar-conta/', views.criar_conta, name='criar_conta'),
]
