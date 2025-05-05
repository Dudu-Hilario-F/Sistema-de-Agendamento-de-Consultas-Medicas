from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required  # Garante que só usuários logados acessem
def paciente_page(request):
    return render(request, 'pacientes/pages/paciente.html')


def criar_conta(request):
    return render(request, 'pacientes/pages/cadastro.html')