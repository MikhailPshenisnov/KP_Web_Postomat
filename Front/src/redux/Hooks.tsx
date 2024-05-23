import {AppDispatch, RootState} from "./Store.tsx";
import {useDispatch, useSelector} from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();