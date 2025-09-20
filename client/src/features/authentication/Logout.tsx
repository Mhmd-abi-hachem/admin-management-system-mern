import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../shared/ui/Button/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../shared/ui/Spinners/SpinnerMini";

function Logout() {
  const { logoutUser, isLoading } = useLogout();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => logoutUser()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
