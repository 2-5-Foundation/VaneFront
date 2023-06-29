import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "vanetrustdemo@gmail.com",
      pass: "Lukashi69"
    }
});

const sendMail = async(email:string) =>{
    const info = await transporter.sendMail({
        from: "vanetrustdemo@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}

export async function POST(request:Request,{params}){
    const email = params.id
    const info = sendMail(email).catch(err => console.log(err))
 
    return NextResponse.json(info)
}
  