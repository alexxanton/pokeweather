const random = () => Math.floor(Math.random() * 800) + 1;

for (let i = 0; i < 100; i++) {
    console.log(`INSERT INTO pokemon (specie, level, user_fk) VALUES (${random()}, 5, 2);`)
}
