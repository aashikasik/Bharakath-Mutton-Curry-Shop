from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.order_routes import order_bp
import mysql.connector
import random
import time
import os

# Twilio (for WhatsApp notifications)
from twilio.rest import Client

app = Flask(__name__)
CORS(app)

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

# Twilio Setup (you must add your credentials)
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "your_sid")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "your_token")
TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"  # Twilio sandbox number
twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

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

        if user and user[0]:
            send_whatsapp_notification(user[0], f"Your order #{order_id} is now: {new_status}")

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

    # Send OTP via WhatsApp (or SMS in real setup)
    send_whatsapp_notification(phone, f"Your OTP is: {otp}")

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
# WHATSAPP NOTIFICATION (Twilio)
# ---------------------------
def send_whatsapp_notification(to_number, message):
    try:
        formatted_number = f"whatsapp:+91{to_number}" if not to_number.startswith("whatsapp:") else to_number
        twilio_client.messages.create(
            body=message,
            from_=TWILIO_WHATSAPP_NUMBER,
            to=formatted_number
        )
    except Exception as e:
        print("WhatsApp Notification Failed:", e)

# ---------------------------
# Run Server
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
