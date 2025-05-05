document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Esconde as mensagens após 5 segundos
    function hideMessages() {
        setTimeout(() => {
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
        }, 5000);
    }
    
    // Valida o formato do e-mail
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validação do formulário
    function validateForm() {
        let isValid = true;
        
        // Validação do e-mail
        if (!emailInput.value.trim()) {
            emailError.textContent = 'O e-mail é obrigatório';
            emailError.classList.remove('hidden');
            emailInput.classList.add('input-error');
            isValid = false;
            
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.classList.remove('hidden');
            emailInput.classList.add('input-error');
            isValid = false;
        } else {
            emailError.classList.add('hidden');
            emailInput.classList.remove('input-error');
        }
        
        // Validação da senha
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'A senha é obrigatória';
            passwordError.classList.remove('hidden');
            passwordInput.classList.add('input-error');
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordError.classList.remove('hidden');
            passwordInput.classList.add('input-error');
            isValid = false;
        } else {
            passwordError.classList.add('hidden');
            passwordInput.classList.remove('input-error');
        }
        
        return isValid;
    }
    
    // Envio do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valida o formulário
        if (!validateForm()) {
            return;
        }
        
        // Mostra o estado de carregamento
        btnText.textContent = 'Autenticando...';
        loadingSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        
        // Simula chamada à API (substituir pela autenticação real)
        setTimeout(() => {
            // Simulação de autenticação
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Verifica se é administrador (simulação)
            const isAdmin = email === 'admin@medschedule.com' && password === 'admin123';
            
            // Verifica se é usuário comum (simulação)
            const isUser = email === 'paciente@example.com' && password === 'paciente123';
            
            if (isAdmin || isUser) {
                // Esconde mensagem de erro se estiver visível
                errorMessage.classList.add('hidden');
                
                // Mostra mensagem de sucesso
                successText.textContent = 'Login realizado com sucesso! Redirecionando...';
                successMessage.classList.remove('hidden');
                
                // Redireciona baseado no tipo de usuário
                setTimeout(() => {
                    if (isAdmin) {
                        // Redireciona para o painel do administrador
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        // Redireciona para o painel do paciente
                        window.location.href = 'patient-dashboard.html';
                    }
                }, 1500);
                
            } else {
                // Mostra mensagem de erro
                errorText.textContent = 'E-mail ou senha incorretos. Por favor, tente novamente.';
                errorMessage.classList.remove('hidden');
                
                // Reseta o estado do formulário
                btnText.textContent = 'Entrar';
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
            }
            
            hideMessages();
        }, 1500);
    });
    
    // Validação em tempo real
    emailInput.addEventListener('input', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            emailError.textContent = 'Por favor, insira um e-mail válido';
            emailError.classList.remove('hidden');
            this.classList.add('input-error');
        } else {
            emailError.classList.add('hidden');
            this.classList.remove('input-error');
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.trim() && this.value.trim().length < 6) {
            passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres';
            passwordError.classList.remove('hidden');
            this.classList.add('input-error');
        } else {
            passwordError.classList.add('hidden');
            this.classList.remove('input-error');
        }
    });
    
    // Link de esqueci a senha
    document.querySelector('a[href="#"]').addEventListener('click', function(e) {
        e.preventDefault();
        successText.textContent = 'Um link para redefinição de senha foi enviado para seu e-mail.';
        successMessage.classList.remove('hidden');
        hideMessages();
    });
});