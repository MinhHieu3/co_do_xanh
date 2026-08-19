const fs = require('fs');

function replaceInFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content);
}

replaceInFile('./src/component/Header.tsx', /Menu, X, ChevronRight, Phone, Calendar, MessageCircle, Home, Newspaper, MapPin/, "Calendar, Home, Newspaper, MapPin");
replaceInFile('./src/component/Header.tsx', /const \[mobileMenuOpen, setMobileMenuOpen\] = useState\(false\);\n/, "");
replaceInFile('./src/component/Header.tsx', /const bottomBarRef = useRef<HTMLDivElement>\(null\);\n/, "");

replaceInFile('./src/context/LanguageContext.tsx', /type Translations = typeof vi;\n\n/, "");

replaceInFile('./src/locales/vi.ts', /pickupLocation: "Khu vực nhận xe \*",/, 'pickupLocationLabel: "Khu vực nhận xe *",');
replaceInFile('./src/locales/en.ts', /pickupLocation: "Pick-up Location \*",/, 'pickupLocationLabel: "Pick-up Location *",');

replaceInFile('./src/page/BookingPage.tsx', /\{t\('booking\.pickupLocation'\)\}<\/label>/g, "{t('booking.pickupLocationLabel')}</label>");

replaceInFile('./src/page/Admin/Orders.tsx', /Search, /, "");
replaceInFile('./src/page/Admin/Vehicles.tsx', /Search, /, "");
replaceInFile('./src/page/ContactPage.tsx', /Facebook, MessageCircle, Instagram, /, "");

replaceInFile('./src/page/HomePage.tsx', /  const phoneNumber = import\.meta\.env\.VITE_PHONE_NUMBER \|\| "0866399986";\n/, "");

console.log("Fixes applied.");
