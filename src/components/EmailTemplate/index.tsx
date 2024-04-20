import * as React from "react";

interface EmailTemplateProps{
    buttonUrl: string,
    name: string,
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({buttonUrl,name,}) => (

    <div
    style={{
        padding: "20px",
        backgroundColor:"white",
        display:"grid",
        justifyItems:"center"
    }}
    >
        <h1>Welcome,{name}</h1>
        <p>We are glad you choose us to live this amazing experience of knowing our city driving a motorcycle. 

            You will have all the information you need to know attached to this email. 

            Hope you have a wonderful day.
        </p>
        <span style={{textAlign:"center"}}>
             Contact us via WhatsApp through the following
        </span>
        <a href={buttonUrl} style={{margin:"10px auto"}}>
        <button>WhatsApp</button>
        </a>
    </div>
)