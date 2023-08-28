import EconomyBooks from "./EconomyBooks";
import Novel from "./Novel";
import ScienceBooks from "./ScienceBooks";
import SelfDevelopmentBook from "./SelfDevelopment";


function Home() {
  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center", marginBottom:"100px"}}>
      <EconomyBooks /><br/><br/><br/>
      <ScienceBooks /><br/><br/><br/>
      <Novel /><br/><br/><br/>
      <SelfDevelopmentBook />
    </div>
  );
}

export default Home;
