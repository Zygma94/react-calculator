import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import './App.css';
import Display from './components/Display';
import Keyboard from './components/Keyboard';


function App() {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState('');
  const [year] = useState(new Date().getFullYear());

  const calculate = () => {
    try {
      const result = evaluate(formula);
      setResult(`= ${result}`);
    } catch (error) {
      setResult('Fórmula inválida');
    }
  }

  const clear = () => {
    setFormula('');
    setResult('');
  }

  const backspace = () => {
    // console.log('Entre al backspace');
    // var slice = '';

    // if (!previousSlice && formula.endsWith(' ')) {
    //   slice = formula.slice(0, -2);

    // } else {
    //   slice = (previousSlice ? previousSlice : formula).slice(0, -1);
    // }

    // if (slice.endsWith(' ')) {
    //   backspace(slice);
    //   return;
    // }

    const formulaSliced = formula.endsWith(' ') ? formula.slice(0, -3) : formula.slice(0, -1);

    setFormula(formulaSliced);
    setResult('');
  }


  const formulaChangeHandler = (keyEvent: string, value: string | number) => {
    if (result !== '') {
      setFormula('');
      setResult('');
      if (keyEvent === 'Enter' || keyEvent === '=') {
        setFormula(value.toString());
      }
      return;
    }


    if (keyEvent === 'Enter' || keyEvent === '=') {
      calculate();
    } else if (keyEvent === 'Escape') {
      clear();
    } else if (keyEvent === 'Backspace') {
      backspace();
    } else {
      setFormula(`${formula}${value}`);
    };
  }




  return (
    <React.Fragment>
      <div className='app-body'>
        <header className='app-header'>
          <h1>Calculadora</h1>
        </header>
        <main className='calculadora'>
          <Display formula={formula} result={result} />
          <Keyboard formulachangeHandler={formulaChangeHandler} />
        </main>
      </div>
      <footer className='app-footer'>
        <b>&copy; {year} David Baena. All rights Reserved</b>
      </footer>
    </React.Fragment>
  );
}

export default App;
