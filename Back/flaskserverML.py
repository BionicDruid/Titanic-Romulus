from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)


# Use pickle to load in the pre-trained model
with open('finalized_model.sav', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    
    # JSON Request
    data = request.json
    
    # Extract the input data
    input_data = np.array([
        data['passengerID'],
        data['homePlanet'],
        data['cryoSleep'],
        data['cabinFinal'],
        data['destination'],
        data['age'],
        data['vip'],
        data['roomService'],
        data['foodCourt'],
        data['shoppingMall'],
        data['vrDeck']
    ])  
    
    # Make predictions based on the input data
    prediction = loaded_model.predict([input_data])
    
    # Return the prediction as a JSON
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
