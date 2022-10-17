import * as bcrypt from 'bcrypt';

export function comparePassword(enteredPassword: string, hash: string) {
  return bcrypt.compareSync(enteredPassword, hash);
}

// export function hashPassword(password: string) {
//   const hashPassword = bcrypt.hash(password, 10);
//   return hashPassword;
// }
