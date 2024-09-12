import pickle
import pandas as pd

# Load the model
with open('finalized_model.sav', 'rb') as model_file:
    model = pickle.load(model_file)

    # Test the model with some input data
    test_input = pd.read_csv("test.csv") # Replace with appropriate test
 
prediction = model.predict([test_input])
print(f"Prediction: {prediction}")
