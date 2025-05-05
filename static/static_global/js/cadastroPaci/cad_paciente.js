$(document).ready(function() {
    // Initialize masks
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#phone').mask('(00) 00000-0000');
    $('#birthDate').mask('00/00/0000');
    
    // Initialize datepicker
    $('#birthDate').datepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-BR',
        autoclose: true,
        todayHighlight: true,
        endDate: 'today'
    });
    
    // Toggle password visibility
    $('#togglePassword').click(function() {
        const passwordField = $('#password');
        const icon = $(this);
        
        if (passwordField.attr('type') === 'password') {
            passwordField.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    // Toggle confirm password visibility
    $('#toggleConfirmPassword').click(function() {
        const confirmPasswordField = $('#confirmPassword');
        const icon = $(this);
        
        if (confirmPasswordField.attr('type') === 'password') {
            confirmPasswordField.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            confirmPasswordField.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
    
    // Validate CPF
    function validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g,'');
        if(cpf == '') return false;
        
        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
            return false;
            
        // Valida 1o digito
        let add = 0;
        for (let i=0; i < 9; i ++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
            
        // Valida 2o digito
        add = 0;
        for (let i = 0; i < 10; i ++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
            
        return true;
    }
    
    // Validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validate phone
    function validatePhone(phone) {
        const digits = phone.replace(/\D/g, '').length;
        return digits >= 10 && digits <= 11;
    }
    
    // Validate birth date
    function validateBirthDate(date) {
        const parts = date.split('/');
        if (parts.length !== 3) return false;
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
        
        // Check if date is valid
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && 
               dateObj.getMonth() === month - 1 && 
               dateObj.getDate() === day;
    }
    
    // Form submission
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        
        // Reset all error states
        $('.error-message').addClass('hidden');
        $('input, select, textarea').removeClass('input-error');
        
        let isValid = true;
        
        // Validate full name
        const fullName = $('#fullName').val().trim();
        if (fullName === '') {
            $('#fullName').addClass('input-error');
            $('#fullNameError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate birth date
        const birthDate = $('#birthDate').val().trim();
        if (birthDate === '' || !validateBirthDate(birthDate)) {
            $('#birthDate').addClass('input-error');
            $('#birthDateError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate CPF
        const cpf = $('#cpf').val().trim();
        if (cpf === '' || !validateCPF(cpf)) {
            $('#cpf').addClass('input-error');
            $('#cpfError').removeClass('hidden');
            isValid = false;
        } else {
            // In a real application, you would check if CPF exists in the database
            // For demo purposes, we'll simulate a check
            const existingCpfs = ['111.111.111-11', '222.222.222-22'];
            if (existingCpfs.includes(cpf)) {
                $('#cpf').addClass('input-error');
                $('#cpfExistsError').removeClass('hidden');
                isValid = false;
            }
        }
        
        // Validate email
        const email = $('#email').val().trim();
        if (email === '' || !validateEmail(email)) {
            $('#email').addClass('input-error');
            $('#emailError').removeClass('hidden');
            isValid = false;
        } else {
            // In a real application, you would check if email exists in the database
            // For demo purposes, we'll simulate a check
            const existingEmails = ['existing@email.com', 'test@test.com'];
            if (existingEmails.includes(email)) {
                $('#email').addClass('input-error');
                $('#emailExistsError').removeClass('hidden');
                isValid = false;
            }
        }
        
        // Validate phone
        const phone = $('#phone').val().trim();
        if (phone === '' || !validatePhone(phone)) {
            $('#phone').addClass('input-error');
            $('#phoneError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate health plan
        const healthPlan = $('#healthPlan').val();
        if (!healthPlan) {
            $('#healthPlan').addClass('input-error');
            $('#healthPlanError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate address
        const address = $('#address').val().trim();
        if (address === '') {
            $('#address').addClass('input-error');
            $('#addressError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate password
        const password = $('#password').val();
        if (password.length < 6) {
            $('#password').addClass('input-error');
            $('#passwordError').removeClass('hidden');
            isValid = false;
        }
        
        // Validate confirm password
        const confirmPassword = $('#confirmPassword').val();
        if (confirmPassword !== password) {
            $('#confirmPassword').addClass('input-error');
            $('#confirmPasswordError').removeClass('hidden');
            isValid = false;
        }
        
        // If form is valid, simulate successful registration
        if (isValid) {
            // In a real application, you would send the data to the server here
            console.log('Form submitted successfully:', {
                fullName,
                birthDate,
                cpf,
                email,
                phone,
                healthPlan,
                address,
                password
            });
            
            // Show success message
            $('#successMessage').removeClass('hidden');
            $('#registrationForm').addClass('hidden');
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        }
    });
    
    // Add input validation on blur
    $('input, select, textarea').on('blur', function() {
        const $input = $(this);
        const inputId = $input.attr('id');
        
        // Reset error state
        $input.removeClass('input-error');
        $(`#${inputId}Error`).addClass('hidden');
        $(`#${inputId}ExistsError`).addClass('hidden');
        
        // Validate based on input type
        if ($input.val().trim() === '' && $input.prop('required')) {
            $input.addClass('input-error');
            $(`#${inputId}Error`).removeClass('hidden');
            return;
        }
        
        switch(inputId) {
            case 'cpf':
                if (!validateCPF($input.val().trim())) {
                    $input.addClass('input-error');
                    $('#cpfError').removeClass('hidden');
                }
                break;
            case 'email':
                if (!validateEmail($input.val().trim())) {
                    $input.addClass('input-error');
                    $('#emailError').removeClass('hidden');
                }
                break;
            case 'phone':
                if (!validatePhone($input.val().trim())) {
                    $input.addClass('input-error');
                    $('#phoneError').removeClass('hidden');
                }
                break;
            case 'birthDate':
                if (!validateBirthDate($input.val().trim())) {
                    $input.addClass('input-error');
                    $('#birthDateError').removeClass('hidden');
                }
                break;
            case 'password':
                if ($input.val().length < 6) {
                    $input.addClass('input-error');
                    $('#passwordError').removeClass('hidden');
                }
                break;
            case 'confirmPassword':
                if ($input.val() !== $('#password').val()) {
                    $input.addClass('input-error');
                    $('#confirmPasswordError').removeClass('hidden');
                }
                break;
        }
    });
});