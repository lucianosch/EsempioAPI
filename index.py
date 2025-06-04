from flask import Flask, jsonify,render_template, request
import sqlite3

app = Flask(__name__)

app.secret_key = b'Fr@s3 S3Gr3t#_H2O'

def get_db():
    conn = sqlite3.connect('db/blog.db')
    conn.row_factory = sqlite3.Row  # Permette accesso a colonne come chiavi
    return conn

def check_id(id):
    db = get_db()
    cursor = db.cursor()
    query = "SELECT * FROM users WHERE id=?"
    cursor.execute(query,(id,))
    return cursor.fetchall()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/items', methods=['GET','POST'])
def elencaUtenti():
    db = get_db()

    if request.method == 'POST':
        data = request.json
        #for k in data.keys():
         #   print(k)
        query = "INSERT INTO users(name,eta) values(?,?)"
        db.execute(query,(data.get('name'),data.get('eta')))
        db.commit()
        db.close()
        retval = data
        return f'{retval} aggiunto'

    query = "SELECT * FROM USERS"
    cursor = db.cursor()
    cursor.execute(query)
    righe = cursor.fetchall()

    retval = list()
    for riga in righe:
        elem = {k:v for k,v in zip(riga.keys(),riga)}
        retval.append(elem)
    return jsonify(retval)

@app.route('/items/<int:id>', methods=['GET'])
def elencaUtente(id):
    righe = check_id(id)
    if righe:
        retval = {k:v for k,v in zip(righe[0].keys(),righe[0])}
    else:
        retval = "Utente non trovato"
    return jsonify(retval)

@app.route('/items/<int:id>', methods=['DELETE'])
def cancellaUtente(id):
    righe = check_id(id)
    if righe:
        retval = {k:v for k,v in zip(righe[0].keys(),righe[0])}
        db = get_db()
        query = "DELETE FROM users WHERE id=?"
        cursor = db.cursor()
        cursor.execute(query,(id,))
        db.commit()
        db.close()
    else:
        retval = "Utente non trovato"
    return f'{retval} cancellato'

@app.route('/items/<int:id>', methods=['PUT'])
def aggiornaUtente(id):
    righe = check_id(id)
    if righe:
        data = request.json
        retval = {k:v for k,v in zip(righe[0].keys(),righe[0])}
        query = "UPDATE users set name=?, eta=? WHERE id=?"
        db = get_db()
        db.execute(query,(data.get('name'),data.get('eta'),id))
        db.commit()
        db.close()
    else:
        retval = 'Utente non trovato'
    return f'{retval} aggiornato'

app.run(debug=True)
