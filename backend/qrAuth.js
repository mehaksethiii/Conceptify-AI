import speakeasy from 'speakeasy';
import QRCode from 'qrcode';

// Store QR secrets (use database in production)
const qrSecrets = new Map();

export const generateQRCode = async (email) => {
  const secret = speakeasy.generateSecret({
    name: `Conceptify AI (${email})`,
    issuer: 'Conceptify AI'
  });

  qrSecrets.set(email, secret.base32);

  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

  return {
    qrCode: qrCodeUrl,
    secret: secret.base32,
    email
  };
};

export const verifyQRToken = async (email, token) => {
  const secret = qrSecrets.get(email);
  if (!secret) {
    return false;
  }

  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2
  });
};

export const hasQRSetup = (email) => {
  return qrSecrets.has(email);
};
