import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";


const TeachOnSkillShare = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    
    const onSubmit = async (data) => {
        const teacherRequest = {
            name: data.name,
            email: user.email,
            experience: data.experience,
            title: data.title,
            category: data.category,
            image: data.photoURL,
            status: 'pending'
        };

        const result = await axiosSecure.post('/teachers/teacher-requests', teacherRequest);

        if (result.data.insertedId) {
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Your request has been submitted for review',
                showConfirmButton: false,
                timer: 1500
            });
            // refetchUser(); 
        }

        console.log(data);
    }


    return (
        <div className="container mx-auto mt-24">
            <h2 className="">Apply for Teaching Position</h2>
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
                        className="input input-bordered w-full"
                    />
                </label>
                {/* user image */}
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Photo Url*</span>
                    </div>
                    <input
                        type="text"
                        // value={user?.email}
                        value={user?.photoURL}
                        {...register("photoURL", { required: true })}
                        className="input input-bordered w-full"
                    />
                </label>
                {/* user image end */}
                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Experience Level*</span>
                    </div>
                    <select defaultValue="default"
                        {...register("experience", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option disabled value="default">Select a category</option>
                        <option value="beginner">Beginner</option>
                        <option value="mid-level">Mid-level</option>
                        <option value="experienced">Experienced</option>
                    </select>
                </label>

                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Title*</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Your Title"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                        required
                    />
                </label>

                <label className="form-control w-full my-6">
                    <div className="label">
                        <span className="label-text">Category*</span>
                    </div>
                    <select defaultValue="default"
                        {...register("category", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option disabled value="default">Select a category</option>
                        <option value="web-development">Web Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="data-science">Data Science</option>
                        <option value="cyber-security">Cyber Security</option>
                        <option value="video-editing">Video Editing</option>
                    </select>
                </label>

                <button type="submit" className="bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white">
                    Submit for Review
                </button>
            </form>
        </div>










        // <div className="container mx-auto mb-24">
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <label className="form-control w-full my-6">
        //             <div className="label">
        //                 <span className="label-text">Recipe name*</span>
        //             </div>
        //             <input
        //                 type="text"
        //                 placeholder="Recipe Name"
        //                 {...register("name", { required: true })}
        //                 required
        //                 className="input input-bordered w-full"
        //             />
        //         </label>
        //         <div className="flex gap-6">
        //             <label className="form-control w-full my-6">
        //                 <div className="label">
        //                     <span className="label-text">Category*</span>
        //                 </div>
        //                 <select
        //                     defaultValue="default"
        //                     {...register("category", { required: true })}
        //                     className="select select-bordered w-full"
        //                 >
        //                     <option disabled value="default">Select a category</option>
        //                     <option value="salad">Salad</option>
        //                     <option value="pizza">Pizza</option>
        //                     <option value="soup">Soup</option>
        //                     <option value="dessert">dessert</option>
        //                     <option value="drinks">Drinks</option>
        //                 </select>
        //             </label>
        //             <label className="form-control w-full my-6">
        //                 <div className="label">
        //                     <span className="label-text">Price*</span>
        //                 </div>
        //                 <input
        //                     type="number"
        //                     placeholder="Price"
        //                     {...register("price", { required: true })}
        //                     className="input input-bordered w-full"
        //                 />
        //             </label>
        //         </div>
        //         <label className="form-control">
        //             <div className="label">
        //                 <span className="label-text">Recipe Details*</span>
        //             </div>
        //             <textarea
        //                 {...register("recipe")}
        //                 className="textarea textarea-bordered h-24"
        //                 placeholder="Bio"
        //             ></textarea>
        //         </label>
        //         <div className="form-control w-full my-6">
        //             <input
        //                 {...register("image", { required: true })}
        //                 type="file"
        //                 className="file-input w-full max-w-xs"
        //             />
        //         </div>
        //         <button type="submit" className="bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white">
        //             Add Item <FaUtensils className="ml-2" />
        //         </button>
        //     </form>
        // </div>
    );
};
export default TeachOnSkillShare;