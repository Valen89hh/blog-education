import ButtonOutline from "@/components/buttons/button-outline";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface ImageSelectData{
    imgUrl: string | null,
    file: File | null,
    imgPath: string | null
}

interface SelectImageProps{
    img?: ImageSelectData,
    onChangeImage: (img: ImageSelectData)=>void
}

const SelectImage: React.FC<SelectImageProps> = ({
    img = {
        imgUrl: null,
        file: null,
        imgPath: null
    },
    onChangeImage
}) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const [image, setImage] = useState<ImageSelectData>(img)

    const handleClickFile = ()=>{
        if(fileRef.current){
            fileRef.current.click()
        }
    }

    const handleImageSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            const file = files[0]
                
            if (file && file.type.startsWith('image/')) {
                const dataImg = {imgPath: null, file: file, imgUrl: URL.createObjectURL(file)}
                setImage(dataImg)
                if(onChangeImage) onChangeImage(dataImg)
            }
        }
    };

    const handleRemoverImage = ()=>{
        const dateReset = {imgPath: null, file: null, imgUrl: null}
        setImage(dateReset)
        if(onChangeImage) onChangeImage(dateReset)
    }

    return ( 
        <div >
            <input onChange={handleImageSelected} ref={fileRef} style={{display: "none"}} type="file" accept="image/*" />
            
            {image.imgUrl ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Image
                        src={image.imgUrl}
                        alt="imagen-post"
                        width={1024}
                        height={400}
                        className="w-full sm:w-1/2 object-cover"
                    />

                    <div className="gap-4 flex-wrap flex items-center">
                        <ButtonOutline onClick={handleClickFile}>
                            Cambiar
                        </ButtonOutline>
                        <button onClick={handleRemoverImage} className="text-red-500">
                            Remover
                        </button>
                    </div>

                </div>
            ): (
                <ButtonOutline onClick={handleClickFile}>
                    Añadir imagen de portada
                </ButtonOutline>
            )}
        </div>
     );
}
 
export default SelectImage;