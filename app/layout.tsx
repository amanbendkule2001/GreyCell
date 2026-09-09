import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { EnquiryModal } from '../components/EnquiryModal';
import { WhatsAppWidget } from '../components/WhatsAppWidget';
import { siteConfig } from '../data/mock-data';

export const metadata = {
 title: 'Graycell | Engineered Power. Built to Perform.',
 description: siteConfig.supportingText,
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return (
   <html lang="en">
     <body>
       <Header/>
       {children}
       <Footer/>
       <EnquiryModal/>
       <WhatsAppWidget/>
     </body>
   </html>
 );
}
