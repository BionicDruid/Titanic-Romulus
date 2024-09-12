
import pandas as pd
df = pd.read_csv("train.csv")

# Function to impute mean or median based on skewness
def impute_with_mean_or_median(column):
    skewness = df[column].skew()
    if abs(skewness) > 1:
        median = df[column].median()
        return df[column].fillna(median)
    media = round(df[column].mean())
    return df[column].fillna(media)

# Function to impute mode based on the most frequent value
def mode_impute(column):
    moda_val = df[column].mode()[0]
    return df[column].fillna(moda_val)

# Binarize the booleans
df['CryoSleep'] = df['CryoSleep'].replace({False: 0, True: 1})
df['VIP'] = df['VIP'].replace({False: 0, True: 1})
df['Transported'] = df['Transported'].replace({False: 0, True: 1})

# I: Create new columns
# Passenger Id: Divide into group and passenger number
df[['GroupNum', 'PassNum']] = df['PassengerId'].str.split('_', expand=True)
df['GroupNum'] = pd.to_numeric(df['GroupNum'], errors='coerce')
df['PassNum'] = pd.to_numeric(df['PassNum'], errors='coerce')
df.drop(columns=["PassengerId"], inplace=True)
# TotalSpent: Total spent on amenities
df['TotalSpent'] = df[["RoomService", "FoodCourt", "ShoppingMall", "Spa", "VRDeck"]].sum(axis=1)
# Cabin column: Divide in three: Deck, CabinNumber, CabinSide
df[['Deck', 'CabinNumber', 'CabinSide']] = df['Cabin'].str.split('/', expand=True)
df.drop(columns=["Cabin"], inplace=True)

# II: Label encoding for categorical data
df['HomePlanet'] = df['HomePlanet'].replace({'Earth': 0, 'Mars': 1, 'Europa': 2})
df['Destination'] = df['Destination'].replace({'TRAPPIST-1e': 0, '55 Cancri e': 1, 'PSO J318.5-22': 2})
df['Deck'] = df['Deck'].replace({'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'T': 7})
df['CabinSide'] = df['CabinSide'].replace({'P': 0, 'S': 1})

# III: Special cases for missing categorical values
# **Deck: (6 if HomePlanet == 0 and Deck is null)
df.loc[(df['HomePlanet'] == 0) & (df['Deck'].isnull()), 'Deck'] = 6 # Deck 6 is for passengers from Earth
# **CryoSleep: (0 if TotalSpent != 0)
df.loc[(df['TotalSpent'] > 0) & (df['CryoSleep'].isnull()), 'CryoSleep'] = 0 # If a passenger has spent money, then they did not use Cryosleep
# **VIP: If CryoSleep is 1 then 0, else impute mode
df.loc[(df['CryoSleep'] == 1) & (df['VIP'].isnull()), 'VIP'] = 0 # If a passenger is in Cryosleep, then they're not VIP

# IV: Impute categorical data with mode
df['HomePlanet'] = mode_impute('HomePlanet')
df['Destination'] = mode_impute('Destination')
df['Deck'] = mode_impute('Deck')
df['CabinSide'] = mode_impute('CabinSide')
df['CryoSleep'] = mode_impute('CryoSleep')
df['VIP'] = mode_impute('VIP')

# V: Create interaction columns
# HomePlanet-Destination: Bin the HomePlanet and Destination columns
df['HomePlanet_Destination_Interaction'] = df['HomePlanet'] * df['Destination']
# Deck-CabinSide: Bin the Deck and CabinSide columns


# VI: Special cases for missing numerical values
# **Amennities: (0 if CryoSleep == 1)
amenities = ["RoomService", "FoodCourt", "ShoppingMall", "Spa", "VRDeck"]
for amenity in amenities:
    df.loc[(df['CryoSleep'] == 1) & (df[amenity].isnull()), amenity] = 0 # If a passenger is in Cryosleep, then they did not use any amenities
# **Age: (6 if TotalSpent == 0)
df.loc[(df['TotalSpent'] == 0) & (df['Age'].isnull()), 'Age'] = 6 # If a passenger has not spent any money, then they're likely a child. 6 is the mean age of non-spdender children

# VII: Impute numerical data with mean or median
df['RoomService'] = impute_with_mean_or_median('RoomService')
df['FoodCourt'] = impute_with_mean_or_median('FoodCourt')
df['ShoppingMall'] = impute_with_mean_or_median('ShoppingMall')
df['Spa'] = impute_with_mean_or_median('Spa')
df['VRDeck'] = impute_with_mean_or_median('VRDeck')
df['CabinNumber'] = pd.to_numeric(df['CabinNumber'], errors='coerce') # Convert CabinNumber to numeric
df['CabinNumber'] = impute_with_mean_or_median('CabinNumber')
df['Age'] = impute_with_mean_or_median('Age')

# VIII: Drop unnecessary columns
df.drop(columns=["Name"], inplace=True)

# IX: Standarize the data
X = df.drop(columns=['Transported'])
y = df['Transported']
means = X.mean()
std_devs = X.std()
X_standardized = (X - means) / std_devs
df = pd.concat([X_standardized, y], axis=1)

# Ensure all columns are numeric
df = df.apply(pd.to_numeric, errors='coerce')

# Save cleaned dataset as csv | Optional
df.to_csv('clean.csv', index=False)

# Model training
from sklearn.model_selection import train_test_split
# Split dataset into train and test sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=13)


# Import models for Random Forest, Logistic Regression, and XGBoost
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier
from sklearn.svm import SVC

# Base models
cb = CatBoostClassifier(random_state=13, verbose=0)
svm = SVC(random_state=13)
lgbm = LGBMClassifier(random_state=13, force_row_wise=True, verbose = -1)

# %%
# Evaluate base models
models = [cb, svm, lgbm]
model_names = ['CatBoost', 'SVM', 'LightGBM']
for model, name in zip(models, model_names):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    print(f'{name}:\nAccuracy: {accuracy}\nPrecision: {precision}\nRecall: {recall}\nF1 Score: {f1}\n')


# Hyperparameter tuning for CatBoost
param_grid = {
    'depth': [6, 8, 10],
    'learning_rate': [0.01, 0.05, 0.1],
    'l2_leaf_reg': [1, 3, 6, 9]
}
cb_grid = GridSearchCV(cb, param_grid, cv=5, n_jobs=-1, verbose=0)
cb_grid.fit(X_train, y_train)
print(cb_grid.best_params_)

# SVM hyperparameter tuning
param_grid = {
    'C': [0.1, 1, 10],
    'gamma': [0.1, 0.01, 0.001],
    'kernel': ['rbf', 'sigmoid']
}
svm_grid = GridSearchCV(svm, param_grid, cv=5, n_jobs=-1, verbose=0)
svm_grid.fit(X_train, y_train)
print(svm_grid.best_params_)

# Light GBM
lgbm_params = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 3, 6, 9],
    'learning_rate': [0.01, 0.1, 0.3],
    'subsample': [0.5, 0.7, 1],
    'colsample_bytree': [0.5, 0.7, 1],
    'force_row_wise': [True, False]
}
lgbm_grid = GridSearchCV(lgbm, lgbm_params, cv=5, n_jobs=-1)
lgbm_grid.fit(X_train, y_train)
print(lgbm_grid.best_params_)

