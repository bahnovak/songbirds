/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import styles from './App.module.scss';
import logo from '../../img/logo.png';
import bird from '../../img/bird.jpg';
import birdsData from '../../data/birdsData';
import error from '../../sound/error.mp3';
import win from '../../sound/win.mp3';

const groupNames = [
  'Разминка',
  'Воробьиные',
  'Лесные птицы',
  'Певчие птицы',
  'Хищные птицы',
  'Морские птицы',
];

const playCorrect = (bool) => {
  const audio = new Audio();
  audio.src = error;
  if (bool) audio.src = win;
  audio.play();
};

function randomInt() {
  const rand = -0.5 + Math.random() * 6;
  return Math.round(rand);
}

let random = randomInt();

const exampleFlags = [false, false, false, false, false, false];

const App = () => {
  const [score, setScore] = useState(0);
  const [birdsGroup, setBirdsGroup] = useState(0);
  const [birdImage, setBirdImage] = useState(bird);
  const [birdName, setBirdName] = useState('*****');
  const [birdsArray, setBirdsArray] = useState(birdsData[birdsGroup]);
  const [birdsFlagsTrue, setBirdsFlagsTrue] = useState(exampleFlags);
  const [birdsFlagsFalse, setBirdsFlagsFalse] = useState(exampleFlags);
  const [answer, setAnswer] = useState('');
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const audioRef = React.createRef();

  console.log(`current answer: ${birdsArray[random].name}`);
  const handleBirdsFlagsTrue = (index) => {
    setBirdsFlagsTrue(
      birdsFlagsTrue.map((el, i) => {
        if (i === index && !el) {
          return !el;
        }
        return el;
      })
    );
  };

  const handleBirdsFlagsFalse = (index) => {
    setBirdsFlagsFalse(
      birdsFlagsFalse.map((el, i) => {
        if (i === index && !el) {
          return !el;
        }
        return el;
      })
    );
  };

  const handleNextlevel = () => {
    random = randomInt();
    setBirdsGroup(birdsGroup + 1);
    setBirdImage(bird);
    setBirdName('*****');
    setBirdsFlagsTrue(exampleFlags);
    setBirdsFlagsFalse(exampleFlags);
    setAnswer('');
    setIsShowAnswer(false);
    setIsCorrect(false);
    setBirdsArray(birdsData[birdsGroup + 1]);
  };

  const handleCheckScore = () => {
    let result = 5;
    birdsFlagsFalse.forEach((e) => {
      if (e) result -= 1;
    });
    return result;
  };

  return (
    <div className={styles.App}>
      <div className={styles.App__header}>
        <img className={styles.App__logo} src={logo} alt="logo" />
        <div className={styles.App__score}>
          <span>Score: </span>
          <span>{score}</span>
        </div>
      </div>

      <div className={styles.App__birdsPanel}>
        {groupNames.map((element, index) => {
          return (
            <div
              key={Math.random()}
              className={classNames({
                [styles.App__birdsPanel__item]: true,
                [styles.App__birdsPanel__item_active]: index === birdsGroup,
              })}
            >
              {element}
            </div>
          );
        })}
      </div>
      <div className={styles.App__birdContain}>
        <div className={styles.App__birdImage}>
          <img src={birdImage} alt="" />
        </div>
        <div className={styles.App__birdDescription}>
          <div className={styles.App__birdName}>{birdName}</div>
          <div className={styles.App__birdSound}>
            <AudioPlayer
              ref={audioRef}
              autoPlayAfterSrcChange={false}
              className={styles.App__player}
              src={birdsArray[random].audio}
              showJumpControls={false}
              customAdditionalControls={[]}
              layout="horizontal-reverse"
              customProgressBarSection={[
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.CURRENT_TIME,
                RHAP_UI.VOLUME,
              ]}
              customVolumeControls={[]}
            />
          </div>
        </div>
      </div>
      <div className={styles.App__birdsList}>
        {birdsArray.map((elem, index) => {
          return (
            <div
              key={Math.random()}
              className={styles.App__birdsList__item}
              onClick={() => {
                setAnswer(index);
                setIsShowAnswer(true);
                if (elem.name === birdsArray[random].name && !isCorrect) {
                  setIsCorrect(true);
                  handleBirdsFlagsTrue(index);
                  setBirdImage(elem.image);
                  setBirdName(elem.name);
                  playCorrect(true);
                  audioRef.current.audio.current.pause();
                  setScore(score + handleCheckScore());
                } else if (elem.name !== birdsArray[random].name && !isCorrect) {
                  handleBirdsFlagsFalse(index);
                  playCorrect(false);
                }
              }}
            >
              <span
                className={classNames({
                  [styles.App__birdsList__item__circle]: true,
                  [styles.App__birdsList__item__circle_true]: birdsFlagsTrue[index],
                  [styles.App__birdsList__item__circle_false]: birdsFlagsFalse[index],
                })}
              />
              {elem.name}
            </div>
          );
        })}
      </div>
      {!isShowAnswer ? (
        <div className={styles.App__birdsAnswer}>
          Послушайте плеер.
          <br />
          Выберите птицу из списка.
        </div>
      ) : (
        <div className={styles.App__birdsAnswer}>
          <div className={styles.App__birdsAnswer__image}>
            <img src={birdsArray[answer].image} alt="" />
          </div>
          <div className={styles.App__birdsAnswer__description}>
            <div className={styles.App__birdsAnswer__description__name}>
              {birdsArray[answer].name}
            </div>
            <div className={styles.App__birdsAnswer__description__species}>
              {birdsArray[answer].species}
            </div>
            <div className={styles.App__birdsAnswer__description__audio}>
              <AudioPlayer
                preload="metadata"
                autoPlayAfterSrcChange={false}
                className={styles.App__player}
                src={birdsArray[answer].audio}
                showJumpControls={false}
                customAdditionalControls={[]}
                layout="horizontal-reverse"
                customProgressBarSection={[
                  RHAP_UI.PROGRESS_BAR,
                  RHAP_UI.CURRENT_TIME,
                  RHAP_UI.VOLUME,
                ]}
                customVolumeControls={[]}
              />
            </div>
          </div>
          <div className={styles.App__birdsAnswer__text}>{birdsArray[answer].description}</div>
        </div>
      )}
      <div
        className={classNames({
          [styles.App__nextButton]: true,
          [styles.App__nextButton_active]: isCorrect,
        })}
        onClick={() => {
          if (isCorrect) handleNextlevel();
        }}
      >
        Next level
      </div>
    </div>
  );
};

export default App;
