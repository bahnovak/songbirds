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

const App = () => {
  const [score, setScore] = useState(0);
  const [birdsGroup, setBirdsGroup] = useState(0);
  const [birdImage, setBirdImage] = useState(bird);
  const [birdName, setBirdName] = useState('*****');

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
              src="https://www.xeno-canto.org/sounds/uploaded/RLRHCUIPIY/XC512540-gawron%20Suble%2019.12.19%20%2012.35.mp3"
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
    </div>
  );
};

export default App;
