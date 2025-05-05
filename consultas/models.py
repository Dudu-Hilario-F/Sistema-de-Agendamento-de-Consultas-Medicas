from django.db import models
from django.core.exceptions import ValidationError
from datetime import datetime
from pacientes.models import Paciente
from medicos.models import Medico

STATUS_CHOICES = [
    ('agendada', 'Agendada'),
    ('cancelada', 'Cancelada'),
    ('realizada', 'Realizada'),
]

class Consulta(models.Model):

    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        related_name='consultas',
        db_column='id_paciente',
        verbose_name='Paciente'
    )

    medico = models.ForeignKey(
        Medico,
        on_delete=models.CASCADE,
        related_name='consultas',
        db_column='id_medico',
        verbose_name='Médico'
    )

    data = models.DateField(
        db_column='data_consulta',
        verbose_name='Data da consulta'
    )

    hora = models.TimeField(
        db_column='hora_consulta',
        verbose_name='Hora da consulta'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='agendada',
        db_column='status_consulta',
        verbose_name='Status'
    )

    data_criacao = models.DateTimeField(
        auto_now_add=True,
        db_column='data_criacao',
        verbose_name='Data de criação'
    )

    class Meta:
        db_table = 'consulta'
        verbose_name = 'Consulta'
        verbose_name_plural = 'Consultas'
        ordering = ['data', 'hora']
        indexes = [
            models.Index(fields=['medico', 'data', 'hora'], name='idx_consulta_horario'),
        ]
        unique_together = ('medico', 'data', 'hora')

    def clean(self):
        super().clean()

        # Verifica se existe conflito com outra consulta
        conflito = Consulta.objects.filter(
            medico=self.medico,
            data=self.data,
            hora=self.hora
        ).exclude(id=self.id)

        if conflito.exists():
            raise ValidationError('Já existe uma consulta agendada para este médico neste horário.')

        # Verifica se há horário disponível cadastrado para o médico no mesmo dia da semana e horário
        if self.data and self.hora:
            dia_semana = self.data.strftime('%A').lower()  # ex: 'monday' → 'segunda'
            traducoes = {
                'monday': 'segunda',
                'tuesday': 'terca',
                'wednesday': 'quarta',
                'thursday': 'quinta',
                'friday': 'sexta',
                'saturday': 'sabado',
                'sunday': 'domingo'
            }
            dia_traduzido = traducoes.get(dia_semana, dia_semana)

            disponivel = self.medico.horarios_disponiveis.filter(
                dia_semana=dia_traduzido,
                hora_inicio__lte=self.hora,
                hora_fim__gt=self.hora
            )

            if not disponivel.exists():
                raise ValidationError('O médico não possui horário disponível nesse dia e horário.')

    def __str__(self):
        return f'{self.paciente.nome} - {self.data} às {self.hora} com {self.medico.nome}'
