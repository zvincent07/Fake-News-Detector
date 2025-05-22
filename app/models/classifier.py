import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import os

class NewsClassifier:
    def __init__(self):
        self.pipeline = None
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
        # Load data in chunks
        true_path = os.path.join('data', 'True.csv')
        fake_path = os.path.join('data', 'Fake.csv')
        
        # Initialize empty lists to store processed data
        processed_texts = []
        labels = []
        
        # Process true news in chunks
        for chunk in pd.read_csv(true_path, chunksize=1000):
            text_col = 'title' if 'title' in chunk.columns else 'text'
            chunk[text_col] = chunk[text_col].astype(str).apply(self._preprocess_text)
            processed_texts.extend(chunk[text_col].tolist())
            labels.extend([1] * len(chunk))
        
        # Process fake news in chunks
        for chunk in pd.read_csv(fake_path, chunksize=1000):
            text_col = 'title' if 'title' in chunk.columns else 'text'
            chunk[text_col] = chunk[text_col].astype(str).apply(self._preprocess_text)
            processed_texts.extend(chunk[text_col].tolist())
            labels.extend([0] * len(chunk))
        
        # Build pipeline
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=5000)),
            ('nb', MultinomialNB())
        ])
        
        # Fit the model
        self.pipeline.fit(processed_texts, labels)
    
    def predict(self, text):
        processed_text = self._preprocess_text(text)
        pred = self.pipeline.predict([processed_text])[0]
        prob = self.pipeline.predict_proba([processed_text])[0]
        return {
            'prediction': 'Real' if pred == 1 else 'Fake',
            'confidence': float(max(prob))
        } 