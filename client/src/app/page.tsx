'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [noOf, setNoOf] = useState(1);
  const [choco, setChoco] = useState(1);

  const addChoco = () => {
    setChoco((num2) => num2 + 1);
  };

  useEffect(() => {
    setNoOf(1);
    setChoco(1);
  });

  return (
    <>
      <h1>{noOf}</h1>
      <h1>{choco}</h1>
      <button onClick={addChoco}>asdasd</button>
    </>
  );
}
