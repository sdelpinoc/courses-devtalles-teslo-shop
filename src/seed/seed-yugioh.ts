interface SeedCard {
  typeOfCard: TypesOfCard
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

  spellType?: SpellTypes

  trapType?: TrapTypes

  // Extra fields, only for this course
  price: number
  rarity: Rarities
  images: string[]
}

interface SeedCardToInsert {
  typeOfCard: TypesOfCard
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

  spellType?: SpellTypes

  trapType?: TrapTypes

  // Extra field, only for this course
  price: number
  rarity: Rarities
  images: string[]
}

// Types of monsters(some examples, not all combinations):

// Ritual:
// DRAGON/RITUAL/EFFECT

// Pendulum:
// WARRIOR/PENDULUM/Normal
// FAIR/PENDULUM/EFFECT

// Normal, Effect:
// BEAST/EFFECT
// AQUA/Normal

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
// Types/MonsterInvocation?/MonsterAbility?/MonsterSecondaryType?/MonsterPrimaryType?

export type TypesOfCard = 'MONSTER' | 'SPELL' | 'TRAP'

export type Attributes = 'LIGHT' | 'DARK' | 'WATER' | 'FIRE' | 'EARTH' | 'WIND' | 'DIVINE'

export type Types =
  'Spellcaster' | 'Dragon' | 'Zombie' | 'Warrior' |
  'Beast-Warrior' | 'Beast' | 'Winged Beast' | 'Fiend' |
  'Fairy' | 'Insect' | 'Dinosaur' | 'Reptile' |
  'Fish' | 'Sea Serpent' | 'Aqua' | 'Pyro' |
  'Thunder' | 'Rock' | 'Plant' | 'Machine' |
  'Psychic' | 'Divine-Beast' | 'Wyrm' | 'Cyberse'
// 'Illusion Type'

// Invocation
export type MonsterInvocations = 'RITUAL' | 'FUSION' | 'SYNCHRO' | 'XYZ' | 'PENDULUM' | 'LINK'

export type MonsterPrimaryTypes = 'NORMAL' | 'EFFECT' | 'PENDULUM' // Can have 2 of these
export type MonsterSecondaryTypes = 'TUNER'
export type MonsterAbilities = 'FLIP' | 'TOON' | 'SPIRIT' | 'UNION' | 'GEMINI'

// Can have 0 or more of these
export type LinkArrows =
  'Top-Left' | 'Top-Center' | 'Top-Right' |
  'Middle-Left' | 'Middle-Right' |
  'Bottom-Left' | 'Bottom-Center' | 'Bottom-Right'

export type SpellTypes = 'Continuous' | 'Equip' | 'Field' | 'Normal' | 'Quick-Play' | 'Ritual'
export type TrapTypes = 'Continuous' | 'Counter' | 'Normal'

export type Rarities = 'Normal' | 'Rare'

interface SeedData {
  typesOfCard: TypesOfCard[],
  monsterInvocations: MonsterInvocations[]
  monsterPrimaryTypes: MonsterPrimaryTypes[]
  monsterSecondaryTypes: MonsterSecondaryTypes[]
  monsterAbilities: MonsterAbilities[]
  attributes: Attributes[]
  types: Types[]
  linkArrows: LinkArrows[]
  spellTypes: SpellTypes[]
  trapTypes: TrapTypes[]
  rarities: Rarities[]
  cards: SeedCard[],
  cardsToInsert: SeedCardToInsert[]
}

