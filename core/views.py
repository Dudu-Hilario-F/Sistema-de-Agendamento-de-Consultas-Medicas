from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

# Create your views here.
def templateView_inicial(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('pacientes:paciente_page')  # Redireciona para a página do paciente
        
    
    return render(request, 'core/pages/tela_login.html')