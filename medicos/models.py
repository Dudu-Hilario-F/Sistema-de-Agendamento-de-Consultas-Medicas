from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils.timezone import now
from datetime import time



class Medico(models.Model):

    nome = models.CharField(
        max_length=255,
        verbose_name='Nome completo',
        db_column='nome',
        help_text='Nome completo do médico'
    )

    crm = models.CharField(
        max_length=20,
        unique=True,
        verbose_name='CRM',
        db_column='crm',
        help_text='Registro profissional do médico',
        validators=[
            RegexValidator(
                regex=r'^[A-Z]{2}\d{4,6}$',
                message='Formato inválido para CRM. Ex: SP123456'
            )
        ]
    )

    especialidade = models.CharField(
        max_length=100,
        verbose_name='Especialidade',
        db_column='especialidade',
        help_text='Ex: Cardiologia, Dermatologia'
    )

    email = models.EmailField(
        verbose_name='E-mail',
        db_column='email',
        unique=True,
        help_text='E-mail de contato',
        error_messages={
            'unique': 'Já existe um médico com este e-mail.'
        }
    )

    telefone = models.CharField(
        max_length=15,
        verbose_name='Telefone profissional',
        db_column='telefone',
        help_text='Telefone profissional',
        validators=[
            RegexValidator(
                regex=r'^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$',
                message='Formato de telefone inválido.'
            )
        ]
    )

    data_cadastro = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Data de cadastro',
        db_column='data_cadastro',
        help_text='Data de inserção do cadastro'
    )

    class Meta:
        db_table = 'medico'
        verbose_name = 'Médico'
        verbose_name_plural = 'Médicos'
        ordering = ['nome']
        indexes = [
            models.Index(fields=['crm'], name='idx_crm'),
            models.Index(fields=['email'], name='idx_email_medico'),
        ]

    def __str__(self):
        return f'{self.nome} - {self.especialidade}'
    




# ======================================================================================================
# TABELA DE AGENDAMENTOS 
DIAS_SEMANA_CHOICES = [
    ('segunda', 'Segunda-feira'),
    ('terca', 'Terça-feira'),
    ('quarta', 'Quarta-feira'),
    ('quinta', 'Quinta-feira'),
    ('sexta', 'Sexta-feira'),
    ('sabado', 'Sábado'),
]

class HorarioDisponivel(models.Model):

    medico = models.ForeignKey(
        'Medico',
        on_delete=models.CASCADE,
        related_name='horarios_disponiveis',
        db_column='id_medico',
        verbose_name='Médico'
    )

    dia_semana = models.CharField(
        max_length=10,
        choices=DIAS_SEMANA_CHOICES,
        db_column='dia_semana',
        verbose_name='Dia da semana',
        help_text='Dia da semana (segunda, terça, etc.)'
    )

    hora_inicio = models.TimeField(
        db_column='hora_inicio',
        verbose_name='Hora de início',
        help_text='Início do horário de atendimento'
    )

    hora_fim = models.TimeField(
        db_column='hora_fim',
        verbose_name='Hora de fim',
        help_text='Fim do horário de atendimento'
    )

    class Meta:
        db_table = 'horario_disponivel'
        verbose_name = 'Horário Disponível'
        verbose_name_plural = 'Horários Disponíveis'
        ordering = ['medico', 'dia_semana', 'hora_inicio']
        indexes = [
            models.Index(fields=['medico', 'dia_semana'], name='idx_horario_medico_dia'),
        ]
        unique_together = ('medico', 'dia_semana', 'hora_inicio', 'hora_fim')

    def clean(self):
        super().clean()
        if self.hora_inicio >= self.hora_fim:
            raise ValidationError('A hora de início deve ser menor que a hora de fim.')

        # Verifica se existe sobreposição com outro horário do mesmo médico no mesmo dia
        conflitos = HorarioDisponivel.objects.filter(
            medico=self.medico,
            dia_semana=self.dia_semana
        ).exclude(id=self.id)

        for horario in conflitos:
            if (
                self.hora_inicio < horario.hora_fim and
                self.hora_fim > horario.hora_inicio
            ):
                raise ValidationError(
                    f'Conflito com horário existente: {horario.hora_inicio} - {horario.hora_fim}'
                )

    def __str__(self):
        return f'{self.medico.nome} - {self.dia_semana.capitalize()} ({self.hora_inicio} às {self.hora_fim})'