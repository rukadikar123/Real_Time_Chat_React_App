import Sidebar from "./Sidebar";
import Chat from "./Chat";



function Homepage() {

  return (
    <>
      <div className="w-full flex ">
        <Sidebar/>            
        <Chat   />
      </div>
    </>
  );
}

export default Homepage;
