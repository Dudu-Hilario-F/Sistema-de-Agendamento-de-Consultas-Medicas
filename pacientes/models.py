from django.db import models
from django.core.validators import RegexValidator
from django.utils.timezone import now

class Paciente(models.Model):

    nome = models.CharField(
        max_length=255,
        verbose_name='Nome completo',
        db_column='nome',
        help_text='Nome completo do paciente'
    )

    cpf = models.CharField(
        max_length=14,  # formato: 000.000.000-00
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{3}\.\d{3}\.\d{3}-\d{2}$',
                message='O CPF deve estar no formato 000.000.000-00'
            )
        ],
        verbose_name='CPF',
        db_column='cpf',
        help_text='CPF com validação de formato e dígitos'
    )

    data_nascimento = models.DateField(
        verbose_name='Data de nascimento',
        db_column='data_nascimento'
    )

    email = models.EmailField(
        verbose_name='E-mail',
        db_column='email',
        unique=True,
        help_text='E-mail para contato',
        error_messages={
            'unique': 'Já existe um paciente com este e-mail.'
        }
    )

    telefone = models.CharField(
        max_length=15,
        verbose_name='Telefone com DDD',
        db_column='telefone',
        help_text='Número de telefone com DDD',
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
        help_text='Data de criação do cadastro'
    )

    class Meta:
        db_table = 'paciente'
        verbose_name = 'Paciente'
        verbose_name_plural = 'Pacientes'
        ordering = ['nome']
        indexes = [
            models.Index(fields=['cpf'], name='idx_cpf'),
            models.Index(fields=['email'], name='idx_email'),
        ]

    def __str__(self):
        return self.nome
