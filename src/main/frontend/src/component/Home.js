import EconomyBooks from "./EconomyBooks";
import Novel from "./Novel";
import ScienceBooks from "./ScienceBooks";
import SelfDevelopmentBook from "./SelfDevelopment";


function Home() {
  return (
    <>
      <EconomyBooks />
      <ScienceBooks />
      <Novel />
      <SelfDevelopmentBook />
    </>
  );
}

export default Home;
