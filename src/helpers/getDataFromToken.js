import { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import from 'jose'

export const getDataFromToken = async (request) => {
    try {
        const token = request.cookies.get("farmersAitoken")?.value || "";

        if (!token) {
            return null;
        }

        // Encode the secret key for jose
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        
        // Verify the token using jose
        const { payload } = await jwtVerify(token, secret);
        
        // Return the user's ID from the token payload
        return payload.id;

    } catch (error) {
        // Log the error but return null, treating any error as an invalid token
        console.error('JWT Verification Error:', error.message);
        return null;
    }
};
