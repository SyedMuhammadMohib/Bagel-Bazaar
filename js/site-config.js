/**
 * Bagel Bazaar Monroe — shared site configuration
 */
window.SITE = {
  name: "Bagel Bazaar",
  location: "Monroe, NJ",
  tagline: "Fresh bagels, breakfast and lunch, made daily.",
  phone: "(609) 860-9626",
  phoneHref: "tel:+16098609626",
  email: "info@bagelbazaarmonroe.com",
  address: {
    street: "337 Applegarth Rd #10",
    city: "Monroe",
    state: "NJ",
    zip: "08831",
    full: "337 Applegarth Rd #10, Monroe, NJ 08831",
  },
  hours: [
    { days: "Mon to Fri", time: "4:30 AM to 5:00 PM" },
    { days: "Sat", time: "4:30 AM to 4:00 PM" },
    { days: "Sun", time: "4:30 AM to 3:00 PM" },
  ],
  orderUrl: "https://www.bagelbazaarmonroe.com/OrderOnline.tpl",
  menuUrl: "https://www.bagelbazaarmonroe.com/ShowMenu.tpl",
  appStoreUrl: "https://apps.apple.com/us/app/bagel-bazaar-app/id6752311040",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.storefrontconsumer.bagel.bazaar&pcampaignid=web_share",
  mapUrl: "https://maps.google.com/?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=337+Applegarth+Rd+%2310+Monroe+NJ+08831&hl=en&z=18&output=embed&t=k",
  logo: "assets/logo/bagel-bazaar-logo.png",
  nav: [
    { label: "Welcome", href: "index.html", id: "welcome" },
    { label: "Menu", href: "menu.html", id: "menu" },
    { label: "About Us", href: "about.html", id: "about" },
    { label: "Location", href: "location.html", id: "location" },
    { label: "Contact Us", href: "contact.html", id: "contact" },
    { label: "Order Online", href: "order.html", id: "order" },
    { label: "Other", href: "other.html", id: "other" },
    { label: "Our App", href: "app.html", id: "app" },
    { label: "Loyalty Program", href: "loyalty.html", id: "loyalty" },
  ],
};
