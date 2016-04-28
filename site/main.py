from flask import Flask, render_template
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/react-example')
def routes(page):
    return render_template('react-example.html')

if __name__ == '__main__':
    app.run()
