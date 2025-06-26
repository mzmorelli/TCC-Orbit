from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Desaparecido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    idade = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String(20), nullable=False)
    altura = db.Column(db.Float)
    telefoneContato = db.Column(db.String(20), nullable=False)
    vezVisto = db.Column(db.DateTime, nullable=False)
    localVisto = db.Column(db.String(500), nullable=False)
    descricao = db.Column(db.Text)
    imagem = db.Column(db.String(255))
    origem = db.Column(db.String(10), default='site')  

    def __init__(self, nome, idade, sexo, telefoneContato, vezVisto, localVisto, 
                 descricao=None, altura=None, imagem=None):
        self.nome = nome
        self.idade = idade
        self.sexo = sexo
        self.altura = altura
        self.telefoneContato = telefoneContato
        self.vezVisto = vezVisto if isinstance(vezVisto, datetime) else datetime.strptime(vezVisto, '%Y-%m-%d %H:%M:%S')
        self.localVisto = localVisto
        self.descricao = descricao
        self.imagem = imagem