import  React from 'react'
import { Route, Routes } from 'react-router'
import { Row,Grid,Col } from 'rsuite'
import Sidebar from '../components/Sidebar'
import { RoomsProvider } from '../context/rooms.context'
import { useMediaQuery } from '../misc/custom-hooks'
import Chat from './Home/Chat'
import { useMatch } from "react-router-dom";
import Please from './Home/Please'
export const Home = () => {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  

  const canRenderSidebar = isDesktop 

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
           
          <Routes>
            <Route exact path="/chat/:chatId" 
            element={<Col xs={24} md={16} className="h-100"><Chat />
            </Col>}>
             
                
              
            </Route>
            </Routes>
            
            <Col xs={24} md={16} className="h-100">
            <h5 className="text-center mt-page">Please select chat</h5>
              </Col>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

