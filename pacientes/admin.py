from django.contrib import admin
from .models import Paciente

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'email', 'telefone', 'data_nascimento', 'data_cadastro')
    list_filter = ('data_cadastro',)
    search_fields = ('nome', 'cpf', 'email', 'telefone')
    ordering = ('nome',)
    readonly_fields = ('data_cadastro',)

    fieldsets = (
        ('Informações Pessoais', {
            'fields': ('nome', 'cpf', 'data_nascimento', 'email', 'telefone')
        }),
        ('Sistema', {
            'fields': ('data_cadastro',),
        }),
    )
