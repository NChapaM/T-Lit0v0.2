from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Configura tu clave de API de Azure OpenAI aquí
openai.api_type = "azure"
openai.api_base = "https://your-resource-name.openai.azure.com/"
openai.api_version = "2023-05-15"
openai.api_key = "your-api-key"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    
    try:
        response = openai.ChatCompletion.create(
            engine="your-deployment-name",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        return jsonify({"response": response.choices[0].message.content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)