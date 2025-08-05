import mysql.connector

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='localhost',
            port=3307,  # use 3306 if default
            user='root',
            password='',
            database='mutton_order_db'
        )
        print("✅ Database connection successful!")
        return conn
    except mysql.connector.Error as err:
        print("❌ Database connection failed:", err)
        return None
