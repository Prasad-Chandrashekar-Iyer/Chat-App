import React from 'react'
import { Button, Modal } from 'rsuite'
import { useModalState } from '../../../misc/custom-hooks'
import ProfileAvatar from '../../ProfileAvatar'

const ProfileiinfoBtnModel = ({profile,children,...brnProps}) => {
    const shortName=profile.name.split(' ')[0]
   
    const {isOpen,close,open}= useModalState()
    const {name,avatar,createdAt} = profile
    const membersince =new Date(createdAt).toLocaleDateString()
    return (
    <div>
        <Button onClick={open} {...brnProps}>{shortName}</Button>
        <Modal open={isOpen} close={close}>
<Modal.Header><Modal.Title>{shortName}</Modal.Title></Modal.Header>
<Modal.Body className='text-center' >
<ProfileAvatar 
src={avatar}
name={name}
className='width-200 height-20 img-fullsize font-huge'
/>
<h4 className='mt-2'>{name}</h4>
<p>Memvber since{membersince}</p>
</Modal.Body>
<Modal.Footer>
    {children}
    <Button block onClick={close}>Close</Button>
</Modal.Footer>


        </Modal>

    </div>
  )
}

export default ProfileiinfoBtnModel