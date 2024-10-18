"use client"

import Card from "@/components/cards/card";
import { useEffect, useState, useTransition } from "react";
import {  getTotalCommentsByUser, getTotalPostSharedsByUser, getTotalPostViewsByUser } from "../actions";
import { useProfileState } from "@/storage/auth-storage";
import CardAnimation from "@/components/animations/card-animation";

interface CardPostInfoProps{
    typeInfo: "views" | "shares" | "comments"
}


const CardPostInfo: React.FC<CardPostInfoProps> = ({
    typeInfo
}) => {
    const [total, setTotal] = useState(0)
    const {profile} = useProfileState()
    const [loading, startLoading] = useTransition()

    useEffect(()=>{
        if(profile){
            startLoading(async()=>{
                let result;
                if(typeInfo == "comments"){
                    result = await getTotalCommentsByUser(profile.id)
                }else if(typeInfo == "shares"){
                    result = await getTotalPostSharedsByUser(profile.id)
                }else{
                    result = await getTotalPostViewsByUser(profile.id)
                    
                }
                if(result.success){
                    setTotal(result.data)
                }
            })
        }
    }, [typeInfo, profile])

    if(loading) return <CardAnimation className="h-[8rem]"/>

    return ( 
        <Card>
            <h3 className="font-medium text-3xl">{total}</h3>
            <p>Total posts {typeInfo}</p>
        </Card>
     );
}
 
export default CardPostInfo;