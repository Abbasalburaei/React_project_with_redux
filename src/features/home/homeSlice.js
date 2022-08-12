import { createSlice } from "@reduxjs/toolkit";
import { apiRequestService } from "../../utils/apiService";
import config from '../../configuration/config.json';

export const initHomeData = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'get', null, null).then(response => {
        dispatch(successLoadingData(response?.data));
    }).catch(error => {
        dispatch(failureLoadingData(error?.response));
    });
};

//---------------------------------------------------------------------------------

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        loading: false,
        data:[],
        sentCount:0,
        receivedCount:0,
        sentAmountTotal:0,
        receivedAmountTotal:0
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        successLoadingData : (state,action)=>{
            const {sentTransformCount,receiveTransformCount,sentAmountTotal,receiveAmountTotal,currentTransforms} = action.payload;
             state.sentCount = sentTransformCount;
             state.receivedCount = receiveTransformCount;
             state.sentAmountTotal = sentAmountTotal;
             state.receivedAmountTotal = receiveAmountTotal;
             
            if(currentTransforms?.length > 0){
                state.data = currentTransforms;
            }else{
                state.data = [];
            }
            state.loading = false;
        },
        failureLoadingData : (state,action)=>{
          state.loading = false;
        }
    },
});

export const { startLoading ,successLoadingData , failureLoadingData } = homeSlice.actions;

export default homeSlice.reducer;



