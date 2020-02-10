import React from 'react';
import { Grid } from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';
import "./footer.css"
  
 class Footer extends React.Component {
     render() {
         return (
             <div className="footer">
                <Grid item xs={6}>
                    2020 &copy; Awesome<br />
                    <div className="copyright-links"><a href="">Terms of Use</a> / <a href="">Privacy Policy</a></div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <a href="" className="social-icon">
                            <FacebookIcon/>
                        </a>

                        <a href="" className="social-icon">
                            <TwitterIcon/>
                        </a>

                        <a href="" className="social-icon">
                            <LinkedInIcon/>
                        </a>
                    </div>
                    <Email/> info@awesome.com <span>&middot;</span> <Phone/> +123 456 7890
                </Grid>
            </div>
         );
     }
 }
 export default Footer;