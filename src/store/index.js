import { atom } from 'jotai'

const deviceModalAtom = atom(null)
const confirmModalAtom = atom(null)
const authAtom = atom(true) 

const lightsAtom = atom([{
    id: 2464107,
    name: "Light 1",
    active: false,
    type: 'light'
}])

const waterPumpsAtom = atom([{
    id: 2464109,
    name: "Water pump 1",
    active: false,
    type: 'water-pump'
}])

export {deviceModalAtom, confirmModalAtom, authAtom,lightsAtom,waterPumpsAtom}