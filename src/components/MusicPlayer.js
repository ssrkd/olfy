import { Player, start } from "tone";

let players;

export const initMusic = async () => {
  await Tone.start();

  if (!players) {
    players = {
      intro: new Tone.Player("/intro.mp3").toDestination(),
      section1: new Tone.Player("/section1.mp3").toDestination(),
      section2: new Tone.Player("/section2.mp3").toDestination(),
    };

    // Ждём загрузки всех плееров
    await Promise.all(
      Object.values(players).map(
        (player) =>
          new Promise((resolve) => {
            player.onload = resolve;
          })
      )
    );

    // Устанавливаем повторение и запускаем intro
    Object.values(players).forEach((p) => (p.loop = true));
    players.intro.start();
  }
};

export const switchMusic = (section) => {
  if (!players) return;

  Object.entries(players).forEach(([key, player]) => {
    if (key === section) {
      if (player.state !== "started") player.start();
    } else {
      if (player.state === "started") player.stop();
    }
  });
};