# Predict with best parameters for CatBoost
cb_best = CatBoostClassifier(random_state=13, verbose=0, **cb_grid.best_params_)
cb_best.fit(X_train, y_train)
y_pred = cb_best.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f'CatBoost:\nAccuracy: {accuracy}\nPrecision: {precision}\nRecall: {recall}\nF1 Score: {f1}\n')

# Predict with best parameters for SVM
svm_best = SVC(random_state=13, **svm_grid.best_params_)
svm_best.fit(X_train, y_train)
y_pred = svm_best.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f'SVM:\nAccuracy: {accuracy}\nPrecision: {precision}\nRecall: {recall}\nF1 Score: {f1}\n')

# Predict with best parameters for Light GBM
lgbm_best = lgbm_grid.best_estimator_
lgbm_best.fit(X_train, y_train)
y_pred = lgbm_best.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
print(f'Light GBM:\nAccuracy: {accuracy}\nPrecision: {precision}\nRecall: {recall}\nF1 Score: {f1}\n')


# # Test Set
# Predict the test set with 100% of the data and save it as a csv
df = pd.read_csv("test.csv")
cb_best.fit(X, y)

# Repeat the same data cleaning steps for the test set

# Function to impute mean or median based on skewness
def impute_with_mean_or_median(column):
    skewness = df[column].skew()

    if abs(skewness) > 1:
        mediana = df[column].median()
        return df[column].fillna(mediana)
    
    media = round(df[column].mean())
    return df[column].fillna(media)

# Function to impute mode based on the most frequent value
def mode_impute(column):
    moda_val = df[column].mode()[0]
    return df[column].fillna(moda_val)

# Binarize the booleans
df['CryoSleep'] = df['CryoSleep'].replace({False: 0, True: 1})
df['VIP'] = df['VIP'].replace({False: 0, True: 1})
#df['Transported'] = df['Transported'].replace({False: 0, True: 1})

