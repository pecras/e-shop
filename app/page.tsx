import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "@/utils/products";
import { truncateText } from "@/utils/TruncateText";
import ProductCards from "./components/ProductsCards/products";

export default function Home() {
  return (
    <main className="p-8">
      <Container>
        <div>
          <HomeBanner/>
          </div>
        <div className=" mt-4 grid grid-cols-2 sm:grid-cols-3 
        lg:grid-cols-4 x1:grid-cols-5 2x1:grid-cols-6 gap-16">
          {products.map((product:any)=>{
            return(
              <div key={product.id} >
               <ProductCards data={product}/>
              </div>
            )
          })}
        </div>
      </Container>
     
    </main>
  )
}
