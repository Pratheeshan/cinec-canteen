from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier  # or any model you're using
from flask_cors import CORS
import numpy as np
from collections import Counter
from datetime import datetime, timedelta
from collections import defaultdict

app = Flask(__name__)
CORS(app)  # Enable CORS


X_train = np.random.rand(100, 5)  # 100 samples, 5 features
y_train = np.random.randint(2, size=100)  # Binary target variable

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

def make_predictions(data):
    # Extract item names and their quantities from the data
    all_items = []
    
    for order in data:
        items = order.get("items", [])
        for item in items:
            # Add the item name to the list as many times as its quantity
            all_items.extend([item['name']] * item['quantity'])
    
    # Count the frequency of each item
    item_counter = Counter(all_items)
    
    # Get the most common items
    most_common_items = item_counter.most_common()

    # Prepare the prediction output (item names and their order counts)
    predictions = [{"item": item, "count": count} for item, count in most_common_items]
    
    return predictions

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("Received data:", data)  # Log received data

        # Perform prediction
        predictions = make_predictions(data)
        return jsonify(predictions)
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Error processing data"}), 500


@app.route('/monthly-spent', methods=['POST'])
def calculate_monthly_spending():
    try:
        orders = request.get_json()
        now = datetime.now()
        monthly_spending = defaultdict(float)
        print("Received orders:", orders)

        for order in orders:
            print("Received order:", order)
            # Convert timestamp to datetime
            timestamp_seconds = order['date']['seconds']
            order_date = datetime.fromtimestamp(timestamp_seconds)
            
            month_number = (now.year - order_date.year) * 12 + (now.month - order_date.month)

            if month_number < 4:
                # Convert price to float
                total_order_value = sum(float(item['price']) * item['quantity'] for item in order['items'])
                monthly_spending[month_number] += total_order_value

        # Convert the spending into a list corresponding to the last 4 months
        spending_list = [monthly_spending[i] for i in range(4)]
        return jsonify(spending_list)
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Error processing data"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)