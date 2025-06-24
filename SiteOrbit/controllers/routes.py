from flask import render_template, redirect, url_for, request, flash, current_app
from datetime import datetime
from models.database import db, Desaparecido
from werkzeug.utils import secure_filename
import os


def init_app(app):
    @app.route('/')
    def home():
        return render_template('index.html')

    @app.route('/desaparecidos', methods=['GET', 'POST'])
    def desaparecidos():
        if 'delete_id' in request.args:
            pessoa = Desaparecido.query.get(request.args['delete_id'])
            if pessoa:
                db.session.delete(pessoa)
                db.session.commit()
                flash('Registro excluído com sucesso!', 'success')
            return redirect(url_for('desaparecidos'))

        if request.method == 'POST':
            try:
                vez_visto_str = request.form.get('vezVisto')
                vez_visto = None
                if vez_visto_str:
                    try:
                        vez_visto = datetime.strptime(
                            vez_visto_str, '%Y-%m-%dT%H:%M')
                    except ValueError:
                        vez_visto = datetime.strptime(
                            vez_visto_str, '%Y-%m-%d %H:%M:%S')

                novo = Desaparecido(
                    nome=request.form.get('nome', '').strip(),
                    idade=int(request.form.get('idade', 0)),
                    sexo=request.form.get('sexo', '').strip(),
                    altura=float(request.form.get('altura', 0)),
                    telefoneContato=request.form.get(
                        'telefoneContato', '').strip(),
                    vezVisto=vez_visto,
                    localVisto=request.form.get('localVisto', '').strip(),
                    descricao=request.form.get('descricao', '').strip()
                )

                db.session.add(novo)
                db.session.commit()
                flash('Cadastro realizado com sucesso!', 'success')
                return redirect(url_for('desaparecidos'))

            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao cadastrar: {str(e)}', 'danger')
                app.logger.error(f"Erro no cadastro: {str(e)}")

        desaparecidosDados = Desaparecido.query.order_by(
            Desaparecido.vezVisto.desc()).all()

        for pessoa in desaparecidosDados:
            if isinstance(pessoa.vezVisto, str):
                try:
                    pessoa.vezVisto = datetime.strptime(
                        pessoa.vezVisto, '%Y-%m-%d %H:%M:%S')
                except ValueError:
                    pass

        return render_template('desaparecidos.html', desaparecidosDados=desaparecidosDados)

    @app.route('/registrar', methods=['GET', 'POST'])
    def registrar():
        if request.method == 'POST':
            try:
                print("Arquivos recebidos:", request.files)
                print("Dados do formulário:", request.form)
            
                vez_visto_str = request.form.get('vezVisto')
                vez_visto = None
                if vez_visto_str:
                    try:
                        vez_visto = datetime.strptime(vez_visto_str, '%Y-%m-%dT%H:%M')
                    except ValueError:
                        vez_visto = datetime.strptime(vez_visto_str, '%Y-%m-%d %H:%M:%S')

                novo_desaparecido = Desaparecido(
                    nome=request.form.get('nome', '').strip(),
                    idade=int(request.form.get('idade', 0)),
                    sexo=request.form.get('sexo', '').strip(),
                    altura=float(request.form.get('altura', 0)),
                    telefoneContato=request.form.get('telefoneContato', '').strip(),
                    vezVisto=vez_visto,
                    localVisto=request.form.get('localVisto', '').strip(),
                    descricao=request.form.get('descricao', '').strip(),
                    imagem=None
                )

            # Processar upload da imagem
                if 'imagem' in request.files:
                    file = request.files['imagem']
                    print(f"Arquivo recebido: {file.filename} | Tamanho: {len(file.read())} bytes")  # Debug
                    file.seek(0)
                    if file and file.filename != '':
                    # Verificar se a pasta de upload existe
                        upload_folder = current_app.config['UPLOAD_FOLDER']
                        if not os.path.exists(upload_folder):
                            os.makedirs(upload_folder)
                            print(f"Pasta {upload_folder} criada com sucesso!")

                        filename = secure_filename(file.filename)
                        filepath = os.path.join(upload_folder, filename)
                    
                        print(f"Tentando salvar arquivo em: {filepath}")
                        file.save(filepath)
                        print("Arquivo salvo com sucesso!")
                    
                        novo_desaparecido.imagem = filename

                db.session.add(novo_desaparecido)
                db.session.commit()

                flash('Cadastro realizado com sucesso!', 'success')
                return redirect(url_for('desaparecidos'))

            except Exception as e:
                db.session.rollback()
                flash(f'Erro ao cadastrar: {str(e)}', 'danger')
                current_app.logger.error(f"Erro no cadastro: {str(e)}", exc_info=True)
                print(f"Erro detalhado: {str(e)}")

        return render_template('registrar.html')

    @app.route('/detalhe/<int:id>')
    def detalhe(id):
        pessoa = Desaparecido.query.get_or_404(id)
        return render_template('detalhe.html', pessoa=pessoa)
