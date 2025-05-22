from flask import Flask
from app import create_app

# Create the Flask application instance
application = create_app()
app = application  # Create an alias to ensure both names work

if __name__ == '__main__':
    application.run(debug=True) 