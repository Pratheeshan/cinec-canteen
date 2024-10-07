from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier  # or any model you're using
from flask_cors import CORS
import numpy as np
from collections import Counter
from datetime import datetime, timedelta
from collections import defaultdict
import joblib  # For saving and loading models
from statsmodels.tsa.arima.model import ARIMA  # ARIMA for time series forecasting

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
        print("/monthly spent")
        orders = request.get_json()
        now = datetime.now()
        monthly_spending = defaultdict(float)
        print("Received orders:", orders)

        for order in orders:
            print("Received order:", order)
            # Convert timestamp to datetime
            timestamp_seconds = order['date']['seconds']
            print("timestamp_seconds:", timestamp_seconds)

            order_date = datetime.fromtimestamp(timestamp_seconds)
            print("order_date:", order_date)

            # Extract the month number
            month_number = order_date.month
            year_number = order_date.year
            print("Month number:", month_number)

            # Calculate order value
            total_order_value = sum(float(item['price']) * item['quantity'] for item in order['items'])
            print("total_order_value:", total_order_value)

            # Add spending to the appropriate month (adjusted for indexing)
            # Use (month_number - 1) for zero-indexed lists
            monthly_spending[(year_number, month_number)] += total_order_value

        print("monthly_spending dict:", monthly_spending)

        # Now, organize the spending into a list corresponding to months (0: Jan, 11: Dec)
        spending_list = [0] * 12
        for (year, month), amount in monthly_spending.items():
            spending_list[month - 1] += amount  # -1 to convert 1-indexed month to 0-indexed

        print("spending_list array:", spending_list)
        return jsonify(spending_list)
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Error processing data"}), 500


@app.route('/weekly-spent', methods=['POST'])
def calculate_weekly_spending():
    try:
        orders = request.get_json()  # Get the orders data from the POST request
        now = datetime.now()
        weekly_spending = defaultdict(float)  # Create a dictionary for spending per day

        print("Received orders:", orders)  # Log the orders for debugging

        # Start of the current week (Monday)
        start_of_week = now - timedelta(days=now.weekday())  
        # End of the current week (Sunday)
        end_of_week = start_of_week + timedelta(days=6)  

        for order in orders:
            # Convert timestamp to datetime object
            timestamp_seconds = order['date']['seconds']
            order_date = datetime.fromtimestamp(timestamp_seconds)
            print(f"Order date: {order_date}, current week range: {start_of_week} to {end_of_week}")

            # Check if the order falls within the current week
            if start_of_week <= order_date <= end_of_week:
                day_of_week = order_date.weekday()  # Monday is 0, Sunday is 6
                print(f"Day of week (numeric): {day_of_week}")

                # Calculate total order value for that day
                total_order_value = sum(float(item['price']) * item['quantity'] for item in order['items'])
                print(f"Total order value for {order_date.strftime('%A')}: {total_order_value}")

                # Add the total to the weekly spending for that day
                weekly_spending[day_of_week] += total_order_value

        # Prepare the weekly spending list (Monday to Sunday)
        spending_list = [weekly_spending[i] for i in range(7)]
        print("Weekly spending list:", spending_list)  # Log the final spending list
        return jsonify(spending_list)
    except Exception as e:
        print("Error processing request:", e)
        return jsonify({"error": "Error processing data"}), 500  

# Load or create a dataset
# You can replace this with actual data loaded from a database or CSV
# Example data: order_date, order_quantity, temperature
data = pd.DataFrame({
    'order_date': pd.date_range(start='2023-01-01', periods=100, freq='D'),
    'order_quantity': np.random.randint(20, 50, size=100),
    'temperature': np.random.uniform(25, 35, size=100)
})

# Train ARIMA model for forecasting demand
def train_model():
    model_data = data.set_index('order_date')['order_quantity']
    model = ARIMA(model_data, order=(5, 1, 0))  # Example ARIMA parameters
    model_fit = model.fit()
    joblib.dump(model_fit, 'demand_forecasting_model.pkl')
    return model_fit

# Load or train model
try:
    model_fit = joblib.load('demand_forecasting_model.pkl')
except FileNotFoundError:
    model_fit = train_model()

@app.route('/forecast', methods=['POST'])
def forecast():
    try:
        data = request.get_json()  # Get historical data from request if necessary
        # Ensure data is in the correct format
        if not data:
            return jsonify({"error": "No data provided"}), 400
        days_to_forecast = 10  # Forecast next 10 days by default
        forecast = model_fit.forecast(steps=days_to_forecast)
        dates = pd.date_range(start=datetime.now(), periods=days_to_forecast, freq='D')
        forecast_data = [{"date": date.strftime('%Y-%m-%d'), "demand": demand} for date, demand in zip(dates, forecast)]
        return jsonify(forecast_data)
    except Exception as e:
        print("Error forecasting:", e)
        return jsonify({"error": "Error processing data"}), 500
    
@app.route('/actual', methods=['GET'])
def actual():
    try:
        # Replace with logic to retrieve actual data
        actual_data = get_actual_data()
        return jsonify({"actual": actual_data})
    except Exception as e:
        print(f"Error in /actual: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)