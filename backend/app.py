from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.order_routes import order_bp
from routes.admin_routes import admin_routes
from db_config import get_db_connection
from flask_cors import CORS as BlueprintCORS
import mysql.connector
import random
import time
import os

app = Flask(__name__)

# Create orders table if not exists
def create_orders_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            phone VARCHAR(20),
            quantity VARCHAR(10),
            address VARCHAR(255),
            item_name VARCHAR(100),
            status VARCHAR(50) DEFAULT 'Order Received',
            payment_status VARCHAR(50) DEFAULT 'pending',
            payment_method VARCHAR(50) DEFAULT 'cod',
            order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    cursor.close()
    conn.close()

create_orders_table()

# ✅ Allow your frontend origin + handle preflight OPTIONS requests
CORS(
    app,
    resources={r"/*": {"origins": [
        "https://bharakath-mutton-curry-shop.onrender.com",
        "http://localhost:3000"  # optional for local testing
    ]}},
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# Apply CORS to blueprint as well
BlueprintCORS(order_bp, origins=["https://bharakath-mutton-curry-shop.onrender.com"], supports_credentials=True)

# ---------------------------
# GET: Test Database Connection
# ---------------------------
@app.route('/api/test-db', methods=['GET'])
def test_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'message': 'Database connection successful.'})
    except Exception as e:
        import traceback
        print("❌ DB Test Error:", e)
        print(traceback.format_exc())
        return jsonify({'success': False, 'error': str(e), 'traceback': traceback.format_exc()}), 500

@app.route('/', methods=['GET']) 
def home():
    return jsonify({'message': 'Mutton Curry Order System API is running.'})

otp_store = {}

def get_db_connection():
    return mysql.connector.connect(
        host="bfpp9qnobskouzfj8dds-mysql.services.clever-cloud.com",
        port=3306,
        user="ul68ggb8h5wz47pc",
        password="OfYOpGpNws91i49FL7Nr",
        database="bfpp9qnobskouzfj8dds"
    )

app.register_blueprint(order_bp)
app.register_blueprint(admin_routes)

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
        import traceback
        print("❌ GET /api/orders error:", e)
        print(traceback.format_exc())
        return jsonify({'error': 'Failed to fetch orders', 'details': str(e), 'traceback': traceback.format_exc()}), 500

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

        cursor.execute("SELECT phone FROM orders WHERE id = %s", (order_id,))
        cursor.fetchone()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Status updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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

@app.route('/api/generate-otp', methods=['POST'])
def generate_otp():
    data = request.get_json()
    phone = data.get('phone')

    if not phone:
        return jsonify({'error': 'Phone number required'}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[phone] = {'otp': otp, 'timestamp': time.time()}

    return jsonify({'message': f"OTP sent to {phone}."})

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

if __name__ == "__main__":
    app.run(debug=True)
