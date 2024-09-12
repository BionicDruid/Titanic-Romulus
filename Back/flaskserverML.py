from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open('finalized_model.sav', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json['data']
    prediction = model.predict([input_data])
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
