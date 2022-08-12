import { createSlice } from "@reduxjs/toolkit";
import { apiRequestService } from "../../utils/apiService";
import config from '../../configuration/config.json';
import i18next from "i18next";
import { toast } from "react-toastify";
const { t: trans } = i18next;

export const summaryReportsData = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'get', null, null).then(response => {
        dispatch(successLoadingData(response?.data));
    }).catch(error => {
        dispatch(failureLoadingData(error?.response));
    });
};

//---------------------------------------------------------------------------------

const reportDailySlice = createSlice({
    name: 'reportDaily',
    initialState: {
        loading: false,
        data:[],
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        successLoadingData : (state,action)=>{
            const _data = action.payload;
            if(_data?.length > 0){
                state.data = _data;
            }else{
                toast.info(trans("common:no_data"));
                state.data = [];
            }
            state.loading = false;
        },
        failureLoadingData : (state,action)=>{
          const {message} = action.payload;
          if(message){
            toast.error(message);
          }else{
            toast.error(trans("errors:unexpected_errer"));
            state.loading = false;
          }
        }
    },
});

export const { startLoading ,successLoadingData , failureLoadingData } = reportDailySlice.actions;

export default reportDailySlice.reducer;



