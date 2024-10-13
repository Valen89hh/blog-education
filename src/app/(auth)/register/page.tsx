"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import ButtonSocial from "@/components/buttons/button-social";
import CheckBox from "@/components/forms/checkbox";
import Field from "@/components/forms/field";
import FieldPassword from "@/components/forms/field-password";
import { useFormFields, Validators } from "@/hooks/use-form-field";
import Link from "next/link";
import { useTransition } from "react";
import { registerWithCredentials, signInWithGithub, signInWithGoogle } from "../actions";

interface RegisterSchema {
    name: string
    email: string,
    password: string
}

const validators: Validators<RegisterSchema> = {
    name: (value)=> !value ? "El nombre es requerido" : null,
    email: (value)=>{
        if(!value) return "El email es requerido"
        return null
    },
    password: (value)=> {
        if(!value) return "La contraseña es requerida"
        if(value.length < 6) return "La constraseña debe tener al menos 6 caracteres"
        return null
    }
} 

const RegisterPage = () => {
    const [loading, startLoading] = useTransition()
    const {setFieldValue, handleSubmit, fields} = useFormFields<RegisterSchema>({
        email: "",
        password: "",
        name: ""
    }, validators)

    const onSubmit = (data: RegisterSchema)=>{
        console.log(data)
        startLoading(async()=>{
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("email", data.email)
            formData.append("password", data.password)
            await registerWithCredentials(formData)
        })
        
    }

    return ( 
        <form onSubmit={e=>handleSubmit(e, onSubmit)} className="space-y-4">
            <div>
                <h2 className="text-xl">Bienvenido</h2>
                <h1 className="text-3xl mt-2 font-bold">Register</h1>
                <p>Empieza a aprender m&aacute;s</p>
            </div>
            <Field 
                id="name"
                label="Nombre" 
                placeholder="Ingresa tu nombre"
                value={fields.name.value}
                error={fields.name.error}
                onChange={e=>setFieldValue("name",e.target.value)}
            />
            <Field 
                id="email"
                label="Email" 
                placeholder="Ingresa tu email"
                type="email"
                value={fields.email.value}
                error={fields.email.error}
                onChange={e=>setFieldValue("email",e.target.value)}
            />
            <FieldPassword
                id="password"
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                value={fields.password.value}
                error={fields.password.error}
                onChange={e=>setFieldValue("password",e.target.value)}
            />
            <ButtonPrimary isLoading={loading} className="w-full py-3 text-lg">Register</ButtonPrimary>
            <div className="flex flex-col xs:flex-row gap-2">
                <ButtonSocial onClick={async()=>signInWithGoogle()} type="button" icon="google"/>
                <ButtonSocial onClick={async()=>signInWithGithub()} type="button" icon="github"/>
            </div>
            <p className="text-sm text-center">Ya tienes una cuenta? <Link href={"/login"} className="font-semibold hover:underline">Inicia</Link> </p>
        </form>
     );
}
 
export default RegisterPage;