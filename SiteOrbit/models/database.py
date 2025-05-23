from flask_sqlalchemy import SQLAlchemy

# carregando o SQLAlchemy na váriavel DB
db = SQLAlchemy()

# criando o model (classe)
class Desaparecidos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150))
    idade = db.Column(db.Integer)
    sexo = db.Column(db.String(150))
    altura = db.Column(db.Float)
    telefoneContato = db.Column(db.Float)
    vezVisto = db.Column(db.Date)
    localVisto =db.Column(db.String(500))
    descricao=db.Column(db.String(500))
    
    # metodo construtor da classe
    def __init__(self, nome, idade, sexo, altura, telefoneContato, vezVisto, localVisto, descricao):
        self.nome= nome
        self.idade=idade
        self.sexo=sexo
        self.altura=altura
        self.telefoneContato=telefoneContato
        self.vezVisto=vezVisto
        self.localVisto=localVisto
        self.descricao=descricao