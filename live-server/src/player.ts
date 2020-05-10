import { v4 as uuidv4 } from 'uuid';

export type Avatar = {
  topType: string;
  accessoriesType: string;
  hairColor: string;
  facialHairType: string;
  clotheType: string;
  clotheColor: string;
  eyeType: string;
  eyebrowType: string;
  mouthType: string;
  skinColor: string;
}

export type Player = {
  id: string;
  socketId: string;
  name: string;
  avatar: Avatar;
  points: number;
};

export type Players = {
  [id: string]: Player;
}

const TopTypes = [
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
const AccessoriesTypes = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers',
];
const HairColors = [
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
const FacialHairTypes = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum',
];
const ClotheTypes = [
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
const ClotheColors = [
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
const EyeTypes = [
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
const EyebrowTypes = [
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
const MouthTypes = [
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
const SkinColors = [
  'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black',
];

const randomInt = (max: number): number => (
  Math.floor(Math.random() * Math.floor(max))
);

const pickRandom = <T>(array: T[]): T => (
  array[randomInt(array.length)]
);

const createAvatar = (): Avatar => ({
  topType: pickRandom(TopTypes),
  accessoriesType: pickRandom(AccessoriesTypes),
  hairColor: pickRandom(HairColors),
  facialHairType: pickRandom(FacialHairTypes),
  clotheType: pickRandom(ClotheTypes),
  clotheColor: pickRandom(ClotheColors),
  eyeType: pickRandom(EyeTypes),
  eyebrowType: pickRandom(EyebrowTypes),
  mouthType: pickRandom(MouthTypes),
  skinColor: pickRandom(SkinColors),
});

type CreatePlayerParams = {
  name: string;
  socketId: string;
}

export const createPlayer = ({ socketId, name }: CreatePlayerParams): Player => ({
  id: uuidv4(),
  socketId,
  name,
  points: 0,
  avatar: createAvatar(),
});
