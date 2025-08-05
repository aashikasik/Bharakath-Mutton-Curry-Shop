from flask import Blueprint, request, jsonify
from models import get_all_orders, clear_all_orders, check_admin_credentials

admin_routes = Blueprint('admin_routes', __name__)

@admin_routes.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if check_admin_credentials(username, password):
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@admin_routes.route('/api/admin/orders', methods=['GET'])
def view_orders():
    orders = get_all_orders()
    return jsonify(orders), 200

@admin_routes.route('/api/admin/orders/clear', methods=['DELETE'])
def clear_orders():
    clear_all_orders()
    return jsonify({"message": "All orders cleared!"}), 200