# I: Create new columns
# Passenger Id: Divide into group and passenger number
df[['GroupNum', 'PassNum']] = df['PassengerId'].str.split('_', expand=True)
df['GroupNum'] = pd.to_numeric(df['GroupNum'], errors='coerce')
df['PassNum'] = pd.to_numeric(df['PassNum'], errors='coerce')
df.drop(columns=["PassengerId"], inplace=True)
# TotalSpent: Total spent on amenities
df['TotalSpent'] = df[["RoomService", "FoodCourt", "ShoppingMall", "Spa", "VRDeck"]].sum(axis=1)
# Cabin column: Divide in three: Deck, CabinNumber, CabinSide
df[['Deck', 'CabinNumber', 'CabinSide']] = df['Cabin'].str.split('/', expand=True)
df.drop(columns=["Cabin"], inplace=True)

# II: Label encoding for categorical data
df['HomePlanet'] = df['HomePlanet'].replace({'Earth': 0, 'Mars': 1, 'Europa': 2})
df['Destination'] = df['Destination'].replace({'TRAPPIST-1e': 0, '55 Cancri e': 1, 'PSO J318.5-22': 2})
df['Deck'] = df['Deck'].replace({'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'T': 7})
df['CabinSide'] = df['CabinSide'].replace({'P': 0, 'S': 1})

# III: Special cases for missing categorical values
# **Deck: (6 if HomePlanet == 0 and Deck is null)
df.loc[(df['HomePlanet'] == 0) & (df['Deck'].isnull()), 'Deck'] = 6 # Deck 6 is for passengers from Earth
# **CryoSleep: (0 if TotalSpent != 0)
df.loc[(df['TotalSpent'] > 0) & (df['CryoSleep'].isnull()), 'CryoSleep'] = 0 # If a passenger has spent money, then they did not use Cryosleep
# **VIP: If CryoSleep is 1 then 0, else impute mode
df.loc[(df['CryoSleep'] == 1) & (df['VIP'].isnull()), 'VIP'] = 0 # If a passenger is in Cryosleep, then they're not VIP

# IV: Impute categorical data with mode
df['HomePlanet'] = mode_impute('HomePlanet')
df['Destination'] = mode_impute('Destination')
df['Deck'] = mode_impute('Deck')
df['CabinSide'] = mode_impute('CabinSide')
df['CryoSleep'] = mode_impute('CryoSleep')
df['VIP'] = mode_impute('VIP')

# V: Create interaction columns
# HomePlanet-Destination: Bin the HomePlanet and Destination columns
df['HomePlanet_Destination_Interaction'] = df['HomePlanet'] * df['Destination']
# Deck-Cabin

# VI: Special cases for missing numerical values
# **Amennities: (0 if CryoSleep == 1)
amenities = ["RoomService", "FoodCourt", "ShoppingMall", "Spa", "VRDeck"]
for amenity in amenities:
    df.loc[(df['CryoSleep'] == 1) & (df[amenity].isnull()), amenity] = 0 # If a passenger is in Cryosleep, then they did not use any amenities
# **Age: (6 if TotalSpent == 0)
df.loc[(df['TotalSpent'] == 0) & (df['Age'].isnull()), 'Age'] = 6 # If a passenger has not spent any money, then they're likely a child. 6 is the mean age of non-spdender children

# VII: Impute numerical data with mean or median
df['RoomService'] = impute_with_mean_or_median('RoomService')
df['FoodCourt'] = impute_with_mean_or_median('FoodCourt')
df['ShoppingMall'] = impute_with_mean_or_median('ShoppingMall')
df['Spa'] = impute_with_mean_or_median('Spa')
df['VRDeck'] = impute_with_mean_or_median('VRDeck')
df['CabinNumber'] = pd.to_numeric(df['CabinNumber'], errors='coerce') # Convert CabinNumber to numeric
df['CabinNumber'] = impute_with_mean_or_median('CabinNumber')
df['Age'] = impute_with_mean_or_median('Age')

# VIII: Drop unnecessary columns
df.drop(columns=["Name"], inplace=True)

# IX: Standarize the data
# The dataset is standardized
df_standardized = (df - df.mean()) / df.std()

# Ensure all columns are numeric
df = df.apply(pd.to_numeric, errors='coerce')

# Save cleaned dataset as csv | Optional
df.to_csv('clean.csv', index=False)

# Model training and csv submission (Create Transported column and predict using the best model)|
y_pred = cb_best.predict(df)
#y_pred = svm_best.predict(df)
#y_pred = lgbm_best.predict(df)

# Generate submission csv with PassengerId (once removed for data cleaning) and Transported columns only
submission = pd.read_csv("test.csv")
submission['Transported'] = y_pred
submission = submission[['PassengerId', 'Transported']]
# Transform boolean values to strings
submission['Transported'] = submission['Transported'].replace({0: 'False', 1: 'True'})
submission.to_csv('submission.csv', index=False)

#Store model using pickle
import pickle
filename = 'finalized_model.sav'
pickle.dump(cb_best, open(filename, 'wb'))

#Load the model from disk (Pickle)
loaded_model = pickle.load(open(filename, 'rb'))
result = loaded_model.score(X_test, y_test)
print(result)


