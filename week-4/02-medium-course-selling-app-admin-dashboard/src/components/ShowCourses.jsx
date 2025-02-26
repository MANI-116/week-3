import React from "react";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    React.useEffect(()=>{

        fetch('http://localhost:3000/admin/courses',{
            method:'GET',
            headers:{
                'authorization':'Bearer '+localStorage.getItem('token')
            }
        }).then(res => res.json()).then((data)=>{
            console.log(data.courses)
            setCourses(data.courses)
        })

    },[])
   
       
    
    return <div>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course key={c.title} title={c.title} />)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

export default ShowCourses;