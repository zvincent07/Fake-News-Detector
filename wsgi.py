from app import create_app

application = create_app()
app = application  # Create an alias for gunicorn

if __name__ == "__main__":
    application.run() 