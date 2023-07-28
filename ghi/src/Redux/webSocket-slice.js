import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const messagesAdapter = createEntityAdapter();
export const wsApi = createApi({
    reducerPath: "wsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: (build) => ({
        getMessages: build.query({
            query: () => "ws",
            transformResponse(response) {
                return messagesAdapter.addMany(
                    messagesAdapter.getInitialState(),
                    response
                );
            },
            async onCacheEntryAdded(
                arg,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                const ws = new WebSocket("ws://localhost:8000/ws");
                try {
                    await cacheDataLoaded;

                    const listener = (e) => {
                        console.log("calling listener");
                        const data = JSON.parse(e);
                        if (data.channel !== arg) return;

                        updateCachedData((draft) => {
                            messagesAdapter.upsertOne(draft, data);
                        });
                    };

                    ws.addEventListener("message", listener);
                } catch { }

                await cacheEntryRemoved;

                ws.close();
            },
        }),
        sendMessages: build.mutation({
            query: () => ({}),
            async onCacheEntryAdded(
                arg,
                {
                    dispatch,
                    getState,
                    extra,
                    requestId,
                    cacheEntryRemoved,
                    cacheDataLoaded,
                    getCacheEntry,
                }
            ) {
                const ws = new WebSocket("ws://localhost:8000/ws");

                try {
                    const listener = (e) => {
                        ws.send(arg);
                    };
                    ws.addEventListener("open", listener);
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetMessagesQuery, useSendMessagesMutation } = wsApi;
