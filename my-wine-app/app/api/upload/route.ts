import { writeFile } from "fs/promises";
import { join } from "path";

type Body = {
    image: string,
    filename: string,
};

// Converts Base64 string to binary data
function base64ToBuffer(base64: string): Buffer | null {
    // Split the string on the comma and take the second part, the actual Base64 data
    const matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

    if (matches && matches.length === 3) {
        // If the Base64 string is valid, create a buffer from the Base64 part
        return Buffer.from(matches[2], "base64");
    };
    // If the input string does not match the expected pattern, return null or throw an error
    return null;
};

export async function POST(request: Request) {
    // Parse the JSON body from the request and assert its type.
    const data = (await request.json()) as Body;

    // Convert the Base64-encoded image data from the request into a buffer.
    const imageBuffer = base64ToBuffer(data.image);

    // Check if the image buffer is not empty.
    if (imageBuffer) {
        const filename = data.filename;

        // Construct the file path where the image will be saved.
        const filePath = join(process.cwd(), "public", "uploads", filename);

        // Write the image file to the disk in the specified path.
        await writeFile(filePath, filename);

        // Return a success response with the name of the uploaded file.
        return new Response(
            JSON.stringify({
                message: `Image uploaded successfully! Filename: ${filename}, FilePath: ${filePath}`,
                name: filename,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } else {
        // Return an error response if the image data is invalid or missing.
        return new Response(
            JSON.stringify({
                error: "Invalid data image provided",
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}