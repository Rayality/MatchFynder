from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from queries.search import SearchRepository
import json
from typing import List

router = APIRouter()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_json_data(self, data: str, websocket: WebSocket):
        await websocket.send_json(data)

    async def broadcast(self, message: str):
        print("active connections", self.active_connections)
        for connection in self.active_connections:
            await connection.send_text(message)

    async def broadcast_refetch(self):
        await self.broadcast("refetch finders")


socket_manager = ConnectionManager()


@router.websocket("/search/{search_id}")
async def websocket_endpoint(websocket: WebSocket, search_id):
    search_id = int(search_id)
    search = SearchRepository.get_single_search(
        self=SearchRepository, search_id=search_id
    )

    await socket_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            data = json.loads(data)

            for websocket in socket_manager.active_connections:
                option_id = data.get("option_id")
                count = SearchRepository.update_edible_count(
                    self=SearchRepository,
                    search_id=search_id,
                    option_id=option_id,
                )
                if count == search.get("participant_count"):
                    SearchRepository.set_match_made_true(
                        self=SearchRepository, search_id=search_id
                    )
                await websocket.send_json(json.dumps({"count": count}))
    except WebSocketDisconnect:
        socket_manager.disconnect(websocket)
