import  React from 'react'
import { Container, Grid, Row,Col, Panel, Button } from 'rsuite'


import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import { app, auth } from '../misc/firebase';
import firebase from 'firebase/compat/app'
import {database} from '../misc/firebase'
import {
  Notification,
  useToaster,
  Placeholder,



  
} from 'rsuite';
import { wait } from '@testing-library/user-event/dist/utils';





const Sign = () => {
  
  const [type, setType] = React.useState('success');
  const [placement, setPlacement] = React.useState('topStart');
  const [errora, setError] = React.useState(null);
  const toaster = useToaster();

  const message = (
  <Notification type={type} header={type} closable>
<Placeholder.Paragraph style={{ width: 100}} rows={0}  />
<h3 style={{fontSize:20}}>It worked 
  </h3>
</Notification>)
    
  const message1 = (
    <Notification type={type} header={type} closable>
    <Placeholder.Paragraph style={{ width: 100}} rows={0}  />
    <h3 style={{fontSize:20}}>Some error occured</h3>
    
  </Notification>
    
  );
  const Siginwithprovider= async provider => {

  
    try{
      const {additionalUserInfo, user} = await auth.signInWithPopup(provider)
if(additionalUserInfo.isNewUser){
  await database.ref(`/profiles/${user.uid}`).set({
    name: user.displayName,
    createdAt: firebase.database.ServerValue.TIMESTAMP,

  })
}
toaster.push(message, { placement })

  



    }catch(err){
      const message2 = (
        <Notification type="error" header="error" closable>
        <Placeholder.Paragraph style={{ width: 100}} rows={0}  />
    <h3 style={{fontSize:20}}>{err.message}</h3>
      </Notification>
    
      );
      
      toaster.push(message2, { placement })
      

    }



  }







  const FaceBook = () => {
    Siginwithprovider(new firebase.auth.FacebookAuthProvider())

  }



  const Google = () => {
    Siginwithprovider(new firebase.auth.GoogleAuthProvider())
  }




  return (
    <Container>
      <Grid className='mt-page'>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
<Panel>

  <div className='text-center'>
    <h1>Welcome to Chat</h1>
    <p>Progressive chat app for neo js</p>
  </div>
  <div className='mt-3' >
    <Button block color="blue" appearance="primary" onClick={FaceBook} ><FacebookOfficialIcon/> Continue With FaceBook</Button>
    <Button block color="green" appearance="primary" onClick={Google} ><GooglePlusCircleIcon/> Continue With Google</Button>
    
  </div>
</Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default Sign