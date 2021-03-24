import React, { Component } from 'react';
import { ReactComponent as Loading } from '../../assets/loading_icon.svg';
import defaultCompany  from '../../assets/default_company_image.png';
import './home.styles.scss';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '../../components/table/table.component';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
const styles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF'
  },
}));
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actualPage: props.page || 1,
      users: [],
      companyImg: null,
      profilePic: null,
      gotUsers: false,
      toModal: null,
      gotCompanyImg: false,
      gotProfilePic: false,
      modalView: false
    }
  }

  componentDidMount() {
    const { page } = this.state;
    fetch(`https://randomuser.me/api/?page=${page}&results=50&id,picture,name,email,gender,dob,phone,location,nat`)
    .then(res => res.json())
    .then(data => this.setState({ users: data.results, gotUsers: true }));

  }

  handleOnLoadPic = e => {
    e.preventDefault();
    const { id } = e.target;
    this.setState({ [id]: true })
  }

  render() {
    const { classes } = this.props;
    const { gotUsers, users, gotCompanyImg, modalView, toModal } = this.state;

    if(modalView) console.log('IJOI', toModal)
    return (
      <div className="home">
        <div className="topBar">
          <div className="companyInfo">
            <img id="gotCompanyImg" src={ !gotCompanyImg ? defaultCompany : 'https://logodownload.org/wp-content/uploads/2014/04/coca-cola-logo-2.png'} onLoad={this.handleOnLoadPic}/>
            <span>Company</span>
          </div>
          <img className="profilePic" src={gotUsers ? users[0].picture.large : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'}/>
        </div>
        <div className="middleDiv">
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sollicitudin dolor feugiat sodales in eget ipsum. Nunc fermentum arcu ac turpis accumsan, nec dapibus lectus tempor. Suspendisse libero orci, pellentesque eget vehicula ut, lacinia eu sapien. Praesent euismod eros quis sapien egestas porttitor. </span>
          <div className="data">
            {
              !gotUsers
              ?
              <Loading height='50px'/>
              :
              <Table data={users} OnClick={data => this.setState({ modalView: true, toModal: data})}/>
            }
          </div>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalView}
          onClose={() => this.setState({ modalView: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalView}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  } 
}

export default withStyles(styles)(Home);