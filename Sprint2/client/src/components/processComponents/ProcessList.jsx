import React from "react";
import { processData } from "./processData";
import Process from "./Process";

function ProcessList() {
  return (
    <section>
      <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap mx-4 max-w-screen-2xl my-8 bg-gradient-to-b from-darkerBlue to-darkBlue">
        {processData.map((item) => {
          return <Process key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}

export default ProcessList;
