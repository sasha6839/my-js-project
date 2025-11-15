from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game', methods=['GET', 'POST'])
def game():
    # Accept both GET and POST so the form can use POST to hide parameters from URL
    if request.method == 'POST':
        try:
            rows = int(request.form.get('rows', 9))
        except (TypeError, ValueError):
            rows = 9
        try:
            cols = int(request.form.get('cols', 9))
        except (TypeError, ValueError):
            cols = 9
        try:
            mines = int(request.form.get('mines', 10))
        except (TypeError, ValueError):
            mines = 10
    else:
        try:
            rows = int(request.args.get('rows', 9))
        except (TypeError, ValueError):
            rows = 9
        try:
            cols = int(request.args.get('cols', 9))
        except (TypeError, ValueError):
            cols = 9
        try:
            mines = int(request.args.get('mines', 10))
        except (TypeError, ValueError):
            mines = 10

    return render_template('game.html', rows=rows, cols=cols, mines=mines)

if __name__ == '__main__':
    app.run(debug=True)

    