from flask import Flask
import pymysql.cursors
from controllers import routes
from models.database import db
import os

app = Flask(__name__, template_folder='views')
app.secret_key = '123'

DB_NAME = 'tccorbit'
app.config['DATABASE_NAME'] = DB_NAME
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root@localhost/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'static', 'uploads')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Cria a pasta de uploads se não existir
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

routes.init_app(app)

if __name__ == '__main__':
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            print("Banco de dados verificado/criado com sucesso!")
    except Exception as error:
        print(f"Erro ao criar o banco: {error}")
    finally:
        connection.close()

    db.init_app(app)

    with app.app_context():
        db.create_all()

    print("\nRotas disponíveis:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule}")

    print("\nPasta de upload:", app.config['UPLOAD_FOLDER'])
    print("Existe?", os.path.exists(app.config['UPLOAD_FOLDER']))
    print("Tem permissão de escrita?", os.access(app.config['UPLOAD_FOLDER'], os.W_OK))

    app.run(host='localhost', port=5000, debug=True)
