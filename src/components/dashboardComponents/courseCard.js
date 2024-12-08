import { Link } from "react-router-dom";
import courseImage from "../../assets/courseImage.png"
import { getLetterGrade } from "../../pages/grades";

const CourseCard = ({course}) => {
    const {code, instructor, courseGrade} = course;

    const letterGrade = getLetterGrade(courseGrade);

    return(
        <Link to={`../courses/${code}`} className="d-flex flex-column flex-fill m-2 text-reset text-decoration-none">
            
            <div className="border m-2 animated-shadow rounded overflow-hidden flex-column flex-fill" style={{height: "8rem"}}>
                <div className="overflow-hidden h-50" style={{backgroundImage: `url(${courseImage})`}}>
                </div>
                <div className="m-2 h-50">
                    <h5 className="m-0 color-purple">{code} | {instructor}</h5>
                    <p className="m-0 text-secondary">Grade: {courseGrade.toFixed(1)} ({letterGrade})</p>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;