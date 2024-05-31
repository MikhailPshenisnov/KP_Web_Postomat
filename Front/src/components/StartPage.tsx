import {useNavigate} from "react-router-dom";

export function StartPage() {
    const navigate = useNavigate();
    return (
        <div className="start-banner">
            <div className="go-to-get-order" onClick={() => navigate("/receive")}>
                <h2>Получить заказ</h2>
            </div>
        </div>
    )
}