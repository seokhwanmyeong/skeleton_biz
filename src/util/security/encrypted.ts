import CryptoJS from "crypto-js";

const encryptedHandler = (data: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_API_KEY_SECRET
  ).toString();

  return encrypted;
};

const dencryptedDataHandler = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    import.meta.env.VITE_API_KEY_SECRET
  );

  const dencrypted = bytes.toString(CryptoJS.enc.Utf8);

  return dencrypted;
};

export { encryptedHandler, dencryptedDataHandler };
