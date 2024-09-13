from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)


# Use pickle to load in the pre-trained model
with open('finalized_model.sav', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

@app.route('/getPredict', methods=['GET'])
def getPredict():
    # Obtener parámetros desde la URL
    passengerID = request.args.get('passengerID')
    homePlanet = request.args.get('homePlanet')
    cryoSleep = request.args.get('cryoSleep')
    cabinFinal = request.args.get('cabinFinal')
    destination = request.args.get('destination')
    age = request.args.get('age')
    vip = request.args.get('vip')
    roomService = request.args.get('roomService')
    foodCourt = request.args.get('foodCourt')
    shoppingMall = request.args.get('shoppingMall')
    vrDeck = request.args.get('vrDeck')
    
    # Crear un arreglo con los parámetros recibidos para la predicción
    input_data = np.array([
        passengerID, homePlanet, cryoSleep, cabinFinal, destination,
        age, vip, roomService, foodCourt, shoppingMall, vrDeck
    ], dtype=object)
    
    # Hacer la predicción
    prediction = loaded_model.predict([input_data])
    
    # Convertir la predicción a True/False (por ejemplo, según sea 1 o 0)
    prediction_bool = bool(prediction[0])
    
    # Devolver la predicción como un JSON con True o False
    return jsonify({'prediction': prediction_bool})

@app.route('/predict', methods=['POST'])
def postPredict():
    
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
