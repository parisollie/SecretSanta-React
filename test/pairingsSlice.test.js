import pairingsReducer, { generatePairingsAction } from '../src/features/pairingsSlice';

describe('Pairings Slice', () => {
  const initialState = { pairings: [], error: null };
  const mockFamily = [
    { name: 'Andrew', familyType: 'Extended', lastPairedWith: { 2021: 'Genesis' } },
    { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2021: 'Paris' } },
    { name: 'Genesis', familyType: 'Extended', lastPairedWith: { 2022: 'Andrew' } },
    { name: 'Paris', familyType: 'Extended', lastPairedWith: { 2020: 'Andrew' } },
  ];

  //1)
  it('should generate pairings without errors', () => {
    const action = generatePairingsAction(mockFamily);
    const newState = pairingsReducer(initialState, action);

    console.log('Generated Pairings:', newState.pairings);
    console.log('Error:', newState.error);
    // Expect no errors
    expect(newState.error).toBeNull();
    // Expect valid pairings
    expect(newState.pairings.length).toBeGreaterThan(0);
  });


  //Error

  /*it('should generate pairings without errors (failing scenario)', () => {
      const invalidMockFamily = [
          { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2021: 'Genesis' } },
          { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2021: 'Paris' } },
          { name: 'Genesis', familyType: 'Immediate', lastPairedWith: { 2022: 'Andrew' } },
          { name: 'Paris', familyType: 'Immediate', lastPairedWith: { 2022: 'Nick' } },
      ];

      const action = generatePairingsAction(invalidMockFamily);
      const newState = pairingsReducer(initialState, action);

      console.log('Generated Pairings:', newState.pairings);
      console.log('Error:', newState.error);
      // Expect no errors (will fail)
      expect(newState.error).toBeNull(); 
      // Expect valid pairings (will fail)
      expect(newState.pairings.length).toBeGreaterThan(0); 
  });*/


  //2
  it('should set an error if no valid pairings are possible', () => {
    const mockInvalidFamily = [
      { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2023: 'Nick' } },
      { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2023: 'Andrew' } },
    ];

    const action = generatePairingsAction(mockInvalidFamily);
    const newState = pairingsReducer(initialState, action);

    expect(newState.error).toBe('No valid pairings could be generated due to constraints.');
    expect(newState.pairings).toHaveLength(0);
  });

  // Error
  /*it('should set an error if no valid pairings are possible (failing scenario)', () => {
      const mockInvalidFamily = [
          { name: 'Andrew', familyType: 'Immediate', lastPairedWith: { 2023: 'Nick' } },
          { name: 'Nick', familyType: 'Immediate', lastPairedWith: { 2023: 'Andrew' } },
      ];

      const action = generatePairingsAction(mockInvalidFamily);
      const newState = pairingsReducer(initialState, action);
      // Expect a specific error (will fail)
      expect(newState.error).toBe('Error: Constraints failed.'); 
      expect(newState.pairings).toHaveLength(0);
  });
*/

});
