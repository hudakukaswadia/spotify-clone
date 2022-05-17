import { atom } from "recoil";


//this will tell me what track id has been selected
export const currentTrackIdState = atom({
  key: "currentTrackIdState", //this is a unique id with respect to other atoms/selectors
  default: null, //default value which is the intial value
});

//so this will tell me if you are play is true
// and if you are not playing then is false hence default is false
export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
