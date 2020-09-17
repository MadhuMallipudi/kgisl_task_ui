import React,{Component} from "react";
import {Table,Form,Modal,Button,OverlayTrigger,Popover} from 'react-bootstrap';
import axios from "axios";
import { faTrash, faEdit, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cont from "./contact.module.css";

export default class ContactList  extends Component{
    constructor(props){
        super(props);
        this.state = {
            list :[] ,
            id:"",
            name:"",
            number:"",
            location:"",
            in_count:"",
            out_count:"",
            show:false,
            overlayShow:false,
            handleClose:"",
            deleteShow:false,
            deleteID:"",
            formType:"Add",
            searchValue:""
        }
    }
    componentWillReceiveProps = async (props) => {
        const { modalStatus,searchValue,filterValue } = props;
        const { list } = this.state;
        if(searchValue && filterValue){
            let searchlist = (list || []).filter((item)=>{return ((item.name.toLowerCase().includes(searchValue)) && (item.location.toLowerCase().includes(filterValue))) });
            this.setState({show:modalStatus,searchValue:searchValue,list:searchlist});            
        } else if(searchValue){
            let searchlist = (list || []).filter((item)=>{return item.name.toLowerCase().includes(searchValue) });
            this.setState({show:modalStatus,searchValue:searchValue,list:searchlist});
        } else if(filterValue){
            let filterlist = (list || []).filter((item)=>{return item.location.toLowerCase().includes(filterValue) });
            this.setState({show:modalStatus,searchValue:searchValue,list:filterlist});
        } 
        else {
            this.setState({show:modalStatus});
            await this.getList();    
        }
    }
    componentDidMount = async () => {
        await this.getList();
    }
    getList = async () => {
        let result = await axios.get('http://localhost:3001/list')
        if(result){
            this.setState({list:result.data.data}); 
        }
    }
    deleteContact = async (id) => {

        await axios.delete("http://localhost:3001/delete",{
            params:{id}
        });
        this.setState({deleteShow:false});
        await this.getList();
    }
    editContact = (contactID) => {
        const {list} = this.state;
        let {name , number,location,incoming_call_count:in_count,out_going_call_count:out_count,id} = (list || []).find((item)=>{ return item.id =  contactID });
        this.setState({name,number,location,in_count,out_count,id,formType:'Edit'});
        this.props.handleClose();
    }
    formSubmit = async () => {
        const { name,number,location,in_count:incoming_call_count,out_count:out_going_call_count,formType,id } = this.state;
        switch(formType){
            case "Add": await axios.post('http://localhost:3001/create', {name,number,location,incoming_call_count,out_going_call_count});
                        break;
            case "Edit": await axios.put('http://localhost:3001/update', {id,name,number,location,incoming_call_count,out_going_call_count});
                        break;
            default: alert("something went wrong");                        
        }
        this.setState({name:"",number:"",location:"",in_count:"",out_count:"",formType:"Add"});
        this.props.handleClose();
        await this.getList();
    }
    render(){
        const { list } =  this.state;
        const {handleClose} = this.props;
        let contactList = list.map((item,index)=>{
            return  <tr key={index} style={{backgroundColor:"#fff"}}>
                        <td>{item.name}</td>
                        <td>{item.number}</td>
                        <td>{item.location}</td>
                        <td>{item.incoming_call_count}</td>
                        <td>{item.out_going_call_count}</td>
                        <td>
                            <OverlayTrigger trigger="click" 
                                rootClose="false" 
                                placement="bottom" 
                                overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Content>
                                            <FontAwesomeIcon icon={faEdit}  onClick={()=>{this.editContact(item.id)}} style={{marginRight:'10px'}}/>
                                            <FontAwesomeIcon icon={faTrash} onClick={()=>{this.setState({deleteID:item.id,deleteShow:true})}} />
                                        </Popover.Content>
                                    </Popover>
                                }>
                                <FontAwesomeIcon icon={faEllipsisH}  className={cont['action']}/>
                            </OverlayTrigger>
                        </td>                         
                    </tr>
        }); 
        return(
           <div> 
            <Table hover>
                <thead>
                    <tr className="text-center">
                        <th>Name</th>
                        <th>Number</th>
                        <th>Location</th>
                        <th>Incoming Call Count</th>
                        <th>Outgoing Call Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                   {contactList} 
                </tbody>
            </Table>
            <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.formType} Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} placeholder="Enter Name" onChange={(e)=>{this.setState({name:e.target.value})}} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter Phone number" value={this.state.number} onChange={(e)=>{this.setState({number:e.target.value})}}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" placeholder="Enter Location" value={this.state.location} onChange={(e)=>{this.setState({location:e.target.value})}}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicIncmCount">
                                <Form.Label>Incoming Count</Form.Label>
                                <Form.Control type="text" placeholder="Enter Incoming call count" value={this.state.in_count} onChange={(e)=>{this.setState({in_count:e.target.value})}}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicoutCount">
                                <Form.Label>OutComing Count</Form.Label>
                                <Form.Control type="text" placeholder="Enter Outcoming call count" value={this.state.out_count} onChange={(e)=>{this.setState({out_count:e.target.value})}}/>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={()=>{this.formSubmit()}}>
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
            </Modal>
            <Modal show={this.state.deleteShow} onHide={()=>this.setState({deleteShow:!this.state.deleteShow})}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <b>Are you sure , do you want to delete this contact ? </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=> this.deleteContact(this.state.deleteID)}>Yes</Button>
                    <Button onClick={()=>this.setState({deleteShow:!this.state.deleteShow})}>No</Button>
                </Modal.Footer>
            </Modal>
            </div>    
        )
    }
}