import "./App.css";

import BookDetails, { books } from "./Components/BookDetails";
import BlogDetails, { blogs } from "./Components/BlogDetails";
import CourseDetails, { courses } from "./Components/CourseDetails";
function App() {
    const show = true;
    return (
        <div className="container">
            {show && <CourseDetails courses={courses} />}
            {show ? (
                <BookDetails books={books} />
            ) : (
            <h2>No Books Available</h2>
            )}
            {show && <BlogDetails blogs={blogs} />}
        </div>
    );
}
export default App;