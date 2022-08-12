import { createSlice } from "@reduxjs/toolkit";
import { apiRequestService } from "../../utils/apiService";
import config from '../../configuration/config.json';
import { toast } from "react-toastify";
import i18next from "i18next";
const { t: trans } = i18next;

export const initData = ({ name, data }) => (dispatch) => {
    dispatch(startLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'get', data).then(response => {
        dispatch(successLoadingData(response?.data));
    }).catch(error => {
        dispatch(failureLoadingData(error?.response));
    });
}


export const sendData = ({ name, data }) => (dispatch) => {
    dispatch(startBtnLoading());
    apiRequestService(`${config.baseUrl}/api/${name}`, 'post', data).then(response => {
        dispatch(successSendTransform(response?.data));
    }).catch(error => {
        dispatch(failureTransform(error?.response?.data));
    });
}



//---------------------------------------------------------------------------------


const sendTransformSlice = createSlice({
    name: 'sendTransform',
    initialState: {
        loading: false,
        cities: [],
        areas:[],
        filterAreas:[],
        companies:[],
        customers:[], 
        finalTotal :'',
        btnLoading:false,
        transformDraft:null,
        success:false,
    },
    reducers: {

        startLoading: (state) => {
            state.loading = true;
        },
        startBtnLoading : (state)=>{
             state.btnLoading = true;
        },
        successLoadingData: (state, action) => {
          const {cities , areas , companies , customers} =   action.payload;
          state.loading = false;
          state.cities = cities;
          state.areas = areas;
          state.companies = companies;
          state.customers = customers;
        },

        failureLoadingData: (state, action) => {
            state.loading = false;
            toast.error(trans("errors:unexpected_errer"));
        },

         handleFilterAreas:(state,action)=>{
          state.filterAreas = state.areas?.filter(item=>{return item?.extraValue === action.payload});
        },

        calculateAmount : (state,action)=>{
          const {fees,amount} = action.payload;
          state.finalTotal = Number(amount??0) + Number(fees??0);
        },
        successSendTransform : (state , action)=>{
          state.transformDraft = action.payload;
          state.btnLoading = false;
          state.success = true;
        },
        resetTransform :(state,action)=>{
            state.success = false;
            state.finalTotal = '';
        },
        failureTransform : (state,action)=>{
            state.btnLoading = false;
            const {message} =  action.payload;
            if(message){
                toast.error(message);
                return;
            }
            toast.error(trans("errors:unexpected_errer"));
        }

    },
});

export const { startLoading, successLoadingData, failureLoadingData , resetTransform, handleFilterAreas ,calculateAmount , failureTransform , successSendTransform , startBtnLoading} = sendTransformSlice.actions;

export default sendTransformSlice.reducer;



