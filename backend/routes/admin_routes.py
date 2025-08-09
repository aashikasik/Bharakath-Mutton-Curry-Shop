from flask import Blueprint, request, jsonify
from models import get_all_orders, clear_orders, check_admin_credentials

admin_routes = Blueprint('admin_routes', __name__)

@admin_routes.route('/api/admin/orders/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    new_status = data.get('status')
    if not new_status:
        return jsonify({'error': 'Status is required'}), 400
    try:
        from db_config import get_db_connection
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE orders SET status = %s WHERE id = %s", (new_status, order_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'success': True, 'updated_status': new_status})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

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
def clear_all_orders_route():
    clear_orders()
    return jsonify({"message": "All orders cleared!"}), 200
