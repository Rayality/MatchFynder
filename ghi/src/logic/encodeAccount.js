function encodeAccount(password) {
  let token = '';
  for (let char of password) {
    let ascii = char.charCodeAt()
    let numCode = ascii * 5
    while (numCode > 125) {
      numCode -= 112
    }
    token += String.fromCharCode(numCode)
  }

  return token;
}

export { encodeAccount }
