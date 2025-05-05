
// Toggle sidebar
document.getElementById('toggle-sidebar').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    sidebar.classList.toggle('sidebar-collapsed');
    content.classList.toggle('content-expanded');
    
    if (sidebar.classList.contains('sidebar-collapsed')) {
        this.innerHTML = '<i class="fas fa-chevron-right"></i><span class="sidebar-text">Expandir Menu</span>';
    } else {
        this.innerHTML = '<i class="fas fa-chevron-left"></i><span class="sidebar-text">Recolher Menu</span>';
    }
});

// Navigation between sections
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Hide all sections
        document.querySelectorAll('#content > div').forEach(section => {
            section.classList.add('hidden');
        });
        
        // Show the selected section
        const target = this.getAttribute('href');
        document.querySelector(target).classList.remove('hidden');
        
        // Update header title
        const headerTitle = document.querySelector('header h1');
        if (target === '#dashboard') {
            headerTitle.textContent = 'Dashboard';
        } else if (target === '#patients') {
            headerTitle.textContent = 'Pacientes';
        } else if (target === '#doctors') {
            headerTitle.textContent = 'Médicos';
        } else if (target === '#appointments') {
            headerTitle.textContent = 'Agendar Consulta';
        } else if (target === '#scheduled') {
            headerTitle.textContent = 'Consultas Agendadas';
        }
        
        // Update active nav item
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('bg-blue-700');
            navLink.classList.add('hover:bg-blue-700');
        });
        
        this.classList.remove('hover:bg-blue-700');
        this.classList.add('bg-blue-700');
    });
});

// Patient Modal
const patientModal = document.getElementById('patient-modal');
const newPatientBtn = document.getElementById('new-patient-btn');
const closePatientModal = document.getElementById('close-patient-modal');
const cancelPatient = document.getElementById('cancel-patient');
const savePatient = document.getElementById('save-patient');

newPatientBtn.addEventListener('click', function() {
    document.getElementById('patient-modal-title').textContent = 'Novo Paciente';
    document.getElementById('patient-form').reset();
    document.getElementById('patient-id').value = '';
    patientModal.classList.remove('hidden');
});

closePatientModal.addEventListener('click', function() {
    patientModal.classList.add('hidden');
});

cancelPatient.addEventListener('click', function() {
    patientModal.classList.add('hidden');
});

// Edit patient buttons
document.querySelectorAll('.edit-patient').forEach(btn => {
    btn.addEventListener('click', function() {
        const patientId = this.getAttribute('data-id');
        // In a real app, you would fetch patient data based on ID
        
        document.getElementById('patient-modal-title').textContent = 'Editar Paciente';
        document.getElementById('patient-id').value = patientId;
        
        // Sample data - in a real app, this would come from an API
        if (patientId === '1') {
            document.getElementById('patient-name').value = 'João da Silva';
            document.getElementById('patient-cpf').value = '123.456.789-00';
            document.getElementById('patient-birth').value = '1985-03-15';
            document.getElementById('patient-email').value = 'joao.silva@email.com';
            document.getElementById('patient-phone').value = '(11) 98765-4321';
        } else if (patientId === '2') {
            document.getElementById('patient-name').value = 'Maria Oliveira';
            document.getElementById('patient-cpf').value = '987.654.321-00';
            document.getElementById('patient-birth').value = '1990-07-22';
            document.getElementById('patient-email').value = 'maria.oliveira@email.com';
            document.getElementById('patient-phone').value = '(11) 91234-5678';
        } else if (patientId === '3') {
            document.getElementById('patient-name').value = 'Carlos Souza';
            document.getElementById('patient-cpf').value = '456.789.123-00';
            document.getElementById('patient-birth').value = '1978-11-10';
            document.getElementById('patient-email').value = 'carlos.souza@email.com';
            document.getElementById('patient-phone').value = '(11) 99876-5432';
        }
        
        patientModal.classList.remove('hidden');
    });
});

