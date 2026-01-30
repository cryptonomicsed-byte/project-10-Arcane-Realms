export interface Character {
  id: string;
  name: string;
  class: string;
  race: string;
  description: string;
  skills: string[];
  backstory: string;
  image?: string;
}

export const PREDEFINED_CHARACTERS: Character[] = [
  {
    id: "char_001",
    name: "Theron the Bold",
    class: "Warrior",
    race: "Human",
    description: "A seasoned knight with battle scars and unwavering courage",
    skills: ["Sword Mastery", "Shield Defense", "Battle Cry", "Intimidation"],
    backstory: "Once served the kingdom, now seeking redemption for past sins",
  },
  {
    id: "char_002",
    name: "Elara Silverbow",
    class: "Ranger",
    race: "Elf",
    description: "Swift archer with mystical connection to the forest",
    skills: ["Archery", "Tracking", "Animal Companion", "Nature Sense"],
    backstory: "Guardian of the ancient woods, defender of forgotten secrets",
  },
  {
    id: "char_003",
    name: "Malbor the Arcane",
    class: "Wizard",
    race: "Human",
    description: "Brilliant mage shrouded in mystery and ancient knowledge",
    skills: ["Fireball", "Teleportation", "Mana Shield", "Spell Analysis"],
    backstory: "Exiled from the Mage's Tower for forbidden experiments",
  },
  {
    id: "char_004",
    name: "Keira Shadowstep",
    class: "Rogue",
    race: "Human",
    description: "Silent assassin with unmatched stealth and cunning",
    skills: ["Backstab", "Picklock", "Stealth", "Poison Craft"],
    backstory: "Former spy for the crown turned mercenary of conscience",
  },
  {
    id: "char_005",
    name: "Brother Aldwin",
    class: "Cleric",
    race: "Dwarf",
    description: "Holy priest devoted to healing and divine protection",
    skills: ["Healing", "Blessing", "Divine Shield", "Resurrection"],
    backstory: "Wandering cleric seeking redemption through good deeds",
  },
  {
    id: "char_006",
    name: "Grendak Ironborn",
    class: "Barbarian",
    race: "Orc",
    description: "Fierce warrior with primal strength and tribal honor",
    skills: ["Rage", "Crushing Blow", "Intimidation", "Survival"],
    backstory: "Ousted from clan, proving worth through legendary battles",
  },
  {
    id: "char_007",
    name: "Lyssa the Bard",
    class: "Bard",
    race: "Halfling",
    description: "Charming entertainer with magical musical talents",
    skills: ["Performance", "Charm", "Illusion", "Diplomacy"],
    backstory: "Wandering minstrel with a hidden noble past",
  },
  {
    id: "char_008",
    name: "Zephyr Windwhisper",
    class: "Sorcerer",
    race: "Elf",
    description: "Innate magic user with volatile elemental powers",
    skills: ["Lightning Bolt", "Wind Control", "Arcane Burst", "Spell Weaving"],
    backstory: "Born with magic, learning to harness ancient bloodline powers",
  },
  {
    id: "char_009",
    name: "Dorn Stonebreaker",
    class: "Monk",
    race: "Dwarf",
    description: "Disciplined martial artist with monastic training",
    skills: ["Unarmed Combat", "Meditation", "Chi Flow", "Acrobatics"],
    backstory: "Monastery outcast seeking enlightenment through adventure",
  },
  {
    id: "char_010",
    name: "Isadora Nightwish",
    class: "Warlock",
    race: "Half-Elf",
    description: "Mysterious figure bound to ancient eldritch powers",
    skills: ["Eldritch Blast", "Hex", "Pact Powers", "Dark Rituals"],
    backstory: "Made a deal with unknown entity, seeking to break free",
  },
  {
    id: "char_011",
    name: "Cedric Goldleaf",
    class: "Paladin",
    race: "Human",
    description: "Holy warrior devoted to justice and virtue",
    skills: ["Holy Smite", "Divine Bond", "Protection", "Righteousness"],
    backstory: "Sacred oath-keeper fighting against encroaching darkness",
  },
  {
    id: "char_012",
    name: "Whisper",
    class: "Assassin",
    race: "Tiefling",
    description: "Infernal heritage hidden by exceptional stealth",
    skills: ["Lethal Strike", "Shadow Blending", "Poison Mastery", "Silent Kill"],
    backstory: "Escaped slavery, using deadly skills to help the oppressed",
  },
  {
    id: "char_013",
    name: "Magnus Firehammer",
    class: "Druid",
    race: "Human",
    description: "Nature's guardian with shapeshifting abilities",
    skills: ["Shapeshifting", "Nature Magic", "Animal Form", "Healing"],
    backstory: "Defender of balance between civilization and wilderness",
  },
  {
    id: "char_014",
    name: "Kael Starborn",
    class: "Artificer",
    race: "Gnome",
    description: "Brilliant inventor crafting magical contraptions",
    skills: ["Crafting", "Gadgetry", "Enchantment", "Innovation"],
    backstory: "Seeking rare materials to power revolutionary creations",
  },
  {
    id: "char_015",
    name: "Seraphine Duskblade",
    class: "Knight",
    race: "Half-Elf",
    description: "Dual-wielding swordmaster with grace and power",
    skills: ["Dual Wield", "Swordcraft", "Counter", "Riposte"],
    backstory: "Retired noble turned wandering protector of the weak",
  },
  {
    id: "char_016",
    name: "Thorax the Colossal",
    class: "Titan",
    race: "Giant-Blooded",
    description: "Massive warrior with legendary strength",
    skills: ["Crushing", "Earthquake", "Hurling", "Resilience"],
    backstory: "Shunned for size, finding purpose in heroic deeds",
  },
  {
    id: "char_017",
    name: "Morvanna the Wise",
    class: "Enchantress",
    race: "Human",
    description: "Ancient mage with mastery over mind and essence",
    skills: ["Mind Magic", "Enchantment", "Soul Binding", "Foresight"],
    backstory: "Centuries old, witnessing ages of war and wonder",
  },
  {
    id: "char_018",
    name: "Rakis Shadowborn",
    class: "Vampire",
    race: "Undead",
    description: "Cursed immortal seeking freedom from eternal hunger",
    skills: ["Blood Magic", "Night Vision", "Charm", "Regeneration"],
    backstory: "Turned against will, now defying dark master's control",
  },
  {
    id: "char_019",
    name: "Finley the Fortunate",
    class: "Rogue-Gambler",
    race: "Halfling",
    description: "Lucky scoundrel with uncanny fortune",
    skills: ["Luck Manipulation", "Con Artist", "Sleight of Hand", "Gambling"],
    backstory: "Running from loan sharks and dangerous debts",
  },
  {
    id: "char_020",
    name: "Valorian Sunspear",
    class: "Crusader",
    race: "Human",
    description: "Righteous warrior channeling divine radiance",
    skills: ["Holy Light", "Divine Wrath", "Consecration", "Judgment"],
    backstory: "On a sacred quest to vanquish an ancient evil",
  },
];

export function getCharacterById(id: string): Character | undefined {
  return PREDEFINED_CHARACTERS.find((char) => char.id === id);
}

export function getRandomCharacter(): Character {
  return PREDEFINED_CHARACTERS[Math.floor(Math.random() * PREDEFINED_CHARACTERS.length)];
}
