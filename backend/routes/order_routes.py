# ...existing code...
from flask import Blueprint, request, jsonify
from models import create_orders_table, insert_order, get_all_orders, clear_orders, update_order_payment
import os
import json

order_bp = Blueprint('order_bp', __name__)
# ...existing code...
        # Find most ordered item for this user
# ...existing code...

# -------------------------------
# GET: Fetch Order History for User
# -------------------------------
@order_bp.route('/api/orders/history', methods=['GET'])
def fetch_order_history():
    phone = request.args.get('phone')
    if not phone:
        return jsonify({'error': 'Phone number required'}), 400
    try:
        orders = get_all_orders()
        user_orders = [o for o in orders if str(o.get('phone')) == str(phone)]
        return jsonify(user_orders), 200
    except Exception as e:
        print('❌ Error:', e)
        return jsonify({'error': 'Failed to fetch order history'}), 500

# -------------------------------
# POST: Save a Chat Message
# -------------------------------
CHAT_FILE = os.path.join(os.path.dirname(__file__), '../chat_messages.json')

def load_chats():
    if not os.path.exists(CHAT_FILE):
        return []
    with open(CHAT_FILE, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except Exception:
            return []

def save_chats(chats):
    with open(CHAT_FILE, 'w', encoding='utf-8') as f:
        json.dump(chats, f, ensure_ascii=False, indent=2)

@order_bp.route('/api/chat', methods=['POST'])
def save_chat_message():
    data = request.json
    try:
        phone = data.get('phone')
        message = data.get('message')
        if not phone or not message:
            return jsonify({'error': 'Phone and message required'}), 400
        chats = load_chats()
        chats.append({
            'phone': phone,
            'message': message,
            'timestamp': data.get('timestamp') or __import__('datetime').datetime.now().isoformat()
        })
        save_chats(chats)
        return jsonify({'message': 'Chat saved'}), 200
    except Exception as e:
        print('❌ Chat Error:', e)
        return jsonify({'error': 'Failed to save chat'}), 500

# -------------------------------
# GET: Fetch Chat Messages for User
# -------------------------------
@order_bp.route('/api/chat', methods=['GET'])
def fetch_chat_messages():
    phone = request.args.get('phone')
    try:
        chats = load_chats()
        if phone:
            user_chats = [c for c in chats if str(c.get('phone')) == str(phone)]
            return jsonify(user_chats), 200
        return jsonify(chats), 200
    except Exception as e:
        print('❌ Chat Error:', e)
        return jsonify({'error': 'Failed to fetch chats'}), 500

# -------------------------------
# POST: Save a New Order
# -------------------------------
@order_bp.route('/api/orders', methods=['POST'])
def save_order():
    data = request.json
    try:
        name = data['name']
        phone = data['phone']
        quantity = data['quantity']
        address = data['address']
        item_name = data['item_name']

        # ✅ Insert order and get order_id
        payment_status = data.get('payment_status', 'pending')
        payment_method = data.get('payment_method', 'cod')
        # You may need to update your insert_order to accept payment_status and payment_method
        order_id = insert_order(name, phone, quantity, address, item_name, payment_status, payment_method)

        return jsonify({"message": "Order saved successfully!", "order_id": order_id}), 200

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": "Failed to save order"}), 500
# -------------------------------
# PATCH: Update Payment Status for an Order
# -------------------------------
@order_bp.route('/api/orders/<int:order_id>/payment', methods=['PATCH'])
def update_payment_status(order_id):
    data = request.json
    try:
        payment_status = data.get('payment_status')
        payment_method = data.get('payment_method')
        # You need to implement update_order_payment in your models.py
        update_order_payment(order_id, payment_status, payment_method)
        return jsonify({"message": "Payment status updated"}), 200
    except Exception as e:
        print("❌ Payment Update Error:", e)
        return jsonify({"error": "Failed to update payment status"}), 500

# -------------------------------
# PUT: Update Full Order Details
# -------------------------------
@order_bp.route('/api/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    data = request.json
    try:
        # You need to implement update_order in your models.py
        # Example: update_order(order_id, name, phone, quantity, address, item_name, payment_status, payment_method)
        name = data.get('name')
        phone = data.get('phone')
        quantity = data.get('quantity')
        address = data.get('address')
        item_name = data.get('item_name')
        payment_status = data.get('payment_status')
        payment_method = data.get('payment_method')
        from models import update_order
        update_order(order_id, name, phone, quantity, address, item_name, payment_status, payment_method)
        return jsonify({"message": "Order updated successfully!"}), 200
    except Exception as e:
        print("❌ Order Update Error:", e)
        return jsonify({"error": "Failed to update order"}), 500
# -------------------------------
# GET: Fetch All Orders
# -------------------------------
@order_bp.route('/api/orders', methods=['GET'])
def fetch_orders():
    try:
        orders = get_all_orders()
        return jsonify(orders), 200
    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": "Failed to fetch orders"}), 500

# -------------------------------
# DELETE: Clear All Orders
# -------------------------------
@order_bp.route('/api/orders', methods=['DELETE'])
def clear_all_orders():
    try:
        clear_orders()
        return jsonify({"message": "All orders cleared"}), 200
    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": "Failed to clear orders"}), 500
