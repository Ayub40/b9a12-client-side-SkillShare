import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {
    const { price, description, title, _id } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        // console.log(data);
        // image upload to imgbb and then get an url
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        if (res.data.success) {
            // now send the class item data to the server with the image url
            const classItem = {
                // name: data.name,
                // email: data.email,
                // category: data.category,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
                title: data.title

            }
            // 
            const classRes = await axiosSecure.patch(`/classes/${_id}`, classItem);
            // console.log(classRes.data)
            if (classRes.data.insertedId) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} is updated to the class`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log('with image url', res.data);
    }




    return (
        <div className="container mx-auto mt-24">
            <h2 className="text-4xl">Update Your Class</h2>
            {/* onSubmit={handleSubmit(onSubmit)} */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Name*</span>
                    </div>
                    <input
                        type="text"
                        value={user?.displayName}
                        placeholder="Your Name"

                        {...register("name", { required: true })}
                        className="input input-bordered w-full"

                    />
                </label>

                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Email*</span>
                    </div>
                    <input
                        type="email"
                        // value={user?.email}
                        value={user?.email}
                        {...register("email", { required: true })}
                        // readOnly
                        className="input input-bordered w-full"
                    />
                </label>
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Price*</span>
                    </div>
                    <input
                        type="number"
                        defaultValue={price}
                        placeholder="Price"
                        {...register("price", { required: true })}
                        className="input input-bordered w-full" />

                </label>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Description*</span>
                    </div>
                    <textarea
                        defaultValue={description}
                        {...register("description")}
                        className="textarea textarea-bordered h-24"
                        placeholder="Description">
                    </textarea>

                </label>
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Title*</span>
                    </div>
                    <input
                        type="text"
                        defaultValue={title}
                        placeholder="Your Title"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                        required
                    />
                </label>
                <div className="form-control w-full my-6">
                    <input
                        {...register("image", { required: true })}
                        type="file"
                        className="file-input w-full max-w-xs" />
                </div>

                <button type="submit" className="bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white">
                    Updated Class
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;