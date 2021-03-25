import React, { Component } from 'react';
import { ReactComponent as Loading } from '../../assets/loading_icon.svg';
import { ReactComponent as SearchUser } from '../../assets/search_user_icon.svg';
import defaultCompany  from '../../assets/default_company_image.png';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../components/table/table.component';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomModal from '../../components/modal/modal.component';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Pagination from '@material-ui/lab/Pagination';
import clsx from "clsx";
import './home.styles.scss';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    outline: 'none'
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "100%"
  }
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actualPage: parseInt(props.match.params.page) || 1,
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

  getData = () => {
    const { actualPage } = this.state;
    fetch(`https://randomuser.me/api/?page=${actualPage}&results=50&id,picture,name,email,gender,dob,phone,location,nat&seed=coodesh`)
    .then(res => res.json())
    .then(data => this.setState({ users: data.results }, async () => {
      setTimeout(() => {
        this.setState({ gotUsers : true })
      },1000)
    }));
  }

  componentDidUpdate(_prevProps, prevState) {
    if(prevState.actualPage !== this.state.actualPage) {
      this.setState({ gotUsers : false }, () => this.getData())
    }
  }

  componentDidMount() {
    this.getData();
  }

  handleOnLoadPic = e => {
    e.preventDefault();
    const { id } = e.target;
    this.setState({ [id]: true })
  }

  render() {
    const { classes, history } = this.props;
    const { gotUsers, users, actualPage, modalView, toModal, sortBy } = this.state;

    return (
      <div className="home">
        <div className="topBar">
          <div className="companyInfo">
            <img alt="companyLogo" id="gotCompanyImg" src={ defaultCompany } onLoad={this.handleOnLoadPic}/>
            <span>Company</span>
          </div>
          <img alt="userPicture" className="profilePic" src='https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png'/>
        </div>
        <div>
          <div className="content"> 
            <div className={`middleDiv ${!gotUsers ? 'notLoaded' : ''}`}>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sollicitudin dolor feugiat sodales in eget ipsum. Nunc fermentum arcu ac turpis accumsan, nec dapibus lectus tempor. Suspendisse libero orci, pellentesque eget vehicula ut, lacinia eu sapien. Praesent euismod eros quis sapien egestas porttitor. </span>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel htmlFor="filled-adornment-text">Searching</InputLabel>
                <FilledInput
                  id="searchBu"
                  type='text'
                  value={sortBy}
                  onChange={e => this.setState({ sortBy: e.target.value})}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchUser width="20px"/>
                    </InputAdornment>
                  }
                />
              </FormControl>
              
              {
                
                !gotUsers
                ?
                <Loading  height='50px'/>
                :
                <Table data={users} OnClick={data => this.setState({ modalView: true, toModal: data})}/>
              }
              <div className="request">
                <Pagination count={10} page={actualPage} size="small" onChange={(_e, page) => {
                  history.replace({
                    pathname: `/page/${page}`
                  })
                  this.setState({ actualPage : page });
                }}/>
              </div>
            </div>
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
              <CustomModal data={toModal} onClose={() => this.setState({ modalView: false })}/>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  } 
}

export default withStyles(styles)(Home);