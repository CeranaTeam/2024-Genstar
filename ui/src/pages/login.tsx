import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "@/firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/GoogleIcon";

const Login = () => {
  const navigate = useNavigate();

  const login = async () => {
    //點擊按鈕後，彈出登入視窗，詢問使用者要用哪隻帳號進行登入，並將結果保存至result變數。
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    //登入成功後，將使用者導向主頁面。
    navigate("/");
  };

  return (
    <div>
      <Button variant="outline" onClick={login} className="gap-x-2">
        <GoogleIcon />
        Sign in with Google
      </Button>
    </div>
  );
};

export default Login;
