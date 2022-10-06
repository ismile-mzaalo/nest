import * as bcrypt from 'bcrypt';

export function encodePassword(enteredPassword: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(enteredPassword, salt);
}

export function comparePassword(enteredPassword: string, hash: string) {
  return bcrypt.compareSync(enteredPassword, hash);
}
