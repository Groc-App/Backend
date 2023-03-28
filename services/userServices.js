import { generate } from 'otp-generator';
import { createHmac } from 'crypto';
const key = "PrakharArjun";

async function createOtp(params) {

    const otp = generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    const ttl = 5 * 60 * 1000;

    const expires = Date.now() + ttl;
    const data = `${params.phone}.${otp}.${expires}`;

    const hash = createHmac("sha256", key).update(data).digest("hex")
    const fullHash = `${hash}.${expires}`;


    return fullHash;
}

async function verifyOtp(params) {

    const { phone, otp, hash } = params;

    if (phone == null || otp == null || hash == null) throw new Error("Invalid OTP")
    let [hashValue, expires] = params.hash.split('.');

    let now = Date.now();
    if (now > parseInt(expires)) {
        throw new Error("Invalid OTP")

    }

    let data = `${params.phone}.${params.otp}.${expires}`
    let newCalculateHash = createHmac("sha256", key).update(data).digest("hex");

    if (newCalculateHash == hashValue) {
        return {
            msg: "Success"
        }

    }

    throw new Error("Invalid OTP")

}

export default {
    createOtp,
    verifyOtp
}