const QR = require("qrcode");

class QRCode {
  static async generateQRCode(data) {
    try {
      return await QR.toDataURL(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = QRCode;
