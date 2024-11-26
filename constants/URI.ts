// for development only
// get the host uri to connect expo go with server.js in any network

import Constants from 'expo-constants';
const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost;
export const uri = "http://" + debuggerHost?.split(":")[0] + ":3001";
