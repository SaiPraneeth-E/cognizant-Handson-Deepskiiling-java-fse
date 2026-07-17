import React from "react";

export const courses = [
    {
        id: 1,
        cname: "Angular",
        date: "4/5/2021"
    },

    {
        id: 2,
        cname: "React",
        date: "6/3/2021"
    }
];
function CourseDetails(props) {
    return (
        <div className="section">
            <h1>Course Details</h1>
            {
                props.courses.map((course) => (
                    <div key={course.id}>
                        <h2>{course.cname}</h2>
                        <h4>{course.date}</h4>
                    </div>
   ))
            }
        </div>
    );
}
export default CourseDetails;