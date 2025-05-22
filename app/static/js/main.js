// Theme toggle functionality
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const button = document.getElementById('analyzeBtn');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
            // Save theme preference
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});

// Analyze button logic
async function analyzeHeadline() {
    const headline = document.getElementById('headline').value;
    const resultDiv = document.getElementById('result');
    const resultBox = document.getElementById('resultBox');
    const predictionP = document.getElementById('prediction');
    const confidenceP = document.getElementById('confidence');
    const confidenceBar = document.getElementById('confidence-bar');
    const resultTitle = document.getElementById('resultTitle');
    const button = document.getElementById('analyzeBtn');

    if (!headline.trim()) {
        predictionP.textContent = "Please enter some content to analyze.";
        confidenceP.textContent = "";
        resultBox.className = 'p-6 rounded-xl border-2 transition-all duration-300 bg-yellow-50 border-yellow-200 dark:bg-yellow-900 dark:border-yellow-600';
        predictionP.className = 'text-2xl font-bold text-yellow-700 dark:text-yellow-200';
        confidenceBar.style.width = '0%';
        confidenceBar.className = 'h-2.5 rounded-full transition-all duration-500 bg-yellow-500';
        resultTitle.className = 'text-xl font-semibold mb-4 flex items-center text-yellow-700 dark:text-yellow-200';
        resultDiv.classList.remove('hidden');
        return;
    }

    // Add loading state
    button.classList.add('loading');
    button.textContent = 'Analyzing...';

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ headline })
        });

        const data = await response.json();

        if (data.error) {
            predictionP.textContent = data.error;
            confidenceP.textContent = "";
            resultBox.className = 'p-6 rounded-xl border-2 transition-all duration-300 bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-600';
            predictionP.className = 'text-2xl font-bold text-red-700 dark:text-red-200';
            confidenceBar.style.width = '0%';
            confidenceBar.className = 'h-2.5 rounded-full transition-all duration-500 bg-red-500';
            resultTitle.className = 'text-xl font-semibold mb-4 flex items-center text-red-700 dark:text-red-200';
        } else {
            const isReal = data.prediction === 'Real';
            predictionP.textContent = `Prediction: ${data.prediction}`;
            const confidencePercent = (data.confidence * 100).toFixed(2);
            confidenceP.textContent = `Confidence: ${confidencePercent}%`;
            confidenceBar.style.width = `${confidencePercent}%`;

            if (isReal) {
                resultBox.className = 'p-6 rounded-xl border-2 transition-all duration-300 bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-600';
                predictionP.className = 'text-2xl font-bold text-green-700 dark:text-green-200';
                confidenceBar.className = 'h-2.5 rounded-full transition-all duration-500 bg-green-500';
                resultTitle.className = 'text-xl font-semibold mb-4 flex items-center text-green-700 dark:text-green-200';
            } else {
                resultBox.className = 'p-6 rounded-xl border-2 transition-all duration-300 bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-600';
                predictionP.className = 'text-2xl font-bold text-red-700 dark:text-red-200';
                confidenceBar.className = 'h-2.5 rounded-full transition-all duration-500 bg-red-500';
                resultTitle.className = 'text-xl font-semibold mb-4 flex items-center text-red-700 dark:text-red-200';
            }
            confidenceP.className = 'text-sm text-gray-600 dark:text-gray-200';
        }
        resultDiv.classList.remove('hidden');
    } catch (error) {
        predictionP.textContent = "An error occurred. Please try again.";
        confidenceP.textContent = "";
        resultBox.className = 'p-6 rounded-xl border-2 transition-all duration-300 bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-600';
        predictionP.className = 'text-2xl font-bold text-red-700 dark:text-red-200';
        confidenceBar.style.width = '0%';
        confidenceBar.className = 'h-2.5 rounded-full transition-all duration-500 bg-red-500';
        resultTitle.className = 'text-xl font-semibold mb-4 flex items-center text-red-700 dark:text-red-200';
        resultDiv.classList.remove('hidden');
    } finally {
        button.classList.remove('loading');
        button.textContent = 'Analyze Content';
    }
} 