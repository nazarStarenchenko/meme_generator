import React from 'react';
//import data from "./data.js"

export default function Main () {
  const [memeImageUrl, setMemeImageUrl] = React.useState("https://i.imgflip.com/30b1gx.jpg");
  const [formText, setFormText] = React.useState({topText: "", bottomText: ""})
  const [apiData, setApiData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(result => result.json())
    .then(data => setApiData(data));
  }, []);

  function changeMemeImage () {
    setMemeImageUrl(() => {
      const randomIndex = Math.floor(Math.random() * apiData.data.memes.length);
      return apiData.data.memes[randomIndex].url;
    })
  }

  function clearInput() {
    setFormText({topText: "", bottomText: ""});
  }

  function changeTextState (event) {

    setFormText((oldFromTextObj) => {
      console.log(oldFromTextObj);
      return {...oldFromTextObj, [event.target.name]:event.target.value}
    });
  }

  return (
    <main>
      <div className="form">
        <input 
          placeholder="top text" 
          onChange={changeTextState} 
          name="topText" 
          value={formText.topText}
        />
        <input 
          placeholder="bottom text" 
          onChange={changeTextState} 
          name="bottomText" 
          value={formText.bottomText}
        />
        <button onClick={() => {
          changeMemeImage();
          clearInput();
          }}>Change Image</button>
      </div>
      <div className="img-container"> 
      <p className="top meme-text">{formText.topText}</p>
      <p className="bottom meme-text">{formText.bottomText}</p>
      <img src={memeImageUrl} alt='' />
      </div>
    </main>
  )
}