import { atom } from 'jotai'

const deviceModalAtom = atom(null)
const confirmModalAtom = atom(null)
const authAtom = atom(true) 

export {deviceModalAtom, confirmModalAtom, authAtom}