from django.contrib import admin
from .models import Consulta

@admin.register(Consulta)
class ConsultaAdmin(admin.ModelAdmin):
    list_display = ('id', 'paciente', 'medico', 'data', 'hora', 'status', 'data_criacao')
    list_filter = ('status', 'data', 'medico')
    search_fields = ('paciente__nome', 'medico__nome', 'status')
    ordering = ('-data', 'hora')
    readonly_fields = ('data_criacao',)

    fieldsets = (
        ('Agendamento', {
            'fields': ('paciente', 'medico', 'data', 'hora', 'status')
        }),
        ('Informações do Sistema', {
            'fields': ('data_criacao',),
        }),
    )
