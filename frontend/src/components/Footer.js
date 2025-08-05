import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#B22222',
      color: 'white',
      textAlign: 'center',
      padding: '15px',
      marginTop: '30px'
    }}>
      <p>&copy; 2025 Bharakath Mutton Curry Shop. All Rights Reserved.</p>
      <p>Shop Location: <a href="https://www.google.com/maps/@10.6023684,79.4145658,3a,75y,95.64h,81.55t/data=!3m7!1e1!3m5!1sTGw35e90nUn2G68sRjz6QQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D8.451425122588532%26panoid%3DTGw35e90nUn2G68sRjz6QQ%26yaw%3D95.63650050055328!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D" style={{color: 'white', textDecoration: 'underline'}}>View on Google Maps</a></p>
      <p>Address: Vadaseri Main Road, Near Petrol Bunk, Ullikottai, Tamil Nadu 614018</p>
      <p>Phone: <a href="tel:+919688452311" style={{color: 'white', textDecoration: 'underline'}}>+91 96884 52311</a></p>
      <p>WhatsApp: <a href="https://wa.me/919688452311" target="_blank" rel="noopener noreferrer" style={{color: 'white', textDecoration: 'underline'}}>Chat with us</a></p>
      <p>Hours: Mon-Sun, 7:00 AM - 9:00 PM</p>
      <p>Specialties: Fresh mutton curry, boneless, thala, kaal, kudal varieties</p>
    </footer>
  );
}

export default Footer;

