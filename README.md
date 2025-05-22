# Fake News Detection Web Application

A modern web application that uses natural language processing to detect fake news articles. The application analyzes news content and provides a prediction of whether the content is likely to be real or fake, along with a confidence score.

## Features

- Real-time news content analysis
- Modern, responsive UI with Tailwind CSS
- Simple and intuitive user interface
- Confidence score visualization
- Support for both headlines and full articles
- Machine learning-based classification
- Natural Language Processing (NLP) for text analysis

## Technical Stack

- **Backend**: Python Flask
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Machine Learning**: scikit-learn
- **Natural Language Processing**: NLTK
- **Data Processing**: pandas, numpy

## Architecture

The application follows a modular architecture:

1. **Web Interface** (`app/templates/`)
   - User-friendly interface for inputting news content
   - Results display with confidence scores
   - Responsive design for all devices

2. **Backend** (`app/`)
   - Flask application server
   - RESTful API endpoints
   - Request handling and response formatting

3. **Machine Learning Model** (`app/models/`)
   - Text classification model
   - Preprocessing pipeline
   - Prediction logic

4. **Static Assets** (`app/static/`)
   - CSS styles
   - JavaScript functionality
   - UI components

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Fake-News-Detector
```

2. Create and activate a virtual environment:

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

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the application:
```bash
python run.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Enter the news content you want to analyze:
   - Paste the headline or full article text
   - Click "Analyze" to get the prediction
   - View the results and confidence score

4. Deactivate the virtual environment when you're done:
```bash
deactivate
```

## Project Structure

```
Fake News Detection/
├── app/
│   ├── models/
│   │   └── classifier.py      # ML model implementation
│   ├── static/
│   │   ├── css/              # Stylesheets
│   │   └── js/               # JavaScript files
│   ├── templates/            # HTML templates
│   ├── __init__.py          # Application factory
│   └── routes.py            # Route definitions
├── data/
│   ├── True.csv             # Training data for real news
│   └── Fake.csv             # Training data for fake news
├── venv/                    # Virtual environment
├── requirements.txt         # Project dependencies
├── app.py                  # Application entry point
└── README.md              # Project documentation
```

## Dependencies

- Flask 2.0.1 - Web framework
- Werkzeug 2.0.3 - WSGI utilities
- NumPy 1.24.3 - Numerical computing
- Pandas 2.0.3 - Data manipulation
- scikit-learn 1.3.0 - Machine learning
- NLTK 3.6.3 - Natural language processing

## Requirements

- Python 3.10 or higher
- pip (Python package installer)
- Virtual environment (recommended)
- Modern web browser

## Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Note

- Make sure to activate the virtual environment every time you work on the project
- The application uses a pre-trained model for predictions
- Training data is included in the `data/` directory
- For production deployment, ensure proper security measures are in place

## License

[Add your license information here]

## Contact

[Add your contact information here]
