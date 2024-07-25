import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const Dashboard = ({uniqueNames, handleToggle}) => {
    return ( 
        <>
        <p>Here is the list of all the members in your team.</p>
      <div className="all-employees">
        {uniqueNames &&
          uniqueNames.map((name) => (
            <div key={name} className="each-employee">
              <p>{name}</p>
              <button onClick={()=>{handleToggle(name)}}>View all tasks <ArrowForwardRoundedIcon/></button>
              {/* <span>View all tasks <ArrowForwardRoundedIcon/></span> */}
            </div>
          ))}
      </div>
        </>
     );
}
 
export default Dashboard;