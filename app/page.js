import Main from "@/components/Main";
import PopularSlider from "@/components/PopularSlider";
import ProductTabs from "@/components/ProductTabs";
import Features from "@/components/Features";
import ContactForm from "@/components/ContactForm";



export default function Home() {
  return (
    <>
      <Main />              
      <ProductTabs />     
      <Features />  
      <PopularSlider /> 
      <ContactForm/>    
    </>
  );
}