import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    return (
        <div>
            <div className="mx-auto text-center md:w-4/12 my-8">
                <p className="text-[#D99904] mb-2">--- Please pay to enroll ---</p>
                <h3 className="text-3xl uppercase border-y-4 py-4">PAYMENT</h3>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;