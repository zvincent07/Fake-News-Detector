import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import csv

class NewsClassifier:
    def __init__(self):
        self._download_nltk_data()
        self._train_model()
    
    def _download_nltk_data(self):
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
    
    def _preprocess_text(self, text):
        # Convert to lowercase
        text = text.lower()
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Tokenize
        tokens = word_tokenize(text)
        # Remove stopwords
        stop_words = set(stopwords.words('english'))
        tokens = [t for t in tokens if t not in stop_words]
        return ' '.join(tokens)
    
    def _train_model(self):
        # Initialize word frequency dictionaries
        self.true_words = {}
        self.fake_words = {}
        
        # Process true news
        with open('data/True.csv', 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                if len(row) > 1:  # Make sure row has enough columns
                    text = self._preprocess_text(row[1]) 
                    for word in text.split():
                        self.true_words[word] = self.true_words.get(word, 0) + 1
        
        # Process fake news
        with open('data/Fake.csv', 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            next(reader)  # Skip header
            for row in reader:
                if len(row) > 1:  # Make sure row has enough columns
                    text = self._preprocess_text(row[1]) 
                    for word in text.split():
                        self.fake_words[word] = self.fake_words.get(word, 0) + 1
    
    def predict(self, text):
        processed_text = self._preprocess_text(text)
        words = processed_text.split()
        
        # Calculate scores
        true_score = sum(self.true_words.get(word, 0) for word in words)
        fake_score = sum(self.fake_words.get(word, 0) for word in words)
        
        # Make prediction
        prediction = 'Real' if true_score > fake_score else 'Fake'
        confidence = min(abs(true_score - fake_score) / 1000, 1.0)  # Normalize confidence
        
        return {
            'prediction': prediction,
            'confidence': confidence
        } 