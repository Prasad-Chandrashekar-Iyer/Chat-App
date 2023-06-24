import React, { useCallback, useRef, useState } from 'react'
import { Button, Form, Modal, Schema } from 'rsuite'
import FormControl from 'rsuite/esm/FormControl'
import FormControlLabel from 'rsuite/esm/FormControlLabel'
import FormGroup from 'rsuite/esm/FormGroup'
import { useModalState } from '../misc/custom-hooks'
import firebase from 'firebase/compat/app'
import { auth, database } from '../misc/firebase'
const {StringType} = Schema.Types
const model= Schema.Model({
    name: StringType().isRequired("chat name is required"),
    description: StringType().isRequired("description is required")
})
const IntiaForm ={
    name:'',
    description:''
}
const CreateRoom = () => {
const onSubmit = async()=>{
    if(!formRef.current.check()){
        return
    }
    const newRoomdata={
        ...formValue,
        createdAt:firebase.database.ServerValue.TIMESTAMP,
         admin: {[auth.currentUser.uid]:true}
    }
    try{
       await database.ref('rooms').push(newRoomdata) 
       setFormValue(IntiaForm)
       
       close()
    }catch(error){

    }
}
const [formValue,setFormValue] =useState(IntiaForm)
 const formRef = useRef()  
    const onFormChange=useCallback((ev)=>{
setFormValue(ev)
    }
    )
    const {isOpen,open,close}= useModalState()

  return (
    <>


        <Button block color="red" appearance="primary" onClick={open}>
            Create Chat Room
        </Button>
        <Modal open={isOpen} close={close}>
            <Modal.Header><Modal.Title>New Chat Room</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form 
                fluid 
                onChange={onFormChange} 
                formValue={formValue} 
                model={model}
                ref={formRef}
                >
                    <FormGroup>
                        <FormControlLabel>Room name</FormControlLabel>
                        <FormControl name="name" placeholder="enter chat room name ..."/>
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel>Description</FormControlLabel>
                        <FormControl componentClass="textarea" rows={5} name="description" placeholder='Enter chat room description...'/>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer> <Button block color="blue" appearance="primary" onClick={onSubmit}>
            Create Chat Room
        </Button></Modal.Footer>

        </Modal>
    </>
  )
}

export default CreateRoom