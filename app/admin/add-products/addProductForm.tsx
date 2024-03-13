"use client";

import Heading from "@/app/components/Haeding";
import CategoryInput from "@/app/components/Inputs/CategoryInput";
import CustomCheckBox from "@/app/components/Inputs/CustomCheckbox";
import Input from "@/app/components/Inputs/Inputs";
import TextArea from "@/app/components/Inputs/TextArea";
import Button from "@/app/components/Button/Button";
import { firebaseApp } from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { colors } from "@/utils/Colors";
import SelectColor from "@/app/components/Inputs/SelectorColor";
import { useRouter } from "next/navigation";
import axios from "axios";



export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
};
export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
};

const AddProductForm = () => {
   const router = useRouter(); 
   const [isLoading, setIsLoading] = useState(false);
   const [images, setImages] = useState<ImageType[] | null>();
   const [isProductCreated, setIsProductCreated] = useState(false);
   
  

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues:{
            name: "",
            description: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
            price: "",
        }
    });



    useEffect(() =>{
        setCustomValue("images", images);
    },[images]);

    useEffect(()=>{
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    },[isProductCreated]);







    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log("produkt data", data);
       


        
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error("Escolha uma categoria");
        }
        if(!data.images || data.images.length === 0){
            setIsLoading(false)
            return toast.error("Selecione ao menos uma Imagem ");
        }

        const handleImageUploads = async () => {
            toast("Adicione um produto...");
            try{
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + "-" + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef =  ref(storage, `/products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                      case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                      case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log("erro de leitura", error)
                                    reject(error)
                                  }, 
                                  () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL,
                                        });
                                      console.log('File available at', downloadURL);
                                      resolve();
                                    }
                                    ).catch((error)=>{
                                        console.log("Error getting the downloar URL", error);
                                        reject(error);
                                    });
                                  }
                            );

                        });
                    }
                }
            }catch(error){
                 setIsLoading(false)
                 console.log("Error handling image uploads", error);
                 return toast.error("Error handling image uploads"); 
            }
        };

        await handleImageUploads();
        const productData = {...data, images: uploadedImages};



            //zapisanie w mongodb
            axios.post("/api/product", productData).then(()=>{
                toast.success("Produto adicionado com sucesso");
                setIsProductCreated(true);
                router.refresh();
            }).catch((error)=>{
                toast.error("erro ao adicionar o produto")
            }).finally(()=>{
                setIsLoading(false);
            })
    };



    

    const category = watch("category");
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,

        });
    }



    const addImageToState = useCallback((value: ImageType)=>{
        setImages((prev)=>{
            if(!prev){
                return [value]
            }
            return[...prev, value]
        })
    },[]);

    const removeImageFromState = useCallback((value: ImageType)=>{
        setImages((prev)=>{
            if(prev){
                const filteredImages = prev.filter((item)=> item.color !== value.color)
                return filteredImages;
            }
            return prev;
        })
    },[]);


    return ( 
        <>
    <Heading title="Adicionar Produto" center/>
        <Input 
        id="name"
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

        <Input 
        id="price"
        label="Preço"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
        />

        <Input 
        id="brand"
        label="Marca"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />

        <TextArea 
        id="description"
        label="descrição"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
       
                <CustomCheckBox id="inStock" register={register} label="Têm produto em estoque"/>

        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">
               Selecione a Categoria
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 max-h[50vh] overflow-auto">
                {categories.map((item)=>{
                 if(item.label==='tudo'){ 
                 return null}
                    return <div key={item.label} className="col-span">
                        <CategoryInput 
                        onClick={(category)=>setCustomValue("category",category)}
                        selected={category === item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    </div>;
                })}
            </div>
        </div>

        <div className="w-full flex-col flex-wrap gap-4">
             <div className="font-bold">
                <div>
                  Selecione a cor do produto<br/>
                  <p>Selecione a cor do produto que foi feito o Upload e selecione </p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                {colors.map((item, index)=>{
                    return <SelectColor key={index} item={item} 
                    addImageToState = {addImageToState}
                    removeImageFromState={removeImageFromState} 
                    isProductCreated = {isProductCreated}
                        />;
                    })}
             </div>

        </div>
        <Button 
        label={isLoading? "Lendo..." : "Adicionar Produto"} 
        onClick={handleSubmit(onSubmit)}/>
    </> 
    );
};
 
export default AddProductForm;