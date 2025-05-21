from flask import Flask
from pathlib import Path

def create_app():
    app = Flask(__name__)
    
    # Configure the app
    app.config['SECRET_KEY'] = 'your-secret-key-here'
    
    # Register blueprints
    from app.routes import main
    app.register_blueprint(main)
    
    return app 