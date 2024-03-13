import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProductForm from "./addProductForm";
import { getCurrentUser } from "@/actions/getCurrent";
import NullData from "@/app/components/NullData";

const AddProducts = async() => {

    const currentUser = await getCurrentUser();

    if(!currentUser || currentUser.role !== "ADMIN"){
       
        return <NullData title="Nie jesteś adminem brak dostępu!"/>
    }

    return ( 
    <div className="p-8">
        <Container>
             <FormWrap>
                <AddProductForm />
            </FormWrap>
        </Container>
    </div> );
}
 
export default AddProducts;