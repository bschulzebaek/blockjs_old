const CHARACTERS = 'abcdef01234567890123456789';
const SEED_LENGTH = 12;

export default function generateSeed(): string {
    let seed = '';

    for (let i = 0; i < SEED_LENGTH; i++) {
        seed += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return seed;
}