import asyncio
import websockets

async def pause_clock():
    uri = "ws://localhost:8090"
    try:
        async with websockets.connect(uri) as websocket:
            print("Connected to the WebSocket server")
            await websocket.send('{"command": "pause"}')
            print("Command sent")
            # Optionally wait for a response or confirmation
            response = await websocket.recv()
            print("Response received:", response)
    except Exception as e:
        print("Error in WebSocket operation:", str(e))

asyncio.run(pause_clock())
