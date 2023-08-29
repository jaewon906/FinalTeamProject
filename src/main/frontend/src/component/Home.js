import EconomyBooks from "./EconomyBooks";
import Novel from "./Novel";
import ScienceBooks from "./ScienceBooks";
import SelfDevelopmentBook from "./SelfDevelopment";
import Payment from "../js/Payment";



function Home() {
  return (
    <div style={{display:"flex", flexDirection:"column", width:"100%", alignItems:"center", marginBottom:"100px"}}>
      <EconomyBooks /><br/><br/><br/>
      <ScienceBooks /><br/><br/><br/>
      <Novel /><br/><br/><br/>
      <SelfDevelopmentBook />
        {/*<Payment/>*/}
    </div>
  );
}

export default Home;
