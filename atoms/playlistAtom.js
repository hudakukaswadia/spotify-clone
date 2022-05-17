import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: null,
});

//the key should be unique as you can't have 2 atoms having the same ID
//as ID is the reference in the global memory so 2 atoms cant have same ref
export const playlistIdState = atom({
  key: "playlistIdState",
  default: "7Ho7eL5T5CRjJHyNk5KVWM",
});
