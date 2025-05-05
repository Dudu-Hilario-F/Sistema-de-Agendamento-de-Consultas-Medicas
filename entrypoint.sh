echo "Esperando o banco de dados iniciar..."
while ! nc -z db 3306; do
  sleep 1
done
echo "Banco de dados pronto!"

# Executa as migrações e inicia o servidor
python manage.py migrate
python manage.py runserver 0.0.0.0:8000