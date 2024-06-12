import { useLoaderData } from "react-router-dom";


const SeeProgressDetails = () => {
    const { name, email, price, description, image, title } = useLoaderData();
    // console.log(name, email, price, description, image, title);

    return (
        <div>
            <h2>{name}</h2>
            <h2> {email} </h2>
            <h2> {price} </h2>
            <h2> {description} </h2>
            {/* <h2> {image} </h2> */}
            <h2> {title} </h2>
            <img src= {image} alt="" />
        </div>
    );
};

export default SeeProgressDetails;