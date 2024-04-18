export interface Card {
  id: string
  typeOfCard: TypeOfCard
  name: string
  password: number
  cardText: string

  attribute?: Attributes
  type?: Types
  monsterInvocation?: MonsterInvocations
  monsterPrimaryTypes?: MonsterPrimaryTypes[]
  monsterSecondaryTypes?: MonsterSecondaryTypes
  monsterAbility?: MonsterAbilities
  level?: number
  rank?: number
  link?: number
  attack_points?: string
  defense_points?: string

  pendulumEffect?: string
  pendulumScale?: number

  linkArrows?: LinkArrows[]

  SpellType?: SpellTypes

  TrapType?: TrapTypes

  price: number,
  rarity: Rarities
  images: string[]
  inStock: number
}

// Types of monsters(some examples, not all combinations):

// Ritual:
// DRAGON/RITUAL/EFFECT

// Pendulum:
// WARRIOR/PENDULUM/NORMAL
// FAIR/PENDULUM/EFFECT

// Normal, Effect:
// BEAST/EFFECT
// AQUA/NORMAL

// FAIRY/SPIRIT/EFFECT
// WARRIOR/TOON/EFFECT
// MACHINE/UNION/EFFECT
// ROCK/FLIP/EFFECT
// WINGED BEAST/GEMINI/EFFECT

// Xyz:
// BEAST/XYZ/EFFECT
// DRAGON/XYZ/PENDULUM/EFFECT

// Link:
// SPELLCASTER/LINK/EFFECT

// Synchro:
// SPELLCASTER/SYNCHRO/TUNER/EFFECT

// Ritual:
// INSECT/RITUAL

// Fusion:
// BEAST-WARRIOR/FUSION/EFFECT
// DRAGON/FUSION/PENDULUM/EFFECT

// ? => Optional
// Types/MonsterInvocation?/MonsterAbilities?/MonsterSecondaryType?/MonsterPrimaryType?

export type TypeOfCard = 'MONSTER' | 'SPELL' | 'TRAP'

// Invocation
export type MonsterInvocations = 'RITUAL' | 'FUSION' | 'SYNCHRO' | 'XYZ' | 'PENDULUM' | 'LINK'

// Can have 0 or more of these
export type MonsterPrimaryTypes = 'NORMAL' | 'EFFECT' | 'PENDULUM' 
export type MonsterSecondaryTypes = 'TUNER'
export type MonsterAbilities = 'FLIP' | 'TOON' | 'SPIRIT' | 'UNION' | 'GEMINI'

export type Attributes = 'LIGHT' | 'DARK' | 'WATER' | 'FIRE' | 'EARTH' | 'WIND' | 'DIVINE'
export type Types =
  'Spellcaster' | 'Dragon' | 'Zombie' | 'Warrior' |
  'Beast-Warrior' | 'Beast' | 'Winged Beast' | 'Fiend' |
  'Fairy' | 'Insect' | 'Dinosaur' | 'Reptile' |
  'Fish' | 'Sea Serpent' | 'Aqua' | 'Pyro' |
  'Thunder' | 'Rock' | 'Plant' | 'Machine' |
  'Psychic' | 'Divine-Beast' | 'Wyrm' | 'Cyberse'
  // 'Illusion'

// Can have 0 or more of these
export type LinkArrows =
  'Top-Left' | 'Top-Center' | 'Top-Right' |
  'Middle-Left' | 'Middle-Right' |
  'Bottom-Left' | 'Bottom-Center' | 'Bottom-Right'

export type SpellTypes = 'Continuous' | 'Equip' | 'Field' | 'Normal' | 'Quick-Play' | 'Ritual'
export type TrapTypes = 'Continuous' | 'Counter' | 'Normal'

export type Rarities = 'Normal' | 'Rare'