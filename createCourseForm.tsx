import React from 'react';
import { useMutation, gql } from "@apollo/client";
import { Form,Button } from 'react-bootstrap';
const SEND_FILE = gql`
    mutation uploadFile($file:Upload!){
        uploadFile(file:$file){
            url
        }
    }
`


const CreateCourseForm = () => {
    const upload = (e: any) => {
        const file = e.target.files[0]
        if (!file) return "error"
        uploadFile({ variables: { file: file } })
    }
    const [uploadFile] = useMutation(SEND_FILE, {
        onCompleted: data => console.log(data)
    })
    const handleChange = (e:any)=>{
        console.log(e)
    }
    return (
        <Form>
            <h4 className='text-center'>Become Tutor</h4>
            <Form.Control name='speacilist' onChange={handleChange} placeholder='specialist' />
            <Form.Control name='experience' onChange={handleChange} placeholder='experinece' />
            <Form.Control name='bio'  as='textarea' onChange={handleChange} placeholder='Bio' />
            <Button >Sumbit</Button>
        </Form>
    );
};

export default CreateCourseForm;