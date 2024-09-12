import pickle

# Load the model
with open('/path/to/destination/your-model.sav', 'rb') as model_file:
    model = pickle.load(model_file)

# Test the model with some input data
test_input = [1, 2, 3, 4]  # Replace with appropriate test input
prediction = model.predict([test_input])
print(f"Prediction: {prediction}")
