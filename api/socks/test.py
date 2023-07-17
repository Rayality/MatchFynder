from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()


async def socks(websocket):
    async for message in websocket:
        await websocket.send(message)


connections = []


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(data)
            for connection in connections:
                await connection.send_text(data)
    except WebSocketDisconnect:
        connections.remove(websocket)