// Save patient
savePatient.addEventListener('click', function() {
    // In a real app, you would save the patient data to an API
    alert('Paciente salvo com sucesso!');
    patientModal.classList.add('hidden');
});

// Delete patient buttons
document.querySelectorAll('.delete-patient').forEach(btn => {
    btn.addEventListener('click', function() {
        const patientId = this.getAttribute('data-id');
        if (confirm('Tem certeza que deseja excluir este paciente?')) {
            // In a real app, you would delete the patient from an API
            alert('Paciente excluído com sucesso!');
        }
    });
});

// Doctor Modal
const doctorModal = document.getElementById('doctor-modal');
const newDoctorBtn = document.getElementById('new-doctor-btn');
const closeDoctorModal = document.getElementById('close-doctor-modal');
const cancelDoctor = document.getElementById('cancel-doctor');
const saveDoctor = document.getElementById('save-doctor');
const addAvailability = document.getElementById('add-availability');
const availabilityContainer = document.getElementById('availability-container');

newDoctorBtn.addEventListener('click', function() {
    document.getElementById('doctor-modal-title').textContent = 'Novo Médico';
    document.getElementById('doctor-form').reset();
    document.getElementById('doctor-id').value = '';
    availabilityContainer.innerHTML = '';
    doctorModal.classList.remove('hidden');
});

closeDoctorModal.addEventListener('click', function() {
    doctorModal.classList.add('hidden');
});

cancelDoctor.addEventListener('click', function() {
    doctorModal.classList.add('hidden');
});

// Edit doctor buttons
document.querySelectorAll('.edit-doctor').forEach(btn => {
    btn.addEventListener('click', function() {
        const doctorId = this.getAttribute('data-id');
        // In a real app, you would fetch doctor data based on ID
        
        document.getElementById('doctor-modal-title').textContent = 'Editar Médico';
        document.getElementById('doctor-id').value = doctorId;
        availabilityContainer.innerHTML = '';
        
        // Sample data - in a real app, this would come from an API
        if (doctorId === '1') {
            document.getElementById('doctor-name').value = 'Dr. Roberto Silva';
            document.getElementById('doctor-crm').value = 'CRM/SP 123456';
            document.getElementById('doctor-specialty').value = 'Cardiologia';
            document.getElementById('doctor-email').value = 'roberto.silva@email.com';
            document.getElementById('doctor-phone').value = '(11) 98765-4321';
            
            // Add sample availability
            addAvailabilitySlot('Segunda-feira', '14:00', '18:00');
            addAvailabilitySlot('Quarta-feira', '09:00', '12:00');
            addAvailabilitySlot('Sexta-feira', '08:00', '17:00');
        } else if (doctorId === '2') {
            document.getElementById('doctor-name').value = 'Dra. Ana Oliveira';
            document.getElementById('doctor-crm').value = 'CRM/SP 654321';
            document.getElementById('doctor-specialty').value = 'Pediatria';
            document.getElementById('doctor-email').value = 'ana.oliveira@email.com';
            document.getElementById('doctor-phone').value = '(11) 91234-5678';
            
            // Add sample availability
            addAvailabilitySlot('Terça-feira', '08:00', '12:00');
            addAvailabilitySlot('Quinta-feira', '13:00', '18:00');
        } else if (doctorId === '3') {
            document.getElementById('doctor-name').value = 'Dr. Carlos Costa';
            document.getElementById('doctor-crm').value = 'CRM/SP 789123';
            document.getElementById('doctor-specialty').value = 'Ortopedia';
            document.getElementById('doctor-email').value = 'carlos.costa@email.com';
            document.getElementById('doctor-phone').value = '(11) 99876-5432';
            
            // Add sample availability
            addAvailabilitySlot('Segunda-feira', '09:00', '18:00');
            addAvailabilitySlot('Quarta-feira', '09:00', '18:00');
            addAvailabilitySlot('Sexta-feira', '09:00', '18:00');
        }
        
        doctorModal.classList.remove('hidden');
    });
});

