import { createSlice } from "@reduxjs/toolkit";
import chainsArr from '../../chains.json'

const initialState = {
    chains: chainsArr,
    chainId: chainsArr[0]
}

export const chainsSlice = createSlice({
    name: "chains",
    initialState,
    reducers: {
        setChain: (state, action) => {
            state.chainId = action.payload.target.value
        }
    }
})

export const {setChain} = chainsSlice.actions

export default chainsSlice.reducer