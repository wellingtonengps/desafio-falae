import Button from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

import { IoPerson } from "react-icons/io5";
import { IoFastFood } from "react-icons/io5";
import { IoReceipt } from "react-icons/io5";

function App() {

    const navigate = useNavigate();

    return (

    <div className="flex justify-center items-center bg-amber-200 h-screen">
        <div className="flex gap-x-24">
            <Button icon={<IoReceipt size={40}/>} label="Pedidos" onClick={() => navigate("/orders")} />
            <Button icon={<IoFastFood size={40}/>} label="Menu" onClick={() => navigate("/menu")} />
            <Button icon={<IoPerson size={40}/>} label="Clientes" onClick={() => navigate("/clients")} />
        </div>
    </div>
)
}

export default App
