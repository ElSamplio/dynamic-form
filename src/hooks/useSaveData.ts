import { useCallback } from "react";
import { DataStructType } from "../types/DataType";
import axios from "axios";

const useSaveData = (dataToSave: DataStructType) => {
  const saveData = useCallback(async () => {
    try {
      const response = await axios.post("/api/form-data", { data: dataToSave });
      const {
        data: { success, message },
      } = response;
      return { success, message };
    } catch (err) {
      return err;
    }
  }, [dataToSave]);

  return [saveData];
};

export default useSaveData;
