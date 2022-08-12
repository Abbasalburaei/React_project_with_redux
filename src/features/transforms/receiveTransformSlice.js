import { createSlice } from "@reduxjs/toolkit";
import { apiRequestService } from "../../utils/apiService";
import config from '../../configuration/config.json';
import i18next from "i18next";
import { toast } from "react-toastify";
const { t: trans } = i18next;

export const initData = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'get', data).then(response => {
        dispatch(successLoadingData(response?.data));
    }).catch(error => {
        dispatch(failureLoadingData(error?.response));
    });
};

export const updateTransformData = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'put', data).then(response => {
        dispatch(successUpdateTransformData(response?.data));
    }).catch(error => {
        dispatch(failureUpdateTransformData(error?.response?.data));
    });
};


export const getSummary = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'get', null , data).then(response => {
        dispatch(printDraft(response?.data));
    }).catch(error => {
        dispatch(failureUpdateTransformData(error?.response?.data));
    });
};

//---------------------------------------------------------------------------------

const receiveTransformSlice = createSlice({
    name: 'receiveTransform',
    initialState: {
        loading: false,
        data:[],
        transformReport:null
    },
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        successLoadingData : (state,action)=>{
           state.loading = false;
           const responseData = action.payload;
           state.data = responseData.map(item=>{
            return {transformNo:item?.transformNo,senderName:item?.senderName,senderPhoneNumber :item?.senderPhoneNumber , receiverName: item?.receiverName,receiverPhoneNumber: item?.receiverPhoneNumber,
            sentDate:item?.sentDate,receivedDate:item?.receivedDate , status : item?.done , edit :{done:item?.done , value :item?.transformNo}}
           });
        },
        failureLoadingData : (state)=>{
            state.loading = false;
            toast.error(trans("errors:failure_loading_data"));
        },
        successUpdateTransformData : (state,action) =>{
          state.loading = false;
          state.transformReport = action.payload;
        },
        failureUpdateTransformData : (state,action)=>{
           const {message} = action.payload;
           if(message){
            toast.error(message);
           }else{
            toast.error(trans("errors:unexpected_errer"));
           }
           state.loading = false;
        },
        printDraft : (state,action)=>{
           state.transformReport = action.payload;
           state.loading = false;
        }
    },
});

export const { startLoading , successLoadingData , failureLoadingData , successUpdateTransformData , failureUpdateTransformData , printDraft} = receiveTransformSlice.actions;

export default receiveTransformSlice.reducer;



