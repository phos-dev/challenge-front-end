import React from 'react';
import defaultCompany  from '../../assets/default_company_image.png';
import './topBar.styles.scss';

const TopBar = () => (
  <div className="topBar">
      <div className="companyInfo">
        <img alt="companyLogo" id="gotCompanyImg" src={ defaultCompany } height="80px" width="80px"/>
        <span>Company</span>
      </div>
      <img alt="userPicture" className="profilePic" height="80px" width="80px" src='https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'/>
    </div>
)

export default TopBar;