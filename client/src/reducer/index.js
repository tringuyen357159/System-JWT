import { combineReducers } from 'redux';
import userReducer from './authReducer';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistCommonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: 'user',
    whitelist: ['token', 'isLogin', 'username', 'refreshToken']
};

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer)
})

export default rootReducer