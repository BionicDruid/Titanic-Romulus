from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the trained model
with open('finalized_model.sav', 'rb') as file:
    model = pickle.load(file)

def input_to_df(input_json):
    # Convert JSON to DataFrame
    df = pd.DataFrame([input_json])
    return df

def process_df(df):
    # Binarize the booleans
    df['CryoSleep'] = df['CryoSleep'].replace({False: 0, True: 1})
    df['VIP'] = df['VIP'].replace({False: 0, True: 1})

    # Create new columns
    df[['GroupNum', 'PassNum']] = df['PassengerId'].str.split('_', expand=True)
    df['GroupNum'] = pd.to_numeric(df['GroupNum'], errors='coerce')
    df['PassNum'] = pd.to_numeric(df['PassNum'], errors='coerce')
    df.drop(columns=["PassengerId"], inplace=True)
    
    df['TotalSpent'] = df[["RoomService", "FoodCourt", "ShoppingMall", "Spa", "VRDeck"]].sum(axis=1)
    
    # Split Cabin into components
    df[['Deck', 'CabinNumber', 'CabinSide']] = df['Cabin'].str.split('/', expand=True)
    df['CabinNumber'] = pd.to_numeric(df['CabinNumber'], errors='coerce')  # Ensure CabinNumber is numeric
    df.drop(columns=["Cabin"], inplace=True)

    # Label encoding for categorical data
    df['HomePlanet'] = df['HomePlanet'].replace({'Earth': 0, 'Mars': 1, 'Europa': 2})
    df['Destination'] = df['Destination'].replace({'TRAPPIST-1e': 0, '55 Cancri e': 1, 'PSO J318.5-22': 2})
    df['Deck'] = df['Deck'].replace({'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'T': 7})
    df['CabinSide'] = df['CabinSide'].replace({'P': 0, 'S': 1})

    # Handle special cases for missing values (if any were theoretically provided)
    df.loc[(df['HomePlanet'] == 0) & (df['Deck'].isnull()), 'Deck'] = 6
    df.loc[(df['TotalSpent'] > 0) & (df['CryoSleep'].isnull()), 'CryoSleep'] = 0
    df.loc[(df['CryoSleep'] == 1) & (df['VIP'].isnull()), 'VIP'] = 0

    # Create interaction columns
    df['HomePlanet_Destination_Interaction'] = df['HomePlanet'] * df['Destination']
    
    # Drop unnecessary columns
    df.drop(columns=["Name"], inplace=True)

    # DEBUG: Print the DataFrame
    print("7 DEBUG:", df)

    # Ensure all columns are numeric
    df = df.apply(pd.to_numeric, errors='coerce')

    # Save the processed data for debugging
    df.to_csv("DEBUGGING.csv", index=False)

    return df

def predict(df):
    # Make predictions
    prediction = model.predict(df)

    return prediction

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from request
    input_json = request.json
    
    # Print the input JSON data for debugging
    print("Received JSON data:", input_json)

    # Process the input data
    input_as_df = input_to_df(input_json)

    # Print the processed data for debugging
    print("Json To DataFrame:", input_as_df)

    # Process the data
    processed_data = process_df(input_as_df)

    # Print the processed data for debugging
    print("Processed Data:", processed_data)
    
    # Make predictions
    prediction = model.predict(processed_data)

    # Return the prediction as JSON
    return jsonify({'prediction': str(prediction)})

# Define a route for testing
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'API is working!'})

# Run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
