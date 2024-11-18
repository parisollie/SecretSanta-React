import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generatePairingsAction } from './features/pairingsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const SecretSanta = () => {

  const dispatch = useDispatch();
  //Gets the list of family members from Redux.
  const family = useSelector((state) => state.family);
  // Gets the generated pairings and any error messages from Redux.
  const { pairings, error } = useSelector((state) => state.pairings);

  //Handle Pairings Generation

  /*This function triggers the generatePairingsAction Redux action, 
  passing the family data to generate pairings.*/

  const handleGeneratePairings = () => {
    dispatch(generatePairingsAction(family));
  };

  return (
    <div className="container my-5">
      <div className="overlay text-center">
        <header className="mb-4">
          <h1 className="display-4 text-warning">🎅🏻Secret Santa Generator🎅🏻</h1>
          <p className="lead text-light">Create fair and fun pairings for your family!</p>
        </header>

        <main>
          <div className="text-center mb-4">
            <button className="btn btn-success btn-lg" onClick={handleGeneratePairings}>
              Generate Pairings
            </button>
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <section className="pairings-section">
            <h2 className="h3 text-center text-light mb-4">Pairings</h2>
            {pairings.length > 0 ? (
              <ul className="list-group">

                {/* 
                -If pairings exist:
                   *Display them in a styled list (list-group).
                   *Each pairing shows the giver and receiver with different colors.
                -If no pairings:
                   *Display a placeholder message.  */}
                {pairings.map((pair, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span className="text-primary">{pair.giver}</span>
                    <span className="text-muted">→</span>
                    <span className="text-success">{pair.receiver}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-light">No pairings generated yet.</p>
            )}
          </section>
        </main>

        <footer className="mt-5">
          <p className="text-light">🎄Are you ready to find out who your secret santa is?🎄</p>
        </footer>
      </div>
    </div>
  );
};

export default SecretSanta;

