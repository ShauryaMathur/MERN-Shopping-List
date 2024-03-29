import React, { Component } from 'react';
import {Alert,NavLink,Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import  {login} from '../../actions/authactions';
import {clearErrors} from '../../actions/erroractions';

class LoginModal extends Component{
    state={
        modal:false,
        email:'',
        password:'',
        msg:null
    };

    static propTypes={
        isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        login:PropTypes.func.isRequired,
        clearErrors:PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
       const {error,isAuthenticated}=this.props ;
       if(error!=prevProps.error){
           //Check for register error
           if(error.id=='LOGIN_FAIL'){
               this.setState({msg:error.msg.msg});
           }else{
               this.setState({
                   msg:null
               });
           }
       }

       //If Authenticated close Modal
       if(this.state.modal){
           if(isAuthenticated){
               this.toggle();
           }
       }
    }

    toggle=()=>{
        //Clear Errors
        this.props.clearErrors();
        this.setState({
            modal:!this.state.modal
        });
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit=e=>{
        e.preventDefault();
        const {email,password}=this.state;

        const user={
            email,password
        };
        
        //Attempt to login
        this.props.login(user);

    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">Login</NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg?<Alert color="danger">{this.state.msg}</Alert>:null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">E-Mail</Label>
                                <Input type="text" name="email" id="email" placeholder="E-Mail" className="mb-3" onChange={this.onChange}/>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" className="mb-3" onChange={this.onChange}/>
                                <Button color="dark" style={{marginTop:'2rem'}} block >Login</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated,
    error:state.error
});
export default connect(mapStateToProps,{login,clearErrors})(LoginModal);