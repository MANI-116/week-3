import React from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = React.useState("");
    const [description,setDescription]= React.useState("");
    const [price,setPrice] = React.useState("");
    const [published,setPublished] = React.useState("");
    const [imageLink,setImageLink] = React.useState("");

    function handleCreateCourse(){
        let course = {title,description,price,published,imageLink};
        fetch('http://localhost:3000/admin/courses',{
            method:"POST",
            headers:{
                'Content-Type'  : 'application/json',
                'authorization':'Bearer '+localStorage.getItem('token')
              
            },
            body:JSON.stringify(course)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))

    }

  

    return <div>
        <h1>Create Course Page</h1>
        <label htmlFor="title">Title:
        <input type="text" onChange={e => setTitle(e.target.value)} />
        </label>
        <br />

        <label htmlFor="description">Description:
            <input type="text"  id="description" onChange={e => setDescription(e.target.value)}  />
        </label>
        <br />

        <label htmlFor="price">Price:
            <input type="text"  id="price" onChange={e => setPrice(e.target.value)}  />
        </label>
        <br />
        <label htmlFor="published">Published: 
            <input type="text"  id="published" onChange={e => setPublished(e.target.value)}  />
        </label>
        <br />
        <label htmlFor="imageLink">Image Link:
            
            <input type="url"  id="imageLink" onChange={e => setImageLink(e.target.value)}  />
        </label>
        <br />
        <button onClick={handleCreateCourse}>Create Course</button>
    </div>
}
export default CreateCourse;