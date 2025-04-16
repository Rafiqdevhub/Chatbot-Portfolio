// filepath: d:\Development\Projects\AI Portfolio\src\utils\env.js
/**
 * Get an environment variable with a fallback value
 * @param {string} key - The environment variable key
 * @param {string} fallback - Fallback value if the environment variable is not set
 * @returns {string} - The environment variable value or fallback
 */
export const getEnv = (key, fallback = "") => {
  if (import.meta.env[key] === undefined && fallback === "") {
    console.warn(
      `Environment variable ${key} is not defined and no fallback provided.`
    );
  }
  return import.meta.env[key] || fallback;
};

/**
 * Check if all required environment variables are set
 * @param {string[]} required - Array of required environment variable keys
 * @returns {boolean} - Whether all required environment variables are set
 */
export const validateEnv = (required = []) => {
  let valid = true;

  required.forEach((key) => {
    if (import.meta.env[key] === undefined) {
      console.error(`Required environment variable ${key} is not defined.`);
      valid = false;
    }
  });

  return valid;
};
