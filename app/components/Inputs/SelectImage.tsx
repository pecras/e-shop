"use client";

import { ImageType } from "@/app/admin/add-products/addProductForm";
import { useCallback } from "react";
import {useDropzone} from "react-dropzone";

interface SelectImageProps{
    item?: ImageType;
    handleFileChange: (value: File) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({item, handleFileChange}) => {

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0){
            handleFileChange(acceptedFiles[0]);
        }
      }, []);
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, 
    accept: {"image/*" : [".jpeg",".png"]},
    });

    return (<div {...getRootProps()} className="border-2 border-slate-700 p-2 border-dashed cursor-pointer text-xs font-normal text-slate-800 flex items-center justify-center">
        <input {...getInputProps()}/>
        {isDragActive ? (<p>Carregando...</p>) : (<p> {item?.color }<br/>Seleciones as Imagens</p>)}
    </div>)
}
export default SelectImage;