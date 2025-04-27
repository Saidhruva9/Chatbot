import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyCy8eRWe0g_VHxSvZrhrrA1C7QcR0OYMHY"
genai.configure(api_key=GEMINI_API_KEY)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # Load the Gemini model
        response = model.generate_content(user_message)
        bot_reply = response.text if response else "Sorry, I couldn't understand that."

        return jsonify({"reply": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Handle errors

if __name__ == '__main__':
     port = int(os.environ.get('PORT', 5000))
     app.run(host='0.0.0.0', port=port, debug=True)
