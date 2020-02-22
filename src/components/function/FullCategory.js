export const fullcategory = category =>{
    switch(category) {
        case "CE":
            return "Consumer Electronics";
        case "SH":
            return "Sports & Health";
        case "BT":
            return "Babies & Toys";
        case "GP":
            return "Groceries & Pets";
        case "HL":
            return "Home & Lifestyle";
        case "WF":
            return "Women’s Fashion";
        case "MF":
            return "Men’s Fashion";
        case "WA":
            return "Watches & Accessories";
        case "AM":
            return "Automotive & Motorbike";
        default:
            return 'None';
    }
}