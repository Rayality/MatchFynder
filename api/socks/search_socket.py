from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from queries.search import SearchRepository
import json

router = APIRouter()

connections = []


@router.websocket("/search/{search_id}")
async def websocket_endpoint(websocket: WebSocket, search_id):
    search_id = int(search_id)
    search = SearchRepository.get_single_search(
        self=SearchRepository, search_id=search_id
    )

    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            data = json.loads(data)
            for websocket in connections:
                option_id = data.option_id
                count = SearchRepository.update_edible_count(
                    search_id, option_id
                )
                if count == search.participant_count:
                    SearchRepository.set_match_made_true(search_id)
                await websocket.send_json(data)
    except WebSocketDisconnect:
        connections.remove(websocket)
