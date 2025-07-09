from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

# Load ML model and vectorizer once
with open('emotion_model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('tfidf_vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/')
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

from flask import redirect, url_for

@app.route('/explore', methods=['GET', 'POST'])
def explore():
    if request.method == 'POST':
        user_input = request.form.get('user_input', '').strip()
        selected_emotion = request.form.get('selected_emotion', '').strip()
        # Redirect to empower with query params in URL
        return redirect(url_for('empower', emotion=selected_emotion, text=user_input))
    return render_template('explore.html', detected_emotion=None, user_text='')

@app.route('/empower')
def empower():
    emotion = request.args.get('emotion', 'None')
    text = request.args.get('text', '')
    return render_template('empower.html', emotion=emotion, text=text)


if __name__ == '__main__':
    app.run(debug=True)
