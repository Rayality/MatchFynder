from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

connections = []


async def send_matches(websockets):
    async for websocket in websockets:
        data = await websocket.receive_text()
        await websocket.send(data)


@router.websocket("/search")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            send_matches(connections)
    except WebSocketDisconnect:
        connections.remove(websocket)
