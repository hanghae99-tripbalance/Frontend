import React, { useEffect, useState } from "react";
const useInput = (initVal) => {
  const [value, setValue] = useState(initVal);
  useEffect(() => {
    setValue(initVal);
  }, [initVal]);
  const handler = (e) => {
    setValue(e.target.value);
  };
  return [value, setValue, handler];
};
export default useInput;
