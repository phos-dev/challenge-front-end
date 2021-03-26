import React, { Component } from 'react';
import { ReactComponent as Loading } from '../../assets/loading_icon.svg';
import { ReactComponent as SearchUser } from '../../assets/search_user_icon.svg';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../components/table/table.component';
import TopBar from '../../components/topBar/topBar.component';
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

const nationalities = Object.freeze({ 
  AU : 'au', 
  BR : 'br', 
  CA : 'ca', 
  CH : 'ch', 
  DE : 'de', 
  DK : 'dk', 
  ES : 'es', 
  FI : 'fi', 
  FR : 'fr', 
  GB : 'gb', 
  IE : 'ie', 
  IR : 'ir', 
  NO : 'no', 
  NL : 'nl', 
  NZ : 'nz', 
  TR : 'tr', 
  US : 'us'
})

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
    flexWrap: "wrap",
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

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actualPage: parseInt(props?.match?.params?.page) || 1,
      users: [],
      search: '',
      nat: '',
      gotUsers: false,
      toModal: null,
      modalView: false
    }
  }

  getData = () => {
    const { actualPage, nat } = this.state;
    fetch(`https://randomuser.me/api/?page=${actualPage}&results=50&id,picture,name,email,gender,dob,phone,location,nat&seed=coodesh&nat${nat === '' ? '' : `=${nat}`}`)
    .then(res => res.json())
    .then(data => this.setState({ users: data.results }, async () => {
      setTimeout(() => {
        this.setState({ gotUsers : true })
      },1500)
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

  handleSearch = e => {
    const { value } = e.target;
    const length = value.length;
    if(length <= 2 && length > 0) {
      const regex = new RegExp(`^${value[0]}${length === 2 ? value[1] : ''}`, 'i');
      const matches = Object.values(nationalities).filter(e => regex.test(e));
      this.setState({ nat: matches.join(',') })
    }
    else {
      this.setState({ nat: '' })
    }
    this.setState({ search: value }, () => this.getData());
  }

  filterByName = () => {
    const { users, search } = this.state;
    return search === '' ? users : users.filter(({ name }) => {
      const completeName = `${name.title} ${name.first} ${name.last}`;
      return completeName.toLowerCase().includes(search.toLowerCase())
    });
  }

  render() {
    const { classes, history } = this.props;
    const { 
      gotUsers, 
      users, 
      actualPage, 
      modalView, 
      toModal, 
      search, 
      nat 
    } = this.state;

    return (
      <div className="home">
        <TopBar/>
        <div>
          <div className="content"> 
            <div className={`middleDiv ${!gotUsers ? 'notLoaded' : ''}`}>
              <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget justo sollicitudin dolor feugiat sodales in eget ipsum. Nunc fermentum arcu ac turpis accumsan, nec dapibus lectus tempor. Suspendisse libero orci, pellentesque eget vehicula ut, lacinia eu sapien. Praesent euismod eros quis sapien egestas porttitor. </span>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                <InputLabel style={{ fontWeight: 'bold', color: 'black' }} htmlFor="userSearchBar">Searching</InputLabel>
                <FilledInput
                  id="searchBar"
                  type='text'
                  value={search}
                  onChange={this.handleSearch}
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
                <Table data={nat === '' ? this.filterByName() : users } OnClick={data => this.setState({ modalView: true, toModal: data})}/>
              }
              <div className="request">
                <Pagination count={10} page={actualPage} size="large" onChange={(_e, page) => {
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
          className={classes?.modal}
          open={modalView}
          onClose={() => this.setState({ modalView: false })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalView}>
            <div className={classes?.paper}>
              <CustomModal data={toModal} onClose={() => this.setState({ modalView: false })}/>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  } 
}

export default withStyles(styles)(Home);