from flask import Flask
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    conn = mysql.connector.connect(
        host="mysql",       # name of the MySQL container service in docker-compose
        user="root",
        password="rootpass",
        database="flaskdb"
    )
    return conn

@app.route('/')
def home():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 'Hello from Flask + MySQL!'")
        result = cursor.fetchone()
        conn.close()
        return result[0]
    except Exception as e:
        return f"Error connecting to DB: {str(e)}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
