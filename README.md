# Fake News Detection Web Application

A modern web application that uses natural language processing to detect fake news articles. The application analyzes news content and provides a prediction of whether the content is likely to be real or fake, along with a confidence score.

## Features

- Real-time news content analysis
- Modern, responsive UI with Tailwind CSS
- Simple and intuitive user interface
- Confidence score visualization
- Support for both headlines and full articles

## Quick Start

1. Create and activate a virtual environment:

For Windows:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate
```

For macOS/Linux:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python run.py
```

4. Deactivate the virtual environment when you're done:
```bash
deactivate
```

## Project Structure

```
Fake News Detection/
├── app/
│   ├── models/
│   │   └── classifier.py
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   ├── templates/
│   ├── __init__.py
│   └── routes.py
├── data/
│   ├── True.csv
│   └── Fake.csv
├── venv/
├── requirements.txt
├── run.py
└── README.md
```

## Requirements

- Python 3.10 or higher
- pip (Python package installer)
- Virtual environment (recommended)

## Note

Make sure to activate the virtual environment every time you work on the project. You'll know the virtual environment is activated when you see `(venv)` at the beginning of your command prompt.