// Function to add availability slot to the container
function addAvailabilitySlot(day, startTime, endTime) {
    const slotId = Date.now(); // Simple unique ID
    const slot = document.createElement('div');
    slot.className = 'flex items-center justify-between bg-gray-100 p-2 rounded mb-2';
    slot.innerHTML = `
        <span>${day}, ${startTime} às ${endTime}</span>
        <button class="text-red-500 remove-slot" data-id="${slotId}">
            <i class="fas fa-times"></i>
        </button>
    `;
    availabilityContainer.appendChild(slot);
    
    // Add event listener to remove button
    slot.querySelector('.remove-slot').addEventListener('click', function() {
        slot.remove();
    });
}

// Add availability
addAvailability.addEventListener('click', function() {
    const day = document.getElementById('day-select').value;
    const startTime = document.getElementById('start-time').value;
    const endTime = document.getElementById('end-time').value;
    
    if (!startTime || !endTime) {
        alert('Por favor, selecione os horários de início e término');
        return;
    }
    
    addAvailabilitySlot(day, startTime, endTime);
    
    // Clear time inputs
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = '';
});

// Save doctor
saveDoctor.addEventListener('click', function() {
    // In a real app, you would save the doctor data to an API
    alert('Médico salvo com sucesso!');
    doctorModal.classList.add('hidden');
});

// Delete doctor buttons
document.querySelectorAll('.delete-doctor').forEach(btn => {
    btn.addEventListener('click', function() {
        const doctorId = this.getAttribute('data-id');
        if (confirm('Tem certeza que deseja excluir este médico?')) {
            // In a real app, you would delete the doctor from an API
            alert('Médico excluído com sucesso!');
        }
    });
});

// Appointment scheduling
const scheduleAppointment = document.getElementById('schedule-appointment');
const timeSlotsContainer = document.getElementById('time-slots');
const timeError = document.getElementById('time-error');

// When doctor is selected, populate available time slots
document.getElementById('appointment-doctor').addEventListener('change', function() {
    const doctorId = this.value;
    timeSlotsContainer.innerHTML = '';
    
    if (!doctorId) return;
    
    // In a real app, you would fetch available time slots based on doctor and date
    // For demo purposes, we'll generate some sample time slots
    
    // Sample time slots
    const slots = [];
    if (doctorId === '1') {
        slots.push('09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00');
    } else if (doctorId === '2') {
        slots.push('08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30');
    } else if (doctorId === '3') {
        slots.push('09:00', '10:30', '12:00', '14:00', '15:30', '17:00');
    }
    
    // Mark some slots as unavailable for demo
    const unavailableSlots = ['11:00', '15:00'];
    
    slots.forEach(slot => {
        const isUnavailable = unavailableSlots.includes(slot);
        const slotBtn = document.createElement('button');
        slotBtn.className = `time-slot px-3 py-2 border rounded ${isUnavailable ? 'unavailable' : 'hover:bg-blue-100'}`;
        slotBtn.textContent = slot;
        slotBtn.disabled = isUnavailable;
        
        if (!isUnavailable) {
            slotBtn.addEventListener('click', function() {
                // Deselect all slots
                document.querySelectorAll('.time-slot').forEach(s => {
                    s.classList.remove('selected');
                });
                
                // Select this slot
                this.classList.add('selected');
                timeError.classList.add('hidden');
            });
        }
        
        timeSlotsContainer.appendChild(slotBtn);
    });
});

