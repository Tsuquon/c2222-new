// export default async (text, derivedKey) => {
//     const encodedText = new TextEncoder().encode(text);
  
//     const encryptedData = await window.crypto.subtle.encrypt(
//       { name: "AES-GCM", iv: new TextEncoder().encode("Initialization Vector") },
//       derivedKey,
//       encodedText
//     );
  
//     const uintArray = new Uint8Array(encryptedData);
  
//     const string = String.fromCharCode.apply(null, uintArray);
  
//     const base64Data = btoa(string);
  
//     return base64Data;
//   };

export default async (text, derivedKey) => {
  const encodedText = new TextEncoder().encode(text);

  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    derivedKey,
    encodedText
  );

  const uintArray = new Uint8Array(encryptedData);

  const string = String.fromCharCode.apply(null, uintArray);

  const base64Data = btoa(string);

  return { base64Data, initializationVector: Array.from(iv) };
};