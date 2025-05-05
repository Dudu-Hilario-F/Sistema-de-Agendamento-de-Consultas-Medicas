from django.contrib import admin
from .models import Medico, HorarioDisponivel

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'crm', 'especialidade', 'email', 'telefone', 'data_cadastro')
    list_filter = ('especialidade', 'data_cadastro')
    search_fields = ('nome', 'crm', 'email', 'especialidade')
    ordering = ('nome',)
    readonly_fields = ('data_cadastro',)

    fieldsets = (
        ('Dados Pessoais', {
            'fields': ('nome', 'crm', 'especialidade', 'email', 'telefone')
        }),
        ('Informações do Sistema', {
            'fields': ('data_cadastro',),
        }),
    )

@admin.register(HorarioDisponivel)
class HorarioDisponivelAdmin(admin.ModelAdmin):
    list_display = ('id', 'medico', 'dia_semana', 'hora_inicio', 'hora_fim')
    list_filter = ('dia_semana',)
    search_fields = ('medico__nome', 'dia_semana')
    ordering = ('medico__nome', 'dia_semana', 'hora_inicio')

    fieldsets = (
        ('Informações do Horário', {
            'fields': ('medico', 'dia_semana', 'hora_inicio', 'hora_fim')
        }),
    )