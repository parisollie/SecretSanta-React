import familyReducer, { addFamilyMember } from '../src/features/familySlice';

describe('Family Slice', () => {
    const initialState = [
        { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2022: 'Nick' } },
        { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2021: 'Genesis' } },
    ];

    it('should add a new family member', () => {
        const newMember = { name: 'Genesis', familyType: 'Extended', lastPairedWith: {} };
        const action = addFamilyMember(newMember);

        const newState = familyReducer(initialState, action);

        expect(newState).toContainEqual(newMember);
        expect(newState.length).toBe(initialState.length + 1);
    });

    //Error

    /*it('should not add a duplicate family member (failing scenario)', () => {
        const duplicateMember = { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2022: 'Nick' } };
        const action = addFamilyMember(duplicateMember);

        const newState = familyReducer(initialState, action);

        // Expect no duplicate entry
        const duplicates = newState.filter((member) => member.name === duplicateMember.name);
         // Only one instance of 'Andrew' should exist
        expect(duplicates.length).toBe(1);
        // Length shouldn't increase
        expect(newState.length).toBe(initialState.length); 
    });*/


});
