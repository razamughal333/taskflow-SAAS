import { useContext } from "react";
import { PlanContext } from "../context/PlanContext";

function usePlan() {
  return useContext(PlanContext);
}

export default usePlan;
