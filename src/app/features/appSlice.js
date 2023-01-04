import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'Job',
    initialState:{
        jobId:null,
        currentStatus: null,
    },
    reducers:{
        selectJob: (state, action ) =>{
            state.jobId = action.payload.jobId;
        },
        setCurrentStatus:(state, action)=>{
            state.currentStatus = action.payload.currentStatus;
        }
    }
})
    
export const { selectJob, setCurrentStatus } = appSlice.actions;


export const selectJobId= state => state.selectJob.jobId;
export const selectCurrentStatusValue = state => state.setCurrentStatus.currentStatus;

export default appSlice.reducer;