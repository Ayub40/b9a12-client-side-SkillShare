import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useEnrolled from "../../../Hooks/useEnrolled";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CheckoutForm = () => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [enroll, refetch] = useEnrolled();
    console.log(enroll);
    const navigate = useNavigate();


    const totalPrice = enroll.reduce((total, item) => total + item.price, 0)
    console.log(totalPrice);
    // useEffect(() => { }, [])
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        // -------------------------------
        // if (!clientSecret) {
        //     setError('Client secret is missing');
        //     return;
        // }
        // -------------------------------

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            // type: 'string',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            // const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(`${clientSecret}_secret_${paymentMethod.id}`,
            {
                payment_method: {
                    // type: String,
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            })
        if (confirmError) {
            console.log('confirm error')
        }

        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    // image: enroll.image,
                    transactionId: paymentIntent.id,
                    data: new Date(),  // utc date convert. use moment js to 
                    cartIds: enroll.map(item => item._id),
                    menuItemIds: enroll.map(item => item.menuId),
                    status: 'pending',
                }
                // console.log(payment.image);

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for your payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/myEnrollClass')
                }
            }
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {/* <button className="bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button> */}


            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;