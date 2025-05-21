from flask import Blueprint, render_template, request, jsonify
from app.models.classifier import NewsClassifier

main = Blueprint('main', __name__)
classifier = NewsClassifier()

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    headline = data.get('headline', '')
    
    if not headline:
        return jsonify({'error': 'No headline provided'}), 400
    
    prediction = classifier.predict(headline)
    return jsonify(prediction) 