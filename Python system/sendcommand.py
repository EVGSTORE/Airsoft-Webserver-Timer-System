import websocket
import json

# Define the WebSocket URL
ws_url = "ws://192.168.50.205:8091"

# Define the command to send
command = {
    "command": "pythonStopTimer"
}

def on_open(ws):
    print("WebSocket connection opened")
    # Send the stop timer command
    ws.send(json.dumps(command))
    print("Command sent: pythonStopTimer")
    # Close the connection after sending the message
    ws.close()

def on_error(ws, error):
    print(f"WebSocket error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("WebSocket connection closed")

# Create a WebSocket app and define the event handlers
ws_app = websocket.WebSocketApp(ws_url,
                                on_open=on_open,
                                on_error=on_error,
                                on_close=on_close)

# Run the WebSocket app
ws_app.run_forever()