// Schedule appointment
scheduleAppointment.addEventListener('click', function() {
    const patientId = document.getElementById('appointment-patient').value;
    const doctorId = document.getElementById('appointment-doctor').value;
    const date = document.getElementById('appointment-date').value;
    const selectedTimeSlot = document.querySelector('.time-slot.selected');
    
    // Simple validation
    if (!patientId) {
        alert('Por favor, selecione um paciente');
        return;
    }
    
    if (!doctorId) {
        alert('Por favor, selecione um médico');
        return;
    }
    
    if (!date) {
        alert('Por favor, selecione uma data');
        return;
    }
    
    if (!selectedTimeSlot) {
        timeError.classList.remove('hidden');
        return;
    }
    
    const time = selectedTimeSlot.textContent;
    
    // In a real app, you would save the appointment to an API
    alert(`Consulta agendada para ${date} às ${time}`);
    
    // Reset form
    document.getElementById('appointment-form').reset();
    timeSlotsContainer.innerHTML = '';
    timeError.classList.add('hidden');
});

// Scheduled appointments section
const filterAppointments = document.getElementById('filter-appointments');
const filterContainer = document.getElementById('filter-container');

filterAppointments.addEventListener('click', function() {
    filterContainer.style.display = filterContainer.style.display === 'none' ? 'grid' : 'none';
});

// View appointment details
const appointmentModal = document.getElementById('appointment-modal');
const closeAppointmentModal = document.getElementById('close-appointment-modal');
const closeAppointmentDetail = document.getElementById('close-appointment-detail');

document.querySelectorAll('.view-appointment').forEach(btn => {
    btn.addEventListener('click', function() {
        const appointmentId = this.getAttribute('data-id');
        
        // In a real app, you would fetch appointment details based on ID
        // For demo, we'll use sample data
        if (appointmentId === '1') {
            document.getElementById('appointment-detail-patient').textContent = 'João da Silva';
            document.getElementById('appointment-detail-doctor').textContent = 'Dr. Roberto Silva (Cardiologia)';
            document.getElementById('appointment-detail-date').textContent = '16/06/2023';
            document.getElementById('appointment-detail-time').textContent = '15:30';
            document.getElementById('appointment-detail-status').innerHTML = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Agendada</span>';
        } else if (appointmentId === '2') {
            document.getElementById('appointment-detail-patient').textContent = 'Maria Oliveira';
            document.getElementById('appointment-detail-doctor').textContent = 'Dra. Ana Oliveira (Pediatria)';
            document.getElementById('appointment-detail-date').textContent = '16/06/2023';
            document.getElementById('appointment-detail-time').textContent = '10:00';
            document.getElementById('appointment-detail-status').innerHTML = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Agendada</span>';
        } else if (appointmentId === '3') {
            document.getElementById('appointment-detail-patient').textContent = 'Carlos Souza';
            document.getElementById('appointment-detail-doctor').textContent = 'Dr. Carlos Costa (Ortopedia)';
            document.getElementById('appointment-detail-date').textContent = '15/06/2023';
            document.getElementById('appointment-detail-time').textContent = '14:15';
            document.getElementById('appointment-detail-status').innerHTML = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Realizada</span>';
        } else if (appointmentId === '4') {
            document.getElementById('appointment-detail-patient').textContent = 'João da Silva';
            document.getElementById('appointment-detail-doctor').textContent = 'Dra. Ana Oliveira (Pediatria)';
            document.getElementById('appointment-detail-date').textContent = '14/06/2023';
            document.getElementById('appointment-detail-time').textContent = '09:00';
            document.getElementById('appointment-detail-status').innerHTML = '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelada</span>';
        }
        
        appointmentModal.classList.remove('hidden');
    });
});

closeAppointmentModal.addEventListener('click', function() {
    appointmentModal.classList.add('hidden');
});

closeAppointmentDetail.addEventListener('click', function() {
    appointmentModal.classList.add('hidden');
});

// Cancel appointment
document.querySelectorAll('.cancel-appointment').forEach(btn => {
    btn.addEventListener('click', function() {
        const appointmentId = this.getAttribute('data-id');
        if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
            // In a real app, you would update the appointment status via API
            alert('Consulta cancelada com sucesso!');
        }
    });
});

// Export appointments
document.getElementById('export-appointments').addEventListener('click', function() {
    alert('Exportando consultas...');
    // In a real app, this would generate a CSV or PDF file
});
