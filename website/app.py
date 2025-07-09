from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load ML model and vectorizer once
with open('emotion_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('tfidf_vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/welcome')
def index():
    return render_template('index.html')

@app.route('/relax', methods=['POST'])
def relax():
    user_input = request.form['user_input']
    selected_mood = request.form.get('selected_mood', 'rain')
    vector = vectorizer.transform([user_input])
    predicted_emotion = model.predict(vector)[0]

    return render_template('relax.html',
                           text=user_input,
                           emotion=predicted_emotion,
                           mood=selected_mood)

@app.route('/explore', methods=['GET', 'POST'])
def explore():
    predicted_emotion = None
    user_input = ''
    if request.method == 'POST':
        user_input = request.form.get('user_input', '').strip()
        if user_input:
            vector = vectorizer.transform([user_input])
            predicted_emotion = model.predict(vector)[0]
    
    return render_template('explore.html',
                           detected_emotion=predicted_emotion,
                           user_text=user_input)

if __name__ == '__main__':
    app.run(debug=True)
