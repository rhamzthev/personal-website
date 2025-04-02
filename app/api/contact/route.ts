import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        // Validate request data
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email and message are required' },
                { status: 400 }
            );
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address' },
                { status: 400 }
            );
        }

        // Configure nodemailer transport
        // For production, replace with your actual SMTP credentials
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: `Personal Website <${process.env.SMTP_USER}>`,
            to: 'rhamzthev@gmail.com', // Your receiving email
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            text: message,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Message</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: transparent; font-family: Arial, sans-serif; color: #e5e7eb;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(145deg, #1f2937, #111827); border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);">
                    <div style="border-left: 4px solid #ef4444; padding-left: 15px; margin-bottom: 20px;">
                        <h1 style="color: #ffffff; margin-top: 0; font-size: 24px; font-weight: bold;">New Message Received</h1>
                        <p style="color: #9ca3af; margin: 0;">From your personal website contact form</p>
                    </div>
                    
                    <div style="background-color: rgba(31, 41, 55, 0.7); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; width: 80px; color: #ef4444; font-weight: bold; vertical-align: top;">Name:</td>
                            <td style="padding: 8px 0; color: #e5e7eb;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; color: #ef4444; font-weight: bold; vertical-align: top;">Email:</td>
                            <td style="padding: 8px 0; color: #e5e7eb;">
                            <a href="mailto:${email}" style="color: #9ca3af; text-decoration: none; border-bottom: 1px dashed #4b5563;">${email}</a>
                            </td>
                        </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: rgba(31, 41, 55, 0.7); border-radius: 8px; padding: 20px;">
                        <h2 style="color: #ef4444; margin-top: 0; font-size: 16px; margin-bottom: 15px; font-weight: bold;">Message:</h2>
                        <div style="color: #e5e7eb; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                    </div>
                    
                    <div style="text-align: center; padding: 20px 0; color: #6b7280; font-size: 12px;">
                    <p>This is an automated message from your personal website contact form.</p>
                    <p>Simply reply to this email to respond to ${name}.</p>
                    </div>
                </div>
                </body>
                </html>
                `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}