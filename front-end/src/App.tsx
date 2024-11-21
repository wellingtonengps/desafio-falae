import IconButtonCustom from "@/components/iconButtonCustom.tsx";
import {useNavigate} from "react-router-dom";

import { IoPerson } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";

function App() {

    const navigate = useNavigate();

    return (

    <div className="flex justify-center items-center bg-amber-200 h-screen">
        <div className="flex gap-x-24">
            <IconButtonCustom icon={<IoReceipt size={40}/>} label="Pedidos" onClick={() => navigate("/orders")} />
            <IconButtonCustom icon={<FaBoxes size={40}/>} label="Estoque" onClick={() => navigate("/estoque")} />
            <IconButtonCustom icon={<IoPerson size={40}/>} label="Clientes" onClick={() => navigate("/clients")} />
        </div>
    </div>
)
}

export default App
