import fine from './assets/fine.jpg'

export default function Index() {
  return (
    <div style={{display:"flex", alignContent:"center", flexDirection:"column", justifyContent:"center"}} id="zero-state">
        <h1 style={{textAlign:"center"}}>Hello everyone 👋</h1>
        <img style={{height:"500px",width:"700px", marginLeft:"200px"}} src={fine} alt="Fine" />
    </div>
  );
};