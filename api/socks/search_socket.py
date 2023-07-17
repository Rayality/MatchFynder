from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from queries.search import SearchRepository

router = APIRouter()

connections = []


@router.websocket("/search/{search_id}")
async def websocket_endpoint(websocket: WebSocket, search_id):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            async for websocket in connections:
                data = await websocket.recieve_json()
                num_participants = data.particpants
                option_id = data.option_id
                count = SearchRepository.update_edible_count(
                    search_id, option_id
                )
                if count == num_participants:
                    SearchRepository.set_match_made_true(search_id)
                await websocket.send_json(count)
    except WebSocketDisconnect:
        connections.remove(websocket)
