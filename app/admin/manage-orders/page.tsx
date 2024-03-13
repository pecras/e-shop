import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrent";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";

const ManageOrders = async() => {

const orders = await getOrders();
const currentUser = await getCurrentUser();

if(!currentUser || currentUser.role !== "ADMIN"){
    return <NullData title="Nie jesteś adminem brak dostępu!"/>
}

    return (
        <div className="pt-8">
           <Container>
             <ManageOrdersClient orders = {orders}/>
           </Container>
        </div>
     );
};
 
export default ManageOrders;