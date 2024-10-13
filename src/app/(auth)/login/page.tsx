"use client"

import ButtonPrimary from "@/components/buttons/button-primary";
import ButtonSocial from "@/components/buttons/button-social";
import CheckBox from "@/components/forms/checkbox";
import Field from "@/components/forms/field";
import FieldPassword from "@/components/forms/field-password";
import { useFormFields, Validators } from "@/hooks/use-form-field";
import Link from "next/link";
import { useTransition } from "react";
import { loginWithCredentials, signInWithGithub, signInWithGoogle } from "../actions";

interface LoginSchema {
    email: string,
    password: string
}

const validators: Validators<LoginSchema> = {
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

const LoginPage = () => {
    const [loading, startLoading] = useTransition()
    const {setFieldValue, handleSubmit, fields} = useFormFields<LoginSchema>({
        email: "",
        password: ""
    }, validators)

    const onSubmit = (data: LoginSchema)=>{
        console.log(data)
        startLoading(async()=>{
            const formData = new FormData()
            formData.append("email", data.email)
            formData.append("password", data.password)
            await loginWithCredentials(formData)
        })
    }

    return ( 
        <form onSubmit={e=>handleSubmit(e, onSubmit)} className="space-y-6">
            <div>
                <h2 className="text-xl">Bienvenido</h2>
                <h1 className="text-3xl mt-6 font-bold">Login</h1>
                <p>Comienza a mejorar la educación</p>
            </div>
            <Field 
                id="email"
                label="Email" 
                placeholder="Ingresa tu email"
                type="email"
                value={fields.email.value}
                error={fields.email.error}
                onChange={e=>setFieldValue("email",e.target.value)}
            />
            <div className="space-y-2">
                <FieldPassword
                    id="password"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    value={fields.password.value}
                    error={fields.password.error}
                    onChange={e=>setFieldValue("password",e.target.value)}
                />
                <div className="flex justify-between items-center">
                    <CheckBox
                        placeholder="Recordarmelo"
                        classNameText="text-sm"
                        className="min-w-2 min-h-2"
                    />
                    <Link href={""} className="text-sm hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            </div>
            <ButtonPrimary isLoading={loading} className="w-full py-3 text-lg">Login</ButtonPrimary>
            <div className="flex flex-col xs:flex-row gap-2">
                <ButtonSocial onClick={async()=>signInWithGoogle()} type="button" icon="google"/>
                <ButtonSocial onClick={async()=>signInWithGithub()} type="button" icon="github"/>
            </div>
            <p className="text-sm text-center">No tienes una cuenta? <Link href={"/register"} className="font-semibold hover:underline">Registrate</Link> </p>
        </form>
     );
}
 
export default LoginPage;