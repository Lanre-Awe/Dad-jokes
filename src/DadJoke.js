import { useState } from "react";
import { TwitterShareButton } from "react-twitter-embed";
import classes from "./dadjokes.module.css";
import LoadingSpinner from "./LoadingSpinner";

const DadJokes = () => {
  const [newJokes, setNewJokes] = useState();
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState(false);

  const config = { headers: { Accept: "application/json" } };
  const getDadJokes = async () => {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", config);

      return res.json();
    } catch (err) {
      setNewJokes(err.message);
      setTweet(false);
      setLoading(false);
    }
  };

  const getJokes = async () => {
    setLoading(true);
    const dadJokes = await getDadJokes();
    if (dadJokes) {
      setNewJokes(dadJokes.joke);
      setTweet(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <h2>DAD JOKES</h2>
          {loading && <LoadingSpinner />}
          {!loading && <button onClick={getJokes}>Get a New Joke</button>}
        </div>
        {!loading && newJokes && (
          <div className={classes.jokeContainer}>
            <p>{newJokes}</p>
            {tweet && (
              <TwitterShareButton url=" " options={{ text: newJokes }} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DadJokes;
