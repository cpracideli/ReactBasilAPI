import React, { Component } from 'react';
import { Button, Form, Label } from 'semantic-ui-react';


export class PersonRegister extends Component {

    constructor(props){
        super(props);
        this.state = { country: '', state:'', city:'', neighborhood:'', street:'', number:'', loading:false, validCep: true }
        console.log('constructor');
    }

    componentDidMount() {
        console.log('call did mount');
        //  this.populateAddress('06086120');
    }

    handleChange = (e) =>{
        console.log(e.target.value)
        this.setState({ ...this.state, cep: e.target.value })
        this.populateAddress(e.target.value);
    }

    render() {
        console.log('render');
        return (
            <Form>
                <Form.Field>
                    <label>ZIP CODE</label>
                    <input placeholder='00000000' type='number' max="99999999" onChange={this.handleChange} />
                    <Label basic color='red' pointing style={{visibility: this.state.validCep ? 'hidden' : 'visible' }} >
                        Invalid ZIP CODE
                    </Label>
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='State' placeholder='State' value={this.state.state} />
                    <Form.Input fluid label='City' placeholder='City' value={this.state.city} />
                    <Form.Input fluid label='Neighborhood' placeholder='Neighborhood' value={this.state.neighborhood} />
                </Form.Group>
                <Form.Group >
                    <Form.Input width={10} label='Street' placeholder='Street' value={this.state.street} />
                    <Form.Input width={2} label='Number' placeholder='000' />
                    <Form.Input width={4} label='Complement' placeholder='BL-AP' />
                </Form.Group>

                <Button type='submit' primary>Save</Button>
            </Form>
        )
    }


    populateAddress = async (cep) =>{
        console.log('lenght: ' + Object.keys(cep).length);
        console.log('cep: ' + cep);
        if(Object.keys(cep).length >= 8){
            console.log('call api');
            const response = await fetch('https://brasilapi.com.br/api/cep/v1/' + cep);
            console.log('convert to json');
            const data = await response.json();

            if(data.name === 'CepPromiseError'){
                this.setState({ ...this.state, validCep:false });
            }
            else{
                this.setState({ ...this.state, state: data.state, city: data.city, neighborhood: data.neighborhood, street:data.street, loading: false, validCep:true });
            }
            console.log('set state');
            
        }
        else{
            this.setState({ ...this.state, state:'', city:'', neighborhood:'', street:'', number:'', loading:false, validCep:true  });
        }
    }
}