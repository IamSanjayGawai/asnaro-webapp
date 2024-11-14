
import { v4 as uuidv4 } from 'uuid';
// Function to generate a unique numeric ID from UUID
export const generateUniqueNumericId = () => {
    const uuid = uuidv4(); // Generate UUID
    const numericId = uuid.replace(/-/g, '').split('').reduce((acc, char) => acc + char.charCodeAt(0).toString(), '');
    return parseInt(numericId.slice(0, 16), 10); // Limit to 16 digits to ensure it's a manageable integer
  };
  