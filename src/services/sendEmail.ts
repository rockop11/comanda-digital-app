import emailjs from '@emailjs/browser';

export const sendEmail = async (data: Record<string, unknown>) => {
    return emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
};
