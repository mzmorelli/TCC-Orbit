from flask import render_template, redirect, url_for, request
from models.database import Desaparecidos, db


def init_app(app):
    @app.route('/')
    def home():
        return render_template('registrar.html')

    @app.route('/desaparecidos', methods=['GET','POST'])
    def desaparecidos(id=None):
        if id:
            desaparecidos = Desaparecidos.query.get(id)
            db.session.delete(desaparecidos)
            db.session.commit()
            return redirect(url_for('desaparecidos'))
        
        if request.method =='POST':
            newdesaparecido=  Desaparecidos(request.form['nome'], request.form['idade'],
            request.form['sexo'], request.form['altura'],
            request.form['telefoneContato'],
            request.form['vezVisto'],
            request.form['localVisto'],
            request.form['descricao'])
            db.session.add(newdesaparecido)
            db.session.commit()
            return redirect(url_for('desaparecidos'))
            
        
        desaparecidosDados =Desaparecidos.query.all()
        return render_template('desaparecidos.html',
        desaparecidosDados=desaparecidosDados)
        
    @app.route('/registrar')
    def registrar():
        return render_template('registrar.html')
