from flask import Flask
from app.routes import main

# Create Flask app directly here
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.register_blueprint(main)

# Create an alias for gunicorn
application = app

if __name__ == "__main__":
    app.run() 