import sys
import json
import pandas as pd
import joblib

model = joblib.load('patient_appointment_model.pkl')

df_train = pd.read_csv('appointments.csv')

df_train = pd.get_dummies(df_train, columns=['department'], drop_first=True)

expected_features = df_train.filter(like="department_").columns.tolist()

try:
    input_json = sys.argv[1]  
    patient_data = json.loads(input_json)

    # Extract the 'features' array from input JSON
    patient_features = patient_data.get("features", [])

    # Ensure we have at least one valid input
    if not patient_features:
        raise ValueError("❌ No patient data received!")

    # Convert input to DataFrame
    new_patient_df = pd.DataFrame(patient_features)

    # 6️⃣ Ensure all expected department features exist in new data
    for col in expected_features:
        if col not in new_patient_df.columns:
            new_patient_df[col] = 0  # Add missing department with 0

    # 7️⃣ Reorder columns to match training data
    new_patient_df = new_patient_df[expected_features]

    # 8️⃣ Make prediction
    predicted_duration = model.predict(new_patient_df)
    # 9️⃣ Print the result (This sends output back to Node.js)
    print(predicted_duration[0])

except Exception as e:
    print(f"❌ Error: {str(e)}")
    sys.exit(1)  # Exit with error status
