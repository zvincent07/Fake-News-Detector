from flask import Flask
from app.routes import main
import os

# Create the Flask application
flask_app = Flask(__name__)
flask_app.config['SECRET_KEY'] = 'your-secret-key-here'
flask_app.register_blueprint(main)

# Create aliases for different WSGI servers
app = flask_app
application = flask_app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    flask_app.run(host='0.0.0.0', port=port, debug=True) 