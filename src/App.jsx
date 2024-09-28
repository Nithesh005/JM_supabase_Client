import { Box, Toolbar } from '@mui/material';
import './App.css'
import MiniDrawer from './Componet/Minivariantdrawer'
import Completedjob from './Pages/Completejob';
import LiveProject from './Pages/LiveProject';
import './assets/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MyProject from './Pages/MyProject';
import SocketComp from './Pages/SocketTest/SocketComp';
import './assets/Lib/style.css'
import Pillars from './Pages/Pillars';
import GluReports from './Pages/GluReports';
import EditReg from './Pages/EditReg';
import ViewOrders from './JM_pages/ViewOrders';
import Page1 from './JM_pages/Page1';
import EditOrdersPage from './JM_pages/EditOrdersPage';
import ViewStores from './JM_pages/ViewStores';
import EditStoresPage from './JM_pages/EditStoresPage';
import ViewMeasurements from './JM_pages/ViewMeasurements';
import EditMeasurementsPage from './JM_pages/EditMeasurementsPage';
function App() {
  const drawerWidth = 240;

  return (
    <>
      <BrowserRouter>
        <div className="app" style={{ display: 'flex' }}>
          <MiniDrawer />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: {  sm: `calc(100% - ${drawerWidth}px)`} }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<LiveProject />} />
              {/* <Route path="/liveproject" element={<LiveProject />} />
              <Route path="/myproject" element={<MyProject />} />
              <Route path="/completedjobs" element={<Completedjob />} />
              <Route path="/GLU_updates_page/:id" element={<GluReports />} />
              <Route path="/Edit_reg/:id" element={<EditReg />} />
              <Route path="/Pillars" element={<Pillars />} />
              <Route path="/socket" element={<SocketComp />} /> */}
              <Route path="/Page1" element={<Page1 />} />
              <Route path="/ViewOrders" element={<ViewOrders />} />
              <Route path="/edit-orders" element={<EditOrdersPage />} />
              <Route path="/ViewStores" element={<ViewStores />} />
              <Route path="/edit-stores" element={<EditStoresPage />} />
              <Route path="/ViewMeasurements" element={<ViewMeasurements />} />
              <Route path="/edit-measurements" element={<EditMeasurementsPage />} />
            </Routes>
          </Box>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
