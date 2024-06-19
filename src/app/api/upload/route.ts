import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configurar cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: any) {
  try {
    const data = await req.formData();
    const imagesUrl= [];

    // Iterar sobre todas las imágenes recibidas
    for (const [name, image] of data.entries()) {
      const fileBuffer = await image.arrayBuffer();
      const mime = image.type;
      const encoding = 'base64';
      const base64Data = Buffer.from(fileBuffer).toString('base64');
      const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

      // Función para cargar la imagen a Cloudinary
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload(fileUri, { invalidate: true })
            .then((result) => {
              //console.log(result);
              resolve(result.secure_url); // Resolvemos la URL segura de la imagen
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      };

      // Cargar la imagen a Cloudinary y agregar la URL a la lista de URLs
      const imageUrl = await uploadToCloudinary();
      imagesUrl.push(imageUrl);
    }

    return NextResponse.json({ success: true, imageUrl: imagesUrl }, { status: 200 });
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
};
