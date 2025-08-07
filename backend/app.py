
from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.order_routes import order_bp
import mysql.connector
import random
import time
import os

app = Flask(__name__)
CORS(
    app,
    resources={r"/api/*": {"origins": [
        "https://bharakath-mutton-curry-shop.onrender.com"
    ]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"],
    expose_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials", "Access-Control-Allow-Origin"]
)

# --- CORS Preflight Handler for all /api/* routes ---
@app.route('/api/<path:path>', methods=['OPTIONS'])
def api_options(path):
    response = jsonify({'message': 'CORS preflight OK'})
    response.headers.add('Access-Control-Allow-Origin', 'https://bharakath-mutton-curry-shop.onrender.com')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Access-Control-Allow-Credentials,Access-Control-Allow-Origin')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# OTP Store (in-memory for now)
otp_store = {}

# MySQL Connection Function
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password='',
        database="mutton_curry_order"
    )


# Blueprint
app.register_blueprint(order_bp)

# ---------------------------
# GET: Fetch All Orders
# ---------------------------
@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM orders ORDER BY id DESC")
        orders = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(orders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------
# GET: Fetch Order Status by ID
# ---------------------------
@app.route('/api/order-status/<int:order_id>', methods=['GET'])
def get_order_status(order_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT status FROM orders WHERE id = %s", (order_id,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return jsonify({'status': result['status']})
        else:
            return jsonify({'error': 'Order not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------
# POST: Update Order Status + WhatsApp Notification
# ---------------------------
@app.route('/api/update-status/<int:order_id>', methods=['POST'])
def update_status(order_id):
    try:
        data = request.get_json()
        new_status = data.get('status')

        if not new_status:
            return jsonify({'error': 'Status is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()

        # Fetch phone number of customer
        cursor.execute("SELECT phone FROM orders WHERE id = %s", (order_id,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        # WhatsApp notification removed

        return jsonify({'message': 'Status updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------
# PUT: Alternate Update API
# ---------------------------
@app.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    try:
        data = request.get_json()
        new_status = data.get('status')

        if not new_status:
            return jsonify({'error': 'Status is required'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'success': True, 'updated_status': new_status})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------
# POST: OTP Generation API
# ---------------------------
@app.route('/api/generate-otp', methods=['POST'])
def generate_otp():
    data = request.get_json()
    phone = data.get('phone')

    if not phone:
        return jsonify({'error': 'Phone number required'}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[phone] = {'otp': otp, 'timestamp': time.time()}

    # WhatsApp notification removed

    return jsonify({'message': f"OTP sent to {phone}."})

# ---------------------------
# POST: OTP Verification API
# ---------------------------
@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    phone = data.get('phone')
    entered_otp = data.get('otp')

    stored = otp_store.get(phone)
    if not stored:
        return jsonify({'error': 'OTP not found'}), 404

    if time.time() - stored['timestamp'] > 300:
        return jsonify({'error': 'OTP expired'}), 403

    if stored['otp'] != entered_otp:
        return jsonify({'error': 'Invalid OTP'}), 401

    return jsonify({'success': True, 'message': 'OTP verified successfully'})


# ---------------------------
# Run Server
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
