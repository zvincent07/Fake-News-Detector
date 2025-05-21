async function analyzeHeadline() {
    const headline = document.getElementById('headline').value;
    const resultDiv = document.getElementById('result');
    const predictionP = document.getElementById('prediction');
    const confidenceP = document.getElementById('confidence');
    const confidenceBar = document.getElementById('confidence-bar');
    const button = document.querySelector('button');

    if (!headline.trim()) {
        predictionP.textContent = "Please enter some content to analyze.";
        confidenceP.textContent = "";
        resultDiv.classList.remove('hidden');
        resultDiv.querySelector('div').className = 'p-6 rounded-xl border-2 border-yellow-200 bg-yellow-50';
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
            resultDiv.querySelector('div').className = 'p-6 rounded-xl border-2 border-red-200 bg-red-50';
        } else {
            predictionP.textContent = `Prediction: ${data.prediction}`;
            const confidencePercent = (data.confidence * 100).toFixed(2);
            confidenceP.textContent = `Confidence: ${confidencePercent}%`;
            
            // Update confidence bar
            confidenceBar.style.width = `${confidencePercent}%`;
            confidenceBar.className = `h-2.5 rounded-full transition-all duration-500 ${
                data.prediction === 'Real' ? 'bg-green-500' : 'bg-red-500'
            }`;
            
            // Update result container style
            resultDiv.querySelector('div').className = `p-6 rounded-xl border-2 ${
                data.prediction === 'Real' 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
            }`;
        }
    } catch (error) {
        predictionP.textContent = "An error occurred. Please try again.";
        confidenceP.textContent = "";
        resultDiv.querySelector('div').className = 'p-6 rounded-xl border-2 border-red-200 bg-red-50';
    } finally {
        resultDiv.classList.remove('hidden');
        button.classList.remove('loading');
        button.textContent = 'Analyze Content';
    }
} 