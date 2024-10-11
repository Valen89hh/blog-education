"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import CheckBox from "@/components/forms/checkbox";
import Field from "@/components/forms/field";
import { useFormFields, Validators } from "@/hooks/use-form-field";
import { Facebook, Instagram, Twitter } from "lucide-react";
import PostLatest from "./post-latest";

interface FormSchema{
    email: string
}

const validator: Validators<FormSchema> = {
    email: (value)=> !value ? "El email es requerido" : null
}

const SidePost = () => {

    const {handleSubmit, setFieldValue, fields} = useFormFields<FormSchema>({
        email: ""
    }, validator)

    const onSubmit = (data: FormSchema)=>{
        console.log(data)
    }

    return ( 
        <aside className="hidden lg:block col-span-2 space-y-[4rem]">
            <div>
                <h2 className="text-xl">Follow Us</h2>
                <ul className="flex items-center my-2 justify-between text-onyx-dark">
                    <li className="flex justify-center items-center gap-1">
                        <Facebook size={22}/>
                        <span>10</span>
                    </li>
                    <li className="flex justify-center items-center gap-1">
                        <Twitter size={22}/>
                        <span>1.2K</span>
                    </li>
                    <li className="flex justify-center items-center gap-1">
                        <Instagram size={22}/>
                        <span>10K</span>
                    </li>
                </ul>
            </div>
            <form onSubmit={e=>handleSubmit(e, onSubmit)} className="space-y-2 flex flex-col">
                <p>Subscription Subscribe to our newsletter and receive a selection of cool articles every weeks
                </p>
                <Field 
                    type="email"
                    placeholder="Enter yout email"
                    value={fields.email.value}
                    error={fields.email.error}
                    onChange={(e)=> setFieldValue("email",e.target.value)}
                />
                <ButtonPrimary className="uppercase">
                    Suscribirse
                </ButtonPrimary>
                <CheckBox placeholder="By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form."/>
            </form>
            <PostLatest/>
        </aside>
     );
}
 
export default SidePost;