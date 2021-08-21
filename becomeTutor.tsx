import React, { useState } from 'react';
import { useMutation, gql } from "@apollo/client";

import { Form, Button } from 'react-bootstrap';


const BECOME_TUTOR = gql`

    mutation becomeTutor($tutorInfo:TutorInfo){
        becomeTutor(tutorInfo:$tutorInfo)
    }
`
interface Itutor {
    bio: String,
    speacilist: String,
    picture: File | undefined,
    experience: String

}
const BecomeTutor = () => {
    console.log(document.cookie);
    const [becomeTutor] = useMutation(BECOME_TUTOR,
        { onCompleted: data => console.log(data) }
    );
    const [tutor, setTutor] = useState<Itutor>({ bio: "", speacilist: "", picture: undefined, experience: "" })

    function handleChange(e: any) {
        const value = e.target.value;
        setTutor({
            ...tutor,
            [e.target.name]: value
        });
    }
    function handleFileChange(e: any) {
        const file = e.target.files[0];
        setTutor({
            ...tutor,
            [e.target.name]: file
        });
    }
    console.log(tutor)
    const becomeTutorHnadle = (obj: Itutor) => {
        becomeTutor({ variables: { tutorInfo: { userId: 'Et25X3MZDa', 
        bio:obj.bio,
        speacilist:obj.speacialist,
        picture:obj.picture,
        experience:obj.experience} } })
    }


    return (
        <Form>
            <h4 className='text-center'>Become Tutor</h4>
            <Form.Control name='speacilist' value={tutor.speacilist} onChange={handleChange} placeholder='specialist' />
            <Form.Control name='experience' value={tutor.experience} onChange={handleChange} placeholder='experinece' />
            <Form.Control name='bio' value={tutor.bio} as='textarea' onChange={handleChange} placeholder='Bio' />
            <Form.Control name='picture' type='file' onChange={handleFileChange} />
            <Button onClick={()=>becomeTutorHnadle(tutor)}>Sumbit</Button>
        </Form>
    );
}

export default BecomeTutor;