from django.shortcuts import render

# Create your views here.
def templateView_inicial(request):
    return render(request, 'core/pages/tela_login.html')