export const initialData: SeedData = {
  typesOfCard: ['MONSTER', 'SPELL', 'TRAP'],
  monsterInvocations: ['RITUAL', 'FUSION', 'SYNCHRO', 'XYZ', 'PENDULUM', 'LINK'],
  monsterPrimaryTypes: ['NORMAL', 'EFFECT', 'PENDULUM'],
  monsterSecondaryTypes: ['TUNER'],
  monsterAbilities: ['FLIP', 'TOON', 'SPIRIT', 'UNION', 'GEMINI'],
  attributes: ['LIGHT', 'DARK', 'WATER', 'FIRE', 'EARTH', 'WIND', 'DIVINE'],
  types: ['Spellcaster', 'Dragon', 'Zombie', 'Warrior',
    'Beast-Warrior', 'Beast', 'Winged Beast', 'Fiend',
    'Fairy', 'Insect', 'Dinosaur', 'Reptile',
    'Fish', 'Sea Serpent', 'Aqua', 'Pyro',
    'Thunder', 'Rock', 'Plant', 'Machine',
    'Psychic', 'Divine-Beast', 'Wyrm', 'Cyberse'],
  linkArrows: ['Top-Left', 'Top-Center', 'Top-Right',
    'Middle-Left', 'Middle-Right',
    'Bottom-Left', 'Bottom-Center', 'Bottom-Right'],
  spellTypes: ['Continuous', 'Equip', 'Field', 'Normal', 'Quick-Play', 'Ritual'],
  trapTypes: ['Continuous', 'Counter', 'Normal'],
  rarities: ['Normal', 'Rare'],
  cards: [
    {
      typeOfCard: 'MONSTER',
      name: 'Baby Raccoon Ponpoko',
      cardText: `When this card is Normal Summoned: You can Special Summon 1 Level 2 Beast monster from your Deck in face-down Defense Position, except "Baby Raccoon Ponpoko". You cannot Special Summon monsters the turn you activate this effect, except Beast monsters.`,
      password: 92729410,

      attribute: 'EARTH',
      type: 'Beast',
      // MonsterInvocation: '',
      monsterPrimaryTypes: ['EFFECT'],
      // MonsterSecondaryTypes: '',
      // MonsterAbility: '',
      level: 2,
      // rank: '',
      // link: '',
      attack_points: '800',
      defense_points: '0',
      // pendulumEffect: '',
      // pendulumScale: 2,
      // linkArrows: [''],

      // SpellType: '',

      // TrapType: ''
      price: 51,
      rarity: 'Normal',
      images: ['92729410_1.jpg', '92729410_2.jpg']
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Turtle Raccoon',
      cardText: 'A cunning raccoon protected by a solid turtle shell, it attacks with deception.',
      password: 17441953,

      attribute: 'WATER',
      type: 'Aqua',
      monsterPrimaryTypes: ['NORMAL'],
      level: 3,
      attack_points: '700',
      defense_points: '900',
      price: 67,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Majespecter Orthrus - Nue',
      cardText: `2 Pendulum Monsters, including a "Majespecter" monster.
      If this card is Link Summoned: You can add up to 2 face - up "Majespecter" Pendulum Monsters from your Extra Deck to your hand, then you can add up to 2 "Majespecter" Pendulum Monsters with different names from your Deck to your face- up Extra Deck, also you cannot Special Summon from the Extra Deck for the rest of this turn, except "Majespecter" or "Dracoslayer" monsters.You can only use this effect of "Majespecter Orthrus - Nue" once per turn`,
      password: 66384688,
      attribute: 'WIND',
      type: 'Spellcaster',
      monsterInvocation: 'LINK',
      monsterPrimaryTypes: ['EFFECT'],
      link: 2,
      attack_points: '1500',
      linkArrows: ['Bottom-Left', 'Bottom-Right'],
      price: 82,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'MONSTER',
      name: 'T.G. Wonder Magician',
      cardText: `1 Tuner + 1+ non-Tuner "T.G." monsters
      If this card is Synchro Summoned: Target 1 Spell/Trap on the field; destroy that target. If this card on the field is destroyed: Draw 1 card. Once per Chain, during your opponent's Main Phase, you can (Quick Effect): Immediately after this effect resolves, Synchro Summon using this card you control.`,
      password: 98558751,
      attribute: 'LIGHT',
      type: 'Spellcaster',
      monsterInvocation: 'SYNCHRO',
      monsterPrimaryTypes: ['EFFECT'],
      monsterSecondaryTypes: 'TUNER',
      level: 5,
      attack_points: '1900',
      defense_points: '[0, 1, 2, 3]',
      price: 5,
      rarity: 'Normal',
      images: ['98558751_1.jpg', '98558751_2.jpg', '98558751_3.jpg']
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Elemental HERO Storm Neos',
      cardText: `"Elemental HERO Neos" + "Neo-Spacian Air Hummingbird" + "Neo-Spacian Aqua Dolphin"
      Must first be Special Summoned (from your Extra Deck) by shuffling the above cards you control into the Deck. (You do not use "Polymerization".) Once per turn: You can destroy all Spell and Trap Cards on the field. During the End Phase: Shuffle this card into the Extra Deck. When this card is shuffled into the Extra Deck this way: Shuffle all cards on the field into the Deck.`,
      password: 49352945,
      attribute: 'WIND',
      type: 'Warrior',
      monsterInvocation: 'FUSION',
      monsterPrimaryTypes: ['EFFECT'],
      level: 9,
      attack_points: '3000',
      defense_points: '2500',
      price: 22,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'SPELL',
      name: 'Ancient City - Rainbow Ruins',
      cardText: `You must have this many "Crystal Beast" cards in your Spell & Trap Zone to activate and to resolve these effects.
      ● 1+: This card cannot be destroyed by card effects.
      ● 2+: Once per turn (including the opponent's) you can halve the battle damage you take.
      ● 3+: When a Spell/Trap Card is activated: You can send 1 "Crystal Beast" monster you control to the GY; negate the activation, and if you do, destroy it.
      ● 4+: Once per turn, during your Main Phase: You can draw 1 card.
      ● 5: Once per turn, during your Main Phase: You can target 1 "Crystal Beast" card in your Spell & Trap Zone; Special Summon that target.`,
      password: 34487429,
      spellType: 'Field',
      price: 2,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'TRAP',
      name: 'Security Orb',
      cardText: `When your opponent's monster declares an attack: Target that attacking monster; change that target's battle position. If this Set card is destroyed by your opponent's Spell/Trap effect and sent to the GY: Destroy 1 monster on the field.`,
      password: 26533075,
      trapType: 'Normal',
      price: 10,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Ruin, Queen of Oblivion',
      cardText: `You can Ritual Summon this card with "End of the World". When this attacking card destroys an opponent's monster by battle: You can activate this effect; this card can make a second attack in a row.`,
      password: 46427957,
      attribute: 'LIGHT',
      type: 'Fairy',
      monsterInvocation: 'RITUAL',
      monsterPrimaryTypes: ['EFFECT'],
      level: 8,
      attack_points: '2300',
      defense_points: '2000',
      price: 8,
      rarity: 'Normal',
      images: ['46427957_1.jpg']
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Number 64: Ronin Raccoon Sandayu',
      cardText: `2 Level 2 Beast-Type monsters
      Once per turn: You can detach 1 Xyz Material from this card; Special Summon 1 "Kagemusha Raccoon Token" (Beast-Type/EARTH/Level 1/ATK ?/DEF [0, 1, 2, 3]). (When Summoned, its ATK becomes equal to the current ATK of the monster on the field that has the highest ATK. Your choice, if tied.) While you control another Beast-Type monster, this card cannot be destroyed by battle or card effects.`,
      password: 39972129,
      attribute: 'EARTH',
      type: 'Beast',
      monsterInvocation: 'XYZ',
      monsterPrimaryTypes: ['EFFECT'],
      rank: 2,
      attack_points: '1000',
      defense_points: '1000',
      price: 2,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Hallohallo',
      cardText: `Hallo Hallo, brain of tallow,
      Guts are gone, noggin's hollow.
      Seeking sweets and marshing mallows,
      Watch your back, and your candy sack.`,
      password: 77994337,
      attribute: 'DARK',
      type: 'Fiend',
      monsterInvocation: 'PENDULUM',
      monsterPrimaryTypes: ['NORMAL'],
      monsterSecondaryTypes: 'TUNER',
      level: 3,
      attack_points: '800',
      defense_points: '600',
      pendulumEffect: `Once per turn: You can target 1 face-up monster on the field; roll a six-sided die and that monster's Level becomes the same as the result until the end of this turn.`,
      pendulumScale: 2,
      price: 98,
      rarity: 'Normal',
      images: []
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Majespecter Raccoon - Bunbuku',
      cardText: `When this card is Normal or Special Summoned: You can add 1 "Majespecter" monster from your Deck to your hand. You can only use this effect of "Majespecter Raccoon - Bunbuku" once per turn. While this card is in your Monster Zone, your opponent cannot target it with card effects, also it cannot be destroyed by your opponent's card effects.`,
      password: 31991800,
      attribute: 'WIND',
      type: 'Spellcaster',
      monsterInvocation: 'PENDULUM',
      monsterPrimaryTypes: ['EFFECT'],
      level: 3,
      attack_points: '1200',
      defense_points: '900',
      pendulumScale: 5,
      price: 92,
      rarity: 'Normal',
      images: ['31991800_1.jpg', '31991800_2.jpg']
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Patissciel Couverture',
      cardText: `2 Pendulum Monsters
      If this card in the Monster Zone is destroyed: You can place this card in your Pendulum Zone.`,
      password: 26435595,
      attribute: 'DARK',
      type: 'Fairy',
      monsterInvocation: 'FUSION',
      monsterPrimaryTypes: ['PENDULUM', 'EFFECT'],
      level: 5,
      attack_points: '1700',
      defense_points: '700',
      pendulumEffect: `If you have no card in your other Pendulum Zone: You can place 1 face-up Pendulum Monster from your Extra Deck in your Pendulum Zone. You can only use this effect of "Patissciel Couverture" once per turn.`,
      pendulumScale: 1,
      price: 26,
      rarity: 'Normal',
      images: ['26435595_1.jpg', '26435595_2.jpg', '26435595_3.jpg', '26435595_4.jpg', '26435595_5.jpg']
    },
    {
      typeOfCard: 'MONSTER',
      name: 'Daidaratant the Ooze Giant',
      cardText: `2 Level 4 monsters
      If you can Pendulum Summon Level 4, you can Pendulum Summon this face-up card from your Extra Deck. You can detach 1 material from this card; place this card in your Pendulum Zone, then you can add 1 Pendulum Monster from your GY to the Extra Deck face-up. If this card in the Monster Zone is destroyed by battle or card effect: You can place this card in your Pendulum Zone. You can only use each effect of "Daidaratant the Ooze Giant" once per turn.`,
      password: 39943352,
      attribute: 'WATER',
      type: 'Zombie',
      monsterInvocation: 'XYZ',
      monsterPrimaryTypes: ['PENDULUM', 'EFFECT'],
      rank: 4,
      attack_points: '2400',
      defense_points: '400',
      pendulumEffect: `You can target 1 Xyz Monster you control; attach this card to it as material. You can only use this effect of "Daidaratant the Ooze Giant" once per turn`,
      pendulumScale: 3,
      price: 81,
      rarity: 'Normal',
      images: []
    },
  ],
  cardsToInsert: [
    {
      typeOfCard: 'MONSTER',
      name: 'Baby Raccoon Ponpoko',
      cardText: `When this card is Normal Summoned: You can Special Summon 1 Level 2 Beast monster from your Deck in face-down Defense Position, except "Baby Raccoon Ponpoko". You cannot Special Summon monsters the turn you activate this effect, except Beast monsters.`,
      password: 92729410,

      attribute: 'EARTH',
      type: 'Beast',
      // monsterInvocation: '',
      monsterPrimaryTypes: ['EFFECT'],
      // monsterSecondaryTypes: '',
      // monsterAbility: '',
      level: 2,
      // rank: '',
      // link: '',
      attack_points: '800',
      defense_points: '0',
      // pendulumEffect: '',
      // pendulumScale: 2,
      // linkArrows: [''],

      // spellType: '',

      // trapType: ''
      price: 51,
      rarity: 'Normal',
      images: ['92729410_1.jpg', '92729410_2.jpg']
    }
  ]
}