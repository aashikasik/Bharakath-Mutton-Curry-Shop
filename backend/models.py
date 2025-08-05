from db_config import get_db_connection
import bcrypt

def create_orders_table():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
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
    """)
    conn.commit()
    cursor.close()
    conn.close()



def get_all_orders():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM orders ORDER BY order_time DESC")
    orders = cursor.fetchall()
    cursor.close()
    conn.close()
    return orders

def clear_orders():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM orders")
    conn.commit()
    cursor.close()
    conn.close()


def create_admin(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    cursor.execute("INSERT INTO admins (username, password) VALUES (%s, %s)", (username, hashed))
    conn.commit()
    conn.close()

def check_admin_credentials(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM admins WHERE username = %s", (username,))
    result = cursor.fetchone()
    conn.close()
    if result and bcrypt.checkpw(password.encode('utf-8'), result[0].encode('utf-8')):
        return True
    return False

def insert_order(name, phone, quantity, address, item_name, payment_status='pending', payment_method='cod'):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """INSERT INTO orders (name, phone, quantity, address, item_name, status, payment_status, payment_method)
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"""
    values = (name, phone, quantity, address, item_name, 'Order Received', payment_status, payment_method)
    cursor.execute(query, values)
    conn.commit()
    order_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return order_id
# ...existing code...

def update_order_payment(order_id, payment_status, payment_method):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """UPDATE orders SET payment_status=%s, payment_method=%s WHERE id=%s"""
    cursor.execute(query, (payment_status, payment_method, order_id))
    conn.commit()
    cursor.close()
    conn.close()

# Update full order details
def update_order(order_id, name, phone, quantity, address, item_name, payment_status, payment_method):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        UPDATE orders SET
            name=%s,
            phone=%s,
            quantity=%s,
            address=%s,
            item_name=%s,
            payment_status=%s,
            payment_method=%s
        WHERE id=%s
    """
    cursor.execute(query, (name, phone, quantity, address, item_name, payment_status, payment_method, order_id))
    conn.commit()
    cursor.close()
    conn.close()
