import  React ,{Component} from "react";
import { Container, Row,Col,Form,Button,ListGroup,FormControl} from 'react-bootstrap';
import ContactList from "./ContactList";
import cont from "./contact.module.css";

export default class Contacts extends Component{
    constructor(props){
        super(props)
        this.state = {
            show:false,
            filterValue:""
        }
    }
    handleClose = () => {
        this.setState({show:!this.state.show});
    } 
    render(){
        const {searchValue} = this.props;
        const {filterValue} = this.state;
        return(
            <Container>
                <Row className ="mt-2 mb-2">
                    <Col md='4'>
                        <ListGroup horizontal="sm" style ={{display:"flex"}}>
                            <ListGroup.Item className={cont.item}>
                                <h4>Contacts</h4>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md="8" >
                        <ListGroup horizontal="sm" className={cont['list']}  style ={{display:"flex",float:'right'}}>
                            <ListGroup.Item  className={cont.item}>
                                <Form inline>
                                    <FormControl 
                                        type="text" 
                                        placeholder="Filter for location" 
                                        className="mr-sm-2" 
                                        style={{marginLeft:"4px",border:"none",fontSize:"13px"}} 
                                        onChange = {(e)=>{this.setState({filterValue:e.target.value})}}
                                    />
                                </Form>
                            </ListGroup.Item>
                            <ListGroup.Item  className={cont.item}>
                                <Button variant="outline-light"  style={{backgroundColor:"#01aafe",color:'#fff'}} onClick={()=>{this.handleClose()}}>Add Contact</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Col md="12">
                    <ContactList 
                        modalStatus={this.state.show} 
                        searchValue={searchValue}  
                        handleClose={()=>{this.handleClose()}} 
                        filterValue ={filterValue}

                    />
                </Col>
            </Container>
        )
    }
};