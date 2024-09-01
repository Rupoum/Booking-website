import React from "react";

const page = ({ params }: any) => {
  return <div>orders{params.userId}</div>;
};

export default page;
