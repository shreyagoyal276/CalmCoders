from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load the trained ML model and vectorizer
with open('emotion_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('tfidf_vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/relax', methods=['POST'])
def relax():
    # Get user input
    user_input = request.form['user_input']
    
    # Get selected mood from hidden input (optional)
    selected_mood = request.form.get('selected_mood', 'rain')  # default = rain

    # Predict emotion using ML model
    vector = vectorizer.transform([user_input])
    predicted_emotion = model.predict(vector)[0]

    # Pass everything to relax.html
    return render_template('relax.html',
                           text=user_input,
                           emotion=predicted_emotion,
                           mood=selected_mood)

if __name__ == '__main__':
    app.run(debug=True)
