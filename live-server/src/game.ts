import { v4 as uuidv4 } from 'uuid';
import { Game, Player, Avatar } from "./types";

type CreateGameParams = {
  code: string,
}

export const createGame = ({ code }: CreateGameParams): Game => ({
  code,
  players: {},
  playersBySocket: {},
  lastUpdate: new Date().getTime(),
});

type CreatePlayerParams = {
  name: string,
  socketId: string,
}

const randomInt = (max: number): number => (
  Math.floor(Math.random() * Math.floor(max))
);

const pickRandom = <T>(array: T[]) => array[randomInt(array.length)];

const createAvatar = (): Avatar => {
  const topTypes = [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairMiaWallace',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
  ];
  const accessoriesTypes = [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ];
  const hairColors = [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray',
  ];
  const facialHairTypes = [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMajestic',
    'MoustacheFancy',
    'MoustacheMagnum',
  ];
  const clotheTypes = [
    'BlazerSweater',
    'BlazerShirt',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck',
  ];
  const clotheColors = [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White',
  ];
  const eyeTypes = [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky',
  ];
  const eyebrowTypes = [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural',
  ];
  const mouthTypes = [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit',
  ];
  const skinColors = [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black',
  ];

  return {
    topType: pickRandom(topTypes),
    accessoriesType: pickRandom(accessoriesTypes),
    hairColor: pickRandom(hairColors),
    facialHairType: pickRandom(facialHairTypes),
    clotheType: pickRandom(clotheTypes),
    clotheColor: pickRandom(clotheColors),
    eyeType: pickRandom(eyeTypes),
    eyebrowType: pickRandom(eyebrowTypes),
    mouthType: pickRandom(mouthTypes),
    skinColor: pickRandom(skinColors),
  };
}

export const createPlayer = ({ socketId, name }: CreatePlayerParams): Player => ({
  id: uuidv4(),
  socketId,
  name,
  points: 0,
  avatar: createAvatar(),
});
