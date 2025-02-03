import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [words, setWords] = useState<string[]>([]);
  //const [tempWords, setTemp] = useState<string[]>([]);
  const [err, setErr] = useState<string>("");
  const [wordCtr, setWordCtr] = useState<number>(0);
  const MAX_WORDS = 10;
  let i = 0;

  const generateClickHandler = () => {
    if (wordCtr + 1 >= MAX_WORDS) {
      console.log("Word limit reached.");
      setWordCtr(0);
      setWords([]);
    }
    
    for (let i = 0; i < MAX_WORDS; i++) {
      setTimeout(() => {
        fetchRandWord();
      }, i * 100);
    }
  };

  async function fetchRandWord(): Promise<void> {
    try {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=1"
      );
      if (!response.ok) throw new Error("Error fetching from API.");

      const word: string = await response.json();
      const newWord = word[0] + " ";
      // setTemp((prevTemp) => [...prevTemp, newWord]);
      setWords((prevWords) => [newWord, ...prevWords]);
      setWordCtr((prevCtr) => prevCtr + 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErr(`Error: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    if(wordCtr != 0) console.log(`${wordCtr} - ${words[0]}`);
  }, [wordCtr, words]);

  return (
    <div className="main-wrapper">
      <div className="main-content">
        <button onClick={generateClickHandler}>Fetch random words</button>
      </div>
      <div className="word-container">
        {words}
      </div>
    </div>
  );
}

export default App;
