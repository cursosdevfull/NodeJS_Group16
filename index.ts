import * as bcrypt from 'bcryptjs';

const hash = bcrypt.hashSync("12345", 10);
console.log("hash", hash);

const valido = bcrypt.compareSync(
  "12345",
  //"$2a$10$waNkLP0O8qyOuEvPZYK8Su7NLVh3zLUw4Lm0R62WToHUIIZJA83xG"
  "$2a$10$IuR1qXZrfxZKu4d6ZUCp4uWh4RWnHrSuue6fYJdSakMUpakYe8ODC"
);
console.log("valido", valido);
