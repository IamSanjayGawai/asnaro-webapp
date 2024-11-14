export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const base64String = reader.result as string;
        resolve(base64String);
      } else {
        reject(new Error("Failed to read the file."));
      }
    };

    reader.readAsDataURL(file);
  });
}
