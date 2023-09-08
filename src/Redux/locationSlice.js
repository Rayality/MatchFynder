import { createSlice } from '@reduxjs/toolkit'

export const autoLocationSlice = createSlice({
    name: 'autoLocation',
    initialState: {
        autoLat: null,
        autoLng: null
    },
    reducers: {
        setAutoLat: (state, lat) => {
            state.autoLat = lat;
        },
        setAutoLng: (state, lng) => {
            state.autoLng = lng;
        }
    },
})

export const { setAutoLat, setAutoLng } = autoLocationSlice.actions

export default autoLocationSlice.reducer
