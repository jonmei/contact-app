var ContactForm = React.createClass({
    getInitialState: function() {
        return {
            contactPlaceholder: {id: "", telephone: "", name: "", surname: ""},
            resetValues: false
        }
    },
    render: function() {
        return (
            <tbody>
                <tr>
                    <td><ContactFormInput title="name" onContactChange={this.onContactChange} resetValues={this.state.resetValues}/></td>
                    <td><ContactFormInput title="surname" onContactChange={this.onContactChange} resetValues={this.state.resetValues}/></td>
                    <td><ContactFormInput title="telephone" onContactChange={this.onContactChange} resetValues={this.state.resetValues}/></td>
                    <td><ContactFormSubmit title="Submit" onContactSubmit={this.onContactSubmit}/></td>
                    <td></td>
                </tr>
            </tbody>
        )
    },
    componentDidUpdate: function() {
        if(this.state.resetValues == true){
            this.setState({resetValues: false})
        }
    },
    dataUpdate: function(data) {
        this.props.onListDataUpdate(data);
    },
    onContactChange: function(name,e) {
        var placeholderStates = this.state.contactPlaceholder;
        if(e.target.value != "") {
            placeholderStates[name] = e.target.value;
            this.setState({contactPlaceholder: placeholderStates});
        }
    },
    onContactSubmit: function(e) {
        e.preventDefault();
        var contactPlaceholder = this.state.contactPlaceholder;
        this.sendContact(contactPlaceholder);
    },
    sendContact: function(newContact) {
        $.ajax({
            url: serverIp + "/contact",
            data: newContact,
            method: "POST",
        }).success(function(res){
            newContact.id = res.id;

            var mainData = this.props.mainData;
            mainData.push(newContact);
            this.dataUpdate(mainData);
            this.setState({
                contactPlaceholder: {id: "", telephone: "", name: "", surname: ""}
            });
            this.resetValues();
        }.bind(this));
    },
    resetValues: function () {
        this.setState({resetValues: true});
    }
});
var ContactFormInput = React.createClass({
    render: function() {
        return (<input id="name" name={this.props.title} type="text" value={(this.props.resetValues) ? "" : null} onChange={this.inputChange} placeholder={"Your " + this.props.title} className="form-control"/>)
    },
    inputChange: function() {
        this.props.onContactChange(this.props.title,event);
    }
});
var ContactFormTextarea = React.createClass({
    render: function() {
        return (<textarea className="form-control" id="message" value={(this.props.resetValues) ? "" : null} onChange={this.inputChange} name={this.props.title} placeholder="Please enter your message here..." rows="5"></textarea>)
    },
    inputChange: function() {
        this.props.onContactChange(this.props.title,event);
    }
});
var ContactFormSubmit = React.createClass({
    render: function() {
        return (<button type="button" className="btn btn-success btn-xs btn-margin" title="Approved"  onClick={this.submit}><span className="glyphicon glyphicon-ok"></span></button>);
    },
    submit: function() {
        this.props.onContactSubmit(event);
    }
});