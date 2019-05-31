import React,{Component} from 'react';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemactions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems();
    };

    onDelete=(id)=>{
        this.props.deleteItem(id);
    };
   
    render(){
        const {items}=this.props.item;
        debugger;
        return(
            <Container>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id,name})=>(
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                   <Button
                                   className="remove-btn" color="danger" size="sm" onClick={this.onDelete.bind(this,_id)}>&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes={
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired,
    onDelete:PropTypes.func
};

const mapStateToProps=state=>({
    item:state.item

});

export default connect(mapStateToProps,{getItems,deleteItem})(ShoppingList);