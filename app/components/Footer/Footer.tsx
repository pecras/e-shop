import Link from "next/link";
import FooterList from "./FooterList/Footerlist";
import Container from "../Container";
import { RiInstagramLine } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
    return ( <footer className=" bg-slate-800 text-slate-200 text-sm mt-16" >
        <Container>
<div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
    <FooterList>
        <h3 >Categorias</h3>
 <Link href="/Phones">Celulares</Link>
 <Link href="/Phones">Laptops</Link>
 <Link href="/Phones">Desktops</Link>
 <Link href="/Phones">Relógios</Link>
 <Link href="/Phones">Tvs</Link>
 <Link href="/Phones">Acessórios</Link>
 

    </FooterList>
    <FooterList>
        <h3> Costumer Service</h3>
 <Link href="/Phones">Celulares</Link>
 <Link href="/Phones">Laptops</Link>
 <Link href="/Phones">Desktops</Link>
 <Link href="/Phones">Relógios</Link>
 <Link href="/Phones">Tvs</Link>
 <Link href="/Phones">Acessórios</Link>
 

    </FooterList> <FooterList>
        <h3 >Siga-nos</h3>
        <div className="flex gap-2">
 <Link href="/Phones"><IoLogoFacebook size={30}/></Link>
 <Link href="/Phones"><RiInstagramLine size={30}/></Link>
 <Link href="/Phones"><IoLogoFacebook size={30}/></Link>
 <Link href="/Phones"><RiInstagramLine size={30}/></Link>
 </div>


    </FooterList>
    <FooterList>
        <h3 >Sobre nós</h3>
 <p>&copy{new Date().getFullYear()}</p>
 

    </FooterList>

</div>
        </Container>

    </footer> );
}
 
export default Footer;