/**
 * Check username is valid 
 * @param     {string} username 
 * @returns   boolean
 * @see       https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
 */
module.exports = username => {
  const u = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  return u.test(username)
}