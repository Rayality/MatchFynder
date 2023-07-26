import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    autoLat: "",
    autoLng: ""
}

export const autoLocationSlice = createSlice({
    name: 'autoLocation',
    initialState,
    reducers: {
        setAutoLocation: (state, lat, lng) => {
            state.autoLat = lat;
            state.autoLng = lng;
        }
    },
})

export const { setAutoLocation } = autoLocationSlice.actions

export default autoLocationSlice.reducer
