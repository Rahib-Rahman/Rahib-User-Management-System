/**
 * Generate unique ID value for email verification tokens
 * @param {string} email - User email
 * @returns {string} - Unique token value
 */
function getUniqIdValue(email) {
    const uniqueString = email + Date.now() + Math.random().toString(36).substring(2, 11);
    return Buffer.from(uniqueString).toString('base64');
}

module.exports = { getUniqIdValue };