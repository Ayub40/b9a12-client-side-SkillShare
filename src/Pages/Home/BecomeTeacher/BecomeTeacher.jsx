import { Link } from "react-router-dom";
import becomeTeacher from '../../../assets/become teacher.jpg';


const BecomeTeacher = () => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mt-24 rounded-lg">
            <div className="w-1/2">
                <figure><img className="rounded-lg" src={becomeTeacher} alt="Album" /></figure>
            </div>
            <div className="card-body w-1/2">
                <h2 className="card-title">Become an instructor!</h2>
                <p>Instructors from around the world teach millions of learners on SkillShare. We provide the tools and skills to teach what you love.</p>
                <div className="card-actions">
                    <Link to='/teach'><button className="btn btn-outline border-0 border-b-4 mt-4 bg-[#E8E8E8] border-[#BB8506]">Start teaching today</button></Link>
                </div>
            </div>
        </div>
    );
};

export default BecomeTeacher;