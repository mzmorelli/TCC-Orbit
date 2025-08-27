from flask import render_template, redirect, url_for, request, flash, current_app
from datetime import datetime
from models.database import db, Desaparecido
from werkzeug.utils import secure_filename
import os

def init_app(app):

    @app.route('/')
    def home():
        return render_template('index.html')
    
    @app.route('/sobre')
    def sobre():
        return render_template('sobre.html')

    @app.route('/desaparecidos')
    def desaparecidos():
        desaparecidosDados = Desaparecido.query.order_by(Desaparecido.vezVisto.desc()).all()
        return render_template('desaparecidos.html', desaparecidosDados=desaparecidosDados)

    @app.route('/registrar', methods=['GET', 'POST'])
    def registrar():
        if request.method == 'POST':
            try:
                vez_visto_str = request.form.get('vezVisto')
                vez_visto = None
                if vez_visto_str:
                    try:
                        vez_visto = datetime.strptime(vez_visto_str, '%Y-%m-%dT%H:%M')
                    except ValueError:
                        vez_visto = datetime.strptime(vez_visto_str, '%Y-%m-%d %H:%M:%S')

                novo = Desaparecido(
                    nome=request.form.get('nome', '').strip(),
                    idade=int(request.form.get('idade', 0)),
                    sexo=request.form.get('sexo', '').strip(),
                    altura=float(request.form.get('altura', 0)),
                    telefoneContato=request.form.get('telefoneContato', '').strip(),
                    vezVisto=vez_visto,
                    localVisto=request.form.get('localVisto', '').strip(),
                    descricao=request.form.get('descricao', '').strip(),
                    imagem=None,
                )

                if 'imagem' in request.files:
                    file = request.files['imagem']
                    if file and file.filename != '':
                        filename = secure_filename(file.filename)
                        upload_path = current_app.config['UPLOAD_FOLDER']
                        if not os.path.exists(upload_path):
                            os.makedirs(upload_path)
                        file_path = os.path.join(upload_path, filename)
                        file.save(file_path)
                        novo.imagem = filename
                        app_php_path = os.path.join('C:/xampp/htdocs/appTcc/uploads', filename)
                        try:
                                import shutil
                                shutil.copy2(file_path, app_php_path)
                        except Exception as copy_error:
                                 current_app.logger.warning(f"Erro ao copiar imagem para o app: {copy_error}")

                db.session.add(novo)
                db.session.commit()
                flash('Cadastro realizado com sucesso!', 'success')
                return redirect(url_for('desaparecidos'))

            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao cadastrar: {str(e)}', 'danger')
                current_app.logger.error(f"Erro no cadastro: {str(e)}", exc_info=True)

        return render_template('registrar.html')

    @app.route('/detalhe/<int:id>')
    def detalhe(id):
        pessoa = Desaparecido.query.get_or_404(id)
        relacionados = (Desaparecido.query
                    .filter(Desaparecido.id != id)
                    .order_by(Desaparecido.id.desc())
                    .limit(4)
                    .all())
        return render_template('detalhe.html', pessoa=pessoa)
