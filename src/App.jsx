import './App.css'
import Epics from './components/Epics'
import NavBar from './components/NavBar'
import { useWhatToShow } from './contexts/WhatToShow'
import ProductBacklog from './components/ProductBacklog'
import ProductOwnerDashboard from './components/ProductOwnerDashboard'  

function App() {
  const {show} = useWhatToShow();

  const renderContent = () => {
    switch(show) {
      case 'dashboard':
        return <ProductOwnerDashboard/>;
      case 'product backlog':
        return <ProductBacklog/>;
      case 'epics':
        return <Epics/>;
      case 'reports':
        return <div>Reports Content</div>;
      case 'users':
        return <div>Users Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  }

  return (
    <div className='bg-linear-to-t bg-indigo-100 min-h-screen pb-5'>
      <NavBar/>
      <div className="container mx-auto mt-[65px] pt-5">
        {renderContent()} 
      </div>
    </div>
  )
}
export default App
