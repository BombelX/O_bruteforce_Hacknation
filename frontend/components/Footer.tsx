import Link from "next/link";
import {JSX} from "react";
function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
       
        <footer className="footer p-5 bg-neutral text-neutral-content mt-8 border-t border-base-300">
            
           
            <nav className="flex-1 grid grid-flow-col gap-4 auto-cols-max">
                <Link href="/" className="link link-hover">Home</Link>
                <Link href="/add" className="link link-hover">Dodaj Zgubę</Link>
                <a href="https://www.gov.pl/web/cyfryzacja" target="_blank" rel="noopener noreferrer" className="link link-hover">Ministerstwo Cyfryzacji</a>
            </nav> 
            
            
            <aside className="items-center grid-flow-col">
                <p className="text-sm text-right opacity-80">
                    Projekt **Biuro Rzeczy Znalezionych (BRZ)** | Hackathon {currentYear} <br/>
                    &copy; {currentYear} Wszelkie Prawa Zastrzeżone.
                </p>
            </aside>
        </footer>
    );
}
export default Footer;