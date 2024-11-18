import { createSlice } from '@reduxjs/toolkit';

/*
This code manages the logic for generating Secret Santa pairings in my app. 
It uses Redux Toolkit's createSlice to handle the pairing-related state and actions. 
*/
const currentYear = new Date().getFullYear();

const initialState = {
  //This is where the generated Secret Santa pairings will be stored.
  pairings: [],
  //Stores an error message if no valid pairings can be created.
  error: null,
};

/*
Purpose: Checks if a given receiver is a valid Secret Santa choice for the giver based on the rules:

No self-pairing.
No pairing with immediate family members.
No pairing with someone the giver was paired with in the last 3 years.

*/
const isValidPair = (giver, receiver, family) => {
  // No self-pairing
  if (giver.name === receiver.name) return false;
  // No immediate family
  if (giver.familyType === 'Immediate' && receiver.familyType === 'Immediate') return false;
  const yearsPaired = Object.entries(giver.lastPairedWith || {})
    .filter(([year]) => currentYear - year <= 3)
    .map(([_, pairedName]) => pairedName);
  // No pairing in the last 3 years
  return !yearsPaired.includes(receiver.name);
};


const generatePairings = (family) => {
  let unpaired = [...family];
  const pairings = [];

  for (const giver of family) {
    const candidates = unpaired.filter((receiver) => isValidPair(giver, receiver, family));
    // No valid pairings
    if (candidates.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const chosenReceiver = candidates[randomIndex];

    pairings.push({ giver: giver.name, receiver: chosenReceiver.name });
    unpaired = unpaired.filter((person) => person.name !== chosenReceiver.name);
  }

  return pairings;
};

/*
-generatePairingsAction:
  *Takes a list of family members (from action.payload).
  *Calls generatePairings to create pairings.
  *Updates the state:
    -Success: Saves the pairings and clears errors.
    -Failure: Clears pairings and saves an error message.
*/
const pairingsSlice = createSlice({
  name: 'pairings',
  initialState,
  reducers: {
    generatePairingsAction: (state, action) => {
      // Pass family data as payload
      const pairings = generatePairings(action.payload);
      if (pairings) {
        state.pairings = pairings;
        state.error = null;
      } else {
        state.pairings = [];
        state.error = 'No valid pairings could be generated due to constraints.';
      }
    },
  },
});


export const { generatePairingsAction } = pairingsSlice.actions;

export default pairingsSlice.reducer;

