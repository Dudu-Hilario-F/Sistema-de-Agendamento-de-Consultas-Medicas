# 🏥 Sistema de Agendamento de Consultas Médicas

## 📌 Descrição Geral

Este projeto é um **Sistema de Agendamento de Consultas Médicas**, desenvolvido com Django, Docker e MySQL. A aplicação tem como objetivo permitir o gerenciamento completo de pacientes, médicos, horários disponíveis e agendamentos de consultas. O sistema inclui validações de regras de negócio no backend para garantir integridade, evitar conflitos de horários e preparar futuras integrações com notificações por e-mail ou SMS.

---

## 🎯 Objetivos do Projeto

- Cadastro de pacientes e médicos.
- Definição de horários disponíveis por médico.
- Agendamento de consultas com regras de validação.
- Cancelamento e remarcação de consultas.
- Estrutura preparada para envio de notificações futuras.
- Prática com modelagem relacional e regras de negócio reais.

---

## ⚙️ Tecnologias Utilizadas

| Camada         | Tecnologias                                 |
|----------------|---------------------------------------------|
| Backend        | Django 5.x (Python)                         |
| Banco de Dados | MySQL 8                                     |
| Ambiente       | Docker + Docker Compose                     |
| Admin          | Django Admin com personalizações            |
| Testes         | Django TestCase ou Pytest                   |
| Dependências   | pip + requirements.txt                      |

---

## 🧱 Modelagem de Dados

### 📄 1. Paciente

| Campo            | Tipo             | Descrição                                      |
|------------------|------------------|------------------------------------------------|
| `id`             | Integer (PK)     | Identificador único do paciente                |
| `nome`           | CharField        | Nome completo                                  |
| `cpf`            | CharField (único)| CPF com validação de formato e dígitos         |
| `data_nascimento`| DateField        | Data de nascimento                             |
| `email`          | EmailField       | E-mail para contato                            |
| `telefone`       | CharField        | Número de telefone com DDD                     |
| `data_cadastro`  | DateTimeField    | Data de criação do cadastro                    |

---

### 👨‍⚕️ 2. Médico

| Campo           | Tipo              | Descrição                                      |
|-----------------|-------------------|------------------------------------------------|
| `id`            | Integer (PK)      | Identificador único do médico                  |
| `nome`          | CharField         | Nome completo                                  |
| `crm`           | CharField (único) | Registro profissional do médico                |
| `especialidade` | CharField         | Ex: Cardiologia, Dermatologia                  |
| `email`         | EmailField        | E-mail de contato                              |
| `telefone`      | CharField         | Telefone profissional                          |
| `data_cadastro` | DateTimeField     | Data de inserção do cadastro                   |

---

### 🗓️ 3. HorarioDisponivel

| Campo        | Tipo          | Descrição                                          |
|--------------|---------------|----------------------------------------------------|
| `id`         | Integer (PK)  | Identificador único                               |
| `medico`     | ForeignKey    | Referência ao médico                              |
| `dia_semana` | CharField     | Dia da semana (segunda, terça, etc.)              |
| `hora_inicio`| TimeField     | Início do horário de atendimento                  |
| `hora_fim`   | TimeField     | Fim do horário de atendimento                     |

---

### 📆 4. Consulta

| Campo         | Tipo          | Descrição                                          |
|---------------|---------------|----------------------------------------------------|
| `id`          | Integer (PK)  | Identificador único                               |
| `paciente`    | ForeignKey    | Paciente da consulta                              |
| `medico`      | ForeignKey    | Médico responsável                                |
| `data`        | DateField     | Data da consulta                                  |
| `hora`        | TimeField     | Hora da consulta                                  |
| `status`      | CharField     | Ex: agendada, cancelada, realizada                |
| `data_criacao`| DateTimeField | Data de criação da consulta                       |

---

## 🔁 Relacionamentos Entre Entidades

- **Paciente** `1 ─── N` **Consulta**
- **Médico** `1 ─── N` **Consulta**
- **Médico** `1 ─── N` **HorarioDisponivel**

---

## ⚖️ Regras de Negócio (Validações Backend)

### ✅ Regra 1: Impedir conflito de horário para o mesmo médico
- Verificar se já existe uma consulta com o mesmo médico, data e hora antes de criar uma nova.

### ✅ Regra 2: Consulta somente em horário disponível
- Validar se o dia da semana da consulta existe na tabela `HorarioDisponivel` para o médico.
- Validar se o horário da consulta está dentro de `hora_inicio` e `hora_fim`.

### ✅ Regra 3: Impedir agendamento no passado
- Data e hora da consulta devem ser futuras em relação ao horário atual do sistema.

### ✅ Regra 4: Cancelamento e remarcação
- Cancelar apenas mudando o `status`.
- Remarcar reusando o mesmo objeto `Consulta`, com novas validações.

### ✅ Regra 5: Validação de CPF e CRM
- CPF deve ter formato e dígitos verificadores válidos.
- CRM deve seguir o padrão exigido.

---

## 🚀 Extensões Futuras

- Integração com serviços de e-mail (SendGrid, Mailgun).
- Portal do paciente para visualizar consultas.
- Autenticação para médicos e pacientes.
- Dashboard administrativo com métricas.

---

## 👨‍💻 Autor

**Carlos Eduardo**  
Desenvolvedor Backend e estudante de Banco de Dados.  
Este projeto foi criado como base prática para portfólio, aprendizado técnico e futuras oportunidades profissionais.

---

