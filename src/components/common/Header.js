import  React ,{Component} from "react";
import { Navbar,Form,FormControl } from 'react-bootstrap';
import { faSearch} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeadCss from "./common.module.css";

export default class Header extends Component{
    render(){
        const { captureValue } = this.props;
        return(
            // <Container fulid="md" className ={HeadCss['head']}>
                <Navbar className={HeadCss['head']}>
                    <Navbar.Brand href="#home" style={{marginTop:'10px',marginLeft:"40px"}}>
                        <Form inline>
                            <FontAwesomeIcon icon={faSearch} className={HeadCss["search"]}  />
                            <FormControl 
                                type="text" 
                                placeholder="Type in to search" 
                                className="mr-sm-2" 
                                style={{marginLeft:"4px",border:"none",fontSize:"13px"}} 
                                onChange = {captureValue}
                            />
                        </Form>
                    </Navbar.Brand>
                </Navbar>
            // </Container>
        );
    }
}
