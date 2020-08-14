import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import styles from './App.module.scss';
import logo from '../../img/logo.png';
import bird from '../../img/bird.jpg';
import birdsData from '../../data/birdsData';

const groupNames = [
  'Разминка',
  'Воробьиные',
  'Лесные птицы',
  'Певчие птицы',
  'Хищные птицы',
  'Морские птицы',
];

function randomInt() {
  const rand = -0.5 + Math.random() * 6;
  return Math.round(rand);
}

const random = randomInt();

const App = () => {
  const [score, setScore] = useState(0);
  const [birdsGroup, setBirdsGroup] = useState(0);
  const [birdImage, setBirdImage] = useState(bird);
  const [birdName, setBirdName] = useState('*****');
  const [birdsArray, setBirdsArray] = useState(birdsData[0]);

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
        {birdsArray.map((elem) => {
          return (
            <div className={styles.App__birdsList__item}>
              <span
                className={classNames({
                  [styles.App__birdsList__item__circle]: true,
                  [styles.App__birdsList__item__circle_true]: false,
                  [styles.App__birdsList__item__circle_false]: false,
                })}
              />
              {elem.name}
            </div>
          );
        })}
      </div>
      <div className={styles.App__birdsAnswer}>
        <div className={styles.App__birdsAnswer__image}>
          <img src={birdsArray[0].image} alt="" />
        </div>
        <div className={styles.App__birdsAnswer__description}>
          <div className={styles.App__birdsAnswer__description__name}>{birdsArray[0].name}</div>
          <div className={styles.App__birdsAnswer__description__species}>
            {birdsArray[0].species}
          </div>
          <div className={styles.App__birdsAnswer__description__audio}>
            <AudioPlayer
              className={styles.App__player}
              src={birdsArray[0].audio}
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
        <div className={styles.App__birdsAnswer__text}>{birdsArray[0].description}</div>
      </div>
      <div className={styles.App__nextButton}>Next level</div>
    </div>
  );
};

export default App;
