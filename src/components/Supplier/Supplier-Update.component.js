import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import swal from '@sweetalert/with-react'
import DatePicker from 'react-datepicker';

export default class EditSupplier extends Component {
    constructor(props) {
        super(props);


        this.onChangeSupID = this.onChangeSupID.bind(this);
        this.onChangeSupname = this.onChangeSupname.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDate= this.onChangeDate.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            SupID: "",
            Supname: "",
            Amount:"",
            Date: "",
            Contactno: "",
            Email:"",
            Supplier: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Supplier/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    SupID: response.data.SupID,
                    Supname: response.data.Supname,
                    Amount: response.data.Amount,
                    Date: response.data.Date,
                    Contactno: response.data.Contactno,
                    Email: response.data.Email,
                   
                    
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/Supplier/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        Delivery: response.data.map(Supplier => Supplier.DPname),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

   //set the SupID

   onChangeSupID(e) {
    this.setState({
        SupID: e.target.value,
    });
}

//set the Supname

onChangeSupname(e) {
    this.setState({
        Supname: e.target.value,
    });
}

//set Amount
onChangeAmount(e) {
    this.setState({
        Amount: e.target.value,
    });
}

//set Date




onChangeDate(e) {
    this.setState({
        Date: e.target.value,
    });
}

//set Contactno
onChangeContactno(e) {
    this.setState({
        Contactno: e.target.value,
    });
}


 //set Contactno
 onChangeEmail(e) {
    this.setState({
        Email: e.target.value,
    });
}



    onSubmit(e) {
        e.preventDefault();

        const { Contactno, Amount } = this.state;

        const cup = /^[0-9\b]+$/;
        if (!cup.test(String(Contactno))|| (Contactno.length != 10)) {
            swal(
                "Invalid Contact no !",
                "Contact no Should be number & length shuld be 10!",
                "error"
            );


        } else if (!cup.test(String(Amount))) {
            swal(
                "Invalid  Amount!",
                " Amount Should be number!",
                "error"
            );
        } else {

            const Supplier = {
                SupID: this.state.SupID,
                Supname: this.state.Supname,
                Amount: this.state.Amount,
                Date: this.state.Date,
                Contactno: this.state.Contactno,
                Email: this.state.Email,
               
            };
            console.log(Supplier);

            axios
                .post('http://localhost:5000/Supplier/update/' + this.props.match.params.id, Supplier)
                .then((res) => console.log(res.data));

            swal({
                title: "Done!",
                text: "Edit Successfully!",
                icon: "success",
                button: "Okay!",
            }).then((value) => {
                swal((window.location = "/Supplier/"));
            });
        }

    }

    render() {
        return (<div  >
            <div class = "row ">
            <div class = "col-6" >
            <br/>
            <img src="/images/cupcake_logo.gif" width="60%" height="40%" />
            </div> <div class = "col-6" >
            <div div class = "myformstyle" >
            <div className = "card-body" >
            <div className = "col-md-8 mt-4 mx-auto" > </div> 
            <h3 className = "text-center" > 
            <font face = "Comic sans MS" size = "6" > Update Supplier Payment </font>
            </h3 > <br></br>
            
            <br></br>
            
             <form onSubmit = { this.onSubmit } >


            <div className = "form-group" >
            <label >Supplier ID: </label> 
            <input type = "text"
            placeholder = "Supplier ID"
            required className = "form-control"
            value = { this.state.SupID }
            onChange = { this.onChangeSupID }
            /> 
            </div> <div className = "form-group" >
           
            <label > Supplier Name: </label>
            <input type = "text"
            placeholder = "Supplier Name"
            required className = "form-control"
            value = { this.state.Supname }
            onChange = { this.onChangeSupname }
            /> 
            </div >  
            <div className = "form-group" >
           
            <label > Amount: </label> 
           
            <input type = "text"
            placeholder = "Amount"
            required  className = "form-control"
            value = { this.state.Amount }
            onChange = { this.onChangeAmount }/>
             </div > 
             
              <div className = "form-group" >
            <label > Bill Date: </label>
           


            <input type = "date"
            placeholder = "Date"
            required  className = "form-control"
            value = { this.state.Date }
            onChange = { this.onChangeDate }/>

            </div >  

            <div className = "form-group" >
            <label > Contact No: </label> 
            <input type = "text"
            placeholder = "Contact No"
            required  className = "form-control"
            value = { this.state.Contactno }
            onChange = { this.onChangeContactno }/>
             </div > 

             <div className = "form-group" >
            <label > Email: </label> 
            <input type = "Email"
            placeholder = "Email"
            required  className = "form-control"
            value = { this.state.Email }
            onChange = { this.onChangeEmail }/>
             </div >

             

            <div className = "form-group" >
            <input type = "submit"
            value = "Update "
            className = "btn btn-primary" />
            </div>{" "} </form >  </div> </div > </div>
             </div ><br/> <br/>  </div>
        )
    }
}