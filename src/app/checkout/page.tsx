'use client';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { addSession, retrieveCheckoutSession } from '@/lib/copperx'; 

const CheckoutComponent = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('cx_session_id');
    const [sessionData, setSessionData] = useState(null) as any



    function getNameFromEmail(email: string) {
        const [localPart] = email.split('@');
        const name = localPart
            .split(/[^a-zA-Z0-9]+/)
            .filter(word => word)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return name;
    }


    useEffect(() => {
        if (!sessionId) return
        retrieveCheckoutSession(sessionId).then(async ({ data, error }) => { 
            if (data) { 
                const obj = {
                    sessionId: data.id,
                    amount_total: data.amountTotal,
                    createdAt: data.createdAt,
                    currency: data.currency,
                    product_details: {
                        product: data.metadata?.product,
                        email: data.metadata?.email,
                        name: data.metadata?.name,
                        promocode: data.metadata?.promocode,
                        start_date: data.metadata.start_date,
                        end_date: data.metadata.end_date,
                        url: data.metadata.url,
                    },
                    invoice: data.invoiceId,
                    paymentMode: data.mode,
                    payment_status: data.paymentStatus,
                    status: data.status,
                    paymentIntent: {
                        amount: data.paymentIntent.transactions[0].amountRaw,
                        createdAt: data.paymentIntent.transactions[0].createdAt,
                        currency: data.paymentIntent.transactions[0].currency,
                        fromAddress: data.paymentIntent.transactions[0].fromAddress,
                        transactionHash: data.paymentIntent.transactions[0].transactionHash,
                        transactionUrl: data.paymentIntent.transactions[0].transactionUrl
                    }
                }

                setSessionData(obj);
                await addSession(obj);

                const userName = getNameFromEmail(data.metadata?.email)
                const template_params = {
                    name: userName,
                    product:'event',
                    event_name: data.metadata?.name,
                    event_mail: data.metadata?.email,
                    start_date: data.metadata.start_date,
                    end_date: data.metadata.end_date,
                    promocode: data.metadata?.promocode,
                }
                const product_data={
                   name: userName,
                   product:'product',
                   prod_name: data.metadata?.name,
                   prod_mail: data.metadata?.email,
                   prod_url: data.metadata.url 
                }

            

            }
            if (error) {
                console.log('Failed to retrieve checkout session!');
            }
        })
    }, [sessionId])


    return (
        <section className='py-24 bg-gray-50'>
            <div className='container mx-auto max-w-3xl px-4'>
                <div className="w-20 h-20 relative">
                    <Image
                        src={`/assets/${sessionData?.status === 'complete' ? 'success.png' : 'fail.png'}`}
                        alt="Payment status"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <h1 className='text-lg font-semibold '>
                    {sessionData?.status !== 'complete' ? <p className='text-red-600'>Payment Fail</p> : <p className='text-emerald-600'>Payment successfull</p>}
                </h1>
                {
                    sessionData?.status === 'complete' && <p className='mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl'>
                        Thanks for subscribing, {sessionData?.product_details?.email}!
                    </p>
                }
                <p className='mt-2 text-base text-gray-600 dark:text-gray-400'>
                    We're super stoked to have you here!
                </p>

                {/* Additional details */}
                <div className="mt-4">
                    <p><strong>Amount:</strong> ₹{sessionData.amount_total / 100}</p>
                    <p><strong>Payment:</strong> {sessionData?.payment_status}</p>
                    <p><strong>Status:</strong> {sessionData?.status}</p>
                    <p><strong>Email:</strong> {sessionData?.product_details?.email}</p>
                    <p><strong>Payment Date:</strong> {moment(sessionData?.createdAt).format("LLL")}</p>
                    <p><strong>Transaction Hash:</strong> {sessionData?.paymentIntent.transactionUrl}</p>
                </div>

                <Link
                    href='/'
                    className='inline-flex items-center mt-8 w-fit gap-2 rounded-md bg-emerald-500 px-3 py-2 text-white no-underline hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                >
                    <span>Go back home</span>
                </Link>
            </div>
        </section>
    );
};

export default CheckoutComponent;