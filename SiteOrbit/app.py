from flask import Flask, render_template
import pymysql.cursors
from controllers import routes
import pymysql
from models.database import db

app = Flask(__name__, template_folder='views')

DB_NAME = 'tccorbit'
app.config['DATABASE_NAME'] = DB_NAME

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root@localhost/{DB_NAME}'


routes.init_app(app)

if __name__ == '__main__':
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            print("O banco de dados está criado!")
        
    except Exception as error:
        print(f"Erro ao criar o banco: {error}")
        
    finally:
        connection.close()
        
    db.init_app(app=app)
    with app.test_request_context():
        db.create_all()
        
    app.run(host='localhost', port=5000, debug=True)