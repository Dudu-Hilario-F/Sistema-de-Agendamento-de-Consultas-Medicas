from django.shortcuts import render

# Create your views here.
def criar_conta(request):
    return render(request, 'pacientes/pages/cadastro.html')