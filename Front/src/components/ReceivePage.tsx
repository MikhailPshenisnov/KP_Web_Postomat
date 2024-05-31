// import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {GetOrderApi} from "../api/AppApi.tsx";

export function ReceivePage() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [secretCode, setSecretCode] = useState<string>("");

    return (
        <div className="receive-page">
            <div className="err-message">
                {errorMessage !== "" && (
                    <b>{errorMessage}</b>
                )}
            </div>
            <input className="secret-code-input" type="text" placeholder="Введите код получения заказа..."
                   onChange={(e) => setSecretCode(e.target.value)}/>
            <div className="receive-order" onClick={() => {
                GetOrderApi(secretCode)
                    .then((res) => {
                        if (res.data !== "") {
                            setErrorMessage(res.data)
                        } else {
                            setErrorMessage("Заказ получен успешно");
                        }
                    });
            }}>
                <h2>Получить заказ</h2>
            </div>
        </div>
    )
}