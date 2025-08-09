import mysql.connector

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host='bfpp9qnobskouzfj8dds-mysql.services.clever-cloud.com',
            port=3306,
            user='ul68ggb8h5wz47pc',
            password='OfYOpGpNws91i49FL7Nr',
            database='bfpp9qnobskouzfj8dds'
        )
        print("✅ Database connection successful!")
        return conn
    except mysql.connector.Error as err:
        print("❌ Database connection failed:", err)
        return None
