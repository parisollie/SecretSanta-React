import { createSlice } from '@reduxjs/toolkit';
/*
-This is the initial list of family members.
-Each family member has:

   *name: The person's name.
   *familyType: Whether they are part of the immediate or extended family.
   *lastPairedWith: A record of who they were paired with in past years.

-This list serves as the starting point for managing family data in the app. 
    It’s stored in the Redux state so I can modify it later.

*/

const initialState = [
  { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2022: 'Nick' } },
  { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2021: 'Genesis' } },
  { name: 'Genesis', familyType: 'Extended', lastPairedWith: { 2023: 'Paris' } },
  { name: 'Paris', familyType: 'Extended', lastPairedWith: { 2020: 'Sylvain' } },
  { name: 'Sylvain', familyType: 'Extended', lastPairedWith: { 2023: 'Till' } },
  { name: 'Ollie', familyType: 'Extended', lastPairedWith: { 2023: 'Sylvain' } },
];

const familySlice = createSlice({
  // A unique name for this slice of the state.
  name: 'family',
  ///The initial data (the family list that I have created earlier).
  initialState,
  //A list of actions that tell Redux how to update the state.
  reducers: {
    /*addFamilyMember:It takes the current state (list of family members) and the new member's data
    (from action.payload) and adds the new member to the list.*/
    addFamilyMember: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addFamilyMember } = familySlice.actions;

export default familySlice.reducer;

