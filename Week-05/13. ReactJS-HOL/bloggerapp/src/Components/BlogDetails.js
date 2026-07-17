import React from "react";

export const blogs = [

    {
        id: 1,
        title: "React Learning",
        author: "Stephen Biz",
        content: "Welcome to learning React!"
    },

    {
        id: 2,
        title: "Installation",
        author: "Schwedenier",
        content: "You can install React from npm."
    }
];
function BlogDetails(props) {
    return (
        <div className="section">
            <h1>Blog Details</h1>
            {
                props.blogs.map((blog) => (
                    <div key={blog.id}>
                        <h3>{blog.title}</h3>
                        <h4>{blog.author}</h4>
                        <p>{blog.content}</p>
                    </div>
               ))
            }
        </div>
    );
}

export default BlogDetails;