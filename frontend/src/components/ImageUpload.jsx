import { IKContext, IKUpload } from "imagekitio-react";

export default function ImageUpload({ onUploadSuccess, folder }) {

  const authenticator = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/imagekit/auth");
    if (!res.ok) throw new Error("Auth failed");
    return res.json();
  };

  return (
    <IKContext
      publicKey="public_2xPZF088ww78Fkvl8+ovB8Gw9QM="
      urlEndpoint="https://ik.imagekit.io/zsds1qz3i"
      authenticator={authenticator}
    >
      <IKUpload
        fileName={"product_" + Date.now()}
        folder={folder}
        useUniqueFileName
        onSuccess={(res) => onUploadSuccess(res.url)}
        onError={(err) => console.error(err)}
      />
    </IKContext>
  );
}
