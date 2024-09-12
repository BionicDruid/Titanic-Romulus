import pickle

# Load the model from the .sav file
with open('/path/to/destination/your-model.sav', 'rb') as model_file:
    model = pickle.load(model_file)

# Use the model to make predictions
def predict(input_data):
    result = model.predict([input_data])
    